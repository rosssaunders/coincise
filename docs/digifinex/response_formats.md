# Response Formats

All API responses from DigiFinex follow a consistent JSON format.

## Successful Response

All successful responses include:
- `code`: Status code (0 for success)
- Data fields specific to the endpoint

Example:
```json
{
  "code": 0,
  "data": {}
}
```

## Error Response

Error responses include:
- `code`: Non-zero error code
- `msg`: Error message description

Example:
```json
{
  "code": 10001,
  "msg": "Error description"
}
```

For detailed error codes, see the Error Codes documentation.
