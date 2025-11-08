# GET /v2/orders/{orderId}

**Summary**: Get Order by ID

## Description

Retrieve a specific order using its unique identifier.

This endpoint requires [authentication](#overview--generate-a-jwt-token) and is
subjected to rate limiting.

**Operation ID**: trade-get-order-by-id-v2

**Tags**: orders

**Endpoint**: `GET /v2/orders/{orderId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/Order"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
