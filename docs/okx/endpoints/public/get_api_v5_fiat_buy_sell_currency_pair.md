# GET /api/v5/fiat/buy-sell/currency-pair

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currency-pair](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currency-pair)

### Get buy/sell currency pair

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/buy-sell/currency-pair`

#### Request Parameters

| Parameters | Types  | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| fromCcy    | String | Yes      | Currency to sell, e.g. `USD` |
| toCcy      | String | Yes      | Currency to buy, e.g. `BTC`  |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| side      | String | Side        |

`buy`: Fiat to crypto  
`sell`: Crypto to fiat  
May support both sides in the future, separated with a comma, e.g. `buy,sell`. |
| fromCcy | String | Currency to sell, e.g. `USD` | | toCcy | String | Currency
to buy, e.g. `BTC` | | singleTradeMax | String | The maximum amount of currency
for a single trade, unit in `fromCcy` | | singleTradeMin | String | The minimum
amount of currency for a single trade, unit in `fromCcy` | | fixedPxDailyLimit |
String | Fixed price daily limit  
Applicable to Fiat to Fiat trade, else return ''.  
If `side` = `buy`, unit in `fromCcy`  
If `side` = `sell`, unit in `toCcy` | | fixedPxRemainingDailyQuota | String |
Fixed price remaining daily quota  
Applicable to Fiat to Fiat trade, else return ''.  
If `side` = `buy`, unit in `fromCcy`  
If `side` = `sell`, unit in `toCcy` | | paymentMethods | Array of strings |
Supported payment methods  
`balance`  
e.g. \["balance"\] |

This feature is only available to Bahamas institutional users at the moment.
