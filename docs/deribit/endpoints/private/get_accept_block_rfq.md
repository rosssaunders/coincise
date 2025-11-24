# GET /private/accept\_block\_rfq

**Taker method**

This method allows Block RFQ taker to accept the response by sending a single crossing price. The order can be either filled immediately (`fill_or_kill`) or remain active until cancelled (`good_til_cancelled`). Please note that after Block RFQ creation, a grace period of 5 seconds begins, during which the taker cannot see quotes or trade the Block RFQ.

**Scope:** `block_rfq:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| block_rfq_id | true | integer | ID of the Block RFQ |  |
| price | true | number | Maximum acceptable price for execution |  |
| amount | true | number | This value multiplied by the ratio of a leg gives trade size on that leg. |  |
| direction | true | string | buy sell | Direction of the trade from the taker perspective |
| hedge | false | object | Hedge leg of the Block RFQ. There is only one hedge leg allowed per Block RFQ |  |
| hedge.instrument_name | true | string | Instrument name |  |
| hedge.direction | true | string | buy sell | Direction of selected leg. Must match the direction of the corresponding leg in the Block RFQ |
| hedge.price | true | number | Hedge leg price |  |
| hedge.amount | true | number | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |  |
| legs | true | array of objects | List of legs used to trade Block RFQ |  |
| legs[].instrument_name | true | string | Instrument name |  |
| legs[].direction | true | string | buy sell | Direction of selected leg. Must match the direction of the corresponding leg in the Block RFQ |
| legs[].ratio | true | integer | Ratio of amount between legs |  |
| time_in_force | true | string | fill_or_kill good_til_cancelled | Specifies how long the order should remain active |

### Response

| Name | Type | Description |
| --- | --- | --- |
| block_trades | array of object |  |
| block_trades[].app_name | string | The name of the application that executed the block trade on behalf of the user (optional). |
| block_trades[].broker_code | string | Broker code associated with the broker block trade. |
| block_trades[].broker_name | string | Name of the broker associated with the block trade. |
| block_trades[].id | string | Block trade id |
| block_trades[].timestamp | integer | The timestamp (milliseconds since the Unix epoch) block_trades[].trades array of object |
| block_trades[].trades[].trade_id | string | Unique (per currency) trade identifier |
| block_trades[].trades[].tick_direction | integer | Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick). |
| block_trades[].trades[].fee_currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| block_trades[].trades[].api | boolean | true if user order was created with API |
| block_trades[].trades[].advanced | string | Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable) |
| block_trades[].trades[].order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade |
| block_trades[].trades[].liquidity | string | Describes what was role of users order: "M" when it was maker order, "T" when it was taker order |
| block_trades[].trades[].post_only | string | true if user order is post-only |
| block_trades[].trades[].direction | string | Direction: buy, or sell |
| block_trades[].trades[].contracts | number | Trade size in contract units (optional, may be absent in historical trades) |
| block_trades[].trades[].mmp | boolean | true if user order is MMP |
| block_trades[].trades[].fee | number | User's fee in units of the specified fee_currency |
| block_trades[].trades[].quote_id | string | QuoteID of the user order (optional, present only for orders placed with private/mass_quote) |
| block_trades[].trades[].index_price | number | Index Price at the moment of trade |
| block_trades[].trades[].label | string | User defined label (presented only when previously set for order by user) |
| block_trades[].trades[].block_trade_id | string | Block trade id - when trade was part of a block trade |
| block_trades[].trades[].price | number | Price in base currency |
| block_trades[].trades[].combo_id | string | Optional field containing combo instrument name if the trade is a combo trade |
| block_trades[].trades[].matching_id | string | Always null |
| block_trades[].trades[].order_type | string | Order type: "limit, "market", or "liquidation" |
| block_trades[].trades[].trade_allocations | array of object | List of allocations for Block RFQ pre-allocation. Each allocation specifies user_id, amount, and fee for the allocated part of the trade. For broker client allocations, a client_info object will be included. |
| block_trades[].trades[].trade_allocations[].amount | number | Amount allocated to this user. |
| block_trades[].trades[].trade_allocations[].client_info | object | Optional client allocation info for brokers. |
| block_trades[].trades[].trade_allocations[].client_info.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| block_trades[].trades[].trade_allocations[].client_info.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| block_trades[].trades[].trade_allocations[].client_info.name | string | Name of the linked user within the client; available to broker. |
| block_trades[].trades[].trade_allocations[].fee | number | Fee for the allocated part of the trade. |
| block_trades[].trades[].trade_allocations[].user_id | integer | User ID to which part of the trade is allocated. For brokers the User ID is obstructed. |
| block_trades[].trades[].profit_loss | number | Profit and loss in base currency. |
| block_trades[].trades[].timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) |
| block_trades[].trades[].iv | number | Option implied volatility for the price (Option only) |
| block_trades[].trades[].state | string | Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived) |
| block_trades[].trades[].underlying_price | number | Underlying price for implied volatility calculations (Options only) |
| block_trades[].trades[].block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ |
| block_trades[].trades[].quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with private/mass_quote) |
| block_trades[].trades[].mark_price | number | Mark Price at the moment of trade |
| block_trades[].trades[].block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ |
| block_trades[].trades[].combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade |
| block_trades[].trades[].reduce_only | string | true if user order is reduce-only |
| block_trades[].trades[].amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| block_trades[].trades[].liquidation | string | Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation |
| block_trades[].trades[].trade_seq | integer | The sequence number of the trade within instrument |
| block_trades[].trades[].risk_reducing | boolean | true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) |
| block_trades[].trades[].instrument_name | string | Unique instrument identifier |
| block_trades[].trades[].legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events) trade_trigger object trade_trigger.direction string trade_trigger.price number trade_trigger.state string |