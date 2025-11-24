# GET /public/get\_block\_rfq\_trades

This method returns a list of recent Block RFQs trades. Can be optionally filtered by currency.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR any | The currency symbol or "any" for all |
| continuation | false | string | Continuation token for pagination. Consists of timestamp and block_rfq_id. |  |
| count | false | integer | Count of Block RFQs returned, maximum - 1000 |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.block_rfqs array of object |
| result.block_rfqs[].amount | number | This value multiplied by the ratio of a leg gives trade size on that leg. |
| result.block_rfqs[].combo_id | string | Unique combo identifier |
| result.block_rfqs[].direction | string | Direction: buy, or sell result.block_rfqs[].hedge object |
| result.block_rfqs[].hedge.amount | integer | It represents the requested hedge leg size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.block_rfqs[].hedge.direction | string | Direction: buy, or sell |
| result.block_rfqs[].hedge.instrument_name | string | Unique instrument identifier |
| result.block_rfqs[].hedge.price | number | Price for a hedge leg |
| result.block_rfqs[].id | integer | ID of the Block RFQ |
| result.block_rfqs[].index_prices | object | A map of index prices for the underlying instrument(s) at the time of trade execution, where keys are price index names and values are prices. result.block_rfqs[].legs array of object |
| result.block_rfqs[].legs[].direction | string | Direction: buy, or sell |
| result.block_rfqs[].legs[].instrument_name | string | Unique instrument identifier |
| result.block_rfqs[].legs[].price | number | Price for a leg |
| result.block_rfqs[].legs[].ratio | integer | Ratio of amount between legs |
| result.block_rfqs[].mark_price | number | Mark Price at the moment of trade |
| result.block_rfqs[].timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) result.block_rfqs[].trades array of object |
| result.block_rfqs[].trades[].amount | number | Trade amount. For options, linear futures, linear perpetuals and spots the amount is denominated in the underlying base currency coin. The inverse perpetuals and inverse futures are denominated in USD units. |
| result.block_rfqs[].trades[].direction | string | Direction: buy, or sell |
| result.block_rfqs[].trades[].hedge_amount | number | Amount of the hedge leg. For linear futures, linear perpetuals and spots the amount is denominated in the underlying base currency coin. The inverse perpetuals and inverse futures are denominated in USD units. |
| result.block_rfqs[].trades[].price | number | Price in base currency |
| result.continuation | string | Continuation token for pagination. NULL when no continuation. Consists of timestamp and block_rfq_id. |