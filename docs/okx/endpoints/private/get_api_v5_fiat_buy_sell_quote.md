# GET /api/v5/fiat/buy-sell/quote

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-quote](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-quote)

### Get buy/sell quote

#### Rate Limit: 10 requests per second

#### Rate limit rule: User ID

#### Rate Limit: 1 request per 5 seconds

#### Rate limit rule: Instrument ID

#### Permission: Read

#### HTTP Request

`POST /api/v5/fiat/buy-sell/quote`

#### Request Parameters

| Parameters | Types  | Required | Description |
| ---------- | ------ | -------- | ----------- |
| side       | String | Yes      | Side        |

`buy`: Buy Crypto / Fiat with Fiat  
`sell`: Sell Crypto to Crypto / Fiat | | fromCcy | String | Yes | Currency to
sell | | toCcy | String | Yes | Currency to buy | | rfqAmt | String | Yes | RFQ
amount | | rfqCcy | String | Yes | RFQ currency |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| quoteId   | String | Quote ID    |
| side      | String | Side        |

`buy`: Buy Crypto / Fiat with Fiat  
`sell`: Sell Crypto to Crypto / Fiat | | fromCcy | String | Currency to sell,
e.g. `USD` | | toCcy | String | Currency to buy, e.g. `BTC` | | rfqAmt | String
| RFQ amount | | rfqCcy | String | RFQ currency | | quotePx | String | Quote
price | | quoteCcy | String | Quote price unit  
e.g. `USD` | | quoteFromAmt | String | Quote amount, unit in `fromCcy` | |
quoteToAmt | String | Quote amount, unit in `toCcy` | | quoteTime | String |
Quotation generation time, Unix timestamp format in milliseconds, e.g.
1597026383085 | | ttlMs | String | The validity period of quotation in
milliseconds  
e.g. `10000` represents the quotation only valid for 10 seconds |

This feature is only available to Bahamas institutional users at the moment.
