# GET deposit address.

**Source:**
[deposit address.](https://docs.backpack.exchange/#tag/Capital/operation/get_deposit_address)

## Authentication

Required (Private Endpoint)

## [](#tag/Capital/operation/get_deposit_address)Get deposit address.

Retrieves the user specific deposit address if the user were to deposit on the
specified blockchain.

**Instruction:** `depositAddressQuery`

##### query Parameters

| Parameter  | Required | Type   | Description                                     |
| ---------- | -------- | ------ | ----------------------------------------------- |
| blockchain | required | string | Blockchain symbol to get a deposit address for. |

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

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| address   | required | string | Address.    |

**400**

Bad request.

**401**

Unauthorized.

**409**

Conflict

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
