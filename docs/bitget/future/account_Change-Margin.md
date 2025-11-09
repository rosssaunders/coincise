# Adjust Position Margin

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Add or reduce the margin（**only for isolated margin mode**）

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/account/set-margin

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/account/set-margin" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "btcusdt","productType": "USDT-FUTURES","marginCoin": "usdt","amount": "20","holdSide": "long"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                      |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol      | String | Yes      | Trading pair                                                                                                                                     |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| marginCoin  | String | Yes      | Margin coin must be capitalized                                                                                                                  |
| holdSide    | String | Yes      | Position direction<br>long – long position; short – short position                                                                               |
| amount      | String | Yes      | Margin amount, positive means increase, and negative means decrease                                                                              |

Response Example

```
{    "code": "00000",    "data": "",    "msg": "success",    "requestTime": 1627293357336}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                    |
| :-------- | :----- | :----------------------------- |
| code      | String | ‘00000’: success; others: fail |

> **Source:** https://www.bitget.com/api-doc/contract/account/Change-Margin
