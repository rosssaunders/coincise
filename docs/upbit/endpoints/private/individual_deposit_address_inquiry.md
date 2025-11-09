# GET /v1/deposits/coin_address

**Source:** [individual-deposit-address-inquiry](https://global-docs.upbit.com/reference/individual-deposit-address-inquiry)

## Description

Retrieves deposit address information for the specified currency.

Currency code to query.
A filter parameter used to narrow down results by currency code.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/deposits/coin_address`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | Yes | Currency code to query. A filter parameter used to narrow down results by currency code. |
| net_type | string | Yes | Blockchain network identifier for deposits and withdrawals. A filter parameter used to narrow down results by network identifier. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET     --url 'https://{region}-api.upbit.com/v1/deposits/coin_address?currency=BTC&net_type=BTC'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code to be queried. |
| net_type | string | null | Deposit network type. Blockchain network identifier defined and used by Upbit. |
| deposit_address | string | Deposit address for the digital asset. |
| secondary_address | string | null | Secondary withdrawal address (e.g., Destination Tag, Memo, Message). For some digital assets, deposits and withdrawals require a secondary address such as a Destination Tag, Memo, or Message. If the deposit address of the receiving exchange includes a secondary address, you must provide this field when submitting a withdrawal request. |
