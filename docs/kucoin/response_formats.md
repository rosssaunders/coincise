# Response Formats

## Standard Response Structure

All KuCoin API responses follow a standard JSON format:

```json
{
  "code": "200000",
  "data": {
    // Response data here
  }
}
```

### Success Response
- **code**: "200000" indicates success
- **data**: Contains the actual response data

### Error Response
```json
{
  "code": "400100",
  "msg": "Error message description"
}
```

- **code**: Error code (not "200000")
- **msg**: Human-readable error message

## Pagination

For endpoints that support pagination, the response includes:

```json
{
  "code": "200000",
  "data": {
    "currentPage": 1,
    "pageSize": 50,
    "totalNum": 100,
    "totalPage": 2,
    "items": [...]
  }
}
```

Please refer to the official KuCoin API documentation for specific endpoint response formats.
