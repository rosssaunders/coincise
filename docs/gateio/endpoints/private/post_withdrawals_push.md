# POST /withdrawals/push

**Source:** [/withdrawals/push](https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#uid-transfer) UID transfer

`POST /withdrawals/push`

_UID transfer_

Transfers between main spot accounts. Both parties cannot be sub-accounts

> Body parameter

```json
{
  "receive_uid": 12233,
  "currency": "USDT",
  "amount": "1.1"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-parameters)

| Name          | In   | Type           | Required | Description     |
| ------------- | ---- | -------------- | -------- | --------------- |
| body          | body | object         | true     | none            |
| » receive_uid | body | integer(int64) | true     | Recipient UID   |
| » currency    | body | string         | true     | Currency name   |
| » amount      | body | string         | true     | Transfer amount |

> Example responses

> 200 Response

```json
{
  "id": 111
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-responses](https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-responses)

| Status | Meaning                                                                    | Description                                                            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request accepted. Check withdrawal record status for processing result | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#withdrawpushorder-responseschema)

Status Code **200**

| Name | Type           | Description |
| ---- | -------------- | ----------- |
| » id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-withdrawal-with-specified-id) Cancel withdrawal with specified ID

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-withdrawal-with-specified-id](https://www.gate.io/docs/developers/apiv4/en/#cancel-withdrawal-with-specified-id)

> Code samples
