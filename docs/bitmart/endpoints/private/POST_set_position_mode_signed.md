# POST Set Position Mode (SIGNED)

**Source:** [Set Position Mode (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Set Position Mode (SIGNED)

`Applicable for setting position mode`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/set-position-mode`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "position_mode":"one_way_mode" }' https://api-cloud-v2.bitmart.com/contract/private/set-position-mode`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| position\_mode | String | Yes | Position Mode  
\-`hedge_mode`  
\-`one_way_mode` |

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "position_mode":"one_way_mode"   } }`

| Field | Type | Description |
| --- | --- | --- |
| position\_mode | String | Position Mode  
\-`hedge_mode`  
\-`one_way_mode` |