# GET limit price

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price)

### Get limit price

Retrieve the highest buy limit and lowest sell limit of the instrument.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/price-limit`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT-SWAP` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type |
| instId | String | Instrument ID, e.g. `BTC-USDT-SWAP` |
| buyLmt | String | Highest buy limit  
Return "" when enabled is false |
| sellLmt | String | Lowest sell limit  
Return "" when enabled is false |
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| enabled | Boolean | Whether price limit is effective  
`true`: the price limit is effective  
`false`: the price limit is not effective |
