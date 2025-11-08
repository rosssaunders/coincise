# POST /v1/simulate-portfolio-margin

**Summary**: Portfolio Margin Simulator

## Description

Use Portfolio margin simulator to determine your margin requirements and risk
levels based on your current portfolio balances. You can also append position
details on top of your portfolio specifics to see simulated results.

**Operation ID**: simulate-portfolio-margin

**Tags**: portfolio-margin-simulator

**Endpoint**: `POST /v1/simulate-portfolio-margin`

**Authentication Required**: Yes

## Parameters

| Parameter       | In    | Type   | Required | Description |
| --------------- | ----- | ------ | -------- | ----------- |
|                 |       | string | No       |             |
| includeExisting | query | string | No       |             |

## Request Body

### Content-Type: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/PortfolioSimulationRequest"
}
```

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/PortfolioSimulationResponse"
}
```

### 400 - Bad Request

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
