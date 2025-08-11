---
title: Bullish Trading API - Public REST API - Time
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

<h1 id="bullish-trading-api">Bullish Trading API - Public REST API - Time</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-time">time</h1>

Non-authenticated API for reading time data

## market-data-get-current-exchange-time

<a id="opIdmarket-data-get-current-exchange-time"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/time", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/time', headers = headers)

print(r.json())

```

`GET /v1/time`

_Get Exchange Time_

Get Current Exchange Time

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": ["timestamp", "datetime"],
  "properties": {
    "timestamp": {
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    },
    "datetime": {
      "description": "ISO 8601 with millisecond as string",
      "allOf": [
        {
          "type": "string",
          "format": "date-time",
          "example": "2025-05-20T01:01:01.000Z",
          "description": "ISO 8601 with millisecond as string"
        }
      ]
    }
  }
}
```

<h3 id="market-data-get-current-exchange-time-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                                                            |
| ------ | -------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [CurrentExchangeTimeResponse](#schemacurrentexchangetimeresponse) |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                                              |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                                              |

<aside class="success">
This operation does not require authentication
</aside>
