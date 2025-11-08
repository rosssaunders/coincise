# GET /v1/users/hmac/login

**Summary**: HMAC Login

## Description

Login and generate a new session associated with a JWT using HMAC. Once you log
in from an IP, the same IP must be used for the duration of the session for any
subsequent requests.

**Ratelimited:** `True`

**Operation ID**: hmac-login

**Tags**: sessions

**Endpoint**: `GET /v1/users/hmac/login`

**Authentication Required**: No

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

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
