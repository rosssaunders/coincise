# GET / Copy trading configuration

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-copy-trading-configuration](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-copy-trading-configuration)

### GET / Copy trading configuration

Public endpoint. Retrieve copy trading parameter configuration information of copy settings

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-config`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SWAP`, the default value |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| maxCopyAmt | String | Maximum copy amount per order in USDT when you are using copy mode `fixed_amount` |
| minCopyAmt | String | Minimum copy amount per order in USDT when you are using copy mode `fixed_amount` |
| maxCopyTotalAmt | String | Maximum copy total amount under the certain lead trader, the minimum is the same with `minCopyAmt` |
| minCopyRatio | String | Minimum ratio per order when you are using copy mode `ratio_copy` |
| maxCopyRatio | String | Maximum ratio per order when you are using copy mode `ratio_copy` |
| maxTpRatio | String | Maximum ratio of taking profit per order, the minimum is 0 |
| maxSlRatio | String | Maximum ratio of stopping loss per order, the minimum is 0 |
