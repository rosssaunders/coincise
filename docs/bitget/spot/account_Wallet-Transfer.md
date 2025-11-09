# Transfer

Rate limit: 10 requests/second/UID

### Description[​](#description "Direct link to Description")

Transfer assets between different `productType` accounts

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/transfer

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/transfer" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "fromType":"spot",    "toType":"isolated_margin",    "amount":"300",    "symbol":"BTCUSDT",    "clientOid":"1",    "coin":"USDT"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                           |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromType  | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| toType    | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| amount    | String | Yes      | Amount to transfer                                                                                                                                                                                                                                                                                                                                                    |
| coin      | String | Yes      | Currency of transfer                                                                                                                                                                                                                                                                                                                                                  |
| symbol    | String | Yes      | Required when transferring to or from an account type that is a leveraged position-by-position account.                                                                                                                                                                                                                                                               |
| clientOid | String | No       | Custom order ID<br>It's unquie. If you set duplicate clientOid, it will return the result of existing clientOid transfer                                                                                                                                                                                                                                              |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "transferId": "123456",        "clientOid": "x123"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description     |
| :--------- | :----- | :-------------- |
| transferId | String | Transfer ID     |
| clientOid  | String | Custom order ID |

> **Source:** https://www.bitget.com/api-doc/spot/account/Wallet-Transfer
