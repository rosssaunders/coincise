# Historical Exercise Records

### API Description

Get historical exercise records.

- REALISTIC_VALUE_STRICKEN -> Exercised
- EXTRINSIC_VALUE_EXPIRED -> Expired OTM

### HTTP Request

GET `/eapi/v1/exerciseHistory`

### Request Weight

**3**

### Request Parameters

| Name       | Type   | Mandatory | Description                           |
| ---------- | ------ | --------- | ------------------------------------- |
| underlying | STRING | NO        | Underlying index like BTCUSDT         |
| startTime  | LONG   | NO        | Start Time                            |
| endTime    | LONG   | NO        | End Time                              |
| limit      | INT    | NO        | Number of records Default:100 Max:100 |

### Response Example

```json
[
  {
    "symbol": "BTC-220121-60000-P", // symbol
    "strikePrice": "60000", // strike price
    "realStrikePrice": "38844.69652571", // real strike price
    "expiryDate": 1642752000000, // Exercise time
    "strikeResult": "REALISTIC_VALUE_STRICKEN" // strike result
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Historical-Exercise-Records](https://developers.binance.com/docs/derivatives/option/market-data/Historical-Exercise-Records)
