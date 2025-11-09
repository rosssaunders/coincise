# GET 【Private】Balance Change

**Source:**
[【Private】Balance Change](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## 【Private】Balance Change

Balance change push

### Pushing Rules

1.  User login required
2.  Qualified balance changes (recharge, withdrawal, transfer, transaction, BMX
    handling fee deduction)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

`{   "op": "subscribe",   "args": ["spot/user/balance:BALANCE_UPDATE"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/user/balance:BALANCE_UPDATE"]}`

- Includes changes in all currency balances

### Subscription successful

> Subscription successful

`{   "event":  "subscribe",   "topic":  "spot/user/balance:BALANCE_UPDATE" }`

`{"event": "subscribe","topic": "spot/user/balance:BALANCE_UPDATE"}`

### After successful subscription, push data

> Push data

`{   "data":[     {       "event_type":"TRANSACTION_COMPLETED  ",       "event_time":"1693364237000",       "balance_details":[{         "ccy": "BTC",         "av_bal": "123.22",         "fz_bal": "12.56"       }]     }   ],   "table":"spot/user/balance" }`

Return data description:

| Field      | Type   | Description     |
| ---------- | ------ | --------------- |
| event_type | string | Type for change |

\-`TRANSACTION_COMPLETED`\=Trade  
\-`ACCOUNT_RECHARGE`\=Recharge  
\-`ACCOUNT_WITHDRAWAL`\=Withdraw  
\-`ACCOUNT_TRANSFER`\=Transfer  
\-`BMX_DEDUCTION`\=BMX handling fee deduction | | event_time | string | Create
time | | balance_details | string | Detail | | \>ccy | string | Changing Balance
Currency | | \>av_bal | string | Available balance after change | | \>fz_bal |
string | Freeze balance after change |

**Notice：This data is displayed after decompression,
[Refer to Data Compression for details](#data-compression)**
