# GET /api/v5/asset/asset-valuation

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-account-asset-valuation](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-account-asset-valuation)

### Get account asset valuation

View account asset valuation

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/asset-valuation`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                  |
| -------------- | --------- | ------------ | -------------------------------- |
| ccy            | String    | No           | Asset valuation calculation unit |

BTC, USDT  
USD, CNY, JP, KRW, RUB, EUR  
VND, IDR, INR, PHP, THB, TRY  
AUD, SGD, ARS, SAR, AED, IQD  
The default is the valuation in BTC. |

#### Response Parameters

| Parameter  | Type   | Description                                                |
| ---------- | ------ | ---------------------------------------------------------- |
| totalBal   | String | Valuation of total account assets                          |
| ts         | String | Unix timestamp format in milliseconds, e.g.`1597026383085` |
| details    | Object | Asset valuation details for each account                   |
| \> funding | String | Funding account                                            |
| \> trading | String | Trading account                                            |
| \> classic | String | \[Deprecated\] Classic account                             |
| \> earn    | String | Earn account                                               |
