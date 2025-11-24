## Basis

### API Description

Query basis

### HTTP Request

GET `/futures/data/basis`

### Request Weight

**1**

### Request Parameters

| Name         | Type   | Mandatory | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| pair         | STRING | YES       | BTCUSD                                          |
| contractType | ENUM   | YES       | CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL        |
| period       | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit        | LONG   | NO        | Default 30,Max 500                              |
| startTime    | LONG   | NO        |                                                 |
| endTime      | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

### Response Example

```
[
   {
        "indexPrice": "29269.93972727",
        "contractType": "CURRENT_QUARTER",
        "basisRate": "0.0024",
        "futuresPrice": "29341.3",
        "annualizedBasisRate": "0.0283",
        "basis": "71.36027273",
        "pair": "BTCUSD",
        "timestamp": 1653381600000
   }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis](https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis)
