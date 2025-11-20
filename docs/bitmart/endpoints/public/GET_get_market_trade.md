# GET Get Market Trade

**Source:** [Get Market Trade](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Market Trade

`Query the latest trade data`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/market-trade`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/market-trade?symbol=BTCUSDT&limit=100`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| limit | Long | No | Count(Default 50; max 100;) |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": "104146.5",
      "qty": "0.037",
      "quote_qty": "3853.4205",
      "time": 1750347973,
      "is_buyer_maker": true
    },
    {
      "symbol": "BTCUSDT",
      "price": "104146.6",
      "qty": "0.023",
      "quote_qty": "2395.3718",
      "time": 1750347972,
      "is_buyer_maker": true
    }
  ],
  "trace": "26f999a04cfa11f09ce9d6002fd59247.4375416.39621015744567440"
}
```

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol |
| price | String | Trade price |
| qty | String | Trade value - coin |
| quote\_qty | String | Trade value - USDT |
| time | Long | Market trade time stamp |
| is\_buyer\_maker | Bool | True if Buyer of the trade is maker |