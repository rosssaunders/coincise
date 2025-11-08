# POST / Place easy convert

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-easy-convert](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-easy-convert)

### POST / Place easy convert

Convert small currencies to mainstream currencies.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/easy-convert`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| fromCcy | Array of strings | Yes | Type of small payment currency convert from  
Maximum 5 currencies can be selected in one order. If there are multiple currencies, separate them with commas. |
| toCcy | String | Yes | Type of mainstream currency convert to  
Only one receiving currency type can be selected in one order and cannot be the same as the small payment currencies. |
| source | String | No | Funding source  
`1`: Trading account  
`2`: Funding account  
The default is `1`. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| status | String | Current status of easy convert  
`running`: Running  
`filled`: Filled  
`failed`: Failed |
| fromCcy | String | Type of small payment currency convert from |
| toCcy | String | Type of mainstream currency convert to |
| fillFromSz | String | Filled amount of small payment currency convert from |
| fillToSz | String | Filled amount of mainstream currency convert to |
| uTime | String | Trade time, Unix timestamp format in milliseconds, e.g. 1597026383085 |
