# Order Book Workspace

This workspace contains a low-latency limit-order book, an execution layer, network frontends, and
three trading agents that exercise the API surface. The crates build on top of each other so that
any consumer can pick the integration point that matches their latency, transport, or strategy
needs.

## Workspace Layout

```
orderbook/
├── Cargo.toml              # Workspace manifest
├── Cargo.lock              # Locked dependency graph
├── crates/
│   ├── orderbook/          # Core data structures + matching engine
│   ├── orderbook-server/   # TCP and gRPC frontends
│   ├── market-maker-agent/ # Active two-sided quoting strategy
│   ├── twap-agent/         # Time-weighted execution bot
│   └── pension-passive-buyer/ # Passive liquidity provider
└── README.md               # You are here
```

## High-Level Architecture

```
                          Rust API calls
+---------------------------------------------------------+
|               Trading Agent Crates (Rust)               |
|  - market-maker-agent                                  |
|  - twap-agent                                          |
|  - pension-passive-buyer                               |
+--------------------------+------------------------------+
                           | Shared RiskEngine handle
                           v
                +-------------------------------+
                |     orderbook-server crate    |
                |-------------------------------|
                | * Non-blocking TCP interface  |
                | * tonic-based gRPC service    |
                | * Snapshot + streaming hooks  |
                +-------------------+-----------+
                                    |
                                    | Direct mutation & queries
                                    v
                +---------------------------------------------+
                |           orderbook crate (core)            |
                |---------------------------------------------|
                | * OrderBook (price levels + L3 views)       |
                | * MatchingEngine (market/limit/FOK/IOC/PO)  |
                | * RiskEngine (balance enforcement layer)    |
                | * Snapshots, fills, and error types         |
                +---------------------------------------------+
```

## Data Flow at a Glance

```
 Client Command (TCP/gRPC)            Trading Agent Call
            |                                   |
            |  frame/protobuf                   |
            v                                   v
      +-----------+                     +--------------+
      | Connection|                     | Strategy      |
      | handler   |                     | logic         |
      +-----------+                     +--------------+
              \                             /
               \                           /
                v                         v
               +-------------------------------+
               |    RiskEngine::submit(...)    |
               +-------------------------------+
                      | balance checks + matching
                      v
               +-------------------------------+
               |      OrderBook::book state     |
               +-------------------------------+
                      | snapshots / best levels
                      v
      +----------------------------+    +------------------+
      | TCP responses & broadcasts |    | gRPC responses   |
      +----------------------------+    +------------------+
```

## Crate Details

### `orderbook`
- Provides the `OrderBook` structure with level-3 depth (per-order views) and aggregated level-2
  totals.
- Offers snapshots via `BookSnapshot`/`LevelSnapshot`, best level helpers, and liquidity accounting.
- Implements the `MatchingEngine` that executes `Market`, `Limit`, `FillOrKill`, `ImmediateOrCancel`,
  and `PostOnly` order types, returning `MatchResult` collections of `Fill` records.
- Wraps the execution layer with a `RiskEngine` that maintains per-account base/quote balances,
  reserves funds for resting orders, and settles fills so frontends can enforce credit checks before
  forwarding requests to the matcher.
- Includes exhaustive unit tests and Criterion micro-benchmarks to ensure correctness and measure
  latency-sensitive code paths.

### `orderbook-server`
- Wraps the matching engine in a `parking_lot::Mutex` for multi-connection access.
- Exposes a non-blocking TCP server that understands textual `NEW`, `MODIFY`, `CANCEL`, `SNAPSHOT`,
  lookup commands, and new balance controls (`A` to credit, `B` to query) while streaming execution
  acknowledgements.
- Provides an `F` (feed) command that toggles a live broadcast of book updates, trades, and
  rejections so downstream consumers can maintain L3 state.
- Hosts a tonic-powered gRPC service (`proto/orderbook.proto`) that mirrors the command surface and
  returns structured fills, resting remainders, snapshots, and exposes explicit `CreditAccount`/
  `GetBalance` RPCs for pre-trade funding workflows.
- Adds a `StreamEvents` gRPC method that continuously delivers book, trade, and rejection events for
  higher-level consumers (including the bundled trading agents).
- Emits Prometheus metrics on `:9100/metrics` and structured logs via `tracing`, making it ready for
  production observability stacks.
- Shares serialization helpers between transports and tests every wire path, including partial frame
  parsing.

### Trading Agents

```
+-------------------+     +--------------------+     +----------------------------+
| market-maker-agent|     | twap-agent         |     | pension-passive-buyer      |
|-------------------|     |--------------------|     |----------------------------|
| * Quotes around   |     | * Splits a target  |     | * Posts post-only bids     |
|   a configurable  |     |   quantity across  |     |   below configurable caps  |
|   mid price       |     |   equal time slices|     | * Cancels when filled or   |
| * Cancels/refreshes|    | * Uses market or   |     |   reprices on spread shift |
|   stale orders    |     |   limit execution  |     | * Designed for long-horizon|
+-------------------+     +--------------------+     +----------------------------+
```

Each agent crate focuses on a specific execution style while delegating actual order placement to
`MatchingEngine`, making it easy to embed them in simulations or connect them to the live server.

## Running the Components

1. **Build everything**
   ```bash
   cd orderbook
   cargo build --workspace
   ```
2. **Run unit tests**
   ```bash
   cargo test --workspace
   ```
3. **Exercise benchmarks**
   ```bash
   cargo bench --no-run
   ```
4. **Start the TCP + gRPC server**
   ```bash
   cargo run -p orderbook-server -- 127.0.0.1:7000 127.0.0.1:50051
   ```
5. **Connect a strategy**
   ```rust
   use agent_support::GrpcOrderBookClient;
   use orderbook::{OrderType, Side};

   #[tokio::main]
   async fn main() -> Result<(), Box<dyn std::error::Error>> {
       let mut client = GrpcOrderBookClient::connect("http://127.0.0.1:50051").await?;
       client.credit_account(42, 0, 1_000_000).await?;
       let result = client
           .submit_order(42, 1, Side::Bid, OrderType::Limit, Some(100_000), 10)
           .await?;
       println!("fills: {}", result.fills.len());
       Ok(())
   }
   ```

## Running Everything with Docker Compose

To launch the server and the three trading agents as standalone services, build and run the
workspace containers with Docker Compose:

```bash
cd orderbook
docker compose up --build
```

This spins up four services:

```
- orderbook-server      # Exposes TCP :9000 and gRPC :50051
- market-maker          # Maintains two-sided quotes via the gRPC API
- twap-agent            # Continuously executes a TWAP schedule against the book
- passive-buyer         # Posts passive bids below the best ask
```

Adjust strategy behavior by editing environment variables in `docker-compose.yml` before launching.

### Account Funding & Balance Commands

Both transports enforce per-account balances via the `RiskEngine`. Fund an account before submitting
orders and inspect its state with the dedicated commands/RPCs:

| Interface | Credit | Balance |
|-----------|--------|---------|
| TCP       | `A <account_id> <base> <quote>` | `B <account_id>` |
| gRPC      | `CreditAccount` RPC             | `GetBalance` RPC |

Quote balances pay for bids/market buys, while base balances collateralize asks. Resting orders
reserve funds until they are filled, modified, or canceled. Insufficient funds yield gateway errors
(`ERR insufficient_quote`, `ERR insufficient_base`) without touching the matcher.

## Live Feeds & Observability

```text
Subscriber (TCP F) or gRPC StreamEvents
              |
              v
      +-------------------+
      | Event Broadcaster |
      +---------+---------+
                |
   +------------+------------+
   | Engine-generated events |
   |  - Book add/update/remove|
   |  - Trade executions      |
   |  - Order rejections      |
   +------------+------------+
                |
         Metrics & Tracing
                v
   Prometheus exporter (:9100/metrics)
```

- **TCP feed** – send `F` or `F ON` after connecting to the TCP server to receive `EVENT` lines for
  every book mutation, execution, or rejection. Use `F OFF` to stop streaming.
- **gRPC stream** – call `StreamEvents` to receive strongly-typed `EngineEvent` protobufs; the
  `agent-support` crate exposes `GrpcOrderBookClient::stream_events` for convenience.
- **Metrics** – scrape `http://localhost:9100/metrics` (or the container-exposed port) for
  Prometheus-formatted counters such as `matching.orders.submitted` and `matching.trades.executed`.
- **Tracing logs** – configure `RUST_LOG=debug` when launching the server to view structured
  telemetry, connection updates, and lag warnings.

## Snapshots and Market Data

- Call `OrderBook::snapshot()` (via agents or direct API) to collect a complete L3 view.
- Use the TCP `SNAPSHOT` command or gRPC `Snapshot` RPC to retrieve the same structure remotely.
- Agents can combine snapshots with their internal logic to rebalance risk or rebuild book state after
  reconnects.

## Extending the Workspace

- Implement additional strategies by depending on the `orderbook` crate or by connecting to the
  server over TCP/gRPC.
- Add new transports by reusing the `MatchingEngine` wrapper within `orderbook-server`.
- Benchmark new workflows by duplicating the patterns in `crates/orderbook/benches/order_book.rs`.

