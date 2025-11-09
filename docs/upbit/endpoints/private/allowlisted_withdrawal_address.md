# GET /v1/withdraws/coin_addresses

**Source:** [allowlisted-withdrawal-address](https://global-docs.upbit.com/reference/allowlisted-withdrawal-address)

## Description

Retrieves the list of withdrawal whitelist addresses registered to the account.

To request the withdrawal, a withdrawal address must be registered.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/withdraws/coin_addresses`

## Request Example

```bash
xxxxxxxxxx1curl --request GET \2--url 'https://{region}-api.upbit.com/v1/withdraws/coin_addresses' \3--header 'Authorization: Bearer {JWT_TOKEN}' \4--header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code of the digital asset to withdraw. |
| net_type | string | null | Withdrawal network type. Blockchain network identifier defined and used by Upbit. The net_type parameter used in a withdrawal request must have the same value as this field. |
| network_name | string | Name of the blockchain network used for withdrawals. Blockchain network name displayed to the user by Upbit. [Example]: "Ethereum", "Bitcoin", "Solana" |
| withdraw_address | string | Address to receive the digital assets when withdrawing. Only addresses registered in the withdrawal address list are supported. |
| secondary_address | string | null | Secondary withdrawal address (e.g., Destination Tag, Memo, Message). For some digital assets, deposits and withdrawals require a secondary address such as a Destination Tag, Memo, or Message. If the deposit address of the receiving exchange includes a secondary address, you must provide this field when submitting a withdrawal request. |
| beneficiary_name | string | Name of the beneficiary (individual or corporate) for the withdrawal.(Only Singapore)  For corporate entities, the response will be None |
| beneficiary_company_name | string | null | Name of the company receiving the withdrawn assets.(Only Singapore) |
| beneficiary_type | string | null | Type of receiving wallet.(Only Singapore)  individual: Individual wallet corporate: Corporate wallet |
| exchange_name | string | null | Name of the exchange where the withdrawal address is registered.(Only Singapore) |
| wallet_type | string | null | Type of individual wallet.(Only Singapore) |
