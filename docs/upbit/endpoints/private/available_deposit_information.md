# GET /v1/deposits/chance/coin

**Source:** [available-deposit-information](https://global-docs.upbit.com/reference/available-deposit-information)

## Description

Deposits availability information for the specified currency is retrieved.

The deposit availability information for the currency includes the following key items.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/deposits/chance/coin`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | Yes | Currency code to query. A filter parameter used to narrow down results by currency code. |
| net_type | string | Yes | Blockchain network identifier for deposits and withdrawals. A filter parameter used to narrow down results by network identifier. |

## Request Example

```bash
curl --request GET   --url 'https://{region}-api.upbit.com/v1/deposits/chance/coin?currency=BTC&net_type=BTC'   --header 'Authorization: Bearer {JWT_TOKEN}'   --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code to be queried. |
| net_type | string | null | Deposit network type. Blockchain network identifier defined and used by Upbit. |
| is_deposit_possible | boolean | Deposit Availability. |
| deposit_impossible_reason | string | Reason for deposit unavailability. ※ A message is provided if "is_deposit_possible" is set to "false". |
| minimum_deposit_amount | string | Minimum deposit amount. |
| minimum_deposit_confirmations | integer | Minimum deposit confirmation count. The number of blockchain confirmations required by Upbit for the asset to be accepted as a valid deposit. |
| decimal_precision | integer | Number of decimal places supported for deposits. |
