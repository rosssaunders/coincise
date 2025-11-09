# GET /v3/ping

**Title:** Server ping

**Source:** [Server ping](https://docs.digifinex.com/en-ww/spot/v3/rest.html#server-ping)

## Authentication

Not Required (Public Endpoint)

---

## Server ping

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/ping`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
    "msg": "pong",
    "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| msg | true | string | Response |
| code | true | int | Status |