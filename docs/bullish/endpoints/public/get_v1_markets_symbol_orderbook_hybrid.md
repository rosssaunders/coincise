# GET /v1/markets/{symbol}/orderbook/hybrid

**Summary**: Get Market Order Book

## Description

Get Order Book by Market Symbol

**Ratelimited:** `False`

**Operation ID**: market-data-get-market-orderbook

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}/orderbook/hybrid`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description   |
| --------- | ---- | ------ | -------- | ------------- |
| symbol    | path | string | Yes      | symbol to get |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field          | Type          | Required | Description                                                                                                                         |
| -------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| bids           | array[object] | Yes      | bids                                                                                                                                |
| asks           | array[object] | Yes      | asks                                                                                                                                |
| datetime       | string        | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                    |
| timestamp      | string        | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"` |
| sequenceNumber | integer       | Yes      | an incremented unique identifier of the order book snapshot<br>**Example:** `999`                                                   |

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
