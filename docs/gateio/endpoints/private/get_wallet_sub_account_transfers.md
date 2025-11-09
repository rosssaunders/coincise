# GET /wallet/sub_account_transfers

**Source:**
[/wallet/sub_account_transfers](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-transfer-records-between-main-and-sub-accounts) Get transfer records between main and sub accounts

`GET /wallet/sub_account_transfers`

_Get transfer records between main and sub accounts_

Record query time range cannot exceed 30 days

> Note: Only records after 2020-04-10 can be retrieved

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-parameters)

| Name    | In    | Type           | Required | Description                                                                                                                        |
| ------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string         | false    | Sub-account user ID, you can query multiple records separated by `,`. If not specified, it will return records of all sub-accounts |
| from    | query | integer(int64) | false    | Start time for querying records, defaults to 7 days before current time if not specified                                           |
| to      | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                                                             |
| limit   | query | integer        | false    | Maximum number of records returned in a single list                                                                                |
| offset  | query | integer        | false    | List offset, starting from 0                                                                                                       |

> Example responses

> 200 Response

```
[
  {
    "timest": "1592809000",
    "uid": "10001",
    "sub_account": "10002",
    "sub_account_type": "spot",
    "currency": "BTC",
    "amount": "1",
    "direction": "to",
    "source": "web",
    "client_order_id": "da3ce7a088c8b0372b741419c7829033",
    "status": "success"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounttransfers-responseschema)

Status Code **200**

| Name               | Type   | Description                                                                                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » timest           | string | Transfer timestamp                                                                                                                                                                                                        |
| » uid              | string | Main account user ID                                                                                                                                                                                                      |
| » sub_account      | string | Sub account user ID                                                                                                                                                                                                       |
| » sub_account_type | string | Target sub-account trading account: spot - spot account, futures - perpetual contract account, delivery - delivery contract account, options - options account                                                            |
| » currency         | string | Transfer currency name                                                                                                                                                                                                    |
| » amount           | string | Transfer amount                                                                                                                                                                                                           |
| » direction        | string | Transfer direction: to - transfer into sub-account, from - transfer out from sub-account                                                                                                                                  |
| » source           | string | Source of the transfer operation                                                                                                                                                                                          |
| » client_order_id  | string | Customer-defined ID to prevent duplicate transfers. Can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_'. Can be pure letters or pure numbers with length between 1-64 characters |
| » status           | string | Sub-account transfer record status, currently only 'success'                                                                                                                                                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-sub-accounts) Transfer between sub-accounts

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-between-sub-accounts](https://www.gate.io/docs/developers/apiv4/en/#transfer-between-sub-accounts)

> Code samples
