# GET buy/sell currencies

Source: [https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currencies](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currencies)

### Get buy/sell currencies

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/buy-sell/currencies`

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| fiatCcyList | Array of objects | Fiat currency list |
| \>ccy | String | Currency, e.g. `BTC` |
| cryptoCcyList | Array of objects | Crypto currency list |
| \>ccy | String | Currency, e.g. `USD` |

This feature is only available to Bahamas institutional users at the moment.
