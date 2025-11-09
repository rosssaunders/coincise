# GET convert history

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-history](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-history)

### Get convert history

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### HTTP Request

`GET /api/v5/asset/convert/history`

#### Request Parameters

| **Parameters**                                                                                     | **Types** | **Required** | **Description**                                                                                                                   |
| -------------------------------------------------------------------------------------------------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| clTReqId                                                                                           | String    | No           | Client Order ID as assigned by the client                                                                                         |
| A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| after                                                                                              | String    | No           | Pagination of data to return records earlier than the requested `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| before                                                                                             | String    | No           | Pagination of data to return records newer than the requested `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085`   |
| limit                                                                                              | String    | No           | Number of results per request. The maximum is `100`. The default is `100`.                                                        |
| tag                                                                                                | String    | No           | Order tag                                                                                                                         |

Applicable to broker user  
If the convert trading used `tag`, this parameter is also required. |

#### Response Parameters

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| tradeId   | String | Trade ID                                  |
| clTReqId  | String | Client Order ID as assigned by the client |
| state     | String | Trade state                               |

`fullyFilled` : success  
`rejected` : failed | | instId | String | Currency pair, e.g. `BTC-USDT` | |
baseCcy | String | Base currency, e.g. `BTC` in `BTC-USDT` | | quoteCcy | String
| Quote currency, e.g. `USDT` in `BTC-USDT` | | side | String | Trade side based
on `baseCcy`  
`buy` `sell` | | fillPx | String | Filled price based on quote currency | |
fillBaseSz | String | Filled amount for base currency | | fillQuoteSz | String |
Filled amount for quote currency | | ts | String | Convert trade time, Unix
timestamp format in milliseconds, e.g. `1597026383085` |
