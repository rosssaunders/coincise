# Create Virtual Subaccount Apikey

Frequency limit: 5 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Only supports API Key calls from the main account, and the API Key needs to be bound to an IP address.

Create the virtual sub-account apikey

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/create-virtual-subaccount-apikey

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/create-virtual-subaccount-apikey" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "subAccountUid":"1",    "passphrase":"pssword1",    "label":"test1_account",    "ipList":["127.0.0.1"],    "permList":[        "spot_trade"    ]}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account uid 
| passphrase | String | Yes | Passcode English letters of 8−32 characters + numbers 
| label | String | Yes | Note Length 20 
| ipList | List&lt;String&gt; | No | ip whitelist<br>Up to 30, if not then ip whitelist is set to empty. 
| permList | List | No | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1682660169412,  "data": {    "subAccountUid": "1",    "label": "test1_account",    "subAccountApiKey": "xx_xxx",    "secretKey": "xxx",    "permList": [      "spot_trade"    ],    "ipList": [      "127.0.0.1"    ]  }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountUid | String | Sub-account uid 
| subAccountApiKey | String | Sub-account apikey 
| secretKey | String | Sub-account private key 
| permList | List | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions 
| label | String | Sub-account apikey note 
| ipList | List | ip whitelist

> **Source:** https://www.bitget.com/api-doc/common/vsubaccount/Create-Virtual-Subaccount-ApiKey
