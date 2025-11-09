# GET /v3/time

**Title:** Server timestamp

**Source:**
[Server timestamp](https://docs.digifinex.com/en-ww/spot/v3/rest.html#server-timestamp)

## Authentication

Not Required (Public Endpoint)

---

## Server timestamp

### HTTP Request

- GET `https://openapi.digifinex.com/v3/time`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
    "server_time": 1589873762,
    "code": 0
}

```

### Response Content

| Field       | Mandatory | Request Type | Description      |
| ----------- | --------- | ------------ | ---------------- |
| server_time | true      | int          | Server timestamp |
| code        | true      | int          | Status           |
