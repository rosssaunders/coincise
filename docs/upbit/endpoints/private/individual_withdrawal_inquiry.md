# GET /v1/withdraw

**Source:** [individual-withdrawal-inquiry](https://global-docs.upbit.com/reference/individual-withdrawal-inquiry)

## Description

Retrieves the latest single withdrawal information. To query a specific withdrawal, you can specify the withdrawal’s UUID or transaction ID (TXID).

Unique identifier(UUID) of the withdrawal to query.
If neither uuid nor txid is specified, the latest withdrawal record is returned.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/withdraw`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| uuid | string | No | Unique identifier(UUID) of the withdrawal to query. If neither uuid nor txid is specified, the latest withdrawal record is returned. |
| txid | string | No | Transaction ID of the withdrawal to query. If neither uuid nor txid is specified, the latest withdrawal record is returned. |
| currency | string | No | Currency code to filter withdrawal history. A filter parameter used to narrow down results by currency code. if not provided, returns the latest withdrawals across all currencies. |

## Request Example

```bash
curl --request GET     --url 'https://{region}-api.upbit.com/v1/withdraw?currency=BTC'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| type | string | Withdrawal type. |
| uuid | string | Unique identifier for the withdrawal to verify. |
| currency | string | Currency code to be queried. |
| net_type | string | null | Withdrawal network type. Blockchain network identifier defined and used by Upbit. Returned as null for Fiat withdrawals. |
| txid | string | null | Transaction ID of the blockchain transaction. |
| state | string | Withdrawal status.  WAITING: Waiting PROCESSING: In progress DONE: Completed FAILED: Failed CANCELLED: Cancelled REJECTED: Rejected  WAITING PROCESSING DONE FAILED CANCELLED REJECTED |
| created_at | string | Time when the withdrawal was created. |
| done_at | string | null | Time when the withdrawal was completed. Returned as null if the withdrawal has not been completed. |
| amount | string | Quantity of digital assets to be withdrawn. |
| fee | string | Fee amount for the withdrawal. |
| transaction_type | string | Withdrawal type. The available values are as follows:  default: General withdrawal internal: Internal (between Upbit accounts)  default internal |
| is_cancelable | boolean | Indicates whether the withdrawal can be cancelled. |
