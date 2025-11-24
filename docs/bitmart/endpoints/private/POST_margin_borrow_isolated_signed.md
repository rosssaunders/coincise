# POST Margin Borrow (Isolated) (SIGNED)

**Source:**
[Margin Borrow (Isolated) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Margin Borrow (Isolated) (SIGNED)

`Applicable to isolated margin account borrowing operations`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow`

| Field    | Type   | Required? | Description                                                                            |
| -------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| symbol   | String | Yes       | Trading pair (e.g. BMX_USDT)                                                           |
| currency | String | Yes       | Borrowing currency, selected according to the borrowing trading pair(like BTC or USDT) |
| amount   | String | Yes       | Amount of borrowing (precision: 8 decimal places)                                      |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "f7f74924-14da-42a6-b7f2-d3799dd9a612",
  "data": {
    "borrow_id": "113896"
  }
}
```

| Field     | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| borrow_id | String | Borrowing order ID, only successful borrowing will be returned |
