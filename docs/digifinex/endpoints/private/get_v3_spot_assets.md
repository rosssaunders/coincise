# GET /v3/spot/assets

**Title:** Spot account assets

**Source:**
[Spot account assets](https://docs.digifinex.com/en-ww/spot/v3/rest.html#spot-account-assets)

## Authentication

Required (Private Endpoint)

---

## Spot account assets

### HTTP Request

- GET `https://openapi.digifinex.com/v3/spot/assets`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "list": [
    {
      "currency": "BTC",
      "free": 4723846.89208129,
      "total": 0
    }
  ]
}

```

### Response Content

| Field    | Mandatory | Request Type | Description   |
| -------- | --------- | ------------ | ------------- |
| list     | true      | object       | Account List  |
| currency | true      | string       | Currency Name |
| free     | true      | float        | Free          |
| total    | true      | float        | Total         |
| code     | true      | int          | Status        |
