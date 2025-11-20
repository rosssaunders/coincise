# GET 【Private】Balance Change

**Source:** [【Private】Balance Change](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## 【Private】Balance Change

Balance change push

### Pushing Rules

1.  User login required
2.  Qualified balance changes (recharge, withdrawal, transfer, transaction, BMX handling fee deduction)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

```json
{
  "op": "subscribe",
  "args": [
    "spot/user/balance:BALANCE_UPDATE"
  ]
}
```

Message Format:

```json
{
  "op": "subscribe",
  "args": [
    "spot/user/balance:BALANCE_UPDATE"
  ]
}
```

-   Includes changes in all currency balances

### Subscription successful

> Subscription successful

```json
{
  "event": "subscribe",
  "topic": "spot/user/balance:BALANCE_UPDATE"
}
```

```json
{
  "event": "subscribe",
  "topic": "spot/user/balance:BALANCE_UPDATE"
}
```

### After successful subscription, push data

> Push data

```json
{
  "data": [
    {
      "event_type": "TRANSACTION_COMPLETED  ",
      "event_time": "1693364237000",
      "balance_details": [
        {
          "ccy": "BTC",
          "av_bal": "123.22",
          "fz_bal": "12.56"
        }
      ]
    }
  ],
  "table": "spot/user/balance"
}
```

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| event\_type | string | Type for change  
\-`TRANSACTION_COMPLETED`\=Trade  
\-`ACCOUNT_RECHARGE`\=Recharge  
\-`ACCOUNT_WITHDRAWAL`\=Withdraw  
\-`ACCOUNT_TRANSFER`\=Transfer  
\-`BMX_DEDUCTION`\=BMX handling fee deduction |
| event\_time | string | Create time |
| balance\_details | string | Detail |
| \>ccy | string | Changing Balance Currency |
| \>av\_bal | string | Available balance after change |
| \>fz\_bal | string | Freeze balance after change |

**Notice：This data is displayed after decompression, [Refer to Data Compression for details](#data-compression)**