## Query Order Amendments (USER\_DATA)​

```
GET /api/v3/order/amendments
```

Queries all amendments of a single order.

**Weight**: 4

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| orderId | LONG | YES |  |
| fromExecutionId | LONG | NO |  |
| limit | LONG | NO | Default:500; Maximum: 1000 |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Data Source:**

Database

**Response:**

```
[
  {
      "symbol": "BTCUSDT",
      "orderId": 9,
      "executionId": 22,
      "origClientOrderId": "W0fJ9fiLKHOJutovPK3oJp",
      "newClientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi",
      "origQty": "5.00000000",
      "newQty": "4.00000000",
      "time": 1741669661670
  },
  {
      "symbol": "BTCUDST",
      "orderId": 9,
      "executionId": 25,
      "origClientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi",
      "newClientOrderId": "5uS0r35ohuQyDlCzZuYXq2",
      "origQty": "4.00000000",
      "newQty": "3.00000000",
      "time": 1741672924895
  }
]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
