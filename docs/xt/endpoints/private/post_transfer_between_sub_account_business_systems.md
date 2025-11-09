# POST /v4/balance/account/transfer

**Source:** [https://doc.xt.com/docs/spot/Transfer/TransferBetweenSubAccounts](https://doc.xt.com/docs/spot/Transfer/TransferBetweenSubAccounts)

## Description

This endpoint performs operations on /v4/balance/account/transfer.

## Authentication

Required (Private Endpoint)

## HTTP Request

`POST /v4/balance/account/transfer`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| bizId | string | Yes | N/A | Unique ID for idempotent processing | Maximum length: 128 |
| from | enum | Yes | N/A | Fund transfer out account | [bizType](/docs/spot/Access Description/PublicModule#biztype) |
| to | enum | Yes | N/A | Fund transfer in account | [bizType](/docs/spot/Access Description/PublicModule#biztype) |
| currency | string | Yes | N/A | Currency name, must be lowercase (e.g. `usdt`, `btc`) |  |
| symbol | string | No | N/A | Transfer symbol (must be lowercase). Required if one of the transfer-in or transfer-out accounts is **leverage** |  |
| amount | bigDecimal | Yes | N/A | Transfer amount |  |
| toAccountId | long | Yes | N/A | Transfer-in account ID (must belong to the same user as the transfer-out account ID) |  |
| fromAccountId | long | No | N/A | Transfer-out account ID |  |

## Response Example

```json
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": 123456
```