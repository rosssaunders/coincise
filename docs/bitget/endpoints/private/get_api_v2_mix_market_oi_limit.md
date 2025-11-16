# Get Contract OI Limit

Rate Limit: 10 req/sec/IP

### Description[​](#description "Direct link to Description")

Interface is used to get future contract OI Limit.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/oi-limit

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/oi-limit?productType=usdt-futures&symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                         |
| :---------- | :----- | :------- | :-------------------------------------------------- |
| symbol      | String | No       | Trading pair, based on the symbolName, i.e. BTCUSDT |
| productType | String | Yes      | Product type                                        |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures  
 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1741596239587,    "data": [        {            "symbol": "BTCUSDT",            "notionalValue": "100000",            "totalNotionalValue": "200000"        },        {            "symbol": "BCHUSDT",            "notionalValue": "100000",            "totalNotionalValue": "200000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter             | Type   | Description                                          |
| :-------------------- | :----- | :--------------------------------------------------- |
| \> symbol             | String | Product name                                         |
| \> notionalValue      | String | Individual User Position Notional Value              |
| \> totalNotionalValue | String | Sub-account and Main-account Position Notional Value |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Contracts-Oi
