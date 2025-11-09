# GET /v1/accounts

**Source:** [overall-account-inquiry](https://global-docs.upbit.com/reference/overall-account-inquiry)

## Description

Retrieves the list of assets and balances owned by the account.

List of account balances

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/accounts`

## Request Example

```bash
xxxxxxxxxx1curl --request GET --url 'https://{region}-api.upbit.com/v1/accounts' --header 'Authorization: Bearer {JWT_TOKEN}' --header 'accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| currency | string | Currency code to be queried. |
| balance | string | Available amount or volume for orders. For digital assets, this represents the available quantity. For fiat currency, this represents the available amount. |
| locked | string | Amount or quantity locked by pending orders or withdrawals. |
| avg_buy_price | string | Average buy price of the asset. |
| avg_buy_price_modified | boolean | Indicates whether the average buy price has been modified. |
| unit_currency | string | Currency unit used as the basis for avg_buy_price. [Example]: SGD, BTC |

## Response Example

### Success Response (200 OK)

```json
[2  {3    "currency": "SGD", "balance": "1000000.0", "locked": "0.0", "avg_buy_price": "0", "avg_buy_price_modified": false, "unit_currency": "SGD"9  }, {11    "currency": "BTC", "balance": "2.0", "locked": "0.0", "avg_buy_price": "101000", "avg_buy_price_modified": false, "unit_currency": "SGD"17  }18]
```
