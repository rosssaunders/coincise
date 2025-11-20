# POST /v2/users/login

**Summary**: Login

## Description

Login and generate a new session associated with a JWT. Once you log in from an
IP, the same IP must be used for the duration of the session for any subsequent
requests.

**Ratelimited:** `True`

**Operation ID**: login

**Tags**: sessions

**Endpoint**: `POST /v2/users/login`

**Authentication Required**: No

## Request Body

login request body

**Required**: Yes

### Content-Type: application/json

| Field        | Type   | Required | Description                                                                                                                |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| publicKey    | string | No       | <br>**Example:** `"PUB_R1_6PTdfWbXvXWQduhcCiRooGHTVpriu15xMqfr7EDq6sWLDj7NjS"`                                             |
| signature    | string | No       | <br>**Example:** `"SIG_R1_K35d5hSY5FbNoJwrCfmH6QvPG7m9XmhL2mgWYcSB7q2hKJ2mv39Luck9WBJroSB635ZAXhdg36TYG7QJX1fTidbsMvyE8N"` |
| loginPayload | object | No       |                                                                                                                            |

## Responses

### 200 - returns JWT and the `authorizer` for signing requests

**Content-Type**: application/json

| Field      | Type   | Required | Description                                                                                                                                       |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| authorizer | string | Yes      | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)<br>**Example:** `"03E02367E8C900000500000000000000"`        |
| token      | string | Yes      | JWT token<br>**Example:** `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FuZGVlcCByYWtocmEifQ.wyVq6PlKaldWXtu-jz2hJCvkGl1lM2S7HUKCH8LnXp0"` |

### 400 - Bad Request

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
