# POST public/auth

**Source:** [public/auth](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-auth)

## Authentication

Not Required (Public Endpoint)

## public/auth

> Request Sample #0: Auth with the master account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "master_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253
}
```

> Request Sample #1: Auth with the master account (same effect as sample #0)

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "master_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Request Sample #2: Auth with former spot account (same effect as sample #0)

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "master_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Request Sample #3: Auth with former master margin account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "master_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Request Sample #4: Auth with former master derivative account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "master_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Request Sample #5: Auth with default sub-account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "subaccount_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253
}
```

> Request Sample #6: Auth with former spot sub-account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "subaccount_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Request Sample #7: Auth with former margin sub-account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "subaccount_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Request Sample #8: Auth with former derivative sub-account

```
{
  "id": 1,
  "method": "public/auth",
  "api_key": "subaccount_api_key",
  "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
  "nonce": :1587846358253,
}
```

> Response Sample

```
{
  "id": 1,
  "method":"public/auth",
  "code":0
}
```

To access user-specific websocket methods, `public/auth` has to be invoked with a valid API key and Digital Signature (refer to the **Digital Signature** section).

REST API calls do NOT need to do this.

**Important Note**  
  
We recommend adding a 1-second sleep after establishing the websocket connection, and before requests are sent.  
  
This will avoid occurrences of rate-limit (\`TOO\_MANY\_REQUESTS\`) errors, as the websocket rate limits are pro-rated based on the calendar-second that the websocket connection was opened.

### Request Params

| Name | Type | Description |
| --- | --- | --- |
| api\_key | string | API key |
| sig | string | Digital Signature (see **Digital Signature** section) |

### Applies To:

Websocket (User API)