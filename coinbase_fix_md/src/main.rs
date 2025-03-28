use anyhow::Result;
use log::{info, error};
use forgefix::{
    Session, SessionConfig, MessageStore, FileMessageStore,
    Message, Field, FieldType, MessageType,
};
use std::time::Duration;
use tokio::time;

struct MarketDataHandler {
    session: Session,
    symbol: String,
}

impl MarketDataHandler {
    async fn new(symbol: String, config: SessionConfig) -> Result<Self> {
        let store = FileMessageStore::new("store")?;
        let session = Session::new(config, store).await?;
        
        Ok(Self {
            session,
            symbol,
        })
    }

    async fn connect(&mut self) -> Result<()> {
        self.session.connect().await?;
        info!("Connected to FIX server");
        Ok(())
    }

    async fn subscribe_market_data(&mut self) -> Result<()> {
        let mut msg = Message::new(MessageType::MarketDataRequest);
        
        // Set message fields
        msg.set_field(Field::new(262, FieldType::String("MD_REQ_1".into()))); // MDReqID
        msg.set_field(Field::new(263, FieldType::String("1".into()))); // SubscriptionRequestType (1 = Snapshot + Updates)
        msg.set_field(Field::new(264, FieldType::String("1".into()))); // MarketDepth (1 = Top of Book)
        msg.set_field(Field::new(267, FieldType::String("2".into()))); // NoMDEntryTypes
        msg.set_field(Field::new(269, FieldType::String("0".into()))); // MDEntryType (0 = Bid)
        msg.set_field(Field::new(269, FieldType::String("1".into()))); // MDEntryType (1 = Offer)
        msg.set_field(Field::new(146, FieldType::String("1".into()))); // NoRelatedSym
        msg.set_field(Field::new(55, FieldType::String(self.symbol.clone()))); // Symbol

        // Send the message
        self.session.send_message(msg).await?;
        info!("Sent market data subscription request for {}", self.symbol);
        Ok(())
    }

    async fn handle_market_data(&mut self) -> Result<()> {
        while let Some(msg) = self.session.receive_message().await? {
            match msg.msg_type() {
                MessageType::MarketDataSnapshotFullRefresh => {
                    self.handle_market_data_snapshot(&msg)?;
                }
                MessageType::MarketDataIncrementalRefresh => {
                    self.handle_market_data_incremental(&msg)?;
                }
                _ => {}
            }
        }
        Ok(())
    }

    fn handle_market_data_snapshot(&self, msg: &Message) -> Result<()> {
        if let Some(symbol) = msg.get_field::<String>(55) {
            info!("Received market data snapshot for {}", symbol);
            
            if let Some(entries) = msg.get_field::<i32>(268) {
                for i in 0..entries {
                    if let (Some(entry_type), Some(price), Some(size)) = (
                        msg.get_group_field::<String>(279, i, 269),
                        msg.get_group_field::<f64>(279, i, 270),
                        msg.get_group_field::<f64>(279, i, 271)
                    ) {
                        info!("{}: {} - Price: {}, Size: {}", 
                            symbol,
                            if entry_type == "0" { "Bid" } else { "Ask" },
                            price,
                            size
                        );
                    }
                }
            }
        }
        Ok(())
    }

    fn handle_market_data_incremental(&self, msg: &Message) -> Result<()> {
        if let Some(symbol) = msg.get_field::<String>(55) {
            info!("Received market data update for {}", symbol);
            
            if let Some(entries) = msg.get_field::<i32>(268) {
                for i in 0..entries {
                    if let (Some(update_action), Some(entry_type), Some(price), Some(size)) = (
                        msg.get_group_field::<String>(279, i, 279),
                        msg.get_group_field::<String>(279, i, 269),
                        msg.get_group_field::<f64>(279, i, 270),
                        msg.get_group_field::<f64>(279, i, 271)
                    ) {
                        let action = match update_action.as_str() {
                            "0" => "New",
                            "1" => "Change",
                            "2" => "Delete",
                            _ => "Unknown",
                        };
                        info!("{}: {} - Action: {}, Price: {}, Size: {}", 
                            symbol,
                            if entry_type == "0" { "Bid" } else { "Ask" },
                            action,
                            price,
                            size
                        );
                    }
                }
            }
        }
        Ok(())
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize logging
    env_logger::init();

    // Create session configuration
    let config = SessionConfig::new()
        .sender_comp_id("YOUR_SENDER_ID")
        .target_comp_id("COINBASE")
        .host("fix-md.exchange.coinbase.com")
        .port(6121)
        .heartbeat_interval(Duration::from_secs(30));

    // Create market data handler
    let mut handler = MarketDataHandler::new("BTC-USD".to_string(), config).await?;

    // Connect to the server
    handler.connect().await?;

    // Subscribe to market data
    handler.subscribe_market_data().await?;

    // Handle market data messages
    loop {
        if let Err(e) = handler.handle_market_data().await {
            error!("Error handling market data: {}", e);
            time::sleep(Duration::from_secs(5)).await;
            handler.connect().await?;
            handler.subscribe_market_data().await?;
        }
    }
}
