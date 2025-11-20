# GET /v1/nonce

**Summary**: Get The Current Nonce Range

## Description

Get the current nonce range. The lower bound of nonce range is EPOCH start of
day in microseconds, and upper bound of nonce range is EPOCH end of day in
microseconds.

**Ratelimited:** `False`

**Operation ID**: user-get-current-nonce-range

**Tags**: nonce

**Endpoint**: `GET /v1/nonce`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

| Field      | Type    | Required | Description                                       |
| ---------- | ------- | -------- | ------------------------------------------------- |
| lowerBound | integer | Yes      | lower bound of nonce range<br>**Example:** `8455` |
| upperBound | integer | Yes      | upper bound of nonce range<br>**Example:** `9455` |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
