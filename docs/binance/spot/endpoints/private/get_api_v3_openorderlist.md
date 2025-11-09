## Query Open Order lists (USER_DATA)​

```
GET /api/v3/openOrderList
```

**Weight:** 6

**Parameters:**

| Name                                                                                                     | Type    | Mandatory | Description                               |
| -------------------------------------------------------------------------------------------------------- | ------- | --------- | ----------------------------------------- |
| recvWindow                                                                                               | DECIMAL | NO        | The value cannot be greater than `60000`. |
| Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp                                                                                                | LONG    | YES       |                                           |

**Data Source:** Database

**Response:**

```
[  {    "orderListId": 31,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "wuB13fmulKj3YjdqWEcsnp",    "transactionTime": 1565246080644,    "symbol": "LTCBTC",    "orders": [      {        "symbol": "LTCBTC",        "orderId": 4,        "clientOrderId": "r3EH2N76dHfLoSZWIUw1bT"      },      {        "symbol": "LTCBTC",        "orderId": 5,        "clientOrderId": "Cv1SnyPD3qhqpbjpYEHbd2"      }    ]  }]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
