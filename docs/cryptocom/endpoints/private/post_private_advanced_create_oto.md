# POST private/advanced/create-oto

**Source:** [private/advanced/create-oto](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-create-oto)

## Authentication

Required (Private Endpoint)

## private/advanced/create-oto

> Request Example

```
{
  "method":"private/advanced/create-oto",
  "id":123456789,
  "nonce":123456789000,
  "params":{
    "order_list":[
      {
        "instrument_name":"BTCUSD",
        "quantity":"0.1",
        "type":"LIMIT",
        "price":"93000",
        "side":"BUY",
      },
      {
        "instrument_name":"BTCUSD",
        "quantity":"0.1",
        "type":"STOP_LOSS",
        "ref_price":"80000",
        "side":"SELL",
      }
    ]
  }
}
```

> Response Example

```
{
  "id" : 1661331443,
  "method" : "private/advanced/create-oto",
  "code" : 0,
  "result" : {
    "list_id" : 6498090546073120100
  }
}
```

Creates a One-triggers-the-Other (OTO) execution strategy on the Exchange.

OTO execution strategy allows users to place a two-order strategy where one order automatically triggers the other when the first order is fully executed. Users are able to place a limit order with a trigger order, and only when the limit order is fully executed, the trigger order will take effect. The trigger order can either be a stop loss or take profit order. The OTO order type is only available for Spot trading pairs for now.

This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check if the orders are successfully created.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| order\_list | array of orders | Y | Exactly 2 orders |

For the content of each order in `order_list`, please refer to [`private/create-order`](#private-create-order) for details. One order must be `LIMIT` and the other must be `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT_LIMIT` or `TAKE_PROFIT`. For `ref_price_type` of the trigger order, only `MARK_PRICE` is supported for now.

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| list\_id | number | List ID |