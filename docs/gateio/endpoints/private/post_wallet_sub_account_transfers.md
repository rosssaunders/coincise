# POST /wallet/sub_account_transfers

**Source:** [/wallet/sub_account_transfers](https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-parameters)

## Authentication

Required (Private Endpoint)

## [#](#transfer-between-main-and-sub-accounts) Transfer between main and sub accounts

`POST /wallet/sub_account_transfers`

_Transfer between main and sub accounts_

Supports transfers to/from sub-account's spot or futures accounts. Note that
regardless of which sub-account is operated, only the main account's spot
account is used

> Body parameter

```json
{
  "sub_account": "10002",
  "sub_account_type": "spot",
  "currency": "BTC",
  "amount": "1",
  "direction": "to",
  "client_order_id": "da3ce7a088c8b0372b741419c7829033"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-parameters](https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-parameters)

| Name               | In   | Type   | Required | Description                                                                                                                                                                                                               |
| ------------------ | ---- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body               | body | object | true     | none                                                                                                                                                                                                                      |
| » sub_account      | body | string | true     | Sub account user ID                                                                                                                                                                                                       |
| » sub_account_type | body | string | false    | Target sub-account trading account: spot - spot account, futures - perpetual contract account, delivery - delivery contract account, options - options account                                                            |
| » currency         | body | string | true     | Transfer currency name                                                                                                                                                                                                    |
| » amount           | body | string | true     | Transfer amount                                                                                                                                                                                                           |
| » direction        | body | string | true     | Transfer direction: to - transfer into sub-account, from - transfer out from sub-account                                                                                                                                  |
| » client_order_id  | body | string | false    | Customer-defined ID to prevent duplicate transfers. Can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_'. Can be pure letters or pure numbers with length between 1-64 characters |

> Example responses

> 200 Response

```json
{
  "tx_id": 59636381286
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-responses](https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-responses)

| Status | Meaning                                                                    | Description                   | Schema |
| ------ | -------------------------------------------------------------------------- | ----------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Transfer operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-responseschema](https://www.gate.io/docs/developers/apiv4/en/#transferwithsubaccount-responseschema)

Status Code **200**

_TransactionID_

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » tx_id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-transfer-records-between-main-and-sub-accounts) Get transfer records between main and sub accounts

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-transfer-records-between-main-and-sub-accounts](https://www.gate.io/docs/developers/apiv4/en/#get-transfer-records-between-main-and-sub-accounts)

> Code samples
