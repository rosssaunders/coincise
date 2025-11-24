## ADL Risk

### API Description

Query the symbol-level ADL risk rating. The ADL risk rating measures the
likelihood of ADL during liquidation, and the rating takes into account the
insurance fund balance, position concentration on the symbol, order book depth,
price volatility, average leverage, unrealized PnL, and margin utilization at
the symbol level. The rating can be high, medium and low, and is updated every
30 minutes.

### HTTP Request

GET `/fapi/v1/symbolAdlRisk`

### Request Weight

**1**

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

### Response Example

> **Response:**

```
{
	"symbol": "BTCUSDT",
	"adlRisk": "low",  // ADL Risk rating
	"updateTime": 1597370495002
}
```

> **OR (when symbol not sent)**

```
[
	{
	    "symbol": "BTCUSDT",
	    "adlRisk": "low",  // ADL Risk rating
	    "updateTime": 1597370495002
	},
	{
	    "symbol": "ETHUSDT",
	    "adlRisk": "high", // ADL Risk rating
	    "updateTime": 1597370495004
	}
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/ADL-Risk](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/ADL-Risk)
