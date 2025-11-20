## Get Funding Rate History of Perpetual Futures

### API Description

Get Funding Rate History of Perpetual Futures

### HTTP Request

GET `/dapi/v1/fundingRate`

### Request Weight

**1**

### Request Parameters

| Name      | Type   | Mandatory | Description                                          |
| --------- | ------ | --------- | ---------------------------------------------------- |
| symbol    | STRING | YES       |                                                      |
| startTime | LONG   | NO        | Timestamp in ms to get funding rate from INCLUSIVE.  |
| endTime   | LONG   | NO        | Timestamp in ms to get funding rate until INCLUSIVE. |
| limit     | INT    | NO        | Default 100; max 1000                                |

> - empty array will be returned for delivery symbols.

### Response Example

```
[
	{
		"symbol": "BTCUSD_PERP",
  		"fundingTime": 1596038400000,
  		"fundingRate": "-0.00300000"
  	},
 	{
 		"symbol": "BTCUSD_PERP",
  		"fundingTime": 1596067200000,
  		"fundingRate": "-0.00300000"
  	}
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures](https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures)
