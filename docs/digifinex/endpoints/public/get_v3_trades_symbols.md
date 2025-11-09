# GET /v3/trades/symbols

**Title:** Whether is API trading enabled for the trading pair

**Source:**
[Whether is API trading enabled for the trading pair](https://docs.digifinex.com/en-ww/spot/v3/rest.html#whether-is-api-trading-enabled-for-the-trading-pair)

## Authentication

Not Required (Public Endpoint)

---

## Whether is API trading enabled for the trading pair

### HTTP request

- GET `https://openapi.digifinex.com/v3/trades/symbols`

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

| Parameters       | Required | Type   | Description      |
| ---------------- | -------- | ------ | ---------------- |
| symbol_list      | true     | object | symbol list      |
| order_types      | true     | list   | order types      |
| quote_asset      | true     | str    | quote asset      |
| minimum_value    | true     | int    | minimum value    |
| amount_precision | true     | int    | amount precision |
| status           | true     | str    | status           |
| minimum_amount   | true     | float  | minimum_amount   |
| symbol           | true     | str    | symbol           |
| zone             | true     | str    | zone             |
| base_asset       | true     | str    | base asset       |
| price_precision  | true     | int    | price precision  |
| code             | true     | int    | status           |
| is_allow         | true     | int    | 1 true 0 false   |
