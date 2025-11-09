# POST / Stop copying

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-stop-copying](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-stop-copying)

### POST / Stop copying

You need to use this endpoint to stop copy trading

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/copytrading/stop-copy-trading`

#### Request Parameters

| Parameter                                                                                                         | Type   | Required | Description                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ------ | -------- | -------------------------------------------------------------------------------- |
| instType                                                                                                          | String | No       | Instrument type                                                                  |
| `SWAP`                                                                                                            |
| uniqueCode                                                                                                        | String | Yes      | Lead trader unique code                                                          |
| A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |
| subPosCloseType                                                                                                   | String | Yes      | Action type for open positions, it is required if you have related copy position |

`market_close`: immediately close at market price  
`copy_close`：close when trader closes  
`manual_close`: close manually |

#### Response parameters

| **Parameter** | **Type** | **Description**       |
| ------------- | -------- | --------------------- |
| result        | Boolean  | The result of setting |
| `true`        |
