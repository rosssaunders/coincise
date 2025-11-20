# GET /v1/option-ladder/{symbol}

**Summary**: Get Option Ladder for market

## Description

Returns the for a given `baseSymbol`, organised by strike prices and expiration
dates. This data helps traders quickly assess the available options and their
respective prices, implied volatilities, and Greeks (such as delta, gamma,
theta, and vega).

**Operation ID**: get-option-ladder-symbol

**Tags**: option-ladder

**Endpoint**: `GET /v1/option-ladder/{symbol}`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description                                       |
| --------- | ---- | ------ | -------- | ------------------------------------------------- |
| symbol    | path | string | Yes      | symbol to get. Only option markets are supported. |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                 | Type   | Required | Description                                                                                                     |
| --------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| symbol                | string | No       | market symbol. Eg `BTC-USDC-20241004-70000-C` for OPTION markets.<br>**Example:** `"BTC-USDC-20241004-70000-C"` |
| baseSymbol            | string | No       | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                    |
| settlementAssetSymbol | string | No       | asset symbol as denoted in the world<br>**Example:** `"USDC"`                                                   |
| bidQuantity           | string | No       | Quantity of `bid`<br>**Example:** `"0.0"`                                                                       |
| askQuantity           | string | No       | Quantity of `ask`<br>**Example:** `"0.0"`                                                                       |
| bidIVPercentage       | string | No       | Implied volatility of the best bid price<br>**Example:** `"99.0"`                                               |
| askIVPercentage       | string | No       | Implied volatility of the best ask price<br>**Example:** `"99.0"`                                               |
| bid                   | string | No       | Bid price in the order book<br>**Example:** `"90000.0000"`                                                      |
| ask                   | string | No       | Ask price in the order book<br>**Example:** `"90000.0000"`                                                      |
| underlyingPrice       | string | No       | Index price of the base asset<br>**Example:** `"100000.0000"`                                                   |
| optionStrikePrice     | string | No       | Strike price of the option market<br>**Example:** `"90000"`                                                     |
| markPrice             | string | No       | Mark Price of the option market<br>**Example:** `"100.0000"`                                                    |
| quantity              | string | No       | Number of contracts outstanding<br>**Example:** `"1000"`                                                        |
| openInterest          | string | No       | Amount of outstanding contracts in the exchange<br>**Example:** `"0.11442400"`                                  |
| openInterestUSD       | string | No       | USD value of outstanding contracts in the exchange<br>**Example:** `"1144240.0000"`                             |
| optionType            | string | No       | Type of Option market<br>**Example:** `"CALL"`                                                                  |
| expiryDatetime        | string | No       | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                |
| greeks                | object | No       | Pricing parameters for option instruments                                                                       |

### 400 - Bad Request

### 404 - Option Market Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
