# GET /v1/accounts/asset/{symbol}

**Summary**: Get Asset Account by Symbol

## Description

Gets the asset account by symbol, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: user-get-asset-account-by-symbol

**Tags**: accounts

**Endpoint**: `GET /v1/accounts/asset/{symbol}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| symbol           | path  | string | Yes      |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field              | Type   | Required | Description                                                                                                                         |
| ------------------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| tradingAccountId   | string | Yes      | unique trading account ID<br>**Example:** `"111000000000001"`                                                                       |
| assetId            | string | Yes      | unique asset ID<br>**Example:** `"1"`                                                                                               |
| assetSymbol        | string | Yes      | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                                        |
| availableQuantity  | string | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| borrowedQuantity   | string | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| lockedQuantity     | string | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| loanedQuantity     | string | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| updatedAtDatetime  | string | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                    |
| updatedAtTimestamp | string | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"` |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
