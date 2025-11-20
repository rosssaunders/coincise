# GET /v1/wallets/withdrawal-instructions/fiat/{symbol}

**Summary**: Get Withdrawal Instructions for Fiat

## Description

Get withdrawal instructions added by the user, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header. Please note that before withdrawal destinations can be used for
withdrawing to, they must be whitelisted on the Bullish website.

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-withdrawal-instructions-fiat

**Tags**: custody

**Endpoint**: `GET /v1/wallets/withdrawal-instructions/fiat/{symbol}`

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
      "destinationId": {
        "type": "string",
        "example": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
        "description": "destination id provided by bullish that uniquely identifies a whitelisted address or account",
        "properties": {}
      },
      "accountNumber": {
        "type": "string",
        "description": "bank account number",
        "example": "9873481227",
        "properties": {}
      },
      "network": {
        "type": "string",
        "description": "the fiat network, e.g. SWIFT, ABA or SEPA",
        "example": "SWIFT",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "example": "USD",
        "description": "symbol representing fiat currency, e.g. USD, EUR",
        "properties": {}
      },
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
      "fee": {
        "type": "string",
        "example": "3.00",
        "description": "withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)",
        "properties": {}
      },
      "memo": {
        "type": "string",
        "example": "MZAXEMRXA",
        "description": "memo or destination tag that will be used as a reference on transaction",
        "properties": {}
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
      },
      "intermediaryBank": {
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
