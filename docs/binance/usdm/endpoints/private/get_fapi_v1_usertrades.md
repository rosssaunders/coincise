# Account Trade List (USER_DATA)

### API Description

Get trades for a specific account and symbol.

### HTTP Request

GET `/fapi/v1/userTrades`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                              |
| ---------- | ------ | --------- | -------------------------------------------------------- |
| symbol     | STRING | YES       |                                                          |
| orderId    | LONG   | NO        | This can only be used in combination with `symbol`       |
| startTime  | LONG   | NO        |                                                          |
| endTime    | LONG   | NO        |                                                          |
| fromId     | LONG   | NO        | Trade id to fetch from. Default gets most recent trades. |
| limit      | INT    | NO        | Default 500; max 1000.                                   |
| recvWindow | LONG   | NO        |                                                          |
| timestamp  | LONG   | YES       |                                                          |

> - If `startTime` and `endTime` are both not sent, then the last 7 days' data
>   will be returned.
> - The time between `startTime` and `endTime` cannot be longer than 7 days.
> - The parameter `fromId` cannot be sent with `startTime` or `endTime`.
> - Only support querying trade in the past 6 months

### Response Example

```json
[
  {
    "buyer": false,
    "commission": "-0.07819010",
    "commissionAsset": "USDT",
    "id": 698759,
    "maker": false,
    "orderId": 25851813,
    "price": "7819.01",
    "qty": "0.002",
    "quoteQty": "15.63802",
    "realizedPnl": "-0.91539999",
    "side": "SELL",
    "positionSide": "SHORT",
    "symbol": "BTCUSDT",
    "time": 1569514978020
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Account-Trade-List](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Account-Trade-List)
