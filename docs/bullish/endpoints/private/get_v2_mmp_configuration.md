# GET /v2/mmp-configuration

**Summary**: Get Market Marker Protection Configuration By Trading Account Id

## Description

Get market maker protection configurations under a trading account id

This endpoint requires [authentication](#overview--generate-a-jwt-token). To
filter by `symbol`, additional parameters are required. For detailed
instructions, see the [Filtering Support](#overview--filtering-support) section.

**Operation ID**: get-mmp-config-by-trading-account-id

**Tags**: market-maker-protection(MMP)

**Endpoint**: `GET /v2/mmp-configuration`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description                                                                                                                                                                                         |
| ---------------- | ----- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                  |       | string | No       |                                                                                                                                                                                                     |
| symbol           | query | string | No       | The underlying asset id you filter the configurations against. If symbol is provided, this API will only return the market maker protection configuration for this symbol for this trading account. |
| tradingAccountId | query | string | Yes      | Id of the trading account                                                                                                                                                                           |

## Responses

### 200 - Status OK. This means a command was successfully acknowledged.

**Content-Type**: application/json

| Field             | Type          | Required | Description                                                                                                                                                                                                                            |
| ----------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tradingAccountId  | string        | Yes      | unique trading account ID<br>**Example:** `"111000000000001"`                                                                                                                                                                          |
| message           | string        | Yes      | If there are no market maker protection configurations setup for this trading account or for the provided optional symbol under the same trading account, this field will be returned as "No mmp config setup".<br>**Example:** `null` |
| mmpConfigurations | array[object] | Yes      | A list of market maker protection configurations that the user has setup for each underlying asset symbol under the trading account provided. Supports filtering of symbol.                                                            |

### 400 - Bad Request

### 401 - Not Authenticated

### 403 - Access Forbidden
