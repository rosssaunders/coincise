# GET /v1/users/logout

**Summary**: Logout

## Description

Logout of the session associated with the JWT. It requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

**Ratelimited:** `True`

**Operation ID**: logout

**Tags**: sessions

**Endpoint**: `GET /v1/users/logout`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |

## Responses

### 200 - OK

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
