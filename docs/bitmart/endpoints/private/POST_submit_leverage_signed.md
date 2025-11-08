# POST Submit Leverage (SIGNED)

**Source:** [Submit Leverage (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Submit Leverage (SIGNED)

`Applicable for adjust contract leverage` \`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-leverage`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "leverage":"5",   "open_type":"isolated" }' https://api-cloud-v2.bitmart.com/contract/private/submit-leverage`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| leverage | String | No | Order leverage |
| open\_type | String | Yes | Open type, required at close position  
\-`cross`  
\-`isolated` |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "symbol":"ETHUSDT",     "leverage":"5",     "open_type":"isolated",     "max_value":"100"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) |
| leverage | String | Order leverage |
| open\_type | String | Open type, required at close position  
\-`cross`  
\-`isolated` |
| max\_value | String | Maximum leverage |