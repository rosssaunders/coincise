# GET /api/v1/instruments/{instrument}/funding

## Get historical funding rates

Retrieves the historical funding rates for a specific instrument.

**Operation ID:** getInstrumentFunding

**Tags:** Instruments

**Endpoint:** `GET /api/v1/instruments/{instrument}/funding`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name          | In    | Type    | Required | Description                                                                                                                                            |
| ------------- | ----- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instrument    | path  | string  | Yes      | Identifies the instrument by name (e.g., `BTC-PERP`), UUID (e.g., `ce55a827-f04a-45c0-9d9b-8bbdb9b48065`), or instrument ID (e.g., `7149252043835013`) |
| result_limit  | query | integer | No       | The number of results to return (defaults to 25 with a max supported value of 100)                                                                     |
| result_offset | query | integer | No       | The number of results from the beginning to skip past                                                                                                  |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Funding Rates list

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
