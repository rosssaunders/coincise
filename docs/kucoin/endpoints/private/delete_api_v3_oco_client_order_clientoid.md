# DELETE /api/v3/oco/client-order/{clientOid}

**Source:**
[/api/v3/oco/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v3/oco/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Cancel OCO Order By ClientOid

Request via this interface to cancel a stop order via the clientOid. You will
receive cancelledOrderIds field once the system has received the cancellation
request. The cancellation request will be processed by the matching engine in
sequence. To know if the request is processed (successfully or not), you may
check the order status or the update message from the pushes.

## Parameters

| Parameter | Required | Type   | Description                                            |
| --------- | -------- | ------ | ------------------------------------------------------ |
| clientOid | required | string | Client Order Id，unique identifier created by the user |

## Responses

### 200

| Parameter              | Required | Type   | Description                                             |
| ---------------------- | -------- | ------ | ------------------------------------------------------- |
| code                   | required | string |                                                         |
| data                   | required | object |                                                         |
| data.cancelledOrderIds | required | array  | List of two order IDs related to the canceled OCO order |
