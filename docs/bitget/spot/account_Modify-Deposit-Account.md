# Modify Deposit Account

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Modify the auto-transfer account type of deposit

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/wallet/modify-deposit-account

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/modify-deposit-account" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "coin":"USDT",    "accountType":"USDT-FUTURES"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| accountType | String | Yes | Account type<br><code>spot</code>: Spot account<br><code>funding</code>: funding account<br><code>coin-futures</code>: Coin-M futures account<br><code>usdt-futures</code>: USDT-M futures account<br><code>usdc-futures</code>: USDC-M futures account 
| coin | String | Yes | Currency of transfer 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": "success"}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | String | success/fail

> **Source:** https://www.bitget.com/api-doc/spot/account/Modify-Deposit-Account
