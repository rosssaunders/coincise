# GET withdrawals.

**Source:**
[withdrawals.](https://docs.backpack.exchange/#tag/Capital/operation/get_withdrawals)

## Authentication

Required (Private Endpoint)

## [](#tag/Capital/operation/get_withdrawals)Get withdrawals.

Retrieves withdrawal history.

**Instruction:** `withdrawalQueryAll`

##### query Parameters

| Parameter | Required | Type             | Description                                          |
| --------- | -------- | ---------------- | ---------------------------------------------------- |
| from      | optional | integer <int64>  | Filter to minimum time (milliseconds).               |
| to        | optional | integer <int64>  | Filter to maximum time (milliseconds).               |
| limit     | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset    | optional | integer <uint64> | Offset. Default 0.                                   |

##### header Parameters

| Parameter   | Required | Type             | Description                                                                 |
| ----------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| X-API-KEY   | optional | string           | API key                                                                     |
| X-SIGNATURE | optional | string           | Signature of the request                                                    |
| X-TIMESTAMP | optional | integer <int64>  | Timestamp of the request in milliseconds                                    |
| X-WINDOW    | optional | integer <uint64> | Time the request is valid for in milliseconds (default 5000, maximum 60000) |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter         | Required | Type                     | Description                                              |
| ----------------- | -------- | ------------------------ | -------------------------------------------------------- |
| id                | required | integer <int32>          | Unique id of the withdrawal.                             |
| blockchain        | required | string                   | Blockchain the withdrawal was requested for.             |
| clientId          | optional | string                   | Custom client id.                                        |
| identifier        | optional | string                   | Transaction hash of the withdrawal, if it has been sent. |
| quantity          | required | string <decimal>         | Quantity of the asset to withdraw.                       |
| fee               | required | string <decimal>         | Fee charged.                                             |
| fiatFee           | optional | string <decimal>         | Fiat fee charged.                                        |
| fiatState         | optional | string                   | Fiat state for Equals Money.                             |
| fiatSymbol        | optional | string                   | Fiat symbol.                                             |
| providerId        | optional | string                   | Provider ID for payment provider.                        |
| symbol            | required | string                   | Symbol of the asset to withdraw.                         |
| status            | required | string                   | Status of the withdrawal.                                |
| subaccountId      | optional | integer <uint16>         | ID of the subaccount requesting this withdrawal.         |
| toAddress         | required | string                   | Address to withdraw to.                                  |
| transactionHash   | optional | string                   | Transaction hash of withdrawal.                          |
| createdAt         | required | string <naive-date-time> | When the withdrawal was created.                         |
| isInternal        | required | boolean                  | Whether the withdrawal is an internal transfer.          |
| bankName          | optional | string                   | Bank name.                                               |
| bankIdentifier    | optional | string                   | Bank identifier.                                         |
| accountIdentifier | optional | string                   | Account identifier.                                      |
| triggerAt         | optional | string <naive-date-time> | When the withdrawal is to be triggered.                  |

**400**

Bad request.

**401**

Unauthorized.

**500**

Internal Server Error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
