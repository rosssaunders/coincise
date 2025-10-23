use agent_support::{ClientError, GrpcOrderBookClient};
use orderbook::{
    AccountId, GatewayError, MatchResult, OrderError, OrderId, OrderType, Price, Quantity, Side,
};
use std::env;
use std::time::Duration;
use tokio::time::sleep;

#[tokio::main(flavor = "multi_thread", worker_threads = 2)]
async fn main() {
    if let Err(error) = run().await {
        eprintln!("twap-agent terminated: {error}");
        std::process::exit(1);
    }
}

async fn run() -> Result<(), Box<dyn std::error::Error>> {
    let config = Config::from_env()?;
    println!(
        "starting twap agent side={:?} type={:?} total={} slices={} endpoint={}",
        config.side, config.order_type, config.total_quantity, config.slice_count, config.endpoint
    );

    let mut client = connect_with_retry(&config.endpoint).await;
    let balance = client
        .credit_account(config.account_id, config.base_deposit, config.quote_deposit)
        .await?;
    println!(
        "twap account {} credited: base={} (res {}), quote={} (res {})",
        config.account_id,
        balance.available_base,
        balance.reserved_base,
        balance.available_quote,
        balance.reserved_quote
    );
    let mut next_order_id = config.start_order_id;

    loop {
        let mut remaining = config.total_quantity;
        while remaining > 0 {
            let qty = config.slice_quantity.min(remaining);
            remaining -= qty;
            let order_id = next_order_id;
            next_order_id = next_order_id.wrapping_add(1);

            match submit_slice(&mut client, &config, order_id, qty).await {
                Ok(result) => log_result(order_id, qty, result),
                Err(ClientError::Transport(_)) => {
                    eprintln!("transport error, reconnecting");
                    sleep(Duration::from_secs(1)).await;
                    client = connect_with_retry(&config.endpoint).await;
                    remaining += qty; // retry this slice
                    continue;
                }
                Err(ClientError::Gateway(GatewayError::Order(OrderError::UnknownOrder))) => {
                    println!("order {} already filled before confirmation", order_id);
                }
                Err(error) => {
                    eprintln!("failed to submit slice {}: {error}", order_id);
                }
            }

            sleep(config.slice_interval).await;
        }

        println!(
            "completed twap cycle, sleeping for {} ms",
            config.cycle_pause.as_millis()
        );
        sleep(config.cycle_pause).await;
    }
}

async fn submit_slice(
    client: &mut GrpcOrderBookClient,
    config: &Config,
    order_id: OrderId,
    quantity: Quantity,
) -> Result<MatchResult, ClientError> {
    client
        .submit_order(
            config.account_id,
            order_id,
            config.side,
            config.order_type,
            config.price,
            quantity,
        )
        .await
}

fn log_result(order_id: OrderId, quantity: Quantity, result: MatchResult) {
    let MatchResult {
        fills,
        resting,
        unfilled,
    } = result;
    let filled: Quantity = fills.iter().map(|fill| fill.quantity).sum();
    if filled > 0 {
        println!("order {} filled {} units", order_id, filled);
        for fill in &fills {
            println!(
                "  fill maker={} price={} qty={}",
                fill.maker_id, fill.price, fill.quantity
            );
        }
    }
    if let Some(resting) = resting {
        println!(
            "order {} resting {} @ {} (qty {})",
            order_id,
            if resting.side == Side::Bid {
                "bid"
            } else {
                "ask"
            },
            resting.price,
            resting.quantity
        );
    }
    if unfilled > 0 {
        println!(
            "order {} left unfilled quantity {} (requested {})",
            order_id, unfilled, quantity
        );
    }
}

async fn connect_with_retry(endpoint: &str) -> GrpcOrderBookClient {
    loop {
        match GrpcOrderBookClient::connect(endpoint).await {
            Ok(client) => return client,
            Err(error) => {
                eprintln!("failed to connect to {}: {error}", endpoint);
                sleep(Duration::from_secs(1)).await;
            }
        }
    }
}

struct Config {
    endpoint: String,
    slice_interval: Duration,
    cycle_pause: Duration,
    total_quantity: Quantity,
    slice_quantity: Quantity,
    slice_count: u64,
    side: Side,
    order_type: OrderType,
    price: Option<Price>,
    start_order_id: OrderId,
    account_id: AccountId,
    base_deposit: Quantity,
    quote_deposit: Quantity,
}

impl Config {
    fn from_env() -> Result<Self, Box<dyn std::error::Error>> {
        let endpoint = env::var("GRPC_ENDPOINT")
            .unwrap_or_else(|_| "http://orderbook-server:50051".to_string());
        let total_quantity = env_u64("TOTAL_QUANTITY", 1_000)?;
        let slice_count = env_u64("SLICES", 5)?.max(1);
        let slice_interval = Duration::from_millis(env_u64("SLICE_INTERVAL_MILLIS", 1_000)?);
        let cycle_pause = Duration::from_millis(env_u64("CYCLE_PAUSE_MILLIS", 5_000)?);
        let side = env_side("SIDE", Side::Bid)?;
        let order_type = env_order_type("ORDER_TYPE", OrderType::Limit)?;
        let price = env_optional_price("PRICE")?;
        let start_order_id = env_u64("ORDER_ID_START", 50)?;
        let account_id = env_u64("ACCOUNT_ID", 2)?;
        let base_deposit = env_u64("BASE_DEPOSIT", 0)?;
        let quote_deposit = env_u64("QUOTE_DEPOSIT", 0)?;

        if order_type != OrderType::Market && price.is_none() {
            return Err("PRICE must be provided for non-market orders".into());
        }

        let slice_quantity = ((total_quantity + slice_count - 1) / slice_count).max(1);

        Ok(Self {
            endpoint,
            slice_interval,
            cycle_pause,
            total_quantity,
            slice_quantity,
            slice_count,
            side,
            order_type,
            price,
            start_order_id,
            account_id,
            base_deposit,
            quote_deposit,
        })
    }
}

fn env_optional_price(key: &str) -> Result<Option<Price>, Box<dyn std::error::Error>> {
    match env::var(key) {
        Ok(value) => value
            .parse::<Price>()
            .map(Some)
            .map_err(|error| format!("invalid value for {}: {}", key, error).into()),
        Err(env::VarError::NotPresent) => Ok(None),
        Err(env::VarError::NotUnicode(_)) => Err(format!("non-unicode value for {}", key).into()),
    }
}

fn env_side(key: &str, default: Side) -> Result<Side, Box<dyn std::error::Error>> {
    match env::var(key) {
        Ok(value) => match value.to_ascii_lowercase().as_str() {
            "bid" => Ok(Side::Bid),
            "ask" => Ok(Side::Ask),
            other => Err(format!("invalid side '{}': expected bid or ask", other).into()),
        },
        Err(env::VarError::NotPresent) => Ok(default),
        Err(env::VarError::NotUnicode(_)) => Err(format!("non-unicode value for {}", key).into()),
    }
}

fn env_order_type(key: &str, default: OrderType) -> Result<OrderType, Box<dyn std::error::Error>> {
    match env::var(key) {
        Ok(value) => match value.to_ascii_lowercase().as_str() {
            "market" => Ok(OrderType::Market),
            "limit" => Ok(OrderType::Limit),
            "ioc" | "immediate_or_cancel" => Ok(OrderType::ImmediateOrCancel),
            "fok" | "fill_or_kill" => Ok(OrderType::FillOrKill),
            "post_only" => Ok(OrderType::PostOnly),
            other => Err(format!(
                "invalid order type '{}': expected market/limit/ioc/fok/post_only",
                other
            )
            .into()),
        },
        Err(env::VarError::NotPresent) => Ok(default),
        Err(env::VarError::NotUnicode(_)) => Err(format!("non-unicode value for {}", key).into()),
    }
}

fn env_u64(key: &str, default: u64) -> Result<u64, Box<dyn std::error::Error>> {
    match env::var(key) {
        Ok(value) => value
            .parse::<u64>()
            .map_err(|error| format!("invalid value for {}: {}", key, error).into()),
        Err(env::VarError::NotPresent) => Ok(default),
        Err(env::VarError::NotUnicode(_)) => Err(format!("non-unicode value for {}", key).into()),
    }
}
