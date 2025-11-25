# GET /api/v3/exchangeInfo

**Source:**
https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#exchange-information

> Response

```json
{
  "symbol": "METALUSDT",
  "status": "1",
  "baseAsset": "METAL",
  "baseAssetPrecision": 2,
  "quoteAsset": "USDT",
  "quotePrecision": 5,
  "quoteAssetPrecision": 5,
  "baseCommissionPrecision": 2,
  "quoteCommissionPrecision": 5,
  "orderTypes": ["LIMIT", "MARKET", "LIMIT_MAKER"],
  "isSpotTradingAllowed": true,
  "isMarginTradingAllowed": false,
  "quoteAmountPrecision": "1",
  "baseSizePrecision": "0.1",
  "permissions": ["SPOT"],
  "filters": [
    {
      "filterType": "PERCENT_PRICE_BY_SIDE",
      "bidMultiplierUp": "5",
      "askMultiplierDown": "0.2"
    }
  ],
  "maxQuoteAmount": "2000000",
  "makerCommission": "0",
  "takerCommission": "0.0005",
  "quoteAmountPrecisionMarket": "1",
  "maxQuoteAmountMarket": "100000",
  "fullName": "Metal Blockchain",
  "tradeSideType": "1",
  "contractAddress": "xtokens",
  "st": false
}
```

- **GET** `/api/v3/exchangeInfo`

Current exchange trading rules and symbol information

**Weight(IP):** 10

**Parameter**:

There are 3 possible options:

| Method       | **Example**                                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| No parameter | curl -X GET "[https://api.mexc.com/api/v3/exchangeInfo](https://api.mexc.com/api/v3/exchangeInfo "https://api.mexc.com/api/v3/exchangeInfo")"                                                                      |
| symbol       | curl -X GET "[https://api.mexc.com/api/v3/exchangeInfo?symbol=MXUSDT](https://api.mexc.com/api/v3/exchangeInfo?symbol=MXUSDT "https://api.mexc.com/api/v3/exchangeInfo?symbol=MXUSDT")"                            |
| symbols      | curl -X GET "[https://api.mexc.com/api/v3/exchangeInfo?symbols=MXUSDT,BTCUSDT](https://api.mexc.com/api/v3/exchangeInfo?symbols=MXUSDT,BTCUSDT "https://api.mexc.com/api/v3/exchangeInfo?symbols=MXUSDT,BTCUSDT")" |

**Response:**

| Name                       | Type    | Description                                                                |
| -------------------------- | ------- | -------------------------------------------------------------------------- |
| timezone                   | string  | timezone                                                                   |
| serverTime                 | long    | server Time                                                                |
| rateLimits                 | Array   | rate Limits                                                                |
| exchangeFilters            | Array   | exchange Filters                                                           |
| symbol                     | String  | symbol                                                                     |
| status                     | String  | status:1 - online, 2 - Pause, 3 - offline                                  |
| baseAsset                  | String  | base Asset                                                                 |
| baseAssetPrecision         | Int     | base Asset Precision                                                       |
| quoteAsset                 | String  | quote Asset                                                                |
| quotePrecision             | Int     | quote Precision                                                            |
| quoteAssetPrecision        | Int     | quote Asset Precision                                                      |
| baseCommissionPrecision    | Int     | base Commission Precision                                                  |
| quoteCommissionPrecision   | Int     | quote Commission Precision                                                 |
| orderTypes                 | Array   | [Order Type](#order_type "Order Type")                                     |
| isSpotTradingAllowed       | Boolean | allow api spot trading                                                     |
| isMarginTradingAllowed     | Boolean | allow api margin trading                                                   |
| permissions                | Array   | permissions                                                                |
| filterType                 | String  | filter type:PERCENT_PRICE_BY_SIDE                                          |
| bidMultiplierUp            | String  | bidMultiplierUp                                                            |
| askMultiplierDown          | String  | askMultiplierDown                                                          |
| maxQuoteAmount             | String  | max Quote Amount                                                           |
| makerCommission            | String  | marker Commission                                                          |
| takerCommission            | String  | taker Commission                                                           |
| quoteAmountPrecision       | string  | min order amount                                                           |
| baseSizePrecision          | string  | min order quantity                                                         |
| quoteAmountPrecisionMarket | string  | min order amount in market order                                           |
| maxQuoteAmountMarket       | String  | max quote Amount in market order                                           |
| tradeSideType              | String  | tradeSide Type:1 - All, 2 - buy order only, 3 - Sell order only, 4 - Close |
| contractAddress            | String  | contract Address                                                           |
| st                         | String  | symbol st status:false,true                                                |

filter parameter description:

- lastPrice means using the latest trade price, orderPrice means the order
  placement price.
- For buy orders (only for LIMIT, IMMEDIATE_OR_CANCEL, FILL_OR_KILL):
  `orderPrice <= lastPrice * bidMultiplierUp`
- For sell orders: `orderPrice >= lastPrice * askMultiplierDown`
