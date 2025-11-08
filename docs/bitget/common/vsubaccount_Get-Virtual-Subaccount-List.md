# Get Virtual Subaccounts

Rate limit: 1 req/sec/UID

### Description[​](#description "Direct link to Description")

Get a list of virtual sub-account

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/user/virtual-subaccount-list

Request Example

```
curl "https://api.bitget.com/api/v2/user/virtual-subaccount-list?limit=20" \  -H "ACCESS-KEY:*******" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| limit | String | No | Entries per page<br>Default: 100, maximum: 500 
| idLessThan | String | No | Final sub-account ID, required for paging. 
| status | String | No | Sub-account status<br>normal Normal<br>freeze Freeze 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": {        "endId": 51,        "subAccountList": [            {                "subAccountUid": "********",                "subAccountName": "****@*****.com",                "status": "normal",                "permList": [                    "read",                    "spot_trade",                    "contract_trade"                ],                "label": "mySub01",                "cTime": "1653287983475",                "uTime": "1682660169573"            }        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountList | Array | Sub-account array 
| &gt; subAccountUid | String | Sub-account uid 
| &gt; subAccountName | String | Sub-account username 
| &gt; label | String | Sub-account ApiKey note, max length 20 
| &gt; status | String | Sub-account status<br>normal Normal<br>freeze Freeze<br>del Deleted 
| &gt; permList | List | Sub-account permissions<br>spot_trade Spot trade<br>contract_trade Futures trade read-write<br>read Read permissions 
| &gt; cTime | String | Sub-account creation time 
| &gt; uTime | String | Sub-account update time 
| endId | String | This is used when idLessThan/idGreaterThan is set as a range.

> **Source:** https://www.bitget.com/api-doc/common/vsubaccount/Get-Virtual-Subaccount-List
