# GET open interest and volume (strike)

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-strike](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-strike)

### Get open interest and volume (strike)

Retrieve the taker volume for both buyers and sellers of calls and puts.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume-strike`

#### Request Parameters

| Parameter                                                  | Type   | Required | Description                                                     |
| ---------------------------------------------------------- | ------ | -------- | --------------------------------------------------------------- |
| ccy                                                        | String | Yes      | Currency                                                        |
| expTime                                                    | String | Yes      | Contract expiry date, the format is `YYYYMMdd`, e.g. `20210623` |
| period                                                     | String | No       | Period, the default is `8H`. e.g. \[`8H/1D`\]                   |
| Each granularity can provide only one latest piece of data |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                |
| ------------- | -------- | ---------------------------------------------- |
| ts            | String   | Timestamp                                      |
| strike        | String   | Strike price                                   |
| callOI        | String   | Total call open interest (`coin` as the unit)  |
| putOI         | String   | Total put open interest (`coin` as the unit)   |
| callVol       | String   | Total call trading volume (`coin` as the unit) |
| putVol        | String   | Total put trading volume (`coin` as the unit)  |

The return value array order is: \[ts,strike,callOI,putOI,callVol,putVol\]
