# POST private/advanced/create-otoco

**Source:** [private/advanced/create-otoco](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-create-otoco)

## Authentication

Required (Private Endpoint)

## private/advanced/create-otoco

> Request Example

```
{
  "method":"private/advanced/create-otoco",
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
      },
      {
        "instrument_name":"BTCUSD",
        "quantity":"0.1",
        "type":"TAKE_PROFIT",
        "ref_price":"108000",
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
  "method" : "private/advanced/create-otoco",
  "code" : 0,
  "result" : {
    "list_id" : 6498090546073120100
  }
}
```

Creates a One-Triggers-a-One-Cancels-the-Other (OTOCO) execution strategy on the Exchange.

OTOCO execution strategy allows users to place a three-order strategy where one order automatically triggers the other two when the first order is fully executed. Users are able to place a limit order with two trigger orders, and only when the limit order is fully executed, the two trigger orders will take effect. The two trigger orders must be one stop loss and one take profit orders. When either one of the two trigger orders is executed, the other is automatically canceled. The OTOCO order type is only available for Spot trading pairs for now.

This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check if the orders are successfully created.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| order\_list | array of orders | Y | Exactly 3 orders |

For the content of each order in `order_list`, please refer to [`private/create-order`](#private-create-order) for details. One order must be `LIMIT`, and for the two trigger orders, one must be `STOP_LOSS` or `STOP_LIMIT`, and the other one must be `TAKE_PROFIT` or `TAKE_PROFIT_LIMIT`. For `ref_price_type` of the two trigger orders, only `MARK_PRICE` is supported for now.

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| list\_id | number | List ID |