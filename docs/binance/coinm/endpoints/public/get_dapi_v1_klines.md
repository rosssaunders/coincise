## Kline/Candlestick Data

### API Description

Kline/candlestick bars for a symbol.  
Klines are uniquely identified by their open time.

- Kline/Candlestick chart intervals:  
  m -> minutes; h -> hours; d -> days; w -> weeks; M -> months
  - 1m
  - 3m
  - 5m
  - 15m
  - 30m
  - 1h
  - 2h
  - 4h
  - 6h
  - 8h
  - 12h
  - 1d
  - 3d
  - 1w
  - 1M

### HTTP Request

GET `/dapi/v1/klines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |

> 1000 | 10

### Request Parameters

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |                        |
| interval  | ENUM   | YES       |                        |
| startTime | LONG   | NO        |                        |
| endTime   | LONG   | NO        |                        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - The difference between `startTime` and `endTime` can only be up to 200 days
> - Between `startTime` and `endTime`, the most recent `limit` data from
>   `endTime` will be returned:
>   - If `startTime` and `endTime` are not sent, current timestamp will be set
>     as `endTime`, and the most recent data will be returned.
>   - If `startTime` is sent only, the timestamp of 200 days after `startTime`
>     will be set as `endTime`(up to the current time)
>   - If `endTime` is sent only, the timestamp of 200 days before `endTime` will
>     be set as `startTime`

### Response Example

```
[
  [
    1591258320000,      	// Open time
    "9640.7",       	 	// Open
    "9642.4",       	 	// High
    "9640.6",       	 	// Low
    "9642.0",      	 	 	// Close (or latest price)
    "206", 			 		// Volume
    1591258379999,       	// Close time
    "2.13660389",    		// Base asset volume
    48,             		// Number of trades
    "119",    				// Taker buy volume
    "1.23424865",      		// Taker buy base asset volume
    "0" 					// Ignore.
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data)
