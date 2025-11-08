# Modify Virtual Subaccount

Frequency limit: 5 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Modify the virtual sub-account

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/modify-virtual-subaccount

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/modify-virtual-subaccount" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"subAccountUid": "1","permList":["spot_trade","contract_trade"], "status":"normal"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account Uid 
| permList | List&lt;String&gt; | Yes | Permissions<br>spot_trade Spot trade<br>contract_trade Futures trade read-write<br>read Read permissions 
| status | String | Yes | Sub-account status<br>normal Normal<br>freeze Freeze 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1682660666458,    "data": {        "result": "success"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| result | String | Edit result<br><code>success</code> Success<br><code>failure</code> Failure

> **Source:** https://www.bitget.com/api-doc/common/vsubaccount/Modify-Virtual-Subaccount
