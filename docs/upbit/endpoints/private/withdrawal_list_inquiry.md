# GET /v1/withdraws

**Source:** [withdrawal-list-inquiry](https://global-docs.upbit.com/reference/withdrawal-list-inquiry)

## Description

Retrieves latest withdrawal list.

You can set query parameters to retrieve a filtered list of withdrawals that meet the specified conditions. Currency, withdrawal status, UUID list, or TXID list can be used as filter parameters. If no conditions are specified, the API returns the most recent 100 withdrawal records.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/withdraws`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | No | Currency code to filter withdrawal history. A filter parameter used to narrow down results by currency code. if not provided, returns the latest withdrawals across all currencies. |
| state | string | No | Withdrawal processing status to be queried. A filter parameter used to limit the query target by withdrawal processing status. Only withdrawal information with the specified status will be returned in the response. The available values are as follows:  WAITING: Waiting PROCESSING: Processing DONE: Completed FAILED: Failed CANCELLED: Cancelled REJECTED: Rejected |
| limit | integer | No | Number of items per page. A parameter for pagination that allows you to specify the number of items per page to retrieve. Up to 100 items can be retrieved at a time, and if not specified, the default value is 100. |
| page | integer | No | Page number for pagination. A parameter for pagination that allows you to specify the page to retrieve. If not specified, the default value is 1. |
| order_by | string | No | Sorting method for query results. Returns a list of orders sorted according to the specified method based on the order creation time. The available values are "desc" (descending, latest orders first) or "asc" (ascending, oldest orders first). The default value is "desc". |
| from | string | No | Cursor for pagination. By entering the "uuid" value included in the response into this field, you can continue retrieving up to "limit" withdrawal records made after the specified withdrawal time. |
| to | string | No | Cursor for pagination. By entering the "uuid" value included in the response into this field, you can retrieve up to "limit" withdrawal records made before the specified withdrawal time. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET \2    --url 'https://{region}-api.upbit.com/v1/withdraws?currency=XRP&state=DONE' \3    --header 'Authorization: Bearer {JWT_TOKEN}' \4    --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| type | string | Withdrawal type. |
| uuid | string | Unique identifier for the order. |
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
| name | string | Name identifying the error. |
| message | string | Message describing the cause of the error. |
