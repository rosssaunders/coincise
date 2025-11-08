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

**Schema**:

```json
{
  "$ref": "#/components/schemas/LoginRequest"
}
```

## Responses

### 200 - returns JWT and the `authorizer` for signing requests

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/LoginResponse"
}
```

### 400 - Bad Request

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
