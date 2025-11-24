# GET /private/get\_user\_trades\_by\_instrument

Retrieve the latest user trades that have occurred for a specific instrument.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |
| start_seq | false | integer | The sequence number of the first trade to be returned |  |
| end_seq | false | integer | The sequence number of the last trade to be returned |  |
| count | false | integer | Number of requested items, default - 10, maximum - 1000 |  |
| start_timestamp | false | integer | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest |  |
| end_timestamp | false | integer | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required |  |
| historical | false | boolean | Determines whether historical trade and order records should be retrieved.false (default): Returns recent records: orders for 30 min, trades for 24h.true: Fetches historical records, available after a short delay due to indexing. Recent data is not included.📖 Related Support Article: Accessing historical trades and orders using API |  |
| sorting | false | string | asc desc default | Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database) |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.has_more boolean result.trades array of object |
| result.trades[].trade_id | string | Unique (per currency) trade identifier |
| result.trades[].tick_direction | integer | Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick). |
| result.trades[].fee_currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| result.trades[].api | boolean | true if user order was created with API |
| result.trades[].advanced | string | Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable) |
| result.trades[].order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade |
| result.trades[].liquidity | string | Describes what was role of users order: "M" when it was maker order, "T" when it was taker order |
| result.trades[].post_only | string | true if user order is post-only |
| result.trades[].direction | string | Direction: buy, or sell |
| result.trades[].contracts | number | Trade size in contract units (optional, may be absent in historical trades) |
| result.trades[].mmp | boolean | true if user order is MMP |
| result.trades[].fee | number | User's fee in units of the specified fee_currency |
| result.trades[].quote_id | string | QuoteID of the user order (optional, present only for orders placed with private/mass_quote) |
| result.trades[].index_price | number | Index Price at the moment of trade |
| result.trades[].label | string | User defined label (presented only when previously set for order by user) |
| result.trades[].block_trade_id | string | Block trade id - when trade was part of a block trade |
| result.trades[].price | number | Price in base currency |
| result.trades[].combo_id | string | Optional field containing combo instrument name if the trade is a combo trade |
| result.trades[].matching_id | string | Always null |
| result.trades[].order_type | string | Order type: "limit, "market", or "liquidation" |
| result.trades[].trade_allocations | array of object | List of allocations for Block RFQ pre-allocation. Each allocation specifies user_id, amount, and fee for the allocated part of the trade. For broker client allocations, a client_info object will be included. |
| result.trades[].trade_allocations[].amount | number | Amount allocated to this user. |
| result.trades[].trade_allocations[].client_info | object | Optional client allocation info for brokers. |
| result.trades[].trade_allocations[].client_info.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| result.trades[].trade_allocations[].client_info.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| result.trades[].trade_allocations[].client_info.name | string | Name of the linked user within the client; available to broker. |
| result.trades[].trade_allocations[].fee | number | Fee for the allocated part of the trade. |
| result.trades[].trade_allocations[].user_id | integer | User ID to which part of the trade is allocated. For brokers the User ID is obstructed. |
| result.trades[].profit_loss | number | Profit and loss in base currency. |
| result.trades[].timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) |
| result.trades[].iv | number | Option implied volatility for the price (Option only) |
| result.trades[].state | string | Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived) |
| result.trades[].underlying_price | number | Underlying price for implied volatility calculations (Options only) |
| result.trades[].block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ |
| result.trades[].quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with private/mass_quote) |
| result.trades[].mark_price | number | Mark Price at the moment of trade |
| result.trades[].block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ |
| result.trades[].combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade |
| result.trades[].reduce_only | string | true if user order is reduce-only |
| result.trades[].amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.trades[].liquidation | string | Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation |
| result.trades[].trade_seq | integer | The sequence number of the trade within instrument |
| result.trades[].risk_reducing | boolean | true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) |
| result.trades[].instrument_name | string | Unique instrument identifier |
| result.trades[].legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events) |