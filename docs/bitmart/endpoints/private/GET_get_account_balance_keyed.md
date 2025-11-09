# GET Get Account Balance (KEYED)

**Source:**
[Get Account Balance (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Account Balance (KEYED)

`Gets Account Balance`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/wallet?currency=USDT&needUsdValuation=true`

| Field            | Type   | Required? | Description                                             |
| ---------------- | ------ | --------- | ------------------------------------------------------- |
| currency         | String | No        | Currency                                                |
| needUsdValuation | Bool   | No        | Whether to return the USD valuation, default is `false` |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"ef834248-51d3-4223-9481-f862aa9dd39f",     "data":{         "wallet":[             {                 "currency":"USDT",                 "name":"Tether USD",                 "available":"1000.00000000",                 "available_usd_valuation":"1002.00000000",                 "frozen":"0.00000000",                 "unAvailable":"0.00000000"             }         ]     } }`

| Field                   | Type   | Description                                   |
| ----------------------- | ------ | --------------------------------------------- |
| currency                | String | Token symbol, e.g., 'BTC'                     |
| name                    | String | Token name, e.g., 'Bitcoin'                   |
| available               | String | Available Balance                             |
| available_usd_valuation | String | Available Balance USD valuation               |
| frozen                  | String | Trading frozen Balance                        |
| unAvailable             | String | Trading frozen Balance + Other frozen Balance |

Only assets with a balance greater than 0 will be returned.
