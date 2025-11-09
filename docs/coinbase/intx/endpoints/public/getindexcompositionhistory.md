# GET /api/v1/index/{index}/composition-history

## Get index composition history

Retrieves a history of index composition records in a descending time order. The results are an array of index composition data recorded at different "timestamps".

**Operation ID:** getIndexCompositionHistory

**Tags:** Index

**Endpoint:** `GET /api/v1/index/{index}/composition-history`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| index | path | string | Yes | Identifies the index by name (e.g., `COIN50`) |
| time_from | query | string | No | Filters look back history for returned data (accepts an ISO 8601 timestamp format) |
| result_limit | query | integer | No | The number of results to return (defaults to 5) |
| result_offset | query | integer | No | The number of results from the beginning to skip past |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Index composition list

### 400

Invalid attribute

### 401

Authentication error

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
