use agent_support::{ClientError, GrpcOrderBookClient};
use orderbook::{
    AccountId, BookSnapshot, GatewayError, OrderError, OrderId, OrderType, Price, Quantity, Side,
};
use std::env;
use std::time::Duration;
use tokio::time::sleep;

#[tokio::main(flavor = "multi_thread", worker_threads = 2)]
async fn main() {
    if let Err(error) = run().await {
        eprintln!("pension-passive-buyer terminated: {error}");
        std::process::exit(1);
    }
}

async fn run() -> Result<(), Box<dyn std::error::Error>> {
    let config = Config::from_env()?;
    println!(
        "starting passive buyer target_price={} qty={} endpoint={}",
        config.target_price, config.quantity, config.endpoint
    );

    let mut client = connect_with_retry(&config.endpoint).await;
    let balance = client
        .credit_account(config.account_id, config.base_deposit, config.quote_deposit)
        .await?;
    println!(
        "passive buyer account {} credited: base={} (res {}), quote={} (res {})",
        config.account_id,
        balance.available_base,
        balance.reserved_base,
        balance.available_quote,
        balance.reserved_quote
    );
    let mut state = BuyerState::new(config.start_order_id);

    loop {
        match ensure_passive_bid(&mut client, &config, &mut state).await {
            Ok(()) => sleep(config.tick_interval).await,
            Err(ClientError::Transport(_)) => {
                eprintln!("connection lost, retrying in 1s");
                sleep(Duration::from_secs(1)).await;
                client = connect_with_retry(&config.endpoint).await;
            }
            Err(ClientError::Gateway(GatewayError::Order(OrderError::UnknownOrder))) => {
                state.resting_order = None;
            }
            Err(error) => {
                eprintln!("tick failed: {error}");
                sleep(Duration::from_millis(500)).await;
            }
        }
    }
}

async fn ensure_passive_bid(
    client: &mut GrpcOrderBookClient,
    config: &Config,
    state: &mut BuyerState,
) -> Result<(), ClientError> {
    let snapshot = client.snapshot().await?;

    let desired_price = desired_price(&snapshot, config.target_price);
    if let Some(order_id) = state.resting_order {
        if !order_present(&snapshot, order_id) {
            println!("resting order {} filled", order_id);
            state.resting_order = None;
        }
    }

    match (state.resting_order, desired_price) {
        (Some(order_id), Some(price)) => {
            if state.resting_price != Some(price) {
                cancel_order(client, config.account_id, order_id).await?;
                state.resting_order = None;
                state.resting_price = None;
            }
        }
        (Some(order_id), None) => {
            cancel_order(client, config.account_id, order_id).await?;
            state.resting_order = None;
            state.resting_price = None;
        }
        (None, _) => {}
    }

    if state.resting_order.is_none() {
        if let Some(price) = desired_price {
            let order_id = state.next_id();
            let result = client
                .submit_order(
                    config.account_id,
                    order_id,
                    Side::Bid,
                    OrderType::PostOnly,
                    Some(price),
                    config.quantity,
                )
                .await?;
            if let Some(resting) = result.resting {
                println!(
                    "posted passive bid {} @ {} (qty {})",
                    resting.id, resting.price, resting.quantity
                );
                state.resting_order = Some(resting.id);
                state.resting_price = Some(resting.price);
            } else {
                println!("post-only bid {} rejected (would cross)", price);
            }
        }
    }

    Ok(())
}

async fn cancel_order(
    client: &mut GrpcOrderBookClient,
    account_id: AccountId,
    order_id: OrderId,
) -> Result<(), ClientError> {
    match client.cancel_order(account_id, order_id).await {
        Ok(quantity) => {
            println!("canceled order {} (qty {})", order_id, quantity);
            Ok(())
        }
        Err(ClientError::Gateway(GatewayError::Order(OrderError::UnknownOrder))) => {
            println!("order {} already gone", order_id);
            Ok(())
        }
        Err(error) => Err(error),
    }
}

fn desired_price(snapshot: &BookSnapshot, target: Price) -> Option<Price> {
    match snapshot.asks.first() {
        Some(level) => {
            if level.price == 0 {
                return None;
            }
            let max_price = level.price.saturating_sub(1);
            Some(target.min(max_price))
        }
        None => Some(target),
    }
}

fn order_present(snapshot: &BookSnapshot, order_id: OrderId) -> bool {
    snapshot
        .bids
        .iter()
        .chain(snapshot.asks.iter())
        .any(|level| level.orders.iter().any(|order| order.id == order_id))
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

struct BuyerState {
    next_order_id: OrderId,
    resting_order: Option<OrderId>,
    resting_price: Option<Price>,
}

impl BuyerState {
    fn new(start: OrderId) -> Self {
        Self {
            next_order_id: start,
            resting_order: None,
            resting_price: None,
        }
    }

    fn next_id(&mut self) -> OrderId {
        let id = self.next_order_id;
        self.next_order_id = self.next_order_id.wrapping_add(1);
        id
    }
}

struct Config {
    endpoint: String,
    tick_interval: Duration,
    target_price: Price,
    quantity: Quantity,
    start_order_id: OrderId,
    account_id: AccountId,
    base_deposit: Quantity,
    quote_deposit: Quantity,
}

impl Config {
    fn from_env() -> Result<Self, Box<dyn std::error::Error>> {
        let endpoint = env::var("GRPC_ENDPOINT")
            .unwrap_or_else(|_| "http://orderbook-server:50051".to_string());
        let tick_interval = Duration::from_millis(env_u64("TICK_MILLIS", 1_500)?);
        let target_price = env_u64("TARGET_PRICE", 99_000)?;
        let quantity = env_u64("QUANTITY", 25)?;
        let start_order_id = env_u64("ORDER_ID_START", 10_000)?;
        let account_id = env_u64("ACCOUNT_ID", 3)?;
        let base_deposit = env_u64("BASE_DEPOSIT", 0)?;
        let quote_deposit = env_u64("QUOTE_DEPOSIT", 0)?;
        Ok(Self {
            endpoint,
            tick_interval,
            target_price,
            quantity,
            start_order_id,
            account_id,
            base_deposit,
            quote_deposit,
        })
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
