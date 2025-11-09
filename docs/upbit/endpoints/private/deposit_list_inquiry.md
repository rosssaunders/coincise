# GET /v1/deposits

**Source:** [deposit-list-inquiry](https://global-docs.upbit.com/reference/deposit-list-inquiry)

## Description

Retrieves the latest deposit list.

You can set query conditions to retrieve only the deposit records that meet those conditions. Currency, deposit status, UUID list, or TXID list can be used as filter parameters. If no conditions are specified, the most recent 100 deposit records will be returned.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/deposits`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | No | Currency code to filter deposit history. A filter parameter used to narrow down results by currency code. if not provided, returns the latest deposits across all currencies. |
| state | string | No | Deposit status to be queried. A filter parameter used to limit the query target by deposit status. Only deposit information with the specified status will be returned in the response. The available values are as follows:  PROCESSING: Processing ACCEPTED: Completed CANCELLED: Cancelled REJECTED: Rejected TRAVEL_RULE_SUSPECTED: Waiting for additional Travel Rule verification REFUNDING: Refund in progress REFUNDED: Refund completed |
| limit | integer | No | Number of items per page. A parameter for pagination that allows you to specify the number of items per page to retrieve. Up to 100 items can be retrieved at a time, and if not specified, the default value is 100. |
| page | integer | No | Page number for pagination. A parameter for pagination that allows you to specify the page to retrieve. If not specified, the default value is 1. |
| order_by | string | No | Sorting method for query results. Returns a list of orders sorted according to the specified method based on the order creation time. The available values are "desc" (descending, latest orders first) or "asc" (ascending, oldest orders first). The default value is "desc". |
| from | string | No | Cursor for pagination. By entering the "uuid" value included in the response into this field, you can continue retrieving up to "limit" deposit records made after the specified deposit time. |
| to | string | No | Cursor for pagination. By entering the "uuid" value included in the response into this field, you can retrieve up to "limit" deposit records made before the specified deposit time. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET  --url 'https://{region}-api.upbit.com/v1/deposits?currency=SGD'  --header 'Authorization: Bearer {JWT_TOKEN}'  --header 'accept: application/json'5​
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

## Response Example

### Success Response (200 OK)

```json
[2  {3    "type": "deposit", "uuid": "94332e99-3a87-4a35-ad98-28b0c969f830", "currency": "SGD", "net_type": null, "txid": "BKD-2000-12-29-aeked29c05eadac293b4214994", "state": "ACCEPTED", "created_at": "2025-07-04T15:00:00", "done_at": "2025-07-04T15:00:10", "amount": "100000.0", "fee": "0.0", "transaction_type": "default"14  }15]
```
