## /public/get_block_rfq_trades

This method returns a list of recent Block RFQs trades. Can be optionally
filtered by currency.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR`  
`any` | The currency symbol or `"any"` for all | | continuation | false | string
| | Continuation token for pagination. Consists of `timestamp` and
`block_rfq_id`. | | count | false | integer | | Count of Block RFQs returned,
maximum - `1000` |

### Response

| Name                           | Type              | Description                                                                                                                                                                                                       |
| ------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                             | integer           | The id that was sent in the request                                                                                                                                                                               |
| jsonrpc                        | string            | The JSON-RPC version (2.0)                                                                                                                                                                                        |
| result                         | _object_          |                                                                                                                                                                                                                   |
|   ›  block_rfqs                | array of _object_ |                                                                                                                                                                                                                   |
|   ›    ›  amount               | number            | This value multiplied by the ratio of a leg gives trade size on that leg.                                                                                                                                         |
|   ›    ›  combo_id             | string            | Unique combo identifier                                                                                                                                                                                           |
|   ›    ›  direction            | string            | Direction: `buy`, or `sell`                                                                                                                                                                                       |
|   ›    ›  hedge                | _object_          |                                                                                                                                                                                                                   |
|   ›    ›    ›  amount          | integer           | It represents the requested hedge leg size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                             |
|   ›    ›    ›  direction       | string            | Direction: `buy`, or `sell`                                                                                                                                                                                       |
|   ›    ›    ›  instrument_name | string            | Unique instrument identifier                                                                                                                                                                                      |
|   ›    ›    ›  price           | number            | Price for a hedge leg                                                                                                                                                                                             |
|   ›    ›  id                   | integer           | ID of the Block RFQ                                                                                                                                                                                               |
|   ›    ›  index_prices         | object            | A map of index prices for the underlying instrument(s) at the time of trade execution, where keys are price index names and values are prices.                                                                    |
|   ›    ›  legs                 | array of _object_ |                                                                                                                                                                                                                   |
|   ›    ›    ›  direction       | string            | Direction: `buy`, or `sell`                                                                                                                                                                                       |
|   ›    ›    ›  instrument_name | string            | Unique instrument identifier                                                                                                                                                                                      |
|   ›    ›    ›  price           | number            | Price for a leg                                                                                                                                                                                                   |
|   ›    ›    ›  ratio           | integer           | Ratio of amount between legs                                                                                                                                                                                      |
|   ›    ›  mark_price           | number            | Mark Price at the moment of trade                                                                                                                                                                                 |
|   ›    ›  timestamp            | integer           | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                    |
|   ›    ›  trades               | array of _object_ |                                                                                                                                                                                                                   |
|   ›    ›    ›  amount          | number            | Trade amount. For options, linear futures, linear perpetuals and spots the amount is denominated in the underlying base currency coin. The inverse perpetuals and inverse futures are denominated in USD units.   |
|   ›    ›    ›  direction       | string            | Direction: `buy`, or `sell`                                                                                                                                                                                       |
|   ›    ›    ›  hedge_amount    | number            | Amount of the hedge leg. For linear futures, linear perpetuals and spots the amount is denominated in the underlying base currency coin. The inverse perpetuals and inverse futures are denominated in USD units. |
|   ›    ›    ›  price           | number            | Price in base currency                                                                                                                                                                                            |
|   ›  continuation              | string            | Continuation token for pagination. `NULL` when no continuation. Consists of `timestamp` and `block_rfq_id`.                                                                                                       |
