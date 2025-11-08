# Option Account Information(TRADE)

### API Description

Get current account information.

### HTTP Request

GET `/eapi/v1/account`

### Request Weight

**3**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "asset": [
    {
      "asset": "USDT",                    // Asset type
      "marginBalance": "1877.52214415",   // Account balance
      "equity": "617.77711415",           // Account equity
      "available": "0",                   // Available funds
      "locked": "2898.92389933",          // locked balance for order and position
      "unrealizedPNL": "222.23697000",    // Unrealized profit/loss
   }
  ],
  "greek": [
    {
      "underlying":"BTCUSDT"            // Option Underlying
      "delta": "-0.05"                  // Account delta
      "gamma": "-0.002"                 // Account gamma
      "theta": "-0.05"                  // Account theta
      "vega": "-0.002"                  // Account vega
    }
  ],
  "time": 1592449455993                 // Time
  "riskLevel": "NORMAL",                // Account risk level
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account](https://developers.binance.com/docs/derivatives/option/account)
