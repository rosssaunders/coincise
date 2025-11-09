# GET /v3/trades/symbols

**Title:** Whether is API trading enabled for the trading pair

**Source:** [Whether is API trading enabled for the trading pair](https://docs.digifinex.com/en-ww/spot/v3/rest.html#whether-is-api-trading-enabled-for-the-trading-pair)

## Authentication

Not Required (Public Endpoint)

---

## Whether is API trading enabled for the trading pair

### HTTP request

-   GET `https://openapi.digifinex.com/v3/trades/symbols`

### Request parameters

This interface does not accept any parameters.

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
      "is_allow": 1,
      "order_types": [
        "LIMIT",
        "MARKET"
      ]
    }
  ]
}

```

### Return parameters

| Parameters | Required | Type | Description |
| --- | --- | --- | --- |
| symbol\_list | true | object | symbol list |
| order\_types | true | list | order types |
| quote\_asset | true | str | quote asset |
| minimum\_value | true | int | minimum value |
| amount\_precision | true | int | amount precision |
| status | true | str | status |
| minimum\_amount | true | float | minimum\_amount |
| symbol | true | str | symbol |
| zone | true | str | zone |
| base\_asset | true | str | base asset |
| price\_precision | true | int | price precision |
| code | true | int | status |
| is\_allow | true | int | 1 true 0 false |