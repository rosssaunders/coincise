# Response Formats

BingX APIs return responses in JSON format.

## Common Response Structure

Most BingX API endpoints return responses with the following structure:

```json
{
  "code": 0,
  "msg": "success",
  "data": { ... }
}
```

### Success Response

- `code`: `0` for success
- `msg`: Success message, typically `"success"`
- `data`: Response data (structure varies by endpoint)

### Error Response

- `code`: Non-zero error code
- `msg`: Error message describing what went wrong

## Data Types

### Timestamps

- All timestamps are in milliseconds (Unix epoch time in milliseconds)
- Example: `1640000000000` represents 2021-12-20 13:46:40 UTC

### Numbers

- Prices and quantities are often returned as strings to preserve precision
- Always parse these as decimal/float types in your application

## Pagination

Some endpoints support pagination using the following parameters:

- `limit`: Maximum number of results to return
- `orderId` or `timestamp`: Cursor for pagination

## Example Responses

### Successful Order Response

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "orderId": "1234567890",
    "symbol": "BTC-USDT",
    "price": "50000.00",
    "quantity": "0.001",
    "status": "FILLED"
  }
}
```

### Error Response

```json
{
  "code": 100001,
  "msg": "Signature verification failed"
}
```
