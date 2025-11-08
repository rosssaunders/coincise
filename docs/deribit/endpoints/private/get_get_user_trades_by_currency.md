## /private/get_user_trades_by_currency

Retrieve the latest user trades that have occurred for instruments in a specific
currency symbol. To read subaccount trades, use `subaccount_id` parameter.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

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
provided instruments of all kinds are considered | | start_id | false | string |
| The ID of the first trade to be returned. Number for BTC trades, or hyphen
name in ex. `"ETH-15"` # `"ETH_USDC-16"` | | end_id | false | string | | The ID
of the last trade to be returned. Number for BTC trades, or hyphen name in ex.
`"ETH-15"` # `"ETH_USDC-16"` | | count | false | integer | | Number of requested
items, default - `10`, maximum - `1000` | | start_timestamp | false | integer |
| The earliest timestamp to return result from (milliseconds since the UNIX
epoch). When param is provided trades are returned from the earliest | |
end_timestamp | false | integer | | The most recent timestamp to return result
from (milliseconds since the UNIX epoch). Only one of params: start_timestamp,
end_timestamp is truly required | | sorting | false | string | `asc`  
`desc`  
`default` | Direction of results sorting (`default` value means no sorting,
results will be returned in order in which they left the database) | |
historical | false | boolean | | Determines whether historical trade and order
records should be retrieved.

- `false` (default): Returns recent records: orders for 30 min, trades for 24h.
- `true`: Fetches historical records, available after a short delay due to
  indexing. Recent data is not included.

**📖 Related Support Article:**
[Accessing historical trades and orders using API](https://support.deribit.com/hc/en-us/articles/25973087226909-Accessing-historical-trades-and-orders-using-API)
| | subaccount_id | false | integer | | The user id for the subaccount |

### Response

| Name                               | Type              | Description                                                                                                                                                                                                             |
| ---------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                 | integer           | The id that was sent in the request                                                                                                                                                                                     |
| jsonrpc                            | string            | The JSON-RPC version (2.0)                                                                                                                                                                                              |
| result                             | _object_          |                                                                                                                                                                                                                         |
|   ›  has_more                      | boolean           |                                                                                                                                                                                                                         |
|   ›  trades                        | array of _object_ |                                                                                                                                                                                                                         |
|   ›    ›  trade_id                 | string            | Unique (per currency) trade identifier                                                                                                                                                                                  |
|   ›    ›  tick_direction           | integer           | Direction of the "tick" (`0` = Plus Tick, `1` = Zero-Plus Tick, `2` = Minus Tick, `3` = Zero-Minus Tick).                                                                                                               |
|   ›    ›  fee_currency             | string            | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"`                                                                                                                                                                                |
|   ›    ›  api                      | boolean           | `true` if user order was created with API                                                                                                                                                                               |
|   ›    ›  advanced                 | string            | Advanced type of user order: `"usd"` or `"implv"` (only for options; omitted if not applicable)                                                                                                                         |
|   ›    ›  order_id                 | string            | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade                                                                                                                           |
|   ›    ›  liquidity                | string            | Describes what was role of users order: `"M"` when it was maker order, `"T"` when it was taker order                                                                                                                    |
|   ›    ›  post_only                | string            | `true` if user order is post-only                                                                                                                                                                                       |
|   ›    ›  direction                | string            | Direction: `buy`, or `sell`                                                                                                                                                                                             |
|   ›    ›  contracts                | number            | Trade size in contract units (optional, may be absent in historical trades)                                                                                                                                             |
|   ›    ›  mmp                      | boolean           | `true` if user order is MMP                                                                                                                                                                                             |
|   ›    ›  fee                      | number            | User's fee in units of the specified `fee_currency`                                                                                                                                                                     |
|   ›    ›  quote_id                 | string            | QuoteID of the user order (optional, present only for orders placed with `private/mass_quote`)                                                                                                                          |
|   ›    ›  index_price              | number            | Index Price at the moment of trade                                                                                                                                                                                      |
|   ›    ›  label                    | string            | User defined label (presented only when previously set for order by user)                                                                                                                                               |
|   ›    ›  block_trade_id           | string            | Block trade id - when trade was part of a block trade                                                                                                                                                                   |
|   ›    ›  price                    | number            | Price in base currency                                                                                                                                                                                                  |
|   ›    ›  combo_id                 | string            | Optional field containing combo instrument name if the trade is a combo trade                                                                                                                                           |
|   ›    ›  matching_id              | string            | Always `null`                                                                                                                                                                                                           |
|   ›    ›  order_type               | string            | Order type: `"limit`, `"market"`, or `"liquidation"`                                                                                                                                                                    |
|   ›    ›  trade_allocations        | array of _object_ | List of allocations for Block RFQ pre-allocation. Each allocation specifies `user_id`, `amount`, and `fee` for the allocated part of the trade. For broker client allocations, a `client_info` object will be included. |
|   ›    ›    ›  amount              | number            | Amount allocated to this user.                                                                                                                                                                                          |
|   ›    ›    ›  client_info         | _object_          | Optional client allocation info for brokers.                                                                                                                                                                            |
|   ›    ›    ›    ›  client_id      | integer           | ID of a client; available to broker. Represents a group of users under a common name.                                                                                                                                   |
|   ›    ›    ›    ›  client_link_id | integer           | ID assigned to a single user in a client; available to broker.                                                                                                                                                          |
|   ›    ›    ›    ›  name           | string            | Name of the linked user within the client; available to broker.                                                                                                                                                         |
|   ›    ›    ›  fee                 | number            | Fee for the allocated part of the trade.                                                                                                                                                                                |
|   ›    ›    ›  user_id             | integer           | User ID to which part of the trade is allocated. For brokers the User ID is obstructed.                                                                                                                                 |
|   ›    ›  profit_loss              | number            | Profit and loss in base currency.                                                                                                                                                                                       |
|   ›    ›  timestamp                | integer           | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                          |
|   ›    ›  iv                       | number            | Option implied volatility for the price (Option only)                                                                                                                                                                   |
|   ›    ›  state                    | string            | Order state: `"open"`, `"filled"`, `"rejected"`, `"cancelled"`, `"untriggered"` or `"archive"` (if order was archived)                                                                                                  |
|   ›    ›  underlying_price         | number            | Underlying price for implied volatility calculations (Options only)                                                                                                                                                     |
|   ›    ›  block_rfq_quote_id       | integer           | ID of the Block RFQ quote - when trade was part of the Block RFQ                                                                                                                                                        |
|   ›    ›  quote_set_id             | string            | QuoteSet of the user order (optional, present only for orders placed with `private/mass_quote`)                                                                                                                         |
|   ›    ›  mark_price               | number            | Mark Price at the moment of trade                                                                                                                                                                                       |
|   ›    ›  block_rfq_id             | integer           | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                                                              |
|   ›    ›  combo_trade_id           | number            | Optional field containing combo trade identifier if the trade is a combo trade                                                                                                                                          |
|   ›    ›  reduce_only              | string            | `true` if user order is reduce-only                                                                                                                                                                                     |
|   ›    ›  amount                   | number            | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                 |
|   ›    ›  liquidation              | string            | Optional field (only for trades caused by liquidation): `"M"` when maker side of trade was under liquidation, `"T"` when taker side was under liquidation, `"MT"` when both sides of trade were under liquidation       |
|   ›    ›  trade_seq                | integer           | The sequence number of the trade within instrument                                                                                                                                                                      |
|   ›    ›  risk_reducing            | boolean           | `true` if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)                                                                                                   |
|   ›    ›  instrument_name          | string            | Unique instrument identifier                                                                                                                                                                                            |
|   ›    ›  legs                     | array             | Optional field containing leg trades if trade is a combo trade (present when querying for **only** combo trades and in `combo_trades` events)                                                                           |
