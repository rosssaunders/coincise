# Cancel Withdrawal

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

1.  The user center can set the switch \[Cancel Withdrawal\], and there is a "regret period" of 1 minute to cancel the withdrawal.
2.  There is manual review in the preliminary review status, and the withdrawal can be cancelled. Once the initial review is passed or uploaded to the chain, the withdrawal cannot be revoked.
3.  Small-amount automatic currency withdrawals do not require manual review, and the withdrawal cannot be revoked.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/wallet/cancel-withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/cancel-withdrawal" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderId":"1231231312312"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | Yes | Withdraw orderId 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": "success"}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | String | success/fail

> **Source:** https://www.bitget.com/api-doc/spot/account/Cancel-Withdrawal
