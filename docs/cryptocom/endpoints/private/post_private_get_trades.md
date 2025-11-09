# POST private/get-trades

**Source:**
[private/get-trades](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-trades)

## Authentication

Required (Private Endpoint)

## private/get-trades

> Request Sample

```
{
  "id": 1,
  "method": "private/get-trades",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "start_time": "1619089031996081486",
    "end_time": "1619200052124211357",
    "limit": 20
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/get-trades",
  "code": 0,
  "result": {
    "data": [{
      "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
      "event_date": "2021-02-17",
      "journal_type": "TRADING",
      "traded_quantity": "0.0500",
      "traded_price": "51278.5",
      "fees": "-1.025570",
      "order_id": "19708564",
      "trade_id": "38554669",
      "trade_match_id": "76423",
      "client_oid": "7665b001-2753-4d17-b266-61ecb755922d",
      "taker_side": "MAKER",
      "side": "BUY",
      "instrument_name": "BTCUSD-PERP",
      "fee_instrument_name": "USD",
      "create_time": 1613570791060,
      "create_time_ns": "1613570791060827635",
      "transact_time_ns": "1613570791060827635",
      "match_count": "1",
      "match_index": "0"
    }]
  }
}
```

Gets all executed trades for a particular instrument.

Users should use `user.trade` to keep track of real-time trades, and
`private/get-trades` should primarily be used for recovery; typically when the
websocket is disconnected.

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
maximum number of trades to be retrievd before the `end_time`.  
Default: 100.  
Max: 100. |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency  
get-trades time window can only be up to 7 days for maximum.

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                | Type             | Description                                                |
| ------------------- | ---------------- | ---------------------------------------------------------- |
| account_id          | string           | Account ID                                                 |
| event_date          | string           | Event date                                                 |
| journal_type        | string           | Journal type would be `TRADING`                            |
| traded_quantity     | string           | Trade quantity                                             |
| traded_price        | string           | Trade price                                                |
| fees                | string           | Trade fees, the negative sign means a deduction on balance |
| order_id            | string of number | Order ID                                                   |
| trade_id            | string of number | Trade ID                                                   |
| trade_match_id      | string of number | Trade match ID                                             |
| client_oid          | string           | Client Order ID                                            |
| taker_side          | string           | `MAKER` or `TAKER` or empty                                |
| side                | string           | `BUY` or `SELL`                                            |
| instrument_name     | string           | e.g. BTCUSD-PERP                                           |
| fee_instrument_name | string           | e.g. USD                                                   |
| create_time         | number           | Create timestamp in milliseconds                           |
| create_time_ns      | string           | Create timestamp in nanoseconds                            |
| transact_time_ns    | string           | Trade transaction time in nanseconds                       |
| match_count         | string of number | (Optional)                                                 |

Number of orders matched for this trade execution  
If it is Maker's Order, value is always 1  
If it is Taker's Order, it is the number of orders matched for this trade
execution | | match_index | string of number | (Optional)  
Only appears if it is Maker's order.  
It represents which order entry of corresponding price level was matched  
This value is 0 base. If the matched order is on the top of the queue, it is
shown 0. |
