# POST /v1/wallets/self-hosted/initiate

**Summary**: Initiate Self-Hosted Wallet Verification

## Description

This endpoint is used for initiating wallet verification requests.

Note: users will have 24 hours to complete the wallet verification by sending
the exact total amount to the Bullish deposit address provided.

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-initiate-self-hosted-verification

**Tags**: custody

**Endpoint**: `POST /v1/wallets/self-hosted/initiate`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |

## Request Body

Self hosted wallet verification request

**Required**: Yes

### Content-Type: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CustodySelfHostedInitiateRequest"
}
```

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CustodySelfHostedInitiateResponse"
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
