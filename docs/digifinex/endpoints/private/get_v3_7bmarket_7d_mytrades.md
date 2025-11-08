# GET /v3/%7Bmarket%7D/mytrades

**Title:** Customer's trades

**Source:** [Customer's trades](https://docs.digifinex.com/en-ww/spot/v3/rest.html#customer-39-s-trades)

## Authentication

Required (Private Endpoint)

---

## Customer's trades

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/{market}/mytrades`

### Request Parameters

market：spot, margin

| Field | Request Type | Mandatory | Description |
| --- | --- | --- | --- |
| market | str | true | "spot","margin" |
| symbol | str | false | Symbol Name |
| limit | int | false | Default 50, maximum 500 |
| start\_time | int | false | Starting time, default 3 days before now, maximum 30 days |
| end\_time | int | false | Ending time, default current timestamp |

> Response:

```

{
  "code": 0,
  "list": [
    {
      "symbol": "BTC_USDT",
      "order_id": "6707cbdcda0edfaa7f4ab509e4cbf966",
      "id": "28457",
      "price": 0.1,
      "amount": 0,
      "fee": 0.096,
      "fee_currency": "USDT",
      "timestamp": 1499865549,
      "side": "buy",
      "is_maker": true
    }
  ]
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| list | true | object | Customer's trades List |
| symbol | true | string | Symbol Name |
| order\_id | true | string | Order ID |
| id | true | string | Trading ID |
| price | true | float | Trading Price |
| amount | true | float | Volume |
| fee | true | float | Fee |
| fee\_currency | true | string | Fee Currency |
| timestamp | true | int | Timestamp |
| side | true | string | Trading Type，buy,sell,buy\_market,sell\_market |
| is\_maker | true | bool | maker or taker |
| code | true | int | Status |