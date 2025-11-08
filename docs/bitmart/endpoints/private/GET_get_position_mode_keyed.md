# GET Get Position Mode (KEYED)

**Source:** [Get Position Mode (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Position Mode (KEYED)

`Applicable for getting position mode`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/get-position-mode`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

None

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}' https://api-cloud-v2.bitmart.com/contract/private/get-position-mode`

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "position_mode":"one_way_mode"   } }`

| Field | Type | Description |
| --- | --- | --- |
| position\_mode | String | Position Mode  
\-`hedge_mode`  
\-`one_way_mode` |