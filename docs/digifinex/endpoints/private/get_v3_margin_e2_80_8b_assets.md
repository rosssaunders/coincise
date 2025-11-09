# GET /v3/margin%E2%80%8B/assets

**Title:** Margin assets

**Source:**
[Margin assets](https://docs.digifinex.com/en-ww/spot/v3/rest.html#margin-assets)

## Authentication

Required (Private Endpoint)

---

## Margin assets

### HTTP Request

- GET `https://openapi.digifinex.com/v3/margin​/assets`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "total": 0,
  "free": 0,
  "unrealized_pnl": 0,
  "list": [
    {
      "currency": "BTC",
      "valuation_rate": 1,
      "free": 4723846.89208129,
      "total": 0
    }
  ]
}

```

### Response Content

| Field          | Mandatory | Request Type | Description    |
| -------------- | --------- | ------------ | -------------- |
| list           | true      | object       | Account List   |
| currency       | true      | string       | Currency Name  |
| free           | true      | float        | Free           |
| total          | true      | float        | Total          |
| code           | true      | int          | Status         |
| valuation_rate | true      | float        | valuation rate |
