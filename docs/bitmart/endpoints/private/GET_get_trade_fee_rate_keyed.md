# GET Get Trade Fee Rate (KEYED)

**Source:**
[Get Trade Fee Rate (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Trade Fee Rate (KEYED)

`Applicable for querying trade fee rate`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/trade-fee-rate`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/trade-fee-rate?symbol=BTCUSDT`

| Field  | Type   | Required? | Description                          |
| ------ | ------ | --------- | ------------------------------------ |
| symbol | String | Yes       | Symbol of the contract(like BTCUSDT) |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "symbol": "BTCUSDT",
    "taker_fee_rate": "0.0006",
    "maker_fee_rate": "0.0002"
  },
  "trace": "638d5048-ad21-4a4b-1234-d0756fbfc7ba"
}
```

| Field          | Type   | Description            |
| -------------- | ------ | ---------------------- |
| symbol         | String | Symbol of the contract |
| taker_fee_rate | String | Taker fee rate         |
| maker_fee_rate | String | Maker fee rate         |
