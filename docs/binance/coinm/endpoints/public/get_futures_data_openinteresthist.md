## Open Interest Statistics

### API Description

Query open interest stats

### HTTP Request

GET `/futures/data/openInterestHist`

### Request Weight

**1**

### Request Parameters

| Name         | Type   | Mandatory | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| pair         | STRING | YES       | BTCUSD                                          |
| contractType | ENUM   | YES       | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL   |
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
	  "pair": "BTCUSD",
	  "contractType": "CURRENT_QUARTER",
	  "sumOpenInterest": "20403",  //unit: cont
	  "sumOpenInterestValue": "176196512.23400000", //unit: base asset
	  "timestamp": 1591261042378
   },
   {
     "pair": "BTCUSD",
	  "contractType": "CURRENT_QUARTER",
	  "sumOpenInterest": "20401",
	  "sumOpenInterestValue": "176178704.98700000",
	  "timestamp": 1583128200000
   }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics](https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics)
