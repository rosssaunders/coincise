# Change Margin Mode

Frequency limit: 5 times/1s (uid)

### Description[​](#description "Direct link to Description")

This interface cannot be used when the users have an open position or an order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/account/set-margin-mode

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/account/set-margin-mode" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "btcusdt","productType": "USDT-FUTURES","marginCoin": "usdt","marginMode": "isolated"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                      |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol      | String | Yes      | Trading pair. e.g. BTCUSDT                                                                                                                       |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| marginCoin  | String | Yes      | Margin coin, must be capitalized                                                                                                                 |
| marginMode  | String | Yes      | Margin mode.<br><code>isolated</code>: isolated margin mode<br><code>crossed</code>: crossed margin mode                                         |

Response Example

```
{    "code": "00000",    "data": {        "symbol": "BTCUSDT",        "marginCoin": "USDT",        "longLeverage": "25",        "shortLeverage": "20",        "marginMode": "isolated"    },    "msg": "success",    "requestTime": 1627293445916}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type   | Description                                                                                              |
| :----------- | :----- | :------------------------------------------------------------------------------------------------------- |
| symbol       | String | Trading pair name                                                                                        |
| marginCoin   | String | Margin coin                                                                                              |
| longLeverage | String | Leverage of long positions                                                                               |
| shortLeveage | String | Leverage of short positions                                                                              |
| marginMode   | String | Margin mode.<br><code>isolated</code>: isolated margin mode<br><code>crossed</code>: crossed margin mode |

> **Source:** https://www.bitget.com/api-doc/contract/account/Change-Margin-Mode
