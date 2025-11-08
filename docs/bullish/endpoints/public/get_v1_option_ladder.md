# GET /v1/option-ladder

**Summary**: Get Option Ladder

## Description

Returns the available options contracts. This data helps traders quickly assess
the available options and their respective prices, implied volatilities, and
Greeks (such as delta, gamma, theta, and vega).

**Operation ID**: get-option-ladder

**Tags**: option-ladder

**Endpoint**: `GET /v1/option-ladder`

**Authentication Required**: No

## Parameters

| Parameter  | In    | Type   | Required | Description                                                                |
| ---------- | ----- | ------ | -------- | -------------------------------------------------------------------------- |
| baseSymbol | query | string | Yes      | symbol to get                                                              |
| expiry     | query | string | No       | Optional - Filter results by expiry date of the option markets             |
| type       | query | string | No       | Optional - Filter results by type (`CALL` or ` PUT`) of the option markets |
| sort       | query | string | No       | Optional - Sort results by Option Type or Expiry Datetime                  |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/OptionLadderResponse"
  }
}
```

### 400 - Bad Request

### 429 - Too Many Requests

### 500 - Internal Server Error
