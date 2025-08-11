---
title: Bullish Trading API - Private REST API - Sessions
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

<h1 id="bullish-trading-api">Bullish Trading API - Private REST API - Sessions</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-sessions">sessions</h1>

## logout

<a id="opIdlogout"></a>

> Code samples

```javascript
const headers = {
  Authorization: {
    type: "string"
  }
}

fetch("https://api.exchange.bullish.com/trading-api/v1/users/logout", {
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
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/users/logout', headers = headers)

print(r.json())

```

`GET /v1/users/logout`

_Logout_

Logout of the session associated with the JWT. It requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

**Ratelimited:** `True`

<h3 id="logout-parameters">Parameters</h3>

| Name          | In     | Type   | Required | Description                                                                                  |
| ------------- | ------ | ------ | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |

<h3 id="logout-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | None   |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None   |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## login

<a id="opIdlogin"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "required": [
    "timestamp",
    "nonce",
    "authorizer",
    "command"
  ],
  "properties": {
    "publicKey": {
      "allOf": [
        {
          "type": "string",
          "example": "PUB_R1_6PTdfWbXvXWQduhcCiRooGHTVpriu15xMqfr7EDq6sWLDj7NjS"
        }
      ]
    },
    "signature": {
      "allOf": [
        {
          "type": "string",
          "example": "SIG_R1_K35d5hSY5FbNoJwrCfmH6QvPG7m9XmhL2mgWYcSB7q2hKJ2mv39Luck9WBJroSB635ZAXhdg36TYG7QJX1fTidbsMvyE8N"
        }
      ]
    },
    "loginPayload": {
      "allOf": [
        {
          "type": "object",
          "required": [
            "userId",
            "nonce",
            "expirationTime",
            "biometricsUsed",
            "sessionKey"
          ],
          "properties": {
            "userId": {
              "description": "Bullish user ID corresponding to the metadata",
              "allOf": [
                {
                  "type": "string",
                  "example": "12345",
                  "description": "Bullish user ID"
                }
              ]
            },
            "nonce": {
              "description": "epoch timestamp in seconds; note this login API nonce has no connection to the orders API nonce",
              "allOf": [
                {
                  "type": "integer",
                  "format": "int64",
                  "example": 1621490985,
                  "description": "number of seconds since EPOCH as integer"
                }
              ]
            },
            "expirationTime": {
              "description": "epoch timestamp in seconds that is 5 minutes in the future",
              "allOf": [
                {
                  "type": "integer",
                  "format": "int64",
                  "example": 1621490985,
                  "description": "number of seconds since EPOCH as integer"
                }
              ]
            },
            "biometricsUsed": {
              "description": "biometrics flag. always `false`",
              "type": "boolean",
              "example": false
            },
            "sessionKey": {
              "description": "session key. always `null`",
              "type": "string",
              "example": null
            }
          }
        }
      ]
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://api.exchange.bullish.com/trading-api/v2/users/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v2/users/login', headers = headers)

print(r.json())

```

`POST /v2/users/login`

_Login_

Login and generate a new session associated with a JWT. Once you log in from an
IP, the same IP must be used for the duration of the session for any subsequent
requests.

**Ratelimited:** `True`

> Body parameter

```json
{
  "type": "object",
  "required": ["timestamp", "nonce", "authorizer", "command"],
  "properties": {
    "publicKey": {
      "allOf": [
        {
          "type": "string",
          "example": "PUB_R1_6PTdfWbXvXWQduhcCiRooGHTVpriu15xMqfr7EDq6sWLDj7NjS"
        }
      ]
    },
    "signature": {
      "allOf": [
        {
          "type": "string",
          "example": "SIG_R1_K35d5hSY5FbNoJwrCfmH6QvPG7m9XmhL2mgWYcSB7q2hKJ2mv39Luck9WBJroSB635ZAXhdg36TYG7QJX1fTidbsMvyE8N"
        }
      ]
    },
    "loginPayload": {
      "allOf": [
        {
          "type": "object",
          "required": [
            "userId",
            "nonce",
            "expirationTime",
            "biometricsUsed",
            "sessionKey"
          ],
          "properties": {
            "userId": {
              "description": "Bullish user ID corresponding to the metadata",
              "allOf": [
                {
                  "type": "string",
                  "example": "12345",
                  "description": "Bullish user ID"
                }
              ]
            },
            "nonce": {
              "description": "epoch timestamp in seconds; note this login API nonce has no connection to the orders API nonce",
              "allOf": [
                {
                  "type": "integer",
                  "format": "int64",
                  "example": 1621490985,
                  "description": "number of seconds since EPOCH as integer"
                }
              ]
            },
            "expirationTime": {
              "description": "epoch timestamp in seconds that is 5 minutes in the future",
              "allOf": [
                {
                  "type": "integer",
                  "format": "int64",
                  "example": 1621490985,
                  "description": "number of seconds since EPOCH as integer"
                }
              ]
            },
            "biometricsUsed": {
              "description": "biometrics flag. always `false`",
              "type": "boolean",
              "example": false
            },
            "sessionKey": {
              "description": "session key. always `null`",
              "type": "string",
              "example": null
            }
          }
        }
      ]
    }
  }
}
```

<h3 id="login-parameters">Parameters</h3>

| Name | In   | Type                                | Required | Description        |
| ---- | ---- | ----------------------------------- | -------- | ------------------ |
| body | body | [LoginRequest](#schemaloginrequest) | true     | login request body |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": ["authorizer", "token"],
  "properties": {
    "authorizer": {
      "description": "Authorizer",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "03E02367E8C900000500000000000000",
          "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)"
        }
      ]
    },
    "token": {
      "description": "JWT token",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FuZGVlcCByYWtocmEifQ.wyVq6PlKaldWXtu-jz2hJCvkGl1lM2S7HUKCH8LnXp0",
          "description": "JWT token"
        }
      ]
    }
  }
}
```

<h3 id="login-responses">Responses</h3>

| Status | Meaning                                                                    | Description                                           | Schema                                |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | returns JWT and the `authorizer` for signing requests | [LoginResponse](#schemaloginresponse) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request                                           | None                                  |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated                                     | None                                  |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden                                      | None                                  |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests                                     | None                                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error                                 | None                                  |

<aside class="success">
This operation does not require authentication
</aside>

## hmac-login

<a id="opIdhmac-login"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  "BX-SIGNATURE": {
    type: "string"
  },
  "BX-TIMESTAMP": {
    type: "string"
  },
  "BX-NONCE": {
    type: "string"
  },
  "BX-PUBLIC-KEY": {
    type: "string"
  }
}

fetch("https://api.exchange.bullish.com/trading-api/v1/users/hmac/login", {
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
  'Accept': 'application/json',
  'BX-SIGNATURE': {
  "type": "string"
},
  'BX-TIMESTAMP': {
  "type": "string"
},
  'BX-NONCE': {
  "type": "string"
},
  'BX-PUBLIC-KEY': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/users/hmac/login', headers = headers)

print(r.json())

```

`GET /v1/users/hmac/login`

_HMAC Login_

Login and generate a new session associated with a JWT using HMAC. Once you log
in from an IP, the same IP must be used for the duration of the session for any
subsequent requests.

**Ratelimited:** `True`

<h3 id="hmac-login-parameters">Parameters</h3>

| Name          | In     | Type   | Required | Description                                                                                                                |
| ------------- | ------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| BX-SIGNATURE  | header | string | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) |
| BX-TIMESTAMP  | header | string | true     | timestamp is the number of milliseconds since EPOCH                                                                        |
| BX-NONCE      | header | string | true     | nonce is a client side incremented unsigned 64 bit integer                                                                 |
| BX-PUBLIC-KEY | header | string | true     | public key being used to generate the JWT                                                                                  |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": ["authorizer", "token"],
  "properties": {
    "authorizer": {
      "description": "Authorizer",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "03E02367E8C900000500000000000000",
          "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)"
        }
      ]
    },
    "token": {
      "description": "JWT token",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FuZGVlcCByYWtocmEifQ.wyVq6PlKaldWXtu-jz2hJCvkGl1lM2S7HUKCH8LnXp0",
          "description": "JWT token"
        }
      ]
    }
  }
}
```

<h3 id="hmac-login-responses">Responses</h3>

| Status | Meaning                                                                    | Description                                           | Schema                                |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | returns JWT and the `authorizer` for signing requests | [LoginResponse](#schemaloginresponse) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request                                           | None                                  |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated                                     | None                                  |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden                                      | None                                  |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests                                     | None                                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error                                 | None                                  |

<aside class="success">
This operation does not require authentication
</aside>
