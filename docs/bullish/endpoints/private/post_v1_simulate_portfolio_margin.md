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

| Field            | Type          | Required | Description                                                   |
| ---------------- | ------------- | -------- | ------------------------------------------------------------- |
| tradingAccountId | string        | Yes      | unique trading account ID<br>**Example:** `"111000000000001"` |
| positions        | array[string] | No       | portfolio position to be used in simulation                   |
| orders           | array[string] | No       | pending orders to be used in simulation                       |
| referencePrices  | array[string] | No       | reference price to be used in simulation                      |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                    | Type   | Required | Description                                                                                                                       |
| ------------------------ | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| collateralUSD            | string | No       | total collateral across all assets in this trading account displayed in the reference asset in USD<br>**Example:** `"13000.0000"` |
| borrowedUSD              | string | No       | total borrowed across all assets in this trading account displayed in the reference asset in USD<br>**Example:** `"12000.0000"`   |
| initialMarginUSD         | string | No       | The minimum margin one must maintain in order to be able to purposefully increase risk<br>**Example:** `"14000.0000"`             |
| warningMarginUSD         | string | No       | The minimum margin when the customer will receive warning via email/notifications over UI<br>**Example:** `"15000.0000"`          |
| liquidationMarginUSD     | string | No       | The minimum value of margin one must maintain in order to avoid liquidation<br>**Example:** `"16000.0000"`                        |
| fullLiquidationMarginUSD | string | No       | The value of margin when full liquidation occurs<br>**Example:** `"17000.0000"`                                                   |
| defaultedMarginUSD       | string | No       | The value of margin when this trading account will be moved into a Defaulted state<br>**Example:** `"18000.0000"`                 |
| liquidityAddonUSD        | string | No       | expected market impact of unwinding the portfolio in the case of a liquidation event<br>**Example:** `"19000.0000"`               |
| marketRiskUSD            | string | No       | the worst possible loss on the portfolio based on scenario analysis<br>**Example:** `"20000.0000"`                                |

### 400 - Bad Request

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
