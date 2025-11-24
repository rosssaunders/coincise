# GET /public/get\_last\_trades\_by\_instrument

Retrieve the latest trades that have occurred for a specific instrument.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |
| start_seq | false | integer | The sequence number of the first trade to be returned |  |
| end_seq | false | integer | The sequence number of the last trade to be returned |  |
| start_timestamp | false | integer | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest |  |
| end_timestamp | false | integer | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required |  |
| count | false | integer | Number of requested items, default - 10, maximum - 1000 |  |
| sorting | false | string | asc desc default | Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database) |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.has_more boolean result.trades array of object |
| result.trades[].amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.trades[].block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ |
| result.trades[].block_trade_id | string | Block trade id - when trade was part of a block trade |
| result.trades[].block_trade_leg_count | integer | Block trade leg count - when trade was part of a block trade |
| result.trades[].combo_id | string | Optional field containing combo instrument name if the trade is a combo trade |
| result.trades[].combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade |
| result.trades[].contracts | number | Trade size in contract units (optional, may be absent in historical trades) |
| result.trades[].direction | string | Direction: buy, or sell |
| result.trades[].index_price | number | Index Price at the moment of trade |
| result.trades[].instrument_name | string | Unique instrument identifier |
| result.trades[].iv | number | Option implied volatility for the price (Option only) |
| result.trades[].liquidation | string | Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation |
| result.trades[].mark_price | number | Mark Price at the moment of trade |
| result.trades[].price | number | Price in base currency |
| result.trades[].tick_direction | integer | Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick). |
| result.trades[].timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) |
| result.trades[].trade_id | string | Unique (per currency) trade identifier |
| result.trades[].trade_seq | integer | The sequence number of the trade within instrument |