## Account trade list (USER_DATA)​

```
GET /api/v3/myTrades
```

Get trades for a specific account and symbol.

**Weight:**

| Condition       | Weight |
| --------------- | ------ |
| Without orderId | 20     |
| With orderId    | 5      |

**Parameters:**

| Name                                                                                                     | Type    | Mandatory | Description                                             |
| -------------------------------------------------------------------------------------------------------- | ------- | --------- | ------------------------------------------------------- |
| symbol                                                                                                   | STRING  | YES       |                                                         |
| orderId                                                                                                  | LONG    | NO        | This can only be used in combination with `symbol`.     |
| startTime                                                                                                | LONG    | NO        |                                                         |
| endTime                                                                                                  | LONG    | NO        |                                                         |
| fromId                                                                                                   | LONG    | NO        | TradeId to fetch from. Default gets most recent trades. |
| limit                                                                                                    | INT     | NO        | Default: 500; Maximum: 1000.                            |
| recvWindow                                                                                               | DECIMAL | NO        | The value cannot be greater than `60000`.               |
| Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp                                                                                                | LONG    | YES       |                                                         |

**Notes:**

- If `fromId` is set, it will get trades >= that `fromId`. Otherwise most recent
  trades are returned.
- The time between `startTime` and `endTime` can't be longer than 24 hours.
- These are the supported combinations of all parameters:
  - `symbol`
  - `symbol` + `orderId`
  - `symbol` + `startTime`
  - `symbol` + `endTime`
  - `symbol` + `fromId`
  - `symbol` + `startTime` + `endTime`
  - `symbol`\+ `orderId` + `fromId`

**Data Source:** Memory => Database

**Response:**

```
[
  {
    "symbol": "BNBBTC",
    "id": 28457,
    "orderId": 100234,
    "orderListId": -1,
    "price": "4.00000100",
    "qty": "12.00000000",
    "quoteQty": "48.000012",
    "commission": "10.10000000",
    "commissionAsset": "BNB",
    "time": 1499865549590,
    "isBuyer": true,
    "isMaker": false,
    "isBestMatch": true
  }
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
