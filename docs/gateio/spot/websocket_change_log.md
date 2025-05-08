### [#](#changelog) Changelog

2025-04-18

- Add additional code examples to the documentation.

2025-04-10

- Added description for the `filled_amount` field in both `spot.orders` and
  `spot.orders_v2` documents.

2025-03-26

- Fix the documentation for the `auto_repay` and `auto_borrow` fields of
  `spot.order_place`.

2025-02-10

- Updated the Spot Account Trade module and added `x_in_time`, `x_out_time`,
  `conn_trace_id`, `trace_id` fields
- Updated the Spot Account Trade module and added the `spot.order_list` channel
- `spot.order_place` and `spot.order_amend` added
  `x_gate_ratelimit_requests_remain`, `x_gate_ratelimit_limit` and
  `x_gat_ratelimit_reset_timestamp` fields

2025-01-08

- The `spot.usertrades` channel now includes the `id_market` field, which is
  unique inside the trading market (token).
- The `spot.trades` channel now includes the `id_market` field, which is unique
  inside the trading market (token).
- A new `spot.trades_v2` channel has been added.
- A new `spot.usertrades_v2` channel has been added.
- A new `spot.orders_v2` channel has been added.

2024-11-28

- Remove `1000ms` update interval in `spot.order_book_update` server
  notification

2024-01-17

- Add `w` window closed mark in candlestick update response

2023-04-21

- Add `freeze`,`freeze_change`,`change_type` fields in `spot.cross_balances`
  server notification

2022-12-12

- Add `avg_deal_price` fields in `spot.orders` server notification

2022-12-07

- Add `freeze`,`freeze_change`,`change_type` fields in `spot.balances` server
  notification

2022-11-22

- Add send millisecond timestamp `time_ms` in all channel response

2022-07-05

- Add `spot.cross_loan` channel to notify user cross margin borrowed and
  Interest updates

2021-07-23

- Add `spot.cross_balances` channel to notify cross margin balance updates
- Add `text` field in `spot.usertrades` server notification

2021-04-27

- Add milliseconds in `spot.orders`, `spot.balances`, `spot.margin_balances` and
  `spot.funding_balances` server notifications

2021-03-17

- Add documents explaining how to maintain local order book
- Add millisecond timestamp `t` in all order book channels' `result`

2021-01-26

- Initial version
