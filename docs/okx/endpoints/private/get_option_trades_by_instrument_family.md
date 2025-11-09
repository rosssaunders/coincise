# GET / Option trades by instrument family

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-option-trades-by-instrument-family](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-option-trades-by-instrument-family)

### GET / Option trades by instrument family

Retrieve the recent transactions of an instrument under same instFamily. The
maximum is 100.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/option/instrument-family-trades`

#### Request Parameters

| Parameter              | Type   | Required | Description                     |
| ---------------------- | ------ | -------- | ------------------------------- |
| instFamily             | String | Yes      | Instrument family, e.g. BTC-USD |
| Applicable to `OPTION` |

#### Response Parameters

| **Parameter** | **Type**         | **Description**                              |
| ------------- | ---------------- | -------------------------------------------- |
| vol24h        | String           | 24h trading volume, with a unit of contract. |
| optType       | String           | Option type, C: Call P: Put                  |
| tradeInfo     | Array of objects | The list trade data                          |
| \> instId     | String           | The Instrument ID                            |
| \> tradeId    | String           | Trade ID                                     |
| \> px         | String           | Trade price                                  |
| \> sz         | String           | Trade quantity. The unit is contract.        |
| \> side       | String           | Trade side                                   |

`buy`  
`sell` | | \> ts | String | Trade time, Unix timestamp format in milliseconds,
e.g. 1597026383085. |
