# Option Position Information (USER_DATA)

### API Description

Get current position information.

### HTTP Request

GET `/eapi/v1/position`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
[
  {
    "entryPrice": "1000",               // Average entry price
    "symbol": "BTC-200730-9000-C",      // Option trading pair
    "side": "SHORT",                    // Position direction
    "quantity": "-0.1",                 // Number of positions (positive numbers represent long positions, negative number represent short positions)
    "reducibleQty": "0",                // Number of positions that can be reduced
    "markValue": "105.00138",           // Current market value
    "ror": "-0.05",                     // Rate of return
    "unrealizedPNL": "-5.00138",        // Unrealized profit/loss
    "markPrice": "1050.0138",           // Mark price
    "strikePrice": "9000",              // Strike price
    "positionCost": "1000.0000",        // Position cost
    "expiryDate": 1593511200000         // Exercise time
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT"
   }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Option-Position-Information](https://developers.binance.com/docs/derivatives/option/trade/Option-Position-Information)
