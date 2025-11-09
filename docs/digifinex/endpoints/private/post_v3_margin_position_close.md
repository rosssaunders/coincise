# POST /v3/margin/position/close

**Title:** Close positions

**Source:** [Close positions](https://docs.digifinex.com/en-ww/spot/v3/rest.html#close-positions)

## Authentication

Required (Private Endpoint)

---

## Close positions

### HTTP Request

-   POST `https://openapi.digifinex.com/v3/margin/position/close`

### Request Parameters

说明：以市场价格平掉仓位

| Field | Request Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | str | true | Symbol Name |

> Response:

```

{
  "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| code | true | int | Status |