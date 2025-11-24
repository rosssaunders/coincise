# POST /wallet/sub_account_to_sub_account

**Source:**
[/wallet/sub_account_to_sub_account](https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-parameters)

## Authentication

Required (Private Endpoint)

## [#](#transfer-between-sub-accounts) Transfer between sub-accounts

`POST /wallet/sub_account_to_sub_account`

_Transfer between sub-accounts_

Supports balance transfers between two sub-accounts under the same main account.
You can use either the main account's API Key or the source sub-account's API
Key to perform the operation

> Body parameter

```json
{
  "currency": "usdt",
  "sub_account_from": "10001",
  "sub_account_from_type": "spot",
  "sub_account_to": "10002",
  "sub_account_to_type": "spot",
  "amount": "1"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-parameters](https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-parameters)

| Name                    | In   | Type   | Required | Description                                                                                                                         |
| ----------------------- | ---- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| body                    | body | object | true     | none                                                                                                                                |
| » currency              | body | string | true     | Transfer currency name                                                                                                              |
| » sub_account_type      | body | string | false    | Transfer from account (deprecated, use `sub_account_from_type` and `sub_account_to_type` instead)                                   |
| » sub_account_from      | body | string | true     | Transfer from the user id of the sub-account                                                                                        |
| » sub_account_from_type | body | string | true     | Source sub-account trading account: spot - spot account, futures - perpetual contract account, delivery - delivery contract account |
| » sub_account_to        | body | string | true     | Transfer to the user id of the sub-account                                                                                          |
| » sub_account_to_type   | body | string | true     | Target sub-account trading account: spot - spot account, futures - perpetual contract account, delivery - delivery contract account |
| » amount                | body | string | true     | Transfer amount                                                                                                                     |

> Example responses

> 200 Response

```json
{
  "tx_id": 59636381286
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-responses](https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-responses)

| Status | Meaning                                                                    | Description                   | Schema |
| ------ | -------------------------------------------------------------------------- | ----------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Transfer operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-responseschema](https://www.gate.io/docs/developers/apiv4/en/#subaccounttosubaccount-responseschema)

Status Code **200**

_TransactionID_

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » tx_id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-status-query) Transfer status query

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-status-query](https://www.gate.io/docs/developers/apiv4/en/#transfer-status-query)

> Code samples
