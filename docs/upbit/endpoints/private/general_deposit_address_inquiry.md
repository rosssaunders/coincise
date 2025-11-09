# GET /v1/deposits/coin_addresses

**Source:** [general-deposit-address-inquiry](https://global-docs.upbit.com/reference/general-deposit-address-inquiry)

## Description

Retrieves deposit address information for the specified currency. Return all successfully generated deposit addresses.

List of deposit addresses

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/deposits/coin_addresses`

## Request Example

```bash
xxxxxxxxxx1curl --request GET   --url 'https://{region}-api.upbit.com/v1/deposits/coin_addresses'   --header 'Authorization: Bearer {JWT_TOKEN}'   --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code to be queried. |
| net_type | string | null | Deposit network type. Blockchain network identifier defined and used by Upbit. |
| deposit_address | string | Deposit address for the digital asset. |
| secondary_address | string | null | Secondary withdrawal address (e.g., Destination Tag, Memo, Message). For some digital assets, deposits and withdrawals require a secondary address such as a Destination Tag, Memo, or Message. If the deposit address of the receiving exchange includes a secondary address, you must provide this field when submitting a withdrawal request. |

## Response Example

### Success Response (200 OK)

```json
[2  {3    "currency": "BTC", "net_type": "BTC", "deposit_address": "3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD", "secondary_address": null7  }, {9    "currency": "ETH", "net_type": "ETH", "deposit_address": "0x0d73e0a482b8cf568976d2e8688f4a899d29301c", "secondary_address": null13  }, {15    "currency": "XRP", "net_type": "XRP", "deposit_address": "rN9qNpgnBaZwqCg8CvUZRPqCcPPY7wfWep", "secondary_address": "3057887915"19  }20]
```
