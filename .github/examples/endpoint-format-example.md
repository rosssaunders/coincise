# Endpoint Documentation Format Examples

This document provides examples of correct and incorrect endpoint documentation
formatting based on the specification in `AGENTS.md` and `CLAUDE.md`.

## ✅ CORRECT Example

````markdown
# GET /api/v1/order

**Source:** [Get Order Details](https://api.example.com/docs/order)

## Description

Retrieves detailed information about a specific order by order ID. This endpoint
returns the complete order status, filled quantity, remaining quantity, and all
execution details.

## Authentication

Required (Private Endpoint)

API Key Permissions: This endpoint requires the "trade:read" permission.

## Rate Limit

**Weight:** 2

**Rate Limit Rule:** UID (per account)

**Limits:**

- 60 requests per minute per account
- 1200 requests per minute per IP

## HTTP Request

`GET /api/v1/order`

## Request Parameters

### Query Parameters

| Parameter | Type   | Required | Description                                                                       |
| --------- | ------ | -------- | --------------------------------------------------------------------------------- |
| orderId   | string | Yes      | Unique order identifier                                                           |
| symbol    | string | No       | Trading pair (e.g., BTCUSDT). If provided, validates order belongs to this symbol |

## Request Example

```bash
curl -X GET "https://api.example.com/api/v1/order?orderId=123456789" \
  -H "X-API-Key: your-api-key" \
  -H "X-API-Signature: your-signature" \
  -H "X-API-Timestamp: 1634567890000"
```
````

## Response Parameters

| Parameter         | Type    | Description                                    |
| ----------------- | ------- | ---------------------------------------------- |
| code              | string  | Response code (00000 for success)              |
| message           | string  | Response message                               |
| data              | object  | Order data container                           |
| data.orderId      | string  | Unique order identifier                        |
| data.symbol       | string  | Trading pair (e.g., BTCUSDT)                   |
| data.type         | string  | Order type (LIMIT, MARKET, STOP_LIMIT, etc.)   |
| data.side         | string  | Order side (BUY or SELL)                       |
| data.status       | string  | Order status (NEW, PARTIAL, FILLED, CANCELLED) |
| data.price        | string  | Order price in quote currency                  |
| data.quantity     | string  | Original order quantity                        |
| data.executedQty  | string  | Executed quantity                              |
| data.remainingQty | string  | Remaining quantity to be filled                |
| data.createdAt    | integer | Order creation timestamp (milliseconds)        |
| data.updatedAt    | integer | Last update timestamp (milliseconds)           |

## Response Example

### Success Response (200 OK)

```json
{
  "code": "00000",
  "message": "success",
  "data": {
    "orderId": "123456789",
    "symbol": "BTCUSDT",
    "type": "LIMIT",
    "side": "BUY",
    "status": "PARTIAL",
    "price": "45000.00",
    "quantity": "1.5",
    "executedQty": "0.8",
    "remainingQty": "0.7",
    "createdAt": 1634567890000,
    "updatedAt": 1634567895000
  }
}
```

### Error Response (404 Not Found)

```json
{
  "code": "40401",
  "message": "Order not found",
  "data": null
}
```

## Error Codes

Common error codes for this endpoint:

| Code  | Message               | Description                                        |
| ----- | --------------------- | -------------------------------------------------- |
| 40001 | Invalid parameter     | orderId parameter is missing or invalid            |
| 40003 | Authentication failed | API key is invalid or missing required permissions |
| 40401 | Order not found       | No order exists with the specified orderId         |

See [Error Codes](/docs/exchange/error_codes.md) for complete error code
reference.

## Notes

- Order data is cached for 5 seconds. Recent updates may not be immediately
  visible.
- Cancelled orders remain accessible for 7 days after cancellation.
- For real-time order updates, consider using the WebSocket API instead.

`````

---

## ❌ INCORRECT Examples

### Problem 1: Missing Language Tag on JSON

**WRONG:**
````markdown
## Response Example

`````

{ "code": "00000", "message": "success" }

```

```

**RIGHT:**

````markdown
## Response Example

```json
{
  "code": "00000",
  "message": "success"
}
```
````

### Problem 2: Incorrect Heading Hierarchy

**WRONG:**

```markdown
# GET /api/v1/order

#### Description

Retrieves order details

## Request Parameters
```

**RIGHT:**

```markdown
# GET /api/v1/order

## Description

Retrieves order details

## Request Parameters
```

### Problem 3: Missing Required Column in Request Parameters

**WRONG:**

```markdown
## Request Parameters

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| orderId   | string | Order ID     |
| symbol    | string | Trading pair |
```

**RIGHT:**

```markdown
## Request Parameters

| Parameter | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| orderId   | string | Yes      | Order ID     |
| symbol    | string | No       | Trading pair |
```

### Problem 4: Not Using Dot Notation for Nested Fields

**WRONG:**

```markdown
## Response Parameters

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| data      | object | Response data |
| orderId   | string | Order ID      |
| status    | string | Order status  |
```

**RIGHT:**

```markdown
## Response Parameters

| Parameter    | Type   | Description   |
| ------------ | ------ | ------------- |
| data         | object | Response data |
| data.orderId | string | Order ID      |
| data.status  | string | Order status  |
```

### Problem 5: Missing Rate Limit Information

**WRONG:**

```markdown
# GET /api/v1/order

## Description

Retrieves order details

## Request Parameters
```

**RIGHT:**

```markdown
# GET /api/v1/order

## Description

Retrieves order details

## Rate Limit

**Weight:** 2

See [Rate Limits](/docs/exchange/rate_limits.md) for complete rate limiting
rules.

## Request Parameters
```

### Problem 6: Missing Authentication Section

**WRONG:**

```markdown
# GET /api/v1/order

## Description

Retrieves order details

## Request Parameters
```

**RIGHT:**

```markdown
# GET /api/v1/order

## Description

Retrieves order details

## Authentication

Required (Private Endpoint)

## Request Parameters
```

### Problem 7: Missing Source Link

**WRONG:**

```markdown
# GET /api/v1/order

## Description

Retrieves order details
```

**RIGHT:**

```markdown
# GET /api/v1/order

**Source:** [Get Order Details](https://api.example.com/docs/order)

## Description

Retrieves order details
```

---

## Quick Validation Checklist

Before submitting endpoint documentation, verify:

- [ ] ✅ Title uses H1 (`#`) with HTTP method and path
- [ ] ✅ Source link present immediately after title
- [ ] ✅ Heading hierarchy is correct (H1 → H2 → H3, no skips)
- [ ] ✅ All request parameters in GFM table with Required column
- [ ] ✅ All response parameters in GFM table with dot notation
- [ ] ✅ All JSON blocks tagged with ` ```json `
- [ ] ✅ Rate limit documented (inline or linked)
- [ ] ✅ Authentication requirements stated
- [ ] ✅ At least one request example
- [ ] ✅ At least one response example with `json` tag
- [ ] ✅ Error responses documented (if applicable)
- [ ] ✅ Tables use `| --- |` alignment separators
- [ ] ✅ No untagged code blocks for JSON
- [ ] ✅ Descriptive error codes section or link provided
