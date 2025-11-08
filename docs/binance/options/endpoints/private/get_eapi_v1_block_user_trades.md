# Account Block Trade List (USER_DATA)

### API Description

Gets block trades for a specific account.

### HTTP Request

GET `/eapi/v1/block/user-trades`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory |  Description                           |
| ---------- | ------ | --------- | -------------------------------------- |
| endTime    | LONG   | NO        |                                        |
| startTime  | LONG   | NO        |                                        |
| underlying | STRING | NO        |                                        |
| recvWindow | LONG   | NO        | The value cannot be greater than 60000 |
| timestamp  | LONG   | YES       |                                        |

### Response Example

```json
[
  {
    "parentOrderId": "4675011431944499201",
    "crossType": "USER_BLOCK",
    "legs": [
      {
        "createTime": 1730170445600,
        "updateTime": 1730170445600,
        "symbol": "BNB-241101-700-C",
        "orderId": "4675011431944499203",
        "orderPrice": 2.8,
        "orderQuantity": 1.2,
        "orderStatus": "FILLED",
        "executedQty": 1.2,
        "executedAmount": 3.36,
        "fee": 0.336,
        "orderType": "PREV_QUOTED",
        "orderSide": "BUY",
        "id": "1125899906900937837",
        "tradeId": 1,
        "tradePrice": 2.8,
        "tradeQty": 1.2,
        "tradeTime": 1730170445600,
        "liquidity": "TAKER",
        "commission": 0.336
      }
    ],
    "blockTradeSettlementKey": "7d085e6e-a229-2335-ab9d-6a581febcd25"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Account-Block-Trade-List](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Account-Block-Trade-List)
