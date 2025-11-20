# GET /v1/trades/{tradeId}

**Summary**: Get Trade by ID

## Description

Gets a trade by ID, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: trade-get-trade-by-id

**Tags**: trades

**Endpoint**: `GET /v1/trades/{tradeId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradeId          | path  | number | Yes      | trade ID                  |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                  | Type    | Required | Description                                                                                                                         |
| ---------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| tradeId                | string  | Yes      | <br>**Example:** `"100020000000000060"`                                                                                             |
| orderId                | string  | Yes      | <br>**Example:** `"297735387747975680"`                                                                                             |
| symbol                 | string  | Yes      | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market<br>**Example:** `"BTCUSDC"`                           |
| price                  | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| quantity               | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| quoteAmount            | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| baseFee                | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| quoteFee               | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| side                   | string  | Yes      | order side can have the following string values `"BUY"`, `"SELL"`<br>**Example:** `"BUY"`                                           |
| isTaker                | boolean | Yes      | <br>**Example:** `true`                                                                                                             |
| tradeRebateAmount      | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                    |
| tradeRebateAssetSymbol | string  | Yes      | asset symbol as denoted in the world<br>**Example:** `"USDC"`                                                                       |
| otcMatchId             | string  | Yes      | unique numeric (i64) identifier generated on Bullish side expressed as a string value<br>**Example:** `"15"`                        |
| otcTradeId             | string  | Yes      | unique numeric (i64) identifier generated on Bullish side expressed as a string value<br>**Example:** `"200000000000000098"`        |
| clientOtcTradeId       | string  | Yes      | unique numeric (i64) identifier generated on the client side expressed as a string value<br>**Example:** `"20050900225"`            |
| createdAtDatetime      | string  | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                    |
| createdAtTimestamp     | string  | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"` |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
