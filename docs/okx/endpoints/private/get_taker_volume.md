# GET taker volume

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-volume](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-volume)

### Get taker volume

Retrieve the taker volume for both buyers and sellers.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/taker-volume`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| ccy       | String | Yes      | Currency        |
| instType  | String | Yes      | Instrument type |

`SPOT`  
`CONTRACTS` | | begin | String | No | Begin time, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | end | String | No | End time, Unix
timestamp format in milliseconds, e.g. `1597026383011` | | period | String | No
| Period, the default is `5m`, e.g. \[`5m`/`1H`/`1D`\]  
`5m` granularity can only query data within two days at most  
`1H` granularity can only query data within 30 days at most  
`1D` granularity can only query data within 180 days at most |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| ts            | String   | Timestamp       |
| sellVol       | String   | Sell volume     |
| buyVol        | String   | Buy volume      |

The return value array order is: \[ts,sellVol,buyVol\]
