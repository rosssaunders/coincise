# Sub Transfer

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

The types of transfers supported by this interface include

*   Parent account transfer to sub-accounts (only parent account APIKey has access)
*   Sub-accounts to parent account (only parent account APIKey has access)
*   Sub-accounts transfer to sub-accounts (only the parent account APIKey has access and the sub-accounts belong to same parent account)
*   Sub-account inner accounts transfer, e.g. spot to futures(only the parent account APIKey has access, and the `fromUserId` & `toUserId` should be same)

Only the parent account API Key can use this endpoint, and the API Key must bind IP

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/wallet/subaccount-transfer

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/transfer" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"fromUserId":"1","toUserId":"2","fromType":"spot","toType":"spot","amount":"10","coin":"USDT","clientOid":"1"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| fromType | String | Yes | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/Funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account 
| toType | String | Yes | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/Funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account 
| amount | String | Yes | Amount to transfer 
| coin | String | Yes | Currency of transfer 
| symbol | String | No | Symbol name(Required in Isolated margin (spot) transferring) 
| clientOid | String | No | Custom order ID 
| fromUserId | String | Yes | Outgoing Account UID 
| toUserId | String | Yes | Incoming Account UID 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "transferId": "123456",        "clientOid": "x123"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| transferId | String | Transfer ID 
| clientOid | String | Custom order ID

> **Source:** https://www.bitget.com/api-doc/spot/account/Sub-Transfer
