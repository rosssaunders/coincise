# Get Mark/Index/Market Prices

20 times/s, frequency is limited according to user ID

### Description[​](#description "Direct link to Description")

Get market/index/mark prices

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/symbol-price

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/symbol-price?productType=usdt-futures&symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description  |
| :---------- | :----- | :------- | :----------- |
| symbol      | String | Yes      | Trading pair |
| productType | String | Yes      | Product type |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695793384294,
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": "26242",
      "indexPrice": "34867",
      "markPrice": "25555",
      "ts": "1695793390482"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                              |
| :------------ | :----- | :------------------------------------------------------- |
| \> symbol     | String | Trading pair name                                        |
| \> price      | String | Latest price of the exchange                             |
| \> indexPrice | String | Index price                                              |
| \> markPrice  | String | Mark price                                               |
| \> ts         | String | Milliseconds format of current data timestamp Unix, e.g. |
| 1672410780000 |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Symbol-Price
