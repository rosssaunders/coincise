# GET open interest and volume (expiry)

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-expiry](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-expiry)

### Get open interest and volume (expiry)

Retrieve the open interest and trading volume of calls and puts for each
upcoming expiration.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume-expiry`

#### Request Parameters

| Parameter                                                  | Type   | Required | Description                                   |
| ---------------------------------------------------------- | ------ | -------- | --------------------------------------------- |
| ccy                                                        | String | Yes      | Currency                                      |
| period                                                     | String | No       | Period, the default is `8H`. e.g. \[`8H/1D`\] |
| Each granularity can provide only one latest piece of data |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                 |
| ------------- | -------- | --------------------------------------------------------------- |
| ts            | String   | Timestamp                                                       |
| expTime       | String   | Contract expiry date, the format is `YYYYMMDD`, e.g. `20210623` |
| callOI        | String   | Total call open interest (`coin` as the unit)                   |
| putOI         | String   | Total put open interest (`coin` as the unit)                    |
| callVol       | String   | Total call trading volume (`coin` as the unit)                  |
| putVol        | String   | Total put trading volume (`coin` as the unit)                   |

The return value array order is: \[ts,expTime,callOI,putOI,callVol,putVol\]
