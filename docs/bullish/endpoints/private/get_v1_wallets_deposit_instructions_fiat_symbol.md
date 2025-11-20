# GET /v1/wallets/deposit-instructions/fiat/{symbol}

**Summary**: Get Deposit Instructions for Fiat

## Description

Get deposit instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-deposit-instructions-fiat

**Tags**: custody

**Endpoint**: `GET /v1/wallets/deposit-instructions/fiat/{symbol}`

**Authentication Required**: Yes

## Parameters

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
|           |      | string | No       |             |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "network": {
        "type": "string",
        "example": "SWIFT",
        "description": "the network that the account belongs to and the transaction will be performed on SWIFT, ABA or SEPA"
      },
      "symbol": {
        "type": "string",
        "example": "USD",
        "description": "the currency associated with the account, e.g. USD, EUR"
      },
      "accountNumber": {
        "type": "string",
        "description": "bank account number",
        "example": "9873481227",
        "properties": {}
      },
      "name": {
        "type": "string",
        "example": "Bullish (GI) Limited",
        "description": "official Bullish account holder name"
      },
      "physicalAddress": {
        "type": "string",
        "example": "26/F, The Centrium, 60 Wyndham Street, Central, Hong Kong",
        "description": "bullish entity's physical address for the bank account"
      },
      "memo": {
        "type": "string",
        "example": "8VZPKSGPA",
        "description": "client specific reference to identify which account desposits should be allocated to on the exhange"
      },
      "bank": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "Silvergate Bank",
            "description": "name of bank",
            "properties": {}
          },
          "physicalAddress": {
            "type": "string",
            "description": "physical location of bank",
            "example": "4250 Executive Square Suite 300 La Jolla, CA 92037",
            "properties": {}
          },
          "routingCode": {
            "type": "string",
            "description": "routing code of bank",
            "example": "322286803",
            "properties": {}
          }
        }
      }
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
