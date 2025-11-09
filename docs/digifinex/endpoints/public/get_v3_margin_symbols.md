# GET /v3/margin/symbols

**Title:** Margin trading pair symbol

**Source:** [Margin trading pair symbol](https://docs.digifinex.com/en-ww/spot/v3/rest.html#margin-trading-pair-symbol)

## Authentication

Not Required (Public Endpoint)

---

## Margin trading pair symbol

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/margin/symbols`

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
      "liquidation_rate": 0.3,
      "order_types": [
        "LIMIT",
        "MARKET"
      ]
    }
  ]
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| symbol\_list | true | object | Margin trading pair symbol |
| order\_types | true | list | Trading Type |
| quote\_asset | true | str | Quote Asset |
| minimum\_value | true | int | Minimum Value |
| amount\_precision | true | int | Volume Precision |
| status | true | str | Status |
| minimum\_amount | true | float | Minmum Amount |
| liquidation\_rate | true | float | Liquidation Rate |
| symbol | true | str | Symbol Name |
| zone | true | str | Zone |
| base\_asset | true | str | Base Asset |
| price\_precision | true | int | Price Precision |
| code | true | int | Status |