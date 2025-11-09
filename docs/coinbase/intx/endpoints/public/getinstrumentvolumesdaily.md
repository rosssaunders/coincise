# GET /api/v1/instruments/volumes/daily

## Get daily trading volumes

Retrieves the trading volumes for each instrument separated by day.

**Operation ID:** getInstrumentVolumesDaily

**Tags:** Instruments

**Endpoint:** `GET /api/v1/instruments/volumes/daily`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| instruments | query | string | Yes | Identifies the instruments by name in a comma separated list (e.g., `BTC-PERP,ETH-PERP`) |
| result_limit | query | integer | No | The number of results to return (defaults to 60 with a max supported value of 100) |
| result_offset | query | integer | No | The number of results from the beginning to skip past |
| time_from | query | string | No | The first date to include data from in ISO 8601 timestamp format (e.g. `2024-03-01T00:00:00Z`) |
| show_other | query | boolean | No | Return an `OTHER` bucket in the instrument list containing the volume of all instruments filtered out by the `instruments` query parameter |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Instrument list

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
