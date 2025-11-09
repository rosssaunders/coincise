# GET options open interest and volume

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-options-open-interest-and-volume](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-options-open-interest-and-volume)

### Get options open interest and volume

Retrieve the open interest and trading volume for options.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume`

#### Request Parameters

| Parameter                                                         | Type   | Required | Description                                   |
| ----------------------------------------------------------------- | ------ | -------- | --------------------------------------------- |
| ccy                                                               | String | Yes      | Currency                                      |
| period                                                            | String | No       | Period, the default is `8H`. e.g. \[`8H/1D`\] |
| Each granularity can only query 72 pieces of data at the earliest |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                             |
| ------------- | -------- | ----------------------------------------------------------- |
| ts            | String   | Timestamp                                                   |
| oi            | String   | Total open interest , unit in `ccy` (in request parameter)  |
| vol           | String   | Total trading volume , unit in `ccy` (in request parameter) |

The return value array order is: \[ts,oi,vol\]
