# Coinbase FIX Market Data Client

This is a Rust application that connects to Coinbase's FIX API to receive streaming market data.

## Prerequisites

- Rust 1.70 or later
- Coinbase Exchange API credentials (SenderCompID)

## Setup

1. Clone this repository
2. Navigate to the project directory
3. Edit `fix_settings.cfg` and replace `YOUR_SENDER_ID` with your actual Coinbase Exchange API sender ID
4. Create the required directories:
   ```bash
   mkdir store log
   ```

## Building

```bash
cargo build --release
```

## Running

```bash
cargo run --release
```

## Configuration

The application is configured through the `fix_settings.cfg` file. The main settings you might want to modify are:

- `SenderCompID`: Your Coinbase Exchange API sender ID
- `SocketConnectHost`: The FIX server host (default: fix-md.exchange.coinbase.com)
- `SocketConnectPort`: The FIX server port (default: 6121)
- `HeartBtInt`: Heartbeat interval in seconds (default: 30)

## Features

- Connects to Coinbase's FIX 5.0 Market Data API
- Receives market data snapshots and incremental updates
- Handles order book updates (bids and asks)
- Automatic reconnection on disconnection
- Logging of all market data messages

## Notes

- The application will automatically reconnect if the connection is lost
- Market data is logged to the console
- The application runs for 1 hour by default (configurable in main.rs)
- Make sure to keep your API credentials secure and never commit them to version control 