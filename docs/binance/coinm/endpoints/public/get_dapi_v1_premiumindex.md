## Index Price and Mark Price

### API Description

Query index price and mark price

### HTTP Request

GET `/dapi/v1/premiumIndex`

### Request Weight

**10**

### Request Parameters

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | NO |  |
| pair | STRING | NO |  |

### Response Example

> with symbol

```
[
	{
		"symbol": "BTCUSD_PERP",
  		"pair": "BTCUSD",
  		"markPrice": "11029.69574559",	// mark price
  		"indexPrice": "10979.14437500",	// index price
  		"estimatedSettlePrice": "10981.74168236",  // Estimated Settle Price, only useful in the last hour before the settlement starts.
  		"lastFundingRate": "0.00071003",	 // the lasted funding rate, for perpetual contract symbols only. For delivery symbols, "" will be shown.
  		"interestRate": "0.00010000",		// the base asset interest rate, for perpetual contract symbols only. For delivery symbols, "" will be shown.
  		"nextFundingTime": 1596096000000,	 // For perpetual contract symbols only. For delivery symbols, 0 will be shown
  		"time": 1596094042000
  	},
 	{
 		"symbol": "BTCUSD_200925",	
 		"pair": "BTCUSD",
  		"markPrice": "12077.01343750",
  		"indexPrice": "10979.10312500",
  		"estimatedSettlePrice": "10981.74168236",
  		"lastFundingRate": "",
  		"interestRate": "",	
  		"nextFundingTime": 0,
  		"time": 1596094042000
  	}
]
```

> Source: [https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price](https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price)
