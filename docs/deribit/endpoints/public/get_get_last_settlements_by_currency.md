## /public/get_last_settlements_by_currency

Retrieves historical settlement, delivery and bankruptcy events coming from all
instruments within a given currency.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | type | false | string | `settlement`  
`delivery`  
`bankruptcy` | Settlement type | | count | false | integer | | Number of
requested items, default - `20`, maximum - `1000` | | continuation | false |
string | | Continuation token for pagination | | search_start_timestamp | false
| integer | | The latest timestamp to return result from (milliseconds since the
UNIX epoch) |

### Response

| Name                          | Type              | Description                                                                               |
| ----------------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| id                            | integer           | The id that was sent in the request                                                       |
| jsonrpc                       | string            | The JSON-RPC version (2.0)                                                                |
| result                        | _object_          |                                                                                           |
|   ›  continuation             | string            | Continuation token for pagination.                                                        |
|   ›  settlements              | array of _object_ |                                                                                           |
|   ›    ›  funded              | number            | funded amount (bankruptcy only)                                                           |
|   ›    ›  funding             | number            | funding (in base currency ; settlement for perpetual product only)                        |
|   ›    ›  index_price         | number            | underlying index price at time of event (in quote currency; settlement and delivery only) |
|   ›    ›  instrument_name     | string            | instrument name (settlement and delivery only)                                            |
|   ›    ›  mark_price          | number            | mark price for at the settlement time (in quote currency; settlement and delivery only)   |
|   ›    ›  position            | number            | position size (in quote currency; settlement and delivery only)                           |
|   ›    ›  profit_loss         | number            | profit and loss (in base currency; settlement and delivery only)                          |
|   ›    ›  session_bankruptcy  | number            | value of session bankruptcy (in base currency; bankruptcy only)                           |
|   ›    ›  session_profit_loss | number            | total value of session profit and losses (in base currency)                               |
|   ›    ›  session_tax         | number            | total amount of paid taxes/fees (in base currency; bankruptcy only)                       |
|   ›    ›  session_tax_rate    | number            | rate of paid taxes/fees (in base currency; bankruptcy only)                               |
|   ›    ›  socialized          | number            | the amount of the socialized losses (in base currency; bankruptcy only)                   |
|   ›    ›  timestamp           | integer           | The timestamp (milliseconds since the Unix epoch)                                         |
|   ›    ›  type                | string            | The type of settlement. `settlement`, `delivery` or `bankruptcy`.                         |
