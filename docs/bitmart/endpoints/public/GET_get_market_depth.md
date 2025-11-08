# GET Get Market Depth

**Source:** [Get Market Depth](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Market Depth

`Get full depth of trading pairs.`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/depth`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/depth?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "trace": "b9bff62d-9ac8-4815-8808-8f745673c096",   "data": {     "asks": [       [         "23935.4",         "65",         "65"       ]     ],     "bids": [       [         "23935.4",         "65",         "65"       ]     ],     "timestamp": 1660285421287,     "symbol": "BTCUSDT"   } }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Unix timestamp in milliseconds for when the last updated time occurred |
| bids | List | Bid order depth |
| asks | List | Ask order depth |
| symbol | String | symbol |

Return a maximum of 50 pieces of data.

Market depth details：

| Field | Type | Description |
| --- | --- | --- |
| The first | String | The price at current depth. For example 23935.4 |
| The second | String | Total quantity of current price depth. For example 65 |
| The third | String | Accumulates the total quantity above (including) the current price depth. For example 65 |