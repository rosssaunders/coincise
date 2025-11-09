# GET /api/v1/instruments/{instrument}

## Get instrument details

Retrieves market information for a specific instrument.

**Operation ID:** getInstrument

**Tags:** Instruments

**Endpoint:** `GET /api/v1/instruments/{instrument}`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| instrument | path | string | Yes | Identifies the instrument by name (e.g., `BTC-USDC`), UUID (e.g., `ce55a827-f04a-45c0-9d9b-8bbdb9b48065`), or instrument ID (e.g., `7149252043835013`) |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Instrument

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
