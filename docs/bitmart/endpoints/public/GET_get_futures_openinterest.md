# GET Get Futures Openinterest

**Source:** [Get Futures Openinterest](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Futures Openinterest

`Applicable for querying the open interest and open interest value data of the specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/open-interest`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/open-interest?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "timestamp": 1661239541734,     "symbol": "BTCUSDT",     "open_interest": "4134180870",     "open_interest_value": "94100888927.0433258"   } }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Timestamp |
| symbol | String | Symbol of the contract |
| open\_interest | String | Open interest |
| open\_interest\_value | String | Value of open interest |