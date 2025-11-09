# Error Codes

HTX does not currently provide a centralized error codes reference in the API documentation.

Error information is typically included in individual endpoint responses with the following structure:

```json
{
  "status": "error",
  "err-code": "error-code-string",
  "err-msg": "Error description",
  "data": null
}
```

For troubleshooting API errors:
- Check the `err-code` and `err-msg` fields in the response
- Refer to individual endpoint documentation for endpoint-specific errors
- Contact HTX support for error code clarification: support@huobigroup.com
