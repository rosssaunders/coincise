use agent_support::{ClientError, GrpcOrderBookClient};
use orderbook::{AccountId, GatewayError, OrderError, OrderId, OrderType, Price, Quantity, Side};
use std::env;
use std::time::Duration;
use tokio::time::sleep;

#[tokio::main(flavor = "multi_thread", worker_threads = 2)]
async fn main() {
    if let Err(error) = run().await {
        eprintln!("market-maker-agent terminated: {error}");
        std::process::exit(1);
    }
}

async fn run() -> Result<(), Box<dyn std::error::Error>> {
    let config = Config::from_env()?;
    println!(
        "starting market maker with mid={} spread={} qty={} endpoint={}",
        config.mid_price, config.spread, config.quantity, config.endpoint
    );

    let mut client = connect_with_retry(&config.endpoint).await;
    let balance = client
        .credit_account(config.account_id, config.base_deposit, config.quote_deposit)
        .await?;
    println!(
        "market maker account {} credited: base={} (res {}), quote={} (res {})",
        config.account_id,
        balance.available_base,
        balance.reserved_base,
        balance.available_quote,
        balance.reserved_quote
    );
    let mut state = OrderState::new(config.start_order_id);

    loop {
        match refresh_quotes(&mut client, &config, &mut state).await {
            Ok(()) => sleep(config.tick_interval).await,
            Err(ClientError::Gateway(GatewayError::Order(OrderError::UnknownOrder))) => {
                // Treat unknown order errors as stale state and continue.
                sleep(config.tick_interval).await;
            }
            Err(ClientError::Transport(_)) => {
                eprintln!("connection lost, retrying in 1s");
                sleep(Duration::from_secs(1)).await;
                client = connect_with_retry(&config.endpoint).await;
            }
            Err(error) => {
                eprintln!("quote refresh failed: {error}");
                sleep(Duration::from_millis(500)).await;
            }
        }
    }
}

async fn refresh_quotes(
    client: &mut GrpcOrderBookClient,
    config: &Config,
    state: &mut OrderState,
) -> Result<(), ClientError> {
    cancel_existing(client, config.account_id, &mut state.bid_order).await?;
    cancel_existing(client, config.account_id, &mut state.ask_order).await?;

    let snapshot = client.snapshot().await?;
    let best_bid = snapshot
        .bids
        .first()
        .map(|level| (level.price, level.total_quantity));
    let best_ask = snapshot
        .asks
        .first()
        .map(|level| (level.price, level.total_quantity));

    if let Some(price) = bid_price(config, best_ask.map(|level| level.0)) {
        let id = state.next_id();
        let result = client
            .submit_order(
                config.account_id,
                id,
                Side::Bid,
                OrderType::PostOnly,
                Some(price),
                config.quantity,
            )
            .await?;
        if let Some(order) = result.resting {
            println!(
                "resting bid order {} @ {} (qty {})",
                order.id, order.price, order.quantity
            );
            state.bid_order = Some(order.id);
        } else {
            println!("bid {} rejected (would cross)", price);
            state.bid_order = None;
        }
    }

    if let Some(price) = ask_price(config, best_bid.map(|level| level.0)) {
        let id = state.next_id();
        let result = client
            .submit_order(
                config.account_id,
                id,
                Side::Ask,
                OrderType::PostOnly,
                Some(price),
                config.quantity,
            )
            .await?;
        if let Some(order) = result.resting {
            println!(
                "resting ask order {} @ {} (qty {})",
                order.id, order.price, order.quantity
            );
            state.ask_order = Some(order.id);
        } else {
            println!("ask {} rejected (would cross)", price);
            state.ask_order = None;
        }
    }

    Ok(())
}

async fn cancel_existing(
    client: &mut GrpcOrderBookClient,
    account_id: AccountId,
    order_slot: &mut Option<OrderId>,
) -> Result<(), ClientError> {
    if let Some(order_id) = order_slot.take() {
        match client.cancel_order(account_id, order_id).await {
            Ok(quantity) => {
                println!("canceled resting order {} (qty {})", order_id, quantity);
            }
            Err(ClientError::Gateway(GatewayError::Order(OrderError::UnknownOrder))) => {
                println!("order {} already gone", order_id);
            }
            Err(error) => {
                *order_slot = Some(order_id);
                return Err(error);
            }
        }
    }
    Ok(())
}

fn bid_price(config: &Config, best_ask: Option<Price>) -> Option<Price> {
    let mut price = config.mid_price.saturating_sub(config.spread);
    if let Some(ask) = best_ask {
        if ask == 0 {
            return None;
        }
        let adjusted = ask.saturating_sub(1);
        if price >= ask {
            price = adjusted;
        } else {
            price = price.min(adjusted);
        }
    }
    Some(price)
}

fn ask_price(config: &Config, best_bid: Option<Price>) -> Option<Price> {
    let mut price = config.mid_price.saturating_add(config.spread);
    if let Some(bid) = best_bid {
        if bid == u64::MAX {
            return None;
        }
        let adjusted = bid.saturating_add(1);
        if price <= bid {
            price = adjusted;
        } else {
            price = price.max(adjusted);
        }
    }
    Some(price)
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

struct OrderState {
    next_order_id: OrderId,
    bid_order: Option<OrderId>,
    ask_order: Option<OrderId>,
}

impl OrderState {
    fn new(start: OrderId) -> Self {
        Self {
            next_order_id: start,
            bid_order: None,
            ask_order: None,
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
    mid_price: Price,
    spread: Price,
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
        let tick_interval = Duration::from_millis(env_u64("TICK_MILLIS", 500)?);
        let mid_price = env_u64("MID_PRICE", 100_000)?;
        let spread = env_u64("SPREAD", 100)?;
        let quantity = env_u64("QUANTITY", 10)?;
        let start_order_id = env_u64("ORDER_ID_START", 1)?;
        let account_id = env_u64("ACCOUNT_ID", 1)?;
        let base_deposit = env_u64("BASE_DEPOSIT", 0)?;
        let quote_deposit = env_u64("QUOTE_DEPOSIT", 0)?;
        Ok(Self {
            endpoint,
            tick_interval,
            mid_price,
            spread,
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
