# DELETE /v1/wallets/withdrawal-instructions/{destinationId}

**Summary**: Delete Existing Wallet Address

## Description

This endpoint is used for deleting any existing withdrawal addresses.

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-delete-withdrawal-instructions

**Tags**: custody

**Endpoint**: `DELETE /v1/wallets/withdrawal-instructions/{destinationId}`

**Authentication Required**: Yes

## Parameters

| Parameter     | In   | Type   | Required | Description |
| ------------- | ---- | ------ | -------- | ----------- |
|               |      | string | No       |             |
| destinationId | path | string | Yes      |             |

## Responses

### 200 - OK

### 404 - A wallet destination is not found for the specified `destinationId`.

### 429 - Too Many Requests

### 500 - Internal Server Error
