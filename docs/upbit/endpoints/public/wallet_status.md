# GET /v1/status/wallet

**Source:** [wallet-status](https://global-docs.upbit.com/reference/wallet-status)

## Description

Retrieves deposit and withdrawal service status for all currencies.

List of service status

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/status/wallet`

## Request Example

```bash
curl --request GET     --url 'https://{region}-api.upbit.com/v1/status/wallet'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code to be queried. |
| wallet_state | string | Indicates whether deposit and withdrawal support has ever been provided for each asset. For the current deposit/withdrawal availability, please refer to the wallet_support field.  working: Deposit/withdrawal available unsupported: Deposit/withdrawal not supported  working unsupported |
| block_state | string | Status of the blockchain network. This field may return null depending on the status of the wallet or exchange.  normal: Normal delayed: Delayed inactive: Inactive  normal delayed inactive |
| block_height | integer | Current confirmed block height. This field may return null depending on the status of the wallet or exchange. |
| block_updated_at | string | Time when the block height was last updated (UTC). This field may return null depending on the status of the wallet or exchange. |
| block_elapsed_minutes | integer | Time elapsed since the last block update (minutes). This field may return null depending on the status of the wallet or exchange. |
| net_type | string | Deposit/withdrawal network type. Blockchain network identifier defined and used by Upbit. |
| network_name | string | Deposit/withdrawal network name. Blockchain network name shown to users in Upbit. [Example]: "Ethereum", "Bitcoin", "Solana" -Singapore Wallet Status -Indonesia Wallet Status -Thailand Wallet Status |
