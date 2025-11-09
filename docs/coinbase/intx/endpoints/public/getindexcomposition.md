# GET /api/v1/index/{index}/composition

## Get index composition

Retrieves the latest index composition (metadata) with an ordered set of constituents.

**Operation ID:** getIndexComposition

**Tags:** Index

**Endpoint:** `GET /api/v1/index/{index}/composition`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| index | path | string | Yes | Identifies the index by name (e.g., `COIN50`) |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Latest index composition

### 400

Invalid attribute

### 401

Authentication error

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
