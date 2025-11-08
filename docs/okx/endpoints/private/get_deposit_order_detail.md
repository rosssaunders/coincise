# GET deposit order detail

Source: [https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-order-detail](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-order-detail)

### Get deposit order detail

Get fiat deposit order detail

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/deposit`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| --- | --- | --- | --- |
| ordId | String | Yes | Order ID |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ordId | String | Order ID |
| clientId | String | The original request ID associated with the transaction. If it's a deposit, it's most likely an empty string (""). |
| amt | String | Amount of the transaction |
| ccy | String | The currency of the transaction |
| fee | String | The transaction fee |
| paymentAcctId | String | The ID of the payment account used |
| paymentMethod | String | Payment method, e.g.`TR_BANKS`  
`PIX`  
`SEPA`  
`XPULSE`  
`NPP` |
| state | String | The state of the transaction  
`completed`  
`failed`  
`pending`  
`canceled`  
`inqueue`  
`processing` |
| cTime | String | The creation time of the transaction, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime | String | The update time of the transaction, Unix timestamp format in milliseconds, e.g. `1597026383085` |
