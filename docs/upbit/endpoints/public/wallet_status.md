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
xxxxxxxxxx1curl --request GET     --url 'https://{region}-api.upbit.com/v1/status/wallet'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'Accept: application/json'5​
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

## Response Example

### Success Response (200 OK)

```json
[2  {3    "currency": "BTC", "wallet_state": "working", "block_state": "normal", "block_height": 907974, "block_updated_at": "2025-07-31T16:12:40.584+00:00", "block_elapsed_minutes": 15, "net_type": "BTC", "network_name": "Bitcoin"11  }, {13    "currency": "ETH", "wallet_state": "working", "block_state": "normal", "block_height": 23040230, "block_updated_at": "2025-07-31T16:19:28.010+00:00", "block_elapsed_minutes": 2, "net_type": "ETH", "network_name": "Ethereum"21  }, {23    "currency": "XRP", "wallet_state": "working", "block_state": "normal", "block_height": 97847580, "block_updated_at": "2025-07-31T16:21:01.018+00:00", "block_elapsed_minutes": 2, "net_type": "XRP", "network_name": "XRP Ledger"31  }, {33    "currency": "USDT", "wallet_state": "working", "block_state": "normal", "block_height": 23040230, "block_updated_at": "2025-07-31T16:19:28.010+00:00", "block_elapsed_minutes": 2, "net_type": "ETH", "network_name": "Ethereum"41  }, {43    "currency": "SOL", "wallet_state": "working", "block_state": "normal", "block_height": 356978700, "block_updated_at": "2025-07-31T16:20:59.957+00:00", "block_elapsed_minutes": 2, "net_type": "SOL", "network_name": "Solana"51  }52]
```
