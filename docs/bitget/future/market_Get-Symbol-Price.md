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

| Parameter   | Type   | Required | Description                                                                                                                                      |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol      | String | Yes      | Trading pair                                                                                                                                     |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695793384294,    "data": [        {            "symbol": "BTCUSDT",            "price": "26242",            "indexPrice": "34867",            "markPrice": "25555",            "ts": "1695793390482"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter       | Type   | Description                                                               |
| :-------------- | :----- | :------------------------------------------------------------------------ |
| &gt; symbol     | String | Trading pair name                                                         |
| &gt; price      | String | Latest price of the exchange                                              |
| &gt; indexPrice | String | Index price                                                               |
| &gt; markPrice  | String | Mark price                                                                |
| &gt; ts         | String | Milliseconds format of current data timestamp Unix, e.g.<br>1672410780000 |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Symbol-Price
