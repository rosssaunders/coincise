# GET 【Private】Assets Channel

**Source:**
[【Private】Assets Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## 【Private】Assets Channel

Get asset balance change

### Pushing Rules

1.  User login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

```json
{
  "action": "subscribe",
  "args": ["futures/asset:USDT", "futures/asset:BTC", "futures/asset:ETH"]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": ["<channel:currency>", "<channel:currency>"]
}
```

- actions: `subscribe`
- channel: Channel name `futures/asset`, fixed value
- currency: Currency, such as `BTC`, asset types that support subscriptions are:
  USDT (U-native), BTC (coin-native), ETH (coin-native)

### Response

> Response

```json
{
  "group": "futures/asset:BTC",
  "data": {
    "currency": "BTC",
    "available_balance": "1000",
    "position_deposit": "1000",
    "frozen_balance": "1000"
  }
}
```

Return data description:

| Field             | Type   | Description               |
| ----------------- | ------ | ------------------------- |
| currency          | String | Currency                  |
| available_balance | String | Available Amount          |
| position_deposit  | String | Position Margin           |
| frozen_balance    | String | Transaction Frozen Amount |
