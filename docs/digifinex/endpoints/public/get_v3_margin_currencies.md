# GET /v3/margin/currencies

**Title:** Currencies which support margin trading

**Source:** [Currencies which support margin trading](https://docs.digifinex.com/en-ww/spot/v3/rest.html#currencies-which-support-margin-trading)

## Authentication

Not Required (Public Endpoint)

---

## Currencies which support margin trading

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/margin/currencies`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "funding_time": "GMT+8 10:00:00",
  "currencys": [
    "BTC",
    "USDT",
    "ETH",
    "XRP"
  ],
  "margin_fees": [
    {
      "currency_mark": "USDT",
      "level": 2,
      "range": "[8-14]",
      "loan_fees": 0.001
    }
  ]
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| currencys | true | list | Currencys List |
| margin\_fees | true | object | Margin Fees |
| currency\_mark | true | str | Currency |
| loan\_fees | true | float | Loan Fees |
| range | true | str | Range |
| level | true | int | Level |
| code | true | int | Status |
| funding\_time | true | str | Funding Time |