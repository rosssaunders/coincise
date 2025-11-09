# POST /api/v1/portfolios/{portfolio}/auto-margin-enabled

## Enable/Disable portfolio auto margin mode

Enable or disable the auto margin feature, which lets the portfolio automatically post margin amounts required to exceed the high leverage position restrictions.

**Operation ID:** autoMarginEnabled

**Tags:** Portfolios

**Endpoint:** `POST /api/v1/portfolios/{portfolio}/auto-margin-enabled`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| portfolio | path | string | Yes | Identifies the portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`) |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Auto margin setting updated

### 400

Auto margin setting update failed

### 403

Invalid permission

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
