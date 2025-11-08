# POST private/advanced/cancel-order

**Source:** [private/advanced/cancel-order](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-cancel-order)

## Authentication

Required (Private Endpoint)

## private/advanced/cancel-order

> Request Example

```
{
  "id": 1,
  "nonce" : 1610905028000,
  "method": "private/advanced/cancel-order",
  "params": {
    "order_id": "18342311"
  }
}
```

> Response Example

```
{
  "id": 1,
  "method": "private/advanced/cancel-order",
  "code": 0,
  "message": "NO_ERROR",
  "result": {
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
    "order_id": "18342311"
  }
}

```

Cancel an individual order of a OTO/OTOCO order on the Exchange (asynchronous). This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when the order is successfully canceled.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| order\_id | number or string of number | Depends | Optional Order ID  
Either `order_id` or `client_oid` must be present  
`string` format is highly recommended. |
| client\_oid | string | Depends | Optional Client Order ID  
Either `order_id` or `client_oid` must be present |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| order\_id | string of number | Order ID |
| client\_oid | string | Client Order ID |