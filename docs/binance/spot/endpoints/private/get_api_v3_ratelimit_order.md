## Query Unfilled Order Count (USER_DATA)​

```
GET /api/v3/rateLimit/order
```

Displays the user's unfilled order count for all intervals.

**Weight:** 40

**Parameters:**

| Name                                                                                                     | Type    | Mandatory | Description                               |
| -------------------------------------------------------------------------------------------------------- | ------- | --------- | ----------------------------------------- |
| recvWindow                                                                                               | DECIMAL | NO        | The value cannot be greater than `60000`. |
| Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp                                                                                                | LONG    | YES       |                                           |

**Data Source:** Memory

**Response:**

```
[
  {
    "rateLimitType": "ORDERS",
    "interval": "SECOND",
    "intervalNum": 10,
    "limit": 50,
    "count": 0
  },
  {
    "rateLimitType": "ORDERS",
    "interval": "DAY",
    "intervalNum": 1,
    "limit": 160000,
    "count": 0
  }
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
