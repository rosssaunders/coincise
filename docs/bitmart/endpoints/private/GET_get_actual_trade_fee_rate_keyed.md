# GET Get Actual Trade Fee Rate (KEYED)

**Source:**
[Get Actual Trade Fee Rate (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Actual Trade Fee Rate (KEYED)

`For the actual fee rate of the trading pairs`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/trade_fee`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/trade_fee?symbol=BTC_USDT`

| Field  | Type   | Required? | Description                  |
| ------ | ------ | --------- | ---------------------------- |
| symbol | String | Yes       | Trading pair (e.g. BMX_USDT) |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "87614aa8-5327-4fe2-aafc-02e2ddca7210",
  "data": {
    "symbol": "BTC_USDT",
    "buy_taker_fee_rate": "0.0008",
    "sell_taker_fee_rate": "0.0008",
    "buy_maker_fee_rate": "0.0006",
    "sell_maker_fee_rate": "0.0006"
  }
}
```

| Field               | Type   | Description           |
| ------------------- | ------ | --------------------- |
| symbol              | String | Trading pair          |
| buy_taker_fee_rate  | String | Taker fee rate (Buy)  |
| sell_taker_fee_rate | String | Taker fee rate (Sell) |
| buy_maker_fee_rate  | String | Maker fee rate (Buy)  |
| sell_maker_fee_rate | String | Maker fee rate (Sell) |
