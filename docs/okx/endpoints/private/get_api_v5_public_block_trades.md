# GET /api/v5/public/block-trades

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-single-leg-transactions-of-block-trades](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-single-leg-transactions-of-block-trades)

### Get public single-leg transactions of block trades

Retrieve the recent block trading transactions of an instrument. Descending
order by tradeId. The data will be updated 15 minutes after the block trade
execution.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/block-trades`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| instId        | String   | Instrument ID   |
| tradeId       | String   | Trade ID        |
| px            | String   | Trade price     |
| sz            | String   | Trade quantity  |

For spot trading, the unit is base currency  
For `FUTURES`/`SWAP`/`OPTION`, the unit is contract. | | side | String | Trade
side  
`buy`  
`sell` | | fillVol | String | Implied volatility  
Only applicable to `OPTION` | | fwdPx | String | Forward price  
Only applicable to `OPTION` | | idxPx | String | Index price  
Applicable to `FUTURES`, `SWAP`, `OPTION` | | markPx | String | Mark price  
Applicable to `FUTURES`, `SWAP`, `OPTION` | | groupId | String | Group RFQ ID  
Only applicable to group RFQ, return "" for normal RFQ | | ts | String | Trade
time, Unix timestamp format in milliseconds, e.g. `1597026383085`. |

Up to 500 most recent historical public transaction data can be retrieved.

Group RFQ introduction

1\. Add new response parameter groupId, facilitating clients to map subaccount
execution to group RFQ. Only applicable to group RFQ, return "" for normal
RFQ.  
2\. Data return by this endpoint should be at \*\*child RFQ execution level\*\*
but split into a single leg. tradeId will be populated.
