# POST private/get-order-history

**Source:**
[private/get-order-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-order-history)

## Authentication

Required (Private Endpoint)

## private/get-order-history

> Request Sample

```
{
  "id": 1,
  "method": "private/get-order-history",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "start_time": 1610905028000081486,
    "end_time": 1613570791058211357,
    "limit": 20
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/get-order-history",
  "code": 0,
  "result": {
    "data": [{
      "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
      "order_id": "18342311",
      "client_oid": "1613571154795",
      "order_type": "LIMIT",
      "time_in_force": "GOOD_TILL_CANCEL",
      "side": "BUY",
      "exec_inst": [],
      "quantity": "0.0001",
      "limit_price": "51000.0",
      "order_value": "3.900100",
      "maker_fee_rate": "0.000250",
      "taker_fee_rate": "0.000400",
      "avg_price": "0.0",
      "cumulative_quantity": "0.0000",
      "cumulative_value": "0.000000",
      "cumulative_fee": "0.000000",
      "status": "CANCELED",
      "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
      "order_date": "2021-02-17",
      "instrument_name": "BTCUSD-PERP",
      "fee_instrument_name": "USD",
      "create_time": 1610905028000,
      "create_time_ns": "1610905028000123456",
      "update_time": 1613571320251
    },
      {
        "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
        "order_id": "18342500",
        "client_oid": "1613571154800",
        "order_type": "LIMIT",
        "time_in_force": "GOOD_TILL_CANCEL",
        "side": "BUY",
        "exec_inst": [],
        "quantity": "0.0500",
        "limit_price": "51283.0",
        "order_value": "2564.150000",
        "maker_fee_rate": "0.000250",
        "taker_fee_rate": "0.000400",
        "avg_price": "51278.5",
        "cumulative_quantity": "0.0500",
        "cumulative_value": "2563.925000",
        "cumulative_fee": "1.025570",
        "status": "FILLED",
        "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
        "order_date": "2021-02-17",
        "instrument_name": "BTCUSD-PERP",
        "fee_instrument_name": "USD",
        "reason": 43012,
        "create_time": 1613570791059,
        "create_time_ns": "1613570791059123456",
        "update_time": 1613570791060
      }]
  }
}

```

Gets the order history for a particular instrument.

Users should use `user.order` to keep track of real-time order updates, and
`private/get-order-history` should primarily be used for recovery; typically
when the websocket is disconnected.

### Request Params

| Name            | Type             | Required | Description                                   |
| --------------- | ---------------- | -------- | --------------------------------------------- |
| instrument_name | string           | N        | e.g. BTCUSD-PERP. Omit for 'all'              |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`). |

Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_time | number or
string | N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination | | limit | int | N | The
maximum number of trades to be retrieved before the `end_time`.  
Default: 100.  
Max: 100. |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name          | Type             | Description                                                                      |
| ------------- | ---------------- | -------------------------------------------------------------------------------- |
| account_id    | string           | Account ID                                                                       |
| order_id      | string of number | Order ID                                                                         |
| client_oid    | string           | Client Order ID                                                                  |
| order_type    | string           | `MARKET`, `LIMIT`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| time_in_force | string           |

\- `GOOD_TILL_CANCEL`  
\- `IMMEDIATE_OR_CANCEL`  
\- `FILL_OR_KILL` | | side | string | `BUY` or `SELL` | | exec_inst | array |  
\- `POST_ONLY`  
\- `SMART_POST_ONLY`  
\- `LIQUIDATION` | | quantity | string | Quantity specified in the order | |
limit_price | string | Limit price specified in the order | | order_value |
string | Order value | | maker_fee_rate | string | User's maker fee rate | |
taker_fee_rate | string | User's taker fee rate | | avg_price | string | Average
price | | cumulative_quantity | string | Cumulative executed quantity | |
cumulative_value | string | Cumulative executed value | | cumulative_fee |
string | Cumulative executed fee | | status | string | Order status:  
\- `REJECTED`  
\- `CANCELED`  
\- `FILLED`  
\- `EXPIRED` | | update_user_id | string | Updated user | | order_date | string
| Order creation date | | create_time | number | Order creation timestamp | |
create_time_ns | string | Order creation timestamp (nanosecond) | | update_time
| number | Order update timestamp | | instrument_name | string | e.g.
BTCUSD-PERP | | fee_instrument_name | string | Currency used for the fees |

Note: Please note `PENDING`,`ACTIVE` can only be found in
`private/get-open-orders` REST endpoint or `user.order` WebSocket subscription.
