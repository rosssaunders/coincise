# GET /v1/deposits/generate_coin_address

**Source:** [deposit-address-generation](https://global-docs.upbit.com/reference/deposit-address-generation)

## Description

Requests the creation of a deposit address for depositing assets from a personal wallet or another exchange into Upbit.

Deposit address generation works asynchronously. Depending on the completion status at the time of the API call, two types of responses may be returned:

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/deposits/generate_coin_address`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | Yes | Currency code to be queried. |
| net_type | string | Yes | Blockchain network type. |

## Request Example

```bash
xxxxxxxxxx111curl --request POST   --url 'https://{region}-api.upbit.com/v1/deposits/generate_coin_address'   --header 'Authorization: Bearer {JWT_TOKEN}'   --header 'Content-Type: application/json'   --data '6{7"currency": "BTC",8"net_type": "BTC"9}10'11​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code to be queried. |
| net_type | string | null | Deposit network type. Blockchain network identifier defined and used by Upbit. |
| deposit_address | string | Deposit address for the digital asset. |
| secondary_address | string | null | Secondary withdrawal address (e.g., Destination Tag, Memo, Message). For some digital assets, deposits and withdrawals require a secondary address such as a Destination Tag, Memo, or Message. If the deposit address of the receiving exchange includes a secondary address, you must provide this field when submitting a withdrawal request. |
