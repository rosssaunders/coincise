# Get Account Assets

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Account Assets

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/account/assets

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/assets?coin=USDT" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | Token name, e.g. USDT<br>This field is used for querying the positions of a single coin. 
| assetType | String | No | Asset type<br><code>hold_only</code>: Position coin<br><code>all</code>: All coins<br>This field is used used for querying the positions of multiple coins. The default value is <code>hold_only</code><br>When only <code>assetType</code> is entered without coin, results of all eligible coins are returned. When both coin and <code>assetType</code> are entered, coin has higher priority. 

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "coin": "usdt",            "available": "0",            "frozen": "0",            "locked": "0",            "limitAvailable": "0",            "uTime": "1622697148"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| coin | String | Token name 
| available | String | Available assets 
| frozen | String | Amount of frozen assets<br>Usually frozen when the limit order is placed or join the Launchpad 
| locked | String | Amount of locked assets<br>Locked assests required to become a fiat merchants, etc. 
| limitAvailable | String | Restricted availability<br>For spot copy trading 
| uTime | String | Update time(ms)

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Account-Assets
