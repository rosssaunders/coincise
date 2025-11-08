# GET / Leading instruments

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-leading-instruments](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-leading-instruments)

### GET / Leading instruments

Retrieve instruments that are supported to lead by the platform. Retrieve instruments that the lead trader has set.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/instruments`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SPOT`  
`SWAP`, the default value |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID, e.g. BTC-USDT-SWAP |
| enabled | Boolean | Whether instrument is a lead instrument. `true` or `false` |
