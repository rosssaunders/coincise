# Coinbase Exchange API Documentation

## Table of Contents

- [welcome](#welcome)
- [](#)

---

# welcome

---

#

[​

](#errors)

Errors

Report incorrect code

Copy

Ask AI

```
{
  "message": "Invalid Price"
}
```

Unless otherwise stated, errors to bad requests respond with HTTP 4xx or status
codes. The body also contains a `message` parameter indicating the cause. Your
language’s http library should be configured to provide message bodies for
non-2xx requests so that you can read the message field from the body.

###

[​

](#common-error-codes)

Common Error Codes

| Status Code | Reason                                                       |
| ----------- | ------------------------------------------------------------ |
| 400         | Bad Request — Invalid request format                         |
| 401         | Unauthorized — Invalid API Key                               |
| 403         | Forbidden — You do not have access to the requested resource |
| 404         | Not Found                                                    |
| 500         | Internal Server Error — We had a problem with our server     |

##

[​

](#success)

Success

A successful response is indicated by HTTP status code 200 and may contain an
optional body. If the response has a body it is documented under each resource
below.

---
