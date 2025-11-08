# POST private/get-transactions

**Source:**
[private/get-transactions](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-transactions)

## Authentication

Required (Private Endpoint)

## private/get-transactions

> Request Sample

```
{
  "id": 1,
  "method": "private/get-transactions",
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
  "method": "private/get-transactions",
  "code": 0,
  "result": {
    "data": [
      {
        "account_id": "88888888-8888-8888-8888-000000000123",
        "event_date": "2021-02-18",
        "journal_type": "TRADING",
        "journal_id": "187078",
        "transaction_qty": "-0.0005",
        "transaction_cost": "-24.500000",
        "realized_pnl": "-0.006125",
        "order_id": "72062",
        "trade_id": "71497",
        "trade_match_id": "8625",
        "event_timestamp_ms": 1613640752166,
        "event_timestamp_ns": "1613640752166234567",
        "client_oid": "6ac2421d-5078-4ef6-a9d5-9680602ce123",
        "taker_side": "MAKER",
        "side": "SELL",
        "instrument_name": "BTCUSD-PERP"
      },
      {
        "account_id": "88888888-8888-8888-8888-000000000123",
        "event_date": "2021-02-18",
        "journal_type": "SESSION_SETTLE",
        "journal_id": "186959",
        "transaction_qty": "0",
        "transaction_cost": "0.000000",
        "realized_pnl": "-0.007800",
        "trade_match_id": "0",
        "event_timestamp_ms": 1613638800001,
        "event_timestamp_ns": "1613638800001124563",
        "client_oid": "",
        "taker_side": "",
        "instrument_name": "BTCUSD-PERP"
      }
    ]
  }
}
```

Fetches recent transactions

### Request Params

| Name            | Type             | Required | Description                                            |
| --------------- | ---------------- | -------- | ------------------------------------------------------ |
| instrument_name | string           | N        | e.g. instrument_name, e.g. BTCUSD-PERP, Omit for 'all' |
| journal_type    | string           | N        | Refer to the `journal_type` in `Response Attributes`   |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`).          |

Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_time | number or
string | N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination | | limit | int | N | The
maximum number of trades to be retrievd before the `end_time`.  
Default: 100.  
Max: 100. |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name               | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account_id         | string           | Account ID                                                                                                                                                                                                                                                                                                                                                                                           |
| event_date         | string           | Event date                                                                                                                                                                                                                                                                                                                                                                                           |
| journal_type       | string           | Journal type would be `TRADING`, `TRADE_FEE`, `ONCHAIN_WITHDRAWAL`, `ONCHAIN_DEPOSIT`, `FUNDING`, `REALIZED_PNL`, `INSURANCE_FUND`, `SOCIALIZED_LOSS`, `LIQUIDATION_FEE`, `SESSION_RESET`, `ADJUSTMENT`, `SESSION_SETTLE`, `UNCOVERED_LOSS`, `ADMIN_ADJUSTMENT`, `DELIST`, `SETTLEMENT_FEE`, `AUTO_CONVERSION`, `MANUAL_CONVERSION`,`SUBACCOUNT_TX`,`FIAT_WITHDRAWAL_CANCEL`,`MARGIN_TRADE_INTEREST` |
| journal_id         | string of number | Journal ID                                                                                                                                                                                                                                                                                                                                                                                           |
| transaction_qty    | string           | Transaction quantity                                                                                                                                                                                                                                                                                                                                                                                 |
| transaction_cost   | string           | Transaction cost                                                                                                                                                                                                                                                                                                                                                                                     |
| realized_pnl       | string           | Realized PNL                                                                                                                                                                                                                                                                                                                                                                                         |
| order_id           | string of number | Order ID                                                                                                                                                                                                                                                                                                                                                                                             |
| trade_id           | string of number | Trade ID                                                                                                                                                                                                                                                                                                                                                                                             |
| trade_match_id     | string of number | Trade match ID applicable to trades only. Non-trade related transactions will have zero or null value.                                                                                                                                                                                                                                                                                               |
| client_oid         | string           | Client Order ID (can be empty)                                                                                                                                                                                                                                                                                                                                                                       |
| taker_side         | string           | `MAKER` or `TAKER` or empty                                                                                                                                                                                                                                                                                                                                                                          |
| side               | string           | `BUY` or `SELL`                                                                                                                                                                                                                                                                                                                                                                                      |
| instrument_name    | string           | e.g. BTCUSD-PERP                                                                                                                                                                                                                                                                                                                                                                                     |
| event_timestamp_ms | number           | Event timestamp in milliseconds                                                                                                                                                                                                                                                                                                                                                                      |
| event_timestamp_ns | string           | Event timestamp in nanoseconds                                                                                                                                                                                                                                                                                                                                                                       |
