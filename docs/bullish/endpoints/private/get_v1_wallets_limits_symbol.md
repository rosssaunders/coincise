# GET /v1/wallets/limits/{symbol}

**Summary**: Get Withdrawal Limits for Symbol

## Description

Get withdrawal limits for symbol, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-limits

**Tags**: custody

**Endpoint**: `GET /v1/wallets/limits/{symbol}`

**Authentication Required**: Yes

## Parameters

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
|           |      | string | No       |             |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field          | Type   | Required | Description                                                                                                                                                                                                  |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string | No       | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB<br>**Example:** `"USDC"`                                                                                                                        |
| available      | string | No       | remaining limit on amount of coin or token that could be withdrawn now, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)<br>**Example:** `"20000.0"`          |
| twentyFourHour | string | No       | limit on amount of coin or token that can be withdrawn over a 24 hour period, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)<br>**Example:** `"1000000.00"` |

### 429 - Too Many Requests

### 500 - Internal Server Error
