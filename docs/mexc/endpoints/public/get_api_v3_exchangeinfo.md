# Exchange Information

> Response

```
{
    "symbol": "TOMO3LUSDT",
    "status": "ENABLED",
    "baseAsset": "TOMO3L",
    "baseAssetPrecision": 2,
    "quoteAsset": "USDT",
    "quotePrecision": 3,
    "quoteAssetPrecision": 3,
    "baseCommissionPrecision": 2,
    "quoteCommissionPrecision": 3,
    "orderTypes": [
        "LIMIT",
        "LIMIT_MAKER"
    ],
    "quoteOrderQtyMarketAllowed": false,
    "isSpotTradingAllowed": false,
    "isMarginTradingAllowed": false,
    "quoteAmountPrecision": "5",
    "baseSizePrecision": "0.0001",
    "permissions": [
        "SPOT",
        "LIMIT"
    ],
    "filters": [],
    "maxQuoteAmount": "5000000",
    "makerCommission": "0.002",
    "takerCommission": "0.002",
    "tradeSideType":"1"
}

```

-   **GET** `/api/v3/exchangeInfo`

Current exchange trading rules and symbol information

**Weight(IP):** 10

**Parameter**:

There are 3 possible options:

| Method | **Example** |
| --- | --- |
| No parameter | curl -X GET "https://api.mexc.com/api/v3/exchangeInfo" |
| symbol | curl -X GET "https://api.mexc.com/api/v3/exchangeInfo?symbol=MXUSDT" |
| symbols | curl -X GET "https://api.mexc.com/api/v3/exchangeInfo?symbols=MXUSDT,BTCUSDT" |

**Response:**

| Name | Type | Description |
| --- | --- | --- |
| timezone | string | timezone |
| serverTime | long | server Time |
| rateLimits | Array | rate Limits |
| exchangeFilters | Array | exchange Filters |
| symbol | String | symbol |
| status | String | status:1 - online, 2 - Pause, 3 - offline |
| baseAsset | String | base Asset |
| baseAssetPrecision | Int | base Asset Precision |
| quoteAsset | String | quote Asset |
| quotePrecision | Int | quote Precision |
| quoteAssetPrecision | Int | quote Asset Precision |
| baseCommissionPrecision | Int | base Commission Precision |
| quoteCommissionPrecision | Int | quote Commission Precision |
| orderTypes | Array | [Order Type](#order_type) |
| quoteOrderQtyMarketAllowed | Boolean | quoteOrderQtyMarketAllowed |
| isSpotTradingAllowed | Boolean | allow api spot trading |
| isMarginTradingAllowed | Boolean | allow api margin trading |
| permissions | Array | permissions |
| maxQuoteAmount | String | max Quote Amount |
| makerCommission | String | marker Commission |
| takerCommission | String | taker Commission |
| quoteAmountPrecision | string | min order amount |
| baseSizePrecision | string | min order quantity |
| quoteAmountPrecisionMarket | string | min order amount in market order |
| maxQuoteAmountMarket | String | max quote Amount in market order |
| tradeSideType | String | tradeSide Type:1 - All, 2 - buy order only, 3 - Sell order only, 4 - Close |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#exchange-information
