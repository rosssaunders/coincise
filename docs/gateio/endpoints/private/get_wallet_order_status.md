# GET /wallet/order_status

**Source:**
[/wallet/order_status](https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-parameters)

## Authentication

Required (Private Endpoint)

## [#](#transfer-status-query) Transfer status query

`GET /wallet/order_status`

_Transfer status query_

Supports querying transfer status based on user-defined client_order_id or tx_id
returned by the transfer interface

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-parameters](https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-parameters)

| Name            | In    | Type   | Required | Description                                                                                                                                                                                                               |
| --------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client_order_id | query | string | false    | Customer-defined ID to prevent duplicate transfers. Can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_'. Can be pure letters or pure numbers with length between 1-64 characters |
| tx_id           | query | string | false    | Transfer operation number, cannot be empty at the same time as client_order_id                                                                                                                                            |

> Example responses

> 200 Response

```json
{
  "tx_id": "59636381286",
  "status": "SUCCESS"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-responses](https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-responses)

| Status | Meaning                                                                    | Description                            | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Transfer status retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-responseschema](https://www.gate.io/docs/developers/apiv4/en/#gettransferorderstatus-responseschema)

Status Code **200**

_TransferOrderStatus_

| Name     | Type   | Description                                                                                                                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » tx_id  | string | Order ID                                                                                                                                                                                          |
| » status | string | Transfer status: PENDING - Processing, SUCCESS - Transfer successful, FAIL - Transfer failed, PARTIAL_SUCCESS - Partially successful (this status appears when transferring between sub-accounts) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-withdrawal-status) Query withdrawal status

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-withdrawal-status](https://www.gate.io/docs/developers/apiv4/en/#query-withdrawal-status)

> Code samples
