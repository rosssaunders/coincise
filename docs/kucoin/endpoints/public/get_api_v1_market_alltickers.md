# GET /api/v1/market/allTickers

**Source:** [/api/v1/market/allTickers](https://www.kucoin.com/docs/rest//api/v1/market/allTickers)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Tickers

Request market tickers for all the trading pairs in the market (including 24h volume); takes a snapshot every 2 seconds.  On the rare occasion that we change the currency name, if you still want the changed symbol name, you can use the symbolName field instead of the symbol field via “Get all tickers” endpoint.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.time | required | integer | timestamp |
| data.ticker | required | array |  |
| data.ticker[].symbol | required | string | Symbol |
| data.ticker[].symbolName | required | string | Name of trading pairs, it will change after renaming |
| data.ticker[].buy | required | string | Best bid price |
| data.ticker[].bestBidSize | required | string | Best bid size |
| data.ticker[].sell | required | string | Best ask price |
| data.ticker[].bestAskSize | required | string | Best ask size |
| data.ticker[].changeRate | required | string | 24h change rate |
| data.ticker[].changePrice | required | string | 24h change price |
| data.ticker[].high | required | string | Highest price in 24h |
| data.ticker[].low | required | string | Lowest price in 24h |
| data.ticker[].vol | required | string | 24h volume, executed based on base currency |
| data.ticker[].volValue | required | string | 24h traded amount |
| data.ticker[].last | required | string | Last traded price |
| data.ticker[].averagePrice | required | string | Average trading price in the last 24 hours |
| data.ticker[].takerFeeRate | required | string | Basic Taker Fee |
| data.ticker[].makerFeeRate | required | string | Basic Maker Fee |
| data.ticker[].takerCoefficient | required | string | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
| data.ticker[].makerCoefficient | required | string | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |

