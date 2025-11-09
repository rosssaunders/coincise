# POST /wallet/transfers

**Source:**
[/wallet/transfers](https://www.gate.io/docs/developers/apiv4/en/#transfer-parameters)

## Authentication

Required (Private Endpoint)

## [#](#transfer-between-trading-accounts) Transfer between trading accounts

`POST /wallet/transfers`

_Transfer between trading accounts_

Balance transfers between personal trading accounts. Currently supports the
following transfer operations:

1.  Spot account - Margin account
2.  Spot account - Perpetual futures account
3.  Spot account - Delivery futures account
4.  Spot account - Options account

> Body parameter

```
{
  "currency": "BTC",
  "from": "spot",
  "to": "margin",
  "amount": "1",
  "currency_pair": "BTC_USDT",
  "settle": ""
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-parameters](https://www.gate.io/docs/developers/apiv4/en/#transfer-parameters)

| Name            | In   | Type   | Required | Description                                                                                                                                       |
| --------------- | ---- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| body            | body | object | true     | none                                                                                                                                              |
| » currency      | body | string | true     | Transfer currency name. For contract accounts, `currency` can be set to `POINT` (points) or supported settlement currencies (e.g., `BTC`, `USDT`) |
| » from          | body | string | true     | Account to transfer from                                                                                                                          |
| » to            | body | string | true     | Account to transfer to                                                                                                                            |
| » amount        | body | string | true     | Transfer amount                                                                                                                                   |
| » currency_pair | body | string | false    | Margin trading pair. Required when transferring to or from margin account                                                                         |
| » settle        | body | string | false    | Contract settlement currency. Required when transferring to or from contract account                                                              |

#### [#](#enumerated-values) Enumerated Values

| Parameter | Value    |
| --------- | -------- |
| » from    | spot     |
| » from    | margin   |
| » from    | futures  |
| » from    | delivery |
| » from    | options  |
| » to      | spot     |
| » to      | margin   |
| » to      | futures  |
| » to      | delivery |
| » to      | options  |

> Example responses

> 200 Response

```
{
  "tx_id": 59636381286
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-responses](https://www.gate.io/docs/developers/apiv4/en/#transfer-responses)

| Status | Meaning                                                                    | Description                   | Schema |
| ------ | -------------------------------------------------------------------------- | ----------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Transfer operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-responseschema](https://www.gate.io/docs/developers/apiv4/en/#transfer-responseschema)

Status Code **200**

_TransactionID_

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » tx_id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-main-and-sub-accounts) Transfer between main and sub accounts

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-between-main-and-sub-accounts](https://www.gate.io/docs/developers/apiv4/en/#transfer-between-main-and-sub-accounts)

> Code samples
