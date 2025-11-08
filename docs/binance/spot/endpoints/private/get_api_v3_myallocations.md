## Query Allocations (USER\_DATA)​

```
GET /api/v3/myAllocations
```

Retrieves allocations resulting from SOR order placement.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | Yes |  |
| startTime | LONG | No |  |
| endTime | LONG | No |  |
| fromAllocationId | INT | No |  |
| limit | INT | No | Default: 500; Maximum: 1000 |
| orderId | LONG | No |  |
| recvWindow | DECIMAL | No | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | No |  |

Supported parameter combinations:

| Parameters | Response |
| --- | --- |
| `symbol` | allocations from oldest to newest |
| `symbol` + `startTime` | oldest allocations since `startTime` |
| `symbol` + `endTime` | newest allocations until `endTime` |
| `symbol` + `startTime` + `endTime` | allocations within the time range |
| `symbol` + `fromAllocationId` | allocations by allocation ID |
| `symbol` + `orderId` | allocations related to an order starting with oldest |
| `symbol` + `orderId` + `fromAllocationId` | allocations related to an order by allocation ID |

**Note:** The time between `startTime` and `endTime` can't be longer than 24 hours.

**Data Source:** Database

**Response:**

```
[  {    "symbol": "BTCUSDT",    "allocationId": 0,    "allocationType": "SOR",    "orderId": 1,    "orderListId": -1,    "price": "1.00000000",    "qty": "5.00000000",    "quoteQty": "5.00000000",    "commission": "0.00000000",    "commissionAsset": "BTC",    "time": 1687506878118,    "isBuyer": true,    "isMaker": false,    "isAllocator": false  }]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
