# GET Quote products

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-quote-products](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-quote-products)

### Get Quote products

Retrieve the products which makers want to quote and receive RFQs for, and the
corresponding price and size limit.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/maker-instrument-settings`

#### Request parameters

None

#### Response Parameters

| Parameter                                                                                                                                      | Type             | Description                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| code                                                                                                                                           | String           | The result code, `0` means success.                                           |
| msg                                                                                                                                            | String           | The error message, not empty if the code is not `0`.                          |
| data                                                                                                                                           | Array of objects | Return data of the request.                                                   |
| \> instType                                                                                                                                    | String           | Type of instrument. Valid value can be `FUTURES`, `OPTION`, `SWAP` or `SPOT`. |
| \> includeAll                                                                                                                                  | Boolean          | Receive all instruments or not under specific instType setting.               |
| Valid value can be boolean (`True`/`False`). By default, the value will be `false`.                                                            |
| \> data                                                                                                                                        | Array of objects | Elements of the instType.                                                     |
| \>> instFamily                                                                                                                                 | String           | Instrument family. Required for `FUTURES`, `OPTION` and `SWAP` only.          |
| \>> instId                                                                                                                                     | String           | Instrument ID. Required for `SPOT` only.                                      |
| \>> maxBlockSz                                                                                                                                 | String           | Max trade quantity for the product(s).                                        |
| For `FUTURES`, `OPTION` and `SWAP`, the max quantity of the RFQ/Quote is in unit of contracts. For `SPOT`, this parameter is in base currency. |
| \>> makerPxBand                                                                                                                                | String           | Price bands in unit of ticks, measured against mark price.                    |

Setting makerPxBand to 1 tick means:  
If Bid price > Mark + 1 tick, it will be stopped  
If Ask price < Mark - 1 tick, It will be stopped |
