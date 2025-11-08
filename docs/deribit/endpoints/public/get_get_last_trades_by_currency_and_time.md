## /public/get_last_trades_by_currency_and_time

Retrieve the latest trades that have occurred for instruments in a specific
currency symbol and within a given time range.

**Scope:** `trade:read`

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | kind | false | string | `future`  
`option`  
`spot`  
`future_combo`  
`option_combo`  
`combo`  
`any` | Instrument kind, `"combo"` for any combo or `"any"` for all. If not
provided instruments of all kinds are considered | | start_timestamp | true |
integer | | The earliest timestamp to return result from (milliseconds since the
UNIX epoch). When param is provided trades are returned from the earliest | |
end_timestamp | true | integer | | The most recent timestamp to return result
from (milliseconds since the UNIX epoch). Only one of params: start_timestamp,
end_timestamp is truly required | | count | false | integer | | Number of
requested items, default - `10`, maximum - `1000` | | sorting | false | string |
`asc`  
`desc`  
`default` | Direction of results sorting (`default` value means no sorting,
results will be returned in order in which they left the database) |

### Response

| Name                            | Type              | Description                                                                                                                                                                                                       |
| ------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                              | integer           | The id that was sent in the request                                                                                                                                                                               |
| jsonrpc                         | string            | The JSON-RPC version (2.0)                                                                                                                                                                                        |
| result                          | _object_          |                                                                                                                                                                                                                   |
|   ›  has_more                   | boolean           |                                                                                                                                                                                                                   |
|   ›  trades                     | array of _object_ |                                                                                                                                                                                                                   |
|   ›    ›  amount                | number            | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                           |
|   ›    ›  block_rfq_id          | integer           | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                                                        |
|   ›    ›  block_trade_id        | string            | Block trade id - when trade was part of a block trade                                                                                                                                                             |
|   ›    ›  block_trade_leg_count | integer           | Block trade leg count - when trade was part of a block trade                                                                                                                                                      |
|   ›    ›  combo_id              | string            | Optional field containing combo instrument name if the trade is a combo trade                                                                                                                                     |
|   ›    ›  combo_trade_id        | number            | Optional field containing combo trade identifier if the trade is a combo trade                                                                                                                                    |
|   ›    ›  contracts             | number            | Trade size in contract units (optional, may be absent in historical trades)                                                                                                                                       |
|   ›    ›  direction             | string            | Direction: `buy`, or `sell`                                                                                                                                                                                       |
|   ›    ›  index_price           | number            | Index Price at the moment of trade                                                                                                                                                                                |
|   ›    ›  instrument_name       | string            | Unique instrument identifier                                                                                                                                                                                      |
|   ›    ›  iv                    | number            | Option implied volatility for the price (Option only)                                                                                                                                                             |
|   ›    ›  liquidation           | string            | Optional field (only for trades caused by liquidation): `"M"` when maker side of trade was under liquidation, `"T"` when taker side was under liquidation, `"MT"` when both sides of trade were under liquidation |
|   ›    ›  mark_price            | number            | Mark Price at the moment of trade                                                                                                                                                                                 |
|   ›    ›  price                 | number            | Price in base currency                                                                                                                                                                                            |
|   ›    ›  tick_direction        | integer           | Direction of the "tick" (`0` = Plus Tick, `1` = Zero-Plus Tick, `2` = Minus Tick, `3` = Zero-Minus Tick).                                                                                                         |
|   ›    ›  timestamp             | integer           | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                    |
|   ›    ›  trade_id              | string            | Unique (per currency) trade identifier                                                                                                                                                                            |
|   ›    ›  trade_seq             | integer           | The sequence number of the trade within instrument                                                                                                                                                                |
