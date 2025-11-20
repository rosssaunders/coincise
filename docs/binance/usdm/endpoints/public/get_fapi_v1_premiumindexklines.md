## Premium index Kline Data

### API Description

Premium index kline bars of a symbol. Klines are uniquely identified by their
open time.

### HTTP Request

GET `/fapi/v1/premiumIndexKlines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |                        |
| interval  | ENUM   | YES       |                        |
| startTime | LONG   | NO        |                        |
| endTime   | LONG   | NO        |                        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```
[
  [
    1691603820000,          // Open time
    "-0.00042931",          // Open
    "-0.00023641",          // High
    "-0.00059406",          // Low
    "-0.00043659",          // Close
    "0",                    // Ignore
    1691603879999,          // Close time
    "0",                    // Ignore
    12,                     // Ignore
    "0",                    // Ignore
    "0",                    // Ignore
    "0"                     // Ignore
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Premium-Index-Kline-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Premium-Index-Kline-Data)
