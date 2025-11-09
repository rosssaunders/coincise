# GET /api/v1/rankings/statistics

## Get your rankings

Retrieve your volume rankings for maker, taker, and total volume.

**Operation ID:** getStatistics

**Tags:** Rankings

**Endpoint:** `GET /api/v1/rankings/statistics`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| instrument_type | query | string | Yes | Identifies the instruments by type . Allowed values: SPOT, PERPETUAL_FUTURE |
| period | query | string | No | Identifies the lookback window for the query . Allowed values: YESTERDAY, LAST_7_DAYS, THIS_MONTH, LAST_30_DAYS, LAST_MONTH. Default: THIS_MONTH |
| instruments | query | string | No | One or more instrument identifiers, such as name (e.g., `BTC-USDC`), UUID (e.g., `ce55a827-f04a-45c0-9d9b-8bbdb9b48065`), or instrument ID (e.g., `7149252043835013`). If not provided, the query will return the rankings for all instruments of the specified type. If one or more instruments are specified, the query will return the volume and relative percent for all specified instruments, but the returned rank will be "--". |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Ranking information

### 400

Invalid attribute

### 401

Authentication error

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
