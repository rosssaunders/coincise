# GET /v1/withdraws/chance

**Source:** [available-balance-information](https://global-docs.upbit.com/reference/available-balance-information)

## Description

Retrieves withdrawal availability information for the specified currency, including its withdrawal policy and user balance.

Available withdrawal information includes the following key items.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/withdraws/chance`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| currency | string | Yes | Currency code to query. A filter parameter used to narrow down results by currency code. |
| net_type | string | Yes | Blockchain network identifier used for deposits and withdrawals. After registering a withdrawal address, call the List Withdrawal Allowed Addresses API to check the available "net_type" values for each address. For digital assets, this is a required field. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET \2    --url 'https://{region}-api.upbit.com/v1/withdraws/chance?currency=BTC&net_type=BTC' \3    --header 'Authorization: Bearer {JWT_TOKEN}' \4    --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| security_level | integer | Security level of the account. |
| fee_level | integer | Fee level of the account. |
| email_verified | boolean | Indicates whether email verification has been completed. |
| identity_auth_verified | boolean | Indicates whether identity verification has been completed. |
| bank_account_verified | boolean | Indicates whether bank account verification has been completed. |
| locked | boolean | Indicates whether the account is protected (locked). |
| wallet_locked | boolean | Indicates whether withdrawal protection is enabled. |
| code | string | Currency code. |
| withdraw_fee | string | Fee amount for the withdrawal. |
| is_coin | boolean | Indicates whether the asset is a digital asset. |
| wallet_state | string | Indicates whether deposit and withdrawal support has ever been provided for each asset. For the current deposit/withdrawal availability, please refer to the wallet_support field.  working: Deposit/withdrawal available unsupported: Deposit/withdrawal not supported  working unsupported |
| currency | string | Currency code to be queried. |
| balance | string | Available amount or volume for orders. For digital assets, this represents the available quantity. For fiat currency, this represents the available amount. |
| avg_buy_price | string | Average buy price of the asset. |
| avg_buy_price_modified | boolean | Indicates whether the average buy price has been modified. |
| unit_currency | string | Currency unit used as the basis for avg_buy_price. [Example]: SGD, BTC |
| onetime | string | Single withdrawal limit for the asset. (Deprecated) |
| daily | string | null | Daily withdrawal limit for the asset. (Deprecated) |
| remaining_daily | string | Remaining daily withdrawal limit. (Deprecated) |
| remaining_daily_fiat | string | Integrated daily remaining withdrawal limit (fiat basis). |
| fiat_currency | string | Base fiat currency code. |
| minimum | string | Minimum withdrawal amount or quantity. |
| fixed | integer | Number of decimal places allowed for withdrawal amounts. |
| withdraw_delayed_fiat | string | Amount restricted from withdrawal due to the withdrawal delay system. |
| can_withdraw | boolean | Indicates whether withdrawal is currently supported for the currency. To check if withdrawal is available, verify that "withdraw" is present in currency.wallet_support. |
| remaining_daily_sgd | string | Integrated daily remaining withdrawal limit in SGD. (deprecated) |
| name | string | Name identifying the error. |
| message | string | Message describing the cause of the error. |
