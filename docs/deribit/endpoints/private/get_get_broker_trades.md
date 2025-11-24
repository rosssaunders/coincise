# GET /private/get\_broker\_trades

**Broker Method** Returns list of broker block trades. If currency is not provided, returns broker block trades for all currencies.

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | false | string | BTC ETH USDC USDT EURR | The currency symbol |
| count | false | integer | Number of requested items, default - 20, maximum - 1000 |  |
| start_id | false | string | Response will contain block trades older than the one provided in this field |  |
| end_id | false | string | The id of the oldest block trade to be returned, start_id is required with end_id |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.history array of object |
| result.history[].id | string | Unique identifier of the block trade history entry. result.history[].maker object |
| result.history[].maker.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| result.history[].maker.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| result.history[].maker.client_link_name | string | Name of the linked user within the client; available to broker. |
| result.history[].maker.client_name | string | Name of the client; available to broker. |
| result.history[].maker.user_id | integer | Obscured user id of the maker. result.history[].taker object |
| result.history[].taker.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| result.history[].taker.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| result.history[].taker.client_link_name | string | Name of the linked user within the client; available to broker. |
| result.history[].taker.client_name | string | Name of the client; available to broker. |
| result.history[].taker.user_id | integer | Obscured user id of the taker. |
| result.history[].timestamp | integer | Timestamp of the block trade history entry (milliseconds since the UNIX epoch). result.history[].trades array of object |
| result.history[].trades[].app_name | string | The name of the application that executed the block trade on behalf of the user (optional). |
| result.history[].trades[].broker_code | string | Broker code associated with the broker block trade. |
| result.history[].trades[].broker_name | string | Name of the broker associated with the block trade. |
| result.history[].trades[].id | string | Block trade id |
| result.history[].trades[].timestamp | integer | The timestamp (milliseconds since the Unix epoch) result.history[].trades[].trades array of object |
| result.history[].trades[].trades[].trade_id | string | Unique (per currency) trade identifier |
| result.history[].trades[].trades[].tick_direction | integer | Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick). |
| result.history[].trades[].trades[].fee_currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| result.history[].trades[].trades[].api | boolean | true if user order was created with API |
| result.history[].trades[].trades[].advanced | string | Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable) |
| result.history[].trades[].trades[].order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade |
| result.history[].trades[].trades[].liquidity | string | Describes what was role of users order: "M" when it was maker order, "T" when it was taker order |
| result.history[].trades[].trades[].post_only | string | true if user order is post-only |
| result.history[].trades[].trades[].direction | string | Direction: buy, or sell |
| result.history[].trades[].trades[].contracts | number | Trade size in contract units (optional, may be absent in historical trades) |
| result.history[].trades[].trades[].mmp | boolean | true if user order is MMP |
| result.history[].trades[].trades[].fee | number | User's fee in units of the specified fee_currency |
| result.history[].trades[].trades[].quote_id | string | QuoteID of the user order (optional, present only for orders placed with private/mass_quote) |
| result.history[].trades[].trades[].index_price | number | Index Price at the moment of trade |
| result.history[].trades[].trades[].label | string | User defined label (presented only when previously set for order by user) |
| result.history[].trades[].trades[].block_trade_id | string | Block trade id - when trade was part of a block trade |
| result.history[].trades[].trades[].price | number | Price in base currency |
| result.history[].trades[].trades[].combo_id | string | Optional field containing combo instrument name if the trade is a combo trade |
| result.history[].trades[].trades[].matching_id | string | Always null |
| result.history[].trades[].trades[].order_type | string | Order type: "limit, "market", or "liquidation" |
| result.history[].trades[].trades[].trade_allocations | array of object | List of allocations for Block RFQ pre-allocation. Each allocation specifies user_id, amount, and fee for the allocated part of the trade. For broker client allocations, a client_info object will be included. |
| result.history[].trades[].trades[].trade_allocations[].amount | number | Amount allocated to this user. |
| result.history[].trades[].trades[].trade_allocations[].client_info | object | Optional client allocation info for brokers. |
| result.history[].trades[].trades[].trade_allocations[].client_info.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| result.history[].trades[].trades[].trade_allocations[].client_info.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| result.history[].trades[].trades[].trade_allocations[].client_info.name | string | Name of the linked user within the client; available to broker. |
| result.history[].trades[].trades[].trade_allocations[].fee | number | Fee for the allocated part of the trade. |
| result.history[].trades[].trades[].trade_allocations[].user_id | integer | User ID to which part of the trade is allocated. For brokers the User ID is obstructed. |
| result.history[].trades[].trades[].profit_loss | number | Profit and loss in base currency. |
| result.history[].trades[].trades[].timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) |
| result.history[].trades[].trades[].iv | number | Option implied volatility for the price (Option only) |
| result.history[].trades[].trades[].state | string | Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived) |
| result.history[].trades[].trades[].underlying_price | number | Underlying price for implied volatility calculations (Options only) |
| result.history[].trades[].trades[].block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ |
| result.history[].trades[].trades[].quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with private/mass_quote) |
| result.history[].trades[].trades[].mark_price | number | Mark Price at the moment of trade |
| result.history[].trades[].trades[].block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ |
| result.history[].trades[].trades[].combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade |
| result.history[].trades[].trades[].reduce_only | string | true if user order is reduce-only |
| result.history[].trades[].trades[].amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.history[].trades[].trades[].liquidation | string | Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation |
| result.history[].trades[].trades[].trade_seq | integer | The sequence number of the trade within instrument |
| result.history[].trades[].trades[].risk_reducing | boolean | true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) |
| result.history[].trades[].trades[].instrument_name | string | Unique instrument identifier |
| result.history[].trades[].trades[].legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events) |
| result.next_start_id | integer | The next start ID for pagination. |