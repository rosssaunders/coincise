# Batch Cancel

Speed limit is 10 times/s for average users. Frequency limit imposed according
to user ID

### Description[​](#description "Direct link to Description")

Order cancelling interface, can be used to cancel by product type and trading
pair.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/batch-cancel-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/batch-cancel-orders" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{    "symbol": "BTCUSDT",    "productType": "usdt-futures",    "marginCoin": "USDT",    "orderIdList": [        {            "orderId":"121211212122"        }    ]}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                                                                          | Type   | Required | Description                      |
| :--------------------------------------------------------------------------------- | :----- | :------- | :------------------------------- |
| orderIdList                                                                        | List   | No       | Order ID list.maximum length: 50 |
| If filled in, symbol must not be null and must be aligned with symbol/productType. |
| \>orderId                                                                          | String | No       | Order ID                         |
| Either orderId or clientOid is required. If both are entered, orderId prevails.    |
| \>clientOid                                                                        | String | No       | Customize order ID               |
| Either orderId or clientOid is required. If both are entered, orderId prevails.    |
| symbol                                                                             | String | No       | Trading pair, e.g. ETHUSDT       |
| It's required when `orderIdList` is set                                            |
| productType                                                                        | String | Yes      | Product type                     |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | marginCoin | String | No | Margin coin must be
capitalized |

Response Example

```
{    "code": "00000",    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "BITGET#121211212122"            }        ],        "failureList": [            {                "orderId": "232",                "clientOid": "321342",                "errorMsg": "notExistend"            }        ]    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter   | Type          | Description                                        |
| :---------- | :------------ | :------------------------------------------------- |
| successList | List<Object\> | The collection of successfully cancelled orders.   |
| \>orderId   | String        | Order ID                                           |
| \>clientOid | String        | Customize order ID                                 |
| failureList | List<Object\> | The collection of unsuccessfully cancelled orders. |
| \>orderId   | String        | Order ID                                           |
| \>clientOid | String        | Customize order ID                                 |
| \>errorMsg  | String        | Failure reason                                     |
| \>errorCode | String        | Error code                                         |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Batch-Cancel-Orders
