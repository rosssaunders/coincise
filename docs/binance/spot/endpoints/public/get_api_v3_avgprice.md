## Current average price​

```
GET /api/v3/avgPrice
```

Current average price for a symbol.

**Weight:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |

**Data Source:** Memory

**Response:**

```
{
  "mins": 5,                    // Average price interval (in minutes)
  "price": "9.35751834",        // Average price
  "closeTime": 1694061154503    // Last trade time
}
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
