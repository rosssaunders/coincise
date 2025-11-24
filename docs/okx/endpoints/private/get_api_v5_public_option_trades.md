# GET /api/v5/public/option-trades

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-option-trades](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-option-trades)

### GET / Option trades

The maximum is 100.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/option-trades`

#### Request Parameters

| Parameter  | Type   | Required    | Description                                                                                                                        |
| ---------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| instId     | String | Conditional | Instrument ID, e.g. BTC-USD-221230-4000-C, Either `instId` or `instFamily` is required. If both are passed, `instId` will be used. |
| instFamily | String | Conditional | Instrument family, e.g. BTC-USD                                                                                                    |
| optType    | String | No          | Option type, `C`: Call `P`: put                                                                                                    |

#### Response Parameters

| **Parameter** | **Type** | **Description**                       |
| ------------- | -------- | ------------------------------------- |
| instId        | String   | Instrument ID                         |
| instFamily    | String   | Instrument family                     |
| tradeId       | String   | Trade ID                              |
| px            | String   | Trade price                           |
| \> sz         | String   | Trade quantity. The unit is contract. |
| side          | String   | Trade side                            |

`buy`  
`sell` | | optType | String | Option type, C: Call P: Put | | fillVol | String |
Implied volatility while trading (Correspond to trade price) | | fwdPx | String
| Forward price while trading | | idxPx | String | Index price while trading | |
markPx | String | Mark price while trading | | ts | String | Trade time, Unix
timestamp format in milliseconds, e.g. `1597026383085`. |
