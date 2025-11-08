# GET /v1/wallets/self-hosted/verification-attempts

**Summary**: Get a List of Self-Hosted Wallet Verification Attempts

## Description

This endpoint provides a history of all Wallet Verification attempts, including
those that are completed, pending verification and expired.

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-self-hosted-verifications

**Tags**: custody

**Endpoint**: `GET /v1/wallets/self-hosted/verification-attempts`

**Authentication Required**: Yes

## Parameters

| Parameter     | In    | Type   | Required | Description |
| ------------- | ----- | ------ | -------- | ----------- |
|               |       | string | No       |             |
| address       | query | string | No       |             |
| destinationId | query | string | No       |             |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/CustodyGetSelfHostedVerificationResponse"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
