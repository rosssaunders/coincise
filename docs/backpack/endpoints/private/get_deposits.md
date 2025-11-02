# GET deposits.

**Source:**
[deposits.](https://docs.backpack.exchange/#tag/Capital/operation/get_deposits)

## Authentication

Required (Private Endpoint)

## [](#tag/Capital/operation/get_deposits)Get deposits.

Retrieves deposit history.

**Instruction:** `depositQueryAll`

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

| Parameter       | Required | Type                     | Description                                               |
| --------------- | -------- | ------------------------ | --------------------------------------------------------- |
| id              | required | integer <int32>          | Unique id of the deposit.                                 |
| toAddress       | optional | string                   | Deposit address.                                          |
| fromAddress     | optional | string                   | Source address.                                           |
| source          | required | string                   | Source of the deposit, blockchain or a payment processor. |
| status          | required | string                   | Status of the deposit.                                    |
| transactionHash | optional | string                   | Transaction hash of the blockchain transfer.              |
| symbol          | required | string                   | Symbol of the asset to be deposited.                      |
| quantity        | required | string <decimal>         | Quantity to be deposited.                                 |
| createdAt       | required | string <naive-date-time> | When the deposit was created.                             |
| fiatAmount      | optional | number <double>          | Amount in fiat currency.                                  |
| fiatCurrency    | optional | string                   | Currency of the fiat amount.                              |
| institutionBic  | optional | string                   | Institution BIC.                                          |
| platformMemo    | optional | string                   | An optional memo that may be provided by the platform.    |

**400**

Bad request.

**401**

Unauthorized.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
