# GET /api/v1/instruments/{instrument}/candles

## Get aggregated candles data per instrument

Retrieves a list of aggregated candles data for a given instrument, granularity and time range

**Operation ID:** getInstrumentCandles

**Tags:** Instruments

**Endpoint:** `GET /api/v1/instruments/{instrument}/candles`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| instrument | path | string | Yes | Identifies the instrument by name (e.g., `BTC-PERP`) |
| granularity | query | string | Yes | The aggregation period of the candles data. End timestamp in ISO 8601 timestamp format (e.g. 2024-03-01T00:00:00Z). |
| start | query | string | Yes | Start timestamp in ISO 8601 timestamp format (e.g. `2024-03-01T00:00:00Z`) |
| end | query | string | No | End timestamp in ISO 8601 timestamp format (e.g. `2024-03-01T00:00:00Z`) |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Instrument list

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
