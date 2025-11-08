# Account Trade List (USER_DATA)

### API Description

Get trades for a specific account and symbol.

### HTTP Request

`GET /eapi/v1/userTrades (HMAC SHA256)`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                      |
| ---------- | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol     | STRING | NO        | Option symbol, e.g BTC-200730-9000-C                                             |
| fromId     | LONG   | NO        | Trade id to fetch from. Default gets most recent trades, e.g 4611875134427365376 |
| startTime  | LONG   | NO        | Start time, e.g 1593511200000                                                    |
| endTime    | LONG   | NO        | End time, e.g 1593512200000                                                      |
| limit      | INT    | NO        | Default 100; max 1000                                                            |
| recvWindow | LONG   | NO        |                                                                                  |
| timestamp  | LONG   | YES       |                                                                                  |

### Response Example

```json
[
  {
    "id": 4611875134427365377,          // unique id
    "tradeId": 239,                     // trade id
    "orderId": 4611875134427365377,     // order id
    "symbol": "BTC-200730-9000-C",      // option symbol
    "price": "100",                     // trade price
    "quantity": "1",                    // trade quantity
    "fee": "0",                         // fee
    "realizedProfit": "0.00000000",     // realized profit/loss
    "side": "BUY",                      // order side
    "type": "LIMIT",                    // order type
    "volatility": "0.9",                // volatility
    "liquidity": "TAKER",               // TAKER or MAKER     
    "quoteAsset": "USDT",               // quote asset
    "time": 1592465880683               // trade time
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Account-Trade-List](https://developers.binance.com/docs/derivatives/option/trade/Account-Trade-List)
