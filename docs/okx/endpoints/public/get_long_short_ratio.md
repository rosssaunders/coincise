# GET long/short ratio

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-long-short-ratio](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-long-short-ratio)

### Get long/short ratio

Retrieve the ratio of users with net long vs net short positions for Expiry
Futures and Perpetual Futures.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio`

#### Request Parameters

| Parameter | Type   | Required | Description                                      |
| --------- | ------ | -------- | ------------------------------------------------ |
| ccy       | String | Yes      | Currency                                         |
| begin     | String | No       | Begin time, e.g. `1597026383085`                 |
| end       | String | No       | End time, e.g. `1597026383011`                   |
| period    | String | No       | Period, the default is `5m`, e.g. \[`5m/1H/1D`\] |

`5m` granularity can only query data within two days at most  
`1H` granularity can only query data within 30 days at most  
`1D` granularity can only query data within 180 days at most |

#### Response Parameters

| **Parameter** | **Type** | **Description**  |
| ------------- | -------- | ---------------- |
| ts            | String   | Timestamp        |
| ratio         | String   | Long/Short ratio |

The return value array order is: \[ts,ratio\]
