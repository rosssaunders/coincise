# Open Interest Statistics

### API Description

Open Interest Statistics

### HTTP Request

GET `/futures/data/openInterestHist`

### Request Weight

**0**

### Request Parameters

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |                                                 |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |                                                 |
| endTime   | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 1 month is available.
> - IP rate limit 1000 requests/5min

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "sumOpenInterest": "20403.63700000", // total open interest
    "sumOpenInterestValue": "150570784.07809979", // total open interest value
    "CMCCirculatingSupply": "165880.538", // circulating supply provided by CMC
    "timestamp": "1583127900000"
  },
  {
    "symbol": "BTCUSDT",
    "sumOpenInterest": "20401.36700000",
    "sumOpenInterestValue": "149940752.14464448",
    "CMCCirculatingSupply": "165900.14853",
    "timestamp": "1583128200000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Open-Interest-Statistics](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Open-Interest-Statistics)
