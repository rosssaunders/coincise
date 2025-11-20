# GET Get Funding Rate History

**Source:** [Get Funding Rate History](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Funding Rate History

`Applicable for querying funding rate history data`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/funding-rate-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/funding-rate-history?symbol=BTCUSDT&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Instrument name, e.g. BTCUSDT |
| limit | String | No | Number of results per request. The maximum is 100; The default is 100 |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "list": [
      {
        "symbol": "BTCUSDT",
        "funding_rate": "0.000090600584",
        "funding_time": "1733979600000"
      }
    ]
  },
  "trace": "4b588ac6b7cb11ef96b16280797cd561.3819021.39457365988950452"
}
```

| Field | Type | Description |
| --- | --- | --- |
| list | list | Array of list details |

Description of the list details field:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Instrument name, e.g. BTCUSDT |
| funding\_rate | String | Actual funding rate |
| funding\_time | String | Settlement time, Unix timestamp format in milliseconds, e.g. 1733738400000 |