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

```json
{
  "type": "array",
  "items": {
    "description": "Option Ladder Response",
    "type": "string",
    "properties": {
      "symbol": {
        "type": "string",
        "description": "market symbol. Eg `BTC-USDC-20241004-70000-C` for OPTION markets.",
        "example": "BTC-USDC-20241004-70000-C",
        "properties": {}
      },
      "baseSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "settlementAssetSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "USDC",
        "properties": {}
      },
      "bidQuantity": {
        "description": "Quantity of `bid`",
        "type": "string",
        "example": "0.0"
      },
      "askQuantity": {
        "description": "Quantity of `ask`",
        "type": "string",
        "example": "0.0"
      },
      "bidIVPercentage": {
        "description": "Implied volatility of the best bid price",
        "type": "string",
        "example": "99.0"
      },
      "askIVPercentage": {
        "description": "Implied volatility of the best ask price",
        "type": "string",
        "example": "99.0"
      },
      "bid": {
        "description": "Bid price in the order book",
        "type": "string",
        "example": "90000.0000"
      },
      "ask": {
        "description": "Ask price in the order book",
        "type": "string",
        "example": "90000.0000"
      },
      "underlyingPrice": {
        "description": "Index price of the base asset",
        "type": "string",
        "example": "100000.0000"
      },
      "optionStrikePrice": {
        "description": "Strike price of the option market",
        "type": "string",
        "example": "90000"
      },
      "markPrice": {
        "description": "Mark Price of the option market",
        "type": "string",
        "example": "100.0000"
      },
      "quantity": {
        "description": "Number of contracts outstanding",
        "type": "string",
        "example": "1000"
      },
      "openInterest": {
        "description": "Amount of outstanding contracts in the exchange",
        "type": "string",
        "example": "0.11442400"
      },
      "openInterestUSD": {
        "description": "USD value of outstanding contracts in the exchange",
        "type": "string",
        "example": "1144240.0000"
      },
      "optionType": {
        "description": "Type of Option market",
        "example": "CALL",
        "type": "string",
        "enum": ["CALL", "PUT"],
        "properties": {}
      },
      "expiryDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "greeks": {
        "description": "Pricing parameters for option instruments",
        "type": "object",
        "properties": {
          "delta": {
            "description": "Sensitivity of an option’s price to a $1 change in the price of the underlying asset",
            "type": "string",
            "example": "0.98"
          },
          "gamma": {
            "description": "Rate of change of Delta with respect to a $1 change in the underlying asset’s price",
            "type": "string",
            "example": "0.98"
          },
          "theta": {
            "description": "The rate at which an option’s price decreases as it approaches its expiration date",
            "type": "string",
            "example": "-0.17"
          },
          "vega": {
            "description": "Sensitivity of an option’s price to a 1% change in the implied volatility of the underlying asset",
            "type": "string",
            "example": "0.05"
          }
        }
      }
    }
  }
}
```

### 400 - Bad Request

### 429 - Too Many Requests

### 500 - Internal Server Error
