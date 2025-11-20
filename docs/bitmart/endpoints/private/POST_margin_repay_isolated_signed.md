# POST Margin Repay (Isolated) (SIGNED)

**Source:** [Margin Repay (Isolated) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Margin Repay (Isolated) (SIGNED)

`Applicable to isolated margin account repayment operations`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX\_USDT) |
| currency | String | Yes | Repayment currency, selected according to the borrowing trading pair(like BTC or USDT) |
| amount | String | Yes | Amount of repayments (precision: 8 decimal places) |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "f7f74924-14da-42a6-b7f2-d3799dd9a612",
  "data": {
    "repay_id": "123165"
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| repay\_id | String | Repayment order ID, only successful repayment will be returned |