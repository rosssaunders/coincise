## Open Interest

### API Description

Get present open interest of a specific symbol.

### HTTP Request

GET `/dapi/v1/openInterest`

### Request Weight

**1**

### Request Parameters

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |

### Response Example

```
{
	"symbol": "BTCUSD_200626",
	"pair": "BTCUSD",
	"openInterest": "15004",
	"contractType": "CURRENT_QUARTER",
	"time": 1591261042378
}
```

> Source: [https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest](https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest)
