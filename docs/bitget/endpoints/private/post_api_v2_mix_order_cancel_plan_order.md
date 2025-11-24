# Cancel Trigger Order

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Interface for cancelling trigger orders, can be used to cancel by 'productType',
'symbol' and/or trigger ID list.

All orders that fall under that'productType' and 'symbol' will be cancelled.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/cancel-plan-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{  "orderIdList": [    {      "orderId": "123",      "clientOid": "321"    },    {      "orderId": "",      "clientOid": "666"    },    {      "orderId": "123",      "clientOid": ""    }  ],  "symbol": "ETHUSDT",  "productType": "usdt-futures",  "marginCoin": "USDT"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                                                                                      | Type   | Required | Description                 |
| :--------------------------------------------------------------------------------------------- | :----- | :------- | :-------------------------- |
| orderIdList                                                                                    | List   | No       | Trigger order id list.      |
| If it is passed, symbol must not be null and must be aligned with symbol/productType/planType. |
| \>orderId                                                                                      | String | No       | Trigger order ID            |
| Either orderId or clientOid is required. If both are entered, orderId prevails.                |
| \>clientOid                                                                                    | String | No       | Customized trigger order ID |
| Either orderId or clientOid is required. If both are entered, triggerId prevails.              |
| symbol                                                                                         | String | No       | Trading pair, e.g. ETHUSDT  |
| productType                                                                                    | String | Yes      | Product type                |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | marginCoin | String | No | Margin coin must be
capitalized | | planType | String | No | Trigger order type  
normal_plan plan order(default)  
profit_plan batch profit order  
loss_plan batch loss order  
pos_profit position profit order  
pos_loss position loss order  
moving_plan trailing order |

Response Example

```json
{
  "code": "00000",
  "data": {
    "successList": [
      {
        "orderId": "121212121212",
        "clientOid": "123"
      },
      {
        "orderId": "123",
        "clientOid": ""
      }
    ],
    "failureList": [
      {
        "orderId": "3",
        "clientOid": "123",
        "errorMsg": "notExistend"
      },
      {
        "orderId": "21221",
        "clientOid": "",
        "errorMsg": "notExistend"
      }
    ]
  },
  "msg": "success",
  "requestTime": 1627293504612
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type          | Description                                        |
| :----------- | :------------ | :------------------------------------------------- |
| successList  | List<Object\> | The collection of successfully cancelled orders.   |
| \> orderId   | String        | Order ID                                           |
| \> clientOid | String        | Customize order ID                                 |
| failureList  | List<Object\> | The collection of unsuccessfully cancelled orders. |
| \> orderId   | String        | Order ID                                           |
| \> clientOid | String        | Customize order ID                                 |
| \>errorMsg   | String        | Failure reason                                     |

> **Source:** https://www.bitget.com/api-doc/contract/plan/Cancel-Plan-Order
