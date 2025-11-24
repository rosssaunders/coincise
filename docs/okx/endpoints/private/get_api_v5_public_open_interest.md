# GET /api/v5/public/open-interest

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest)

### Get open interest

Retrieve the total open interest for contracts on OKX.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/open-interest`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | Yes      | Instrument type |

`SWAP`  
`FUTURES`  
`OPTION` | | instFamily | String | Conditional | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION`  
If instType is `OPTION`, instFamily is required. | | instId | String | No |
Instrument ID, e.g. `BTC-USDT-SWAP`  
Applicable to `FUTURES`/`SWAP`/`OPTION` |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                               |
| ------------- | -------- | ----------------------------------------------------------------------------- |
| instType      | String   | Instrument type                                                               |
| instId        | String   | Instrument ID                                                                 |
| oi            | String   | Open interest in number of contracts                                          |
| oiCcy         | String   | Open interest in number of coin                                               |
| oiUsd         | String   | Open interest in number of USD                                                |
| ts            | String   | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
