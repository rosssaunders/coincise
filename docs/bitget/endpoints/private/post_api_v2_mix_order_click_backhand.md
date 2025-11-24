# Reversal

- Rate limit: 10 req/sec/UID
- Rate limit: 1 req/sec/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

- `side` and `tradeSide`：
  - In `one-way-mode`, do NOT add the `tradeSide` parameter in request
  - In `hedge-mode`, `tradeSide` is required
    - Reversal the current long position and open a short position: `side`\=buy,
      `tradeSide`
    - Reversal the current short position and open a long position:
      `side`\=sell, `tradeSide`
- `size`: represents the reversal size
  - In `one-way-mode`, the whole position will be reversed if no `size` was set
    in the request
  - In `hedge-mode`:
    - If the `size` set is less than the current position size, the `size` of
      position will be closed and the same size reversal position will be opened
      For example, for a ETHUSDT size 20 long position, if the `size` was set 3
      in request, then the current long position size will be reduced to 17, and
      a new size 3 short position will be opened
    - If the `size` set is equal to or more than the current position size, the
      whole position will be reversed For example, for a ETHUSDT size 10 long
      position, if the `size` was set 10 or 11 in request, then the current
      position will be closed and a new 10 size short position will be opened

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/click-backhand

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/click-backhand" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{    "symbol": "ethusdt",     "productType": "USDT-FUTURES",     "marginCoin": "usdt",     "size": "30",     "clientOid": "12345"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                |
| :---------- | :----- | :------- | :------------------------- |
| symbol      | String | Yes      | Trading pair, e.g. ETHUSDT |
| marginCoin  | String | Yes      | marginCoin e.g: USDT       |
| productType | String | Yes      | Product type               |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | size | String | No | Amount | | side | String
| Yes | Order direction  
buy: Buy  
sell: Sell | | tradeSide | String | No | Direction  
Required in open and close (hedge mode) position .  
For one-way positions, this field will be ignored  
Open and Close  
Notes:  
For open long, fill in"Buy"; tradeSide should be "Open"  
For open short, fill in "Sell"; tradeSide should be "Open"  
For close long, fill in "Buy"; tradeSide should be "Close"  
For close short, fill in "Sell"; tradeSide should be "Close" | | clientOid |
String | No | Customize order ID |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695806875837,
  "data": {
    "clientOid": "121211212122",
    "orderId": "1"
  }
}
```

### Return Parameter[​](#return-parameter "Direct link to Return Parameter")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| orderId   | String | Order ID           |
| clientOid | String | Customize order ID |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Reversal
