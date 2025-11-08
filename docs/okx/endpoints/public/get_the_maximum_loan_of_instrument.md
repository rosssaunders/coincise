# GET the maximum loan of instrument

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-the-maximum-loan-of-instrument](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-the-maximum-loan-of-instrument)

### Get the maximum loan of instrument

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/max-loan`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| mgnMode | String | Yes | Margin mode  
`isolated` `cross` |
| instId | String | Conditional | Single instrument or multiple instruments (no more than 5) separated with comma, e.g. `BTC-USDT,ETH-USDT` |
| ccy | String | Conditional | Currency  
Applicable to get Max loan of manual borrow for the currency in `Spot mode` (enabled borrowing) |
| mgnCcy | String | Conditional | Margin currency  
Applicable to `isolated` `MARGIN` and `cross` `MARGIN` in `Futures mode`. |
| tradeQuoteCcy | String | No | The quote currency for trading. Only applicable to `SPOT`.  
The default value is the quote currency of `instId`, e.g. `USD` for `BTC-USD`. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID |
| mgnMode | String | Margin mode |
| mgnCcy | String | Margin currency |
| maxLoan | String | Max loan |
| ccy | String | Currency |
| side | String | Order side  
`buy` `sell` |
