## Query all Order lists (USER_DATA)​

```
GET /api/v3/allOrderList
```

Retrieves all order lists based on provided optional parameters.

Note that the time between `startTime` and `endTime` can't be longer than 24
hours.

**Weight:** 20

**Parameters:**

| Name                                                                                                     | Type    | Mandatory | Description                                                   |
| -------------------------------------------------------------------------------------------------------- | ------- | --------- | ------------------------------------------------------------- |
| fromId                                                                                                   | LONG    | NO        | If supplied, neither `startTime` or `endTime` can be provided |
| startTime                                                                                                | LONG    | NO        |                                                               |
| endTime                                                                                                  | LONG    | NO        |                                                               |
| limit                                                                                                    | INT     | NO        | Default: 500; Maximum: 1000                                   |
| recvWindow                                                                                               | DECIMAL | NO        | The value cannot be greater than `60000`.                     |
| Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp                                                                                                | LONG    | YES       |                                                               |

**Data Source:** Database

**Response:**

```
[
  {
    "orderListId": 29,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "amEEAXryFzFwYF1FeRpUoZ",
    "transactionTime": 1565245913483,
    "symbol": "LTCBTC",
    "orders": [
      {
        "symbol": "LTCBTC",
        "orderId": 4,
        "clientOrderId": "oD7aesZqjEGlZrbtRpy5zB"
      },
      {
        "symbol": "LTCBTC",
        "orderId": 5,
        "clientOrderId": "Jr1h6xirOxgeJOUuYQS7V3"
      }
    ]
  },
  {
    "orderListId": 28,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "hG7hFNxJV6cZy3Ze4AUT4d",
    "transactionTime": 1565245913407,
    "symbol": "LTCBTC",
    "orders": [
      {
        "symbol": "LTCBTC",
        "orderId": 2,
        "clientOrderId": "j6lFOfbmFMRjTYA7rRJ0LP"
      },
      {
        "symbol": "LTCBTC",
        "orderId": 3,
        "clientOrderId": "z0KCjOdditiLS5ekAFtK81"
      }
    ]
  }
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
