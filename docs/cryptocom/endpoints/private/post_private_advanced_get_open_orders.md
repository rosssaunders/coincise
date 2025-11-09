# POST private/advanced/get-open-orders

**Source:**
[private/advanced/get-open-orders](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-get-open-orders)

## Authentication

Required (Private Endpoint)

## private/advanced/get-open-orders

> Request Example

```
{
  "id": 1,
  "method": "private/advanced/get-open-orders",
  "params": {
    "instrument_name": "BTCUSD"
  }
}
```

> Response Example

```
{
  "id": 1,
  "method": "private/advanced/get-open-orders",
  "code": 0,
  "result": {
    "data": [{
      "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
      "order_id": "19848525",
      "client_oid": "1613571154900",
      "order_type": "LIMIT",
      "time_in_force": "GOOD_TILL_CANCEL",
      "side": "BUY",
      "exec_inst": [],
      "quantity": "0.0100",
      "limit_price": "50000.0",
      "order_value": "500.000000",
      "maker_fee_rate": "0.000250",
      "taker_fee_rate": "0.000400",
      "avg_price": "0.0",
      "cumulative_quantity": "0.0000",
      "cumulative_value": "0.000000",
      "cumulative_fee": "0.000000",
      "status": "ACTIVE",
      "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
      "order_date": "2021-02-17",
      "instrument_name": "BTCUSD",
      "fee_instrument_name": "USD",
      "list_id": 6498090546073120100,
      "contingency_type": "OTOCO",
      "leg_id": 1,
      "create_time": 1613575617173,
      "create_time_ns": "1613575617173123456",
      "update_time": 1613575617173
    },
    {
      "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
      "order_id": "19848526",
      "client_oid": "1613571154901",
      "order_type": "STOP_LOSS",
      "time_in_force": "GOOD_TILL_CANCEL",
      "side": "SELL",
      "exec_inst": [],
      "quantity": "0.0100",
      "ref_price": "45000.00",
      "ref_price_type": "MARK_PRICE",
      "maker_fee_rate": "0.000250",
      "taker_fee_rate": "0.000400",
      "avg_price": "0.0",
      "cumulative_quantity": "0.0000",
      "cumulative_value": "0.000000",
      "cumulative_fee": "0.000000",
      "status": "ACTIVE",
      "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
      "order_date": "2021-02-17",
      "instrument_name": "BTCUSD",
      "fee_instrument_name": "USD",
      "list_id": 6498090546073120100,
      "contingency_type": "OTOCO",
      "leg_id": 2,
      "create_time": 1613575617173,
      "create_time_ns": "1613575617173123456",
      "update_time": 1613575617173
    },
    {
      "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
      "order_id": "19848526",
      "client_oid": "1613571154901",
      "order_type": "TAKE_PROFIT",
      "time_in_force": "GOOD_TILL_CANCEL",
      "side": "SELL",
      "exec_inst": [],
      "quantity": "0.0100",
      "ref_price": "55000.00",
      "ref_price_type": "MARK_PRICE",
      "maker_fee_rate": "0.000250",
      "taker_fee_rate": "0.000400",
      "avg_price": "0.0",
      "cumulative_quantity": "0.0000",
      "cumulative_value": "0.000000",
      "cumulative_fee": "0.000000",
      "status": "ACTIVE",
      "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
      "order_date": "2021-02-17",
      "instrument_name": "BTCUSD",
      "fee_instrument_name": "USD",
      "list_id": 6498090546073120100,
      "contingency_type": "OTOCO",
      "leg_id": 3,
      "create_time": 1613575617173,
      "create_time_ns": "1613575617173123456",
      "update_time": 1613575617173
    }
  }
}
```

Gets all **open** orders for OTO/OTOCO orders for a particular instrument.

### Request Params

| Name            | Type   | Required | Description                 |
| --------------- | ------ | -------- | --------------------------- |
| instrument_name | string | N        | e.g. BTCUSD. Omit for 'all' |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                | Type             | Description                                                            |
| ------------------- | ---------------- | ---------------------------------------------------------------------- |
| account_id          | string           | Account ID                                                             |
| order_id            | string of number | Order ID                                                               |
| client_oid          | string           | Client Order ID                                                        |
| order_type          | string           | `LIMIT`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| time_in_force       | string           | `GOOD_TILL_CANCEL`                                                     |
| side                | string           | `BUY` or `SELL`                                                        |
| exec_inst           | array            | `POST_ONLY`                                                            |
| quantity            | string           | Quantity specified in the order                                        |
| limit_price         | string           | Limit price specified in the order                                     |
| order_value         | string           | Order value                                                            |
| maker_fee_rate      | string           | User's maker fee rate                                                  |
| taker_fee_rate      | string           | User's taker fee rate                                                  |
| avg_price           | string           | Average price                                                          |
| cumulative_quantity | string           | Cumulative executed quantity                                           |
| cumulative_value    | string           | Cumulative executed value                                              |
| cumulative_fee      | string           | Cumulative executed fee                                                |
| status              | string           | Order status:                                                          |

\- `NEW`  
\- `PENDING`  
\- `ACTIVE` | | update_user_id | string | Updated user | | order_date | string |
Order creation date | | create_time | number | Order creation timestamp | |
create_time_ns | string | Order creation timestamp (nanosecond) | | update_time
| number | Order update timestamp | | instrument_name | string | e.g. BTCUSD | |
fee_instrument_name | string | Currency used for the fees | | list_id | number |
List id of OTO/OTOCO | | contingency_type | string | `OTO` or `OTOCO` | | leg_id
| number | Leg id of OTO/OTOCO orders |

Note: To detect a 'partial filled' status, look for `status` as `ACTIVE` and
`cumulative_quantity` > 0.
