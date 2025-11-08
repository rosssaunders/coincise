# Exchange Information

### API Description

Current exchange trading rules and symbol information

### HTTP Request

GET `/eapi/v1/exchangeInfo`

### Request Weight

**1**

### Request Parameters

NONE

### Response Example

```json
{
  "timezone": "UTC", // Time zone used by the server
  "serverTime": 1592387337630, // Current system time
  "optionContracts": [
    // Option contract underlying asset info
    {
      "baseAsset": "BTC", // Base currency
      "quoteAsset": "USDT", // Quotation asset
      "underlying": "BTCUSDT", // Name of the underlying asset of the option contract
      "settleAsset": "USDT" // Settlement currency
    }
  ],
  "optionAssets": [
    // Option asset info
    {
      "name": "USDT" // Asset name
    }
  ],
  "optionSymbols": [
    // Option trading pair info
    {
      "expiryDate": 1660521600000, // expiry time
      "filters": [
        {
          "filterType": "PRICE_FILTER",
          "minPrice": "0.02",
          "maxPrice": "80000.01",
          "tickSize": "0.01"
        },
        {
          "filterType": "LOT_SIZE",
          "minQty": "0.01",
          "maxQty": "100",
          "stepSize": "0.01"
        }
      ],
      "symbol": "BTC-220815-50000-C", // Trading pair name
      "side": "CALL", // Direction: CALL long, PUT short
      "strikePrice": "50000", // Strike price
      "underlying": "BTCUSDT", // Underlying asset of the contract
      "unit": 1, // Contract unit, the quantity of the underlying asset represented by a single contract.
      "makerFeeRate": "0.0002", // maker commission rate
      "takerFeeRate": "0.0002", // taker commission rate
      "liquidationFeeRate": "0.0019000", // liquidation fee rate
      "minQty": "0.01", // Minimum order quantity
      "maxQty": "100", // Maximum order quantity
      "initialMargin": "0.15", // Initial Magin Ratio
      "maintenanceMargin": "0.075", // Maintenance Margin Ratio
      "minInitialMargin": "0.1", // Min Initial Margin Ratio
      "minMaintenanceMargin": "0.05", // Min Maintenance Margin Ratio
      "priceScale": 2, // price precision
      "quantityScale": 2, // quantity precision
      "quoteAsset": "USDT" // Quotation asset
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 300
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Exchange-Information](https://developers.binance.com/docs/derivatives/option/market-data/Exchange-Information)
