# POST private/get-positions

**Source:** [private/get-positions](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-positions)

## Authentication

Required (Private Endpoint)

## private/get-positions

> Request Sample

```
{
  "id": 1,
  "method": "private/get-positions",
  "params": {},
  "nonce": 1611022832613
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/get-positions",
  "code": 0,
  "result": {
    "data": [{
      "account_id": "858dbc8b-22fd-49fa-bff4-d342d98a8acb",
      "quantity": "-0.1984",
      "cost": "-10159.573500",
      "open_position_pnl": "-497.743736",
      "open_pos_cost": "-10159.352200",
      "session_pnl": "2.236145",
      "update_timestamp_ms": 1613552240770,
      "instrument_name": "BTCUSD-PERP",
      "type": "PERPETUAL_SWAP"
    }]
  }
}
```

Returns the user's position.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | N | e.g. BTCUSD-PERP |

**Note**: If you omit all parameters, you still need to pass in an empty `params` block like `params: {}` for API request consistency

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

An array consisting of:

| Name | Type | Description |
| --- | --- | --- |
| instrument\_name | string | e.g. BTCUSD-PERP |
| type | string | e.g. Perpetual Swap |
| quantity | string | Position quantity |
| cost | string | Position cost or value in USD |
| open\_position\_pnl | string | Profit and loss for the open position |
| open\_pos\_cost | string | Open position cost |
| session\_pnl | string | Profit and loss in the current trading session |
| update\_timestamp\_ms | number | Updated time (Unix timestamp) |