# GET /v1/time

**Summary**: Get Exchange Time

## Description

Get Current Exchange Time

**Operation ID**: market-data-get-current-exchange-time

**Tags**: time

**Endpoint**: `GET /v1/time`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

| Field     | Type   | Required | Description                                                                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| timestamp | string | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"` |
| datetime  | string | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                    |

### 429 - Too Many Requests

### 500 - Internal Server Error
