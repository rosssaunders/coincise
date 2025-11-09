# GET Get Basic Fee Rate (KEYED)

**Source:**
[Get Basic Fee Rate (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Basic Fee Rate (KEYED)

`For querying the base rate of the current user`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/user_fee`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/user_fee`

None

#### Response Data

> Response

`{   "message":"OK",   "code":1000,   "trace":"0187ba0c876e4236ac191d9848a0f719.94.16778301620100121",   "data":{     "user_rate_type":0,     "level":"LV1",     "taker_fee_rate_A":"0.001",     "maker_fee_rate_A":"0.001",     "taker_fee_rate_B":"0.0025",     "maker_fee_rate_B":"0.0025",     "taker_fee_rate_C":"0.004",     "maker_fee_rate_C":"0.004",     "taker_fee_rate_D":"0.006",     "maker_fee_rate_D":"0.006"   } }`

| Field          | Type | Description |
| -------------- | ---- | ----------- |
| user_rate_type | Long | Rate type： |

\- `0`\=Normal Users  
\- `1`\=VIP Users  
\- `2`\=Special VIP Users | | level | String | User Level | | taker_fee_rate_A |
String | Taker fee rate for Class-A pairs | | maker_fee_rate_A | String | Maker
fee rate for Class-A pairs | | taker_fee_rate_B | String | Taker fee rate for
Class-B pairs | | maker_fee_rate_B | String | Maker fee rate for Class-B pairs |
| taker_fee_rate_C | String | Taker fee rate for Class-C pairs | |
maker_fee_rate_C | String | Maker fee rate for Class-C pairs | |
taker_fee_rate_D | String | Taker fee rate for Class-D pairs | |
maker_fee_rate_D | String | Maker fee rate for Class-D pairs |
