# GET / Easy convert currency list

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-easy-convert-currency-list](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-easy-convert-currency-list)

### GET / Easy convert currency list

Get list of small convertibles and mainstream currencies. Only applicable to the
crypto balance less than $10.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/easy-convert-currency-list`

#### Request Parameters

| Parameters | Type   | Required | Description    |
| ---------- | ------ | -------- | -------------- |
| source     | String | No       | Funding source |

`1`: Trading account  
`2`: Funding account  
The default is `1`. |

#### Response Parameters

| Parameter  | Type             | Description                                             |
| ---------- | ---------------- | ------------------------------------------------------- |
| fromData   | Array of objects | Currently owned and convertible small currency list     |
| \> fromCcy | String           | Type of small payment currency convert from, e.g. `BTC` |
| \> fromAmt | String           | Amount of small payment currency convert from           |
| toCcy      | Array of strings | Type of mainstream currency convert to, e.g. `USDT`     |
