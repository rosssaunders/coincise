# GET /v1/accounts/trading-accounts/{tradingAccountId}

**Summary**: Get trading account details by trading account id

## Description

Gets details for specific trading account by `tradingAccountId` and API key used
in the request. It requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

**Ratelimited:** `True`

**Operation ID**: user-get-trading-account-by-id

**Tags**: trading-accounts

**Endpoint**: `GET /v1/accounts/trading-accounts/{tradingAccountId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In   | Type   | Required | Description               |
| ---------------- | ---- | ------ | -------- | ------------------------- |
|                  |      | string | No       |                           |
| tradingAccountId | path | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                      | Type          | Required | Description                                                                                                                                                                    |
| -------------------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isBorrowing                | string        | Yes      | whether the trading account is borrowing<br>**Example:** `"false"`                                                                                                             |
| isLending                  | string        | Yes      | whether the trading account is lending<br>**Example:** `"false"`                                                                                                               |
| makerFee                   | string        | No       | Deprecated and no longer accurate. See `tradeFeeRate` instead<br>**Example:** `"0.00000000"` ⚠️ _Deprecated_                                                                   |
| takerFee                   | string        | No       | Deprecated and no longer accurate. See `tradeFeeRate` instead<br>**Example:** `"0.00020000"` ⚠️ _Deprecated_                                                                   |
| maxInitialLeverage         | string        | Yes      | max initial leverage<br>**Example:** `"1"`                                                                                                                                     |
| tradingAccountId           | string        | Yes      | unique trading account ID<br>**Example:** `"111000000000001"`                                                                                                                  |
| tradingAccountName         | string        | Yes      | name of the trading account<br>**Example:** `"algo trading account"`                                                                                                           |
| tradingAccountDescription  | string        | Yes      | description of the trading account<br>**Example:** `"algo trading account with experimental strategy"`                                                                         |
| isPrimaryAccount           | string        | Yes      | whether this is the primary account<br>**Example:** `"false"`                                                                                                                  |
| rateLimitToken             | string        | Yes      | unique rate limit token of the trading account<br>**Example:** `"97d98951b12fb11f330dd9cb1b807d888c702679ee602edcf1ebc6bac17ad63d"`                                            |
| isDefaulted                | string        | Yes      | whether the trading account is defaulted<br>**Example:** `"false"`                                                                                                             |
| tradeFeeRate               | array[object] | Yes      | Trade fees per `feeGroupId` for this trading account                                                                                                                           |
| riskLimitUSD               | string        | Yes      | The maximum allowed borrowing for this trading account (in USD currency)<br>**Example:** `"10000.0000"`                                                                        |
| totalLiabilitiesUSD        | string        | Yes      | The The total liabilities for this trading account (in USD currency)<br>**Example:** `"14000.0000"`                                                                            |
| totalBorrowedUSD           | string        | Yes      | total borrowed across all assets in this trading account displayed in the reference asset in USD<br>**Example:** `"12000.0000"`                                                |
| totalCollateralUSD         | string        | Yes      | total collateral across all assets in this trading account displayed in the reference asset in USD<br>**Example:** `"13000.0000"`                                              |
| initialMarginUSD           | string        | Yes      | The minimum margin one must maintain in order to be able to purposefully increase risk<br>**Example:** `"0000.0000"`                                                           |
| warningMarginUSD           | string        | Yes      | The minimum margin when the customer will receive warning via email/notifications over UI<br>**Example:** `"0000.0000"`                                                        |
| liquidationMarginUSD       | string        | Yes      | The minimum value of margin one must maintain in order to avoid liquidation<br>**Example:** `"0000.0000"`                                                                      |
| fullLiquidationMarginUSD   | string        | Yes      | The value of margin when full liquidation occurs<br>**Example:** `"0000.0000"`                                                                                                 |
| defaultedMarginUSD         | string        | Yes      | The value of margin when this trading account will be moved into a Defaulted state<br>**Example:** `"0000.0000"`                                                               |
| endCustomerId              | string        | Yes      | The end customer id used for self trade prevention (default is institution id, max 32 characters)<br>**Example:** `"PrimeBroker"`                                              |
| isConcentrationRiskEnabled | string        | Yes      | whether concentration risk checks are enforced for an account when sending new orders. By default, concentration risk checks will apply to all accounts<br>**Example:** `true` |
| liquidityAddonUSD          | string        | Yes      | expected market impact of unwinding the portfolio in the case of a liquidation event<br>**Example:** `"1000.0000"`                                                             |
| marketRiskUSD              | string        | Yes      | the worst possible loss on the portfolio based on scenario analysis<br>**Example:** `"2000.0000"`                                                                              |
| marginProfile              | object        | Yes      |                                                                                                                                                                                |

### 400 - Bad Request Parameter

### 401 - Not Authenticated

### 403 - Access Forbidden

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
