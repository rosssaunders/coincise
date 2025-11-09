# GET /api/v1/index/{index}/candles

## Get index candles

Retrieves the historical daily index prices in time descending order. The daily values are represented as aggregated entries for the day in typical OHLC format.

**Operation ID:** getIndexCandles

**Tags:** Index

**Endpoint:** `GET /api/v1/index/{index}/candles`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| index | path | string | Yes | Identifies the index by name (e.g., `COIN50`) |
| granularity | query | string | Yes | The aggregation period of the candles data |
| start | query | string | Yes | Start timestamp in ISO 8601 timestamp format (e.g. `2024-10-21T00:00:00Z`) |
| end | query | string | No | End timestamp in ISO 8601 timestamp format (e.g. `2024-10-31T00:00:00Z`) |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Index Candle list

### 400

Invalid attribute

### 401

Authentication error

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
