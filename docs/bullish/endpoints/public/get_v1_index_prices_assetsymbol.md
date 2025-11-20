# GET /v1/index-prices/{assetSymbol}

**Summary**: Get Index Price by Asset Symbol

## Description

Retrieves the index price of a specified asset

**Operation ID**: get-index-price-by-symbol

**Tags**: index-data

**Endpoint**: `GET /v1/index-prices/{assetSymbol}`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

| Field              | Type   | Required | Description                                                                      |
| ------------------ | ------ | -------- | -------------------------------------------------------------------------------- |
| assetSymbol        | string | Yes      | asset symbol as denoted in the world<br>**Example:** `"BTC"`                     |
| price              | string | Yes      | Asset price in USD<br>**Example:** `"66100.0000"`                                |
| updatedAtDatetime  | string | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"` |
| updatedAtTimestamp | string | Yes      | number of milliseconds since EPOCH as string<br>**Example:** `"1621490985000"`   |

### 404 - Not found

### 429 - Too Many Requests

### 500 - Internal Server Error
