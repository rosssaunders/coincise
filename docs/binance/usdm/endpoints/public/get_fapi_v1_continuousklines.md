## Continuous Contract Kline/Candlestick Data

### API Description

Kline/candlestick bars for a specific contract type. Klines are uniquely
identified by their open time.

### HTTP Request

GET `/fapi/v1/continuousKlines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name         | Type   | Mandatory | Description            |
| ------------ | ------ | --------- | ---------------------- |
| pair         | STRING | YES       |                        |
| contractType | ENUM   | YES       |                        |
| interval     | ENUM   | YES       |                        |
| startTime    | LONG   | NO        |                        |
| endTime      | LONG   | NO        |                        |
| limit        | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

> - Contract type:
>   - PERPETUAL
>   - CURRENT_QUARTER
>   - NEXT_QUARTER

### Response Example

```
[
  [
    1607444700000,      	// Open time
    "18879.99",       	 	// Open
    "18900.00",       	 	// High
    "18878.98",       	 	// Low
    "18896.13",      	 	// Close (or latest price)
    "492.363", 			 	// Volume
    1607444759999,       	// Close time
    "9302145.66080",    	// Quote asset volume
    1874,             		// Number of trades
    "385.983",    			// Taker buy volume
    "7292402.33267",      	// Taker buy quote asset volume
    "0" 					// Ignore.
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data)
