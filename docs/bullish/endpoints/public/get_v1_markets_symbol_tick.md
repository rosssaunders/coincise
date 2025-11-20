# GET /v1/markets/{symbol}/tick

**Summary**: Get Market Tick

## Description

Get Current Tick by Market Symbol.

- return top 100

**Ratelimited:** `False`

**Operation ID**: market-data-current-tick-by-market-symbol

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}/tick`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description                                          |
| --------- | ---- | ------ | -------- | ---------------------------------------------------- |
| symbol    | path | string | Yes      | symbol to get. Only perpetual markets are supported. |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field              | Type          | Required | Description                                                                                                                                                                                                             |
| ------------------ | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createdAtDatetime  | string        | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                                                                        |
| createdAtTimestamp | string        | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                                                                     |
| high               | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| low                | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| bestBid            | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| bidIVPercentage    | string        | No       | Implied volatility of the best bid price<br>**Example:** `"99.0"`                                                                                                                                                       |
| bidVolume          | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| bestAsk            | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| askIVPercentage    | string        | No       | Implied volatility of the best ask price<br>**Example:** `"99.0"`                                                                                                                                                       |
| askVolume          | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| vwap               | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| open               | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| close              | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| last               | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| change             | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| percentage         | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| average            | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| baseVolume         | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| quoteVolume        | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| bancorPrice        | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| markPrice          | string        | No       | mark price represents the fair value of a contract at the current time.<br>**Example:** `"19999.00"`                                                                                                                    |
| fundingRate        | string        | No       | funding rate is used to calculate funding, which measures the relative difference between the index price and mark price.<br>**Example:** `"0.01"`                                                                      |
| openInterest       | string        | No       | open interest is the total quantity of open long positions and short positions, see [asset value](#overview--price-and-quantity-precision) format (only applies to derivatives market)<br>**Example:** `"100000.32452"` |
| lastTradeDatetime  | string        | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                                                                        |
| lastTradeTimestamp | string        | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                                                                     |
| lastTradeQuantity  | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                        |
| ammData            | array[object] | Yes      | AMM data of all available fee tiers. Not applicable for `Option` markets                                                                                                                                                |
| optionStrikePrice  | string        | No       | The price at which the option can be exercised upon expiry.<br>**Example:** `"70000"`                                                                                                                                   |
| optionType         | string        | No       | Type of Option market<br>**Example:** `"CALL"`                                                                                                                                                                          |
| expiryDateTime     | string        | No       | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                                                                        |
| greeks             | object        | No       | Pricing parameters for option instruments                                                                                                                                                                               |

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
