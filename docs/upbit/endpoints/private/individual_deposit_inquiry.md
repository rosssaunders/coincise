# GET /v1/deposit

**Source:** [individual-deposit-inquiry](https://global-docs.upbit.com/reference/individual-deposit-inquiry)

## Description

Retrieves the latest deposit history. To query specific deposit information, you can specify the deposit’s UUID, transaction ID (TXID), or currency code.

Currency code to query.
A filter parameter used to narrow down results by currency code.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/deposit`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | No | Currency code to query. A filter parameter used to narrow down results by currency code. |
| uuid | string | No | Unique identifier(UUID) of the deposit to query. If neither uuid nor txid is specified, the latest deposit record is returned. |
| txid | string | No | Transaction ID of the deposit to query. If neither uuid nor txid is specified, the latest deposit record is returned. |

## Request Example

```bash
curl --request GET   --url 'https://{region}-api.upbit.com/v1/deposit?uuid=94332e99-3a87-4a35-ad98-28b0c969f830'   --header 'Authorization: Bearer {JWT_TOKEN}'   --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| type | string | Deposit type. |
| uuid | string | Unique identifier for the deposit to verify. |
| currency | string | Currency code to be queried. |
| net_type | string | null | Deposit network type. Blockchain network identifier defined and used by Upbit. |
| txid | string | Transaction ID for the deposit as recorded on the blockchain. |
| state | string | Deposit status.  PROCESSING: Deposit in progress (digital asset only) ACCEPTED: Completed CANCELLED: Cancelled REJECTED: Rejected TRAVEL_RULE_SUSPECTED: Awaiting additional Travel Rule verification (digital assets only) REFUNDING: Refund in progress REFUNDED: Refunded (digital asset only)  PROCESSING ACCEPTED CANCELLED REJECTED TRAVEL_RULE_SUSPECTED REFUNDING REFUNDED |
| created_at | string | Deposit request time (UTC). |
| done_at | string | Deposit completion time (UTC). |
| amount | string | Amount of fiat currency to be deposited. |
| fee | string | Deposit fee. |
| transaction_type | string | Deposit type.  default: General deposit internal: Internal deposit (between Upbit accounts)  default internal |
