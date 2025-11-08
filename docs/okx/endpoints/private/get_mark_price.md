# GET mark price

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price)

### Get mark price

Retrieve mark price.

We set the mark price based on the SPOT index and at a reasonable basis to prevent individual users from manipulating the market and causing the contract price to fluctuate.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/mark-price`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |
| instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` |
| instId | String | No | Instrument ID, e.g. `BTC-USD-SWAP` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |
| instId | String | Instrument ID, e.g. `BTC-USD-200214` |
| markPx | String | Mark price |
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
