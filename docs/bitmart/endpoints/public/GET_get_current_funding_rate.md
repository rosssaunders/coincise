# GET Get Current Funding Rate

**Source:**
[Get Current Funding Rate](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Current Funding Rate

`Applicable for checking the current funding rate of a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/funding-rate`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/funding-rate?symbol=BTCUSDT`

| Field  | Type   | Required? | Description                          |
| ------ | ------ | --------- | ------------------------------------ |
| symbol | String | Yes       | Symbol of the contract(like BTCUSDT) |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "timestamp": 1662518172178,
    "symbol": "BTCUSDT",
    "rate_value": "0.000164",
    "expected_rate": "0.000164",
    "funding_time": 1709971200000,
    "funding_upper_limit": "0.0375",
    "funding_lower_limit": "-0.0375"
  },
  "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988"
}
```

| Field               | Type   | Description                                       |
| ------------------- | ------ | ------------------------------------------------- |
| timestamp           | Long   | Timestamp                                         |
| symbol              | String | Symbol of the contract                            |
| rate_value          | String | Funding rate of the previous period               |
| expected_rate       | String | Funding rate for the next period                  |
| funding_time        | Long   | Next funding settlement time                      |
| funding_upper_limit | Long   | Upper limit of funding rate for this trading pair |
| funding_lower_limit | Long   | Lower limit of funding rate for this trading pair |
