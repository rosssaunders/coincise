# GET /v3/spot/symbols

**Title:** Spot trading pair symbol

**Source:**
[Spot trading pair symbol](https://docs.digifinex.com/en-ww/spot/v3/rest.html#spot-trading-pair-symbol)

## Authentication

Not Required (Public Endpoint)

---

## Spot trading pair symbol

### HTTP Request

- GET `https://openapi.digifinex.com/v3/spot/symbols`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "symbol_list": [
    {
      "status": "TRADING",
      "symbol": "LTC_USDT",
      "quote_asset": "USDT",
      "base_asset": "LTC",
      "amount_precision": 4,
      "price_precision": 2,
      "minimum_amount": 0.001,
      "minimum_value": 2,
      "zone": "MAIN",
      "order_types": [
        "LIMIT",
        "MARKET"
      ]
    }
  ]
}

```

### Response Content

| Field            | Mandatory | Request Type | Description              |
| ---------------- | --------- | ------------ | ------------------------ |
| symbol_list      | true      | object       | Trading Pair Information |
| order_types      | true      | list         | Trading Type             |
| quote_asset      | true      | str          | Quote Asset              |
| minimum_value    | true      | int          | Minimum Value            |
| amount_precision | true      | int          | Volume Precision         |
| status           | true      | str          | Status                   |
| minimum_amount   | true      | float        | Minmum Amount            |
| symbol           | true      | str          | Symbol Name              |
| zone             | true      | str          | Zone                     |
| base_asset       | true      | str          | Base Asset               |
| price_precision  | true      | int          | Price Precision          |
| code             | true      | int          | Status                   |
