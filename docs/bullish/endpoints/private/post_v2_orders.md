# POST /v2/orders

**Summary**: Create Order

## Description

Creates an order, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering and addition of null fields in the request
body. Quantities and prices does not require strict precision. Eg. for asset
precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are all
accepted.

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

**Operation ID**: trade-create-order-v2

**Tags**: orders

**Endpoint**: `POST /v2/orders`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

new order request body

**Required**: Yes

### Content-Type: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CreateOrderCommandV3"
}
```

## Responses

### 200 - Status OK. The create order command was successfully acknowledged. To check the current status of the order, query [Get Order by ID](#get-/trading-api/v2/orders/-orderId-) using the `orderId` received in the response payload. Please consult the section [How To Ensure The Order Of _Create Order_ or _Cancel Order_ Requests](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) for more information.

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CreateOrderCommandResponseV3"
}
```

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOrderEntryResponse"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
