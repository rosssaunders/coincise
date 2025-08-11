---
title: Bullish Trading API - Public REST API - Nonce
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="bullish-trading-api">Bullish Trading API - Public REST API - Nonce</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-nonce">nonce</h1>

Non-authenticated API for getting nonce range information

## user-get-current-nonce-range

<a id="opIduser-get-current-nonce-range"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/nonce", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/nonce', headers = headers)

print(r.json())

```

`GET /v1/nonce`

_Get The Current Nonce Range_

Get the current nonce range. The lower bound of nonce range is EPOCH start of
day in microseconds, and upper bound of nonce range is EPOCH end of day in
microseconds.

**Ratelimited:** `False`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": ["upperBound", "lowerBound"],
  "properties": {
    "lowerBound": {
      "description": "lower bound of nonce range",
      "type": "integer",
      "example": 8455
    },
    "upperBound": {
      "description": "upper bound of nonce range",
      "type": "integer",
      "example": 9455
    }
  }
}
```

<h3 id="user-get-current-nonce-range-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                |
| ------ | -------------------------------------------------------------------------- | --------------------- | --------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [Nonce](#schemanonce) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                  |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                  |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                  |

<aside class="success">
This operation does not require authentication
</aside>
