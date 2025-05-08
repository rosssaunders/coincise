## [#](#changelog) Changelog

2025-04-25

- Futures Account Trade has added a new `futures.order_cancel_ids` channel.
- `futures.order_book` and `futures.order_book_update` have added a new depth
  level field `l`.

2025-04-18

- Add additional code examples to the documentation.

2025-03-24

- Fixed the incorrect descriptions in some documents of the order_book channel.
- Fixed the incorrect descriptions in some documents of the orders channel.

2025-03-21

- The documentation for channel `futures.orders` has been updated, with new
  explanations added for fields such as `update_id`, `update_time`, `biz_info`,
  `stop_profit_price`, `stop_loss_price`.

2025-03-12

- Add new field `contract` in channel `contract_stats`
- Updated the Futures Account Trade module and added the `x-gate-exptime` field
- Fixed some descriptive errors in the Futures Account Trade documentation

2025-02-19

- Added channel `futures.public_liquidates` to push liquidate orders snapshot

2025-02-10

- Updated the Futures Account Trade module and added `x_in_time`, `x_out_time`,
  `conn_trace_id`, `trace_id` fields
- `futures.order_place`, `futures.order_batch_place`, `futures.order_cancel`,
  `futures.order_cancel_cp` and `futures.order_amend` added
  `x_gate_ratelimit_requests_remain`, `x_gate_ratelimit_limit` and
  `x_gat_ratelimit_reset_timestamp` fields

2024-11-18

- remove `10` level and `1000ms` interval in channel `futures.order_book_update`

2023-09-21

- Add new field `is_internal` in channel `futures.trades`

2023-08-18

- Add WebSocket API
- WebSocket API allows placing, canceling, amending, querying orders through a
  WebSocket connection.

2023-07-07

- Add new interval `20ms` in channel `futures.order_book_update`, please note
  that the interval of `20ms` is only supported for `20` levels.

2023-06-20

- Add `update_id` of `futures.positions`

2022-12-22

- Add new field `auto_size` in `futures.autoorders` initial struct, field detail
  to http api

2022-11-22

- Add new field `time_ms` in common msg response for time of message created

2022-08-11

- Add new field `text` in user trades notification
- Add new fields `low_24h` and `high_24h` in tickers notification

2022-04-15

- Add new field `currency` in balance notification

2021-03-31

- Add milliseconds field `t` in `futures.book_ticker` and `futures.order_book`
  response

2021-03-10

- Add new order book channel `futures.book_ticker` to push best ask/bid in
  realtime
- Add new order book channel `futures.order_book_update` to push order book
  change with user specified update frequency
- Add local order book maintenance documentation

2021-03-01

- Add new millisecond-precision timestamp ended with `_ms` in server
  notification.
- Add new field `id` in order book `all` notification.

2020-8-08

- Add a complete code demo(golang, python)

2020-8-07

- Add auto orders subscription

2020-7-07

- Add order book annotation

2020-4-30

- Add positions subscription

2019-11-06

- Add USDT futures contract
- Add volume_24h_base field, volume_24h_settle field, volume_24h_quote field for
  tickers
- Remove old server urls(`wss://fx-ws.gateio.ws/v4/ws` or
  `wss://fx-ws-testnet.gateio.ws/v4/ws`)

TIP

If you use old server urls(`wss://fx-ws.gateio.ws/v4/ws` or
`wss://fx-ws-testnet.gateio.ws/v4/ws`), we will use BTC contract for you.

2019-10-22

- Add application layer ping/pong message

2019-04-30

- Add index and mark candlestick subscription
- Add funding_rate_indicative field for tickers
- Add is_reduce_only and status field for orders

2019-02-13

- Change WebSocket base url
- Add volume_24h_usd field and volume_24h_btc field for tickers

2019-01-11

- Add position_closes and balances subscription
- Del finish_time field for auto_deleverages and liquidates
- Add time field for auto_deleverages and liquidates
