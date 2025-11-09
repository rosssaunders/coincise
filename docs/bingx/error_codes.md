# Error Codes

This document lists all error codes that may be returned by BingX APIs.

| Error Code | Description                                |
| ---------- | ------------------------------------------ |
| 0          | Success                                     |
| 100001     | Signature verification failed              |
| 100202     | Insufficient balance                       |
| 100400     | Invalid parameter                          |
| 100403     | Rate limit exceeded                        |
| 100440     | Order price deviates greatly from market   |
| 100500     | Internal server error                      |
| 101001     | Order does not exist                       |
| 101002     | Order has been filled                      |
| 101003     | Order has been cancelled                   |
| 102001     | Position does not exist                    |
| 102002     | Insufficient position                      |
| 103001     | Symbol does not exist                      |
| 103002     | Symbol is not trading                      |

## Error Response Format

```json
{
  "code": 100001,
  "msg": "Signature verification failed"
}
```

## Common Errors

### 100001 - Signature Verification Failed

This error occurs when the request signature is invalid. Check:

- API Key and Secret Key are correct
- Timestamp is within acceptable range
- Query string is properly formatted
- Signature algorithm is HMAC SHA256

### 100403 - Rate Limit Exceeded

You have exceeded the rate limit for this endpoint. Implement exponential backoff and retry logic.

### 100500 - Internal Server Error

Server-side error. Retry the request after a brief delay.
