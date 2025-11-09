# GET PM position limitation

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-pm-position-limitation](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-pm-position-limitation)

### Get PM position limitation

Retrieve cross position limitation of SWAP/FUTURES/OPTION under Portfolio margin
mode.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/position-tiers`

#### Request Parameters

| **Parameter** | **Type** | **Required** | **Description** |
| ------------- | -------- | ------------ | --------------- |
| instType      | String   | Yes          | Instrument type |

`SWAP`  
`FUTURES`  
`OPTION` | | instFamily | String | Yes | Single instrument family or instrument
families (no more than 5) separated with comma. |

#### Response Parameters

| **Parameter**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Type** | **Description**                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| uly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | String   | Underlying                                                                                 |
| Applicable to `FUTURES`/`SWAP`/`OPTION`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| instFamily                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | String   | Instrument family                                                                          |
| Applicable to `FUTURES`/`SWAP`/`OPTION`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| maxSz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | String   | Max number of positions                                                                    |
| posType                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | String   | Limitation of position type, only applicable to cross `OPTION` under portfolio margin mode |
| `1`: Contracts of pending orders and open positions for all derivatives instruments. `2`: Contracts of pending orders for all derivatives instruments. `3`: Pending orders for all derivatives instruments. `4`: Contracts of pending orders and open positions for all derivatives instruments on the same side. `5`: Pending orders for one derivatives instrument. `6`: Contracts of pending orders and open positions for one derivatives instrument. `7`: Contracts of one pending order. |
