# GET funds transfer state

Source: [https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state)

### Get funds transfer state

Retrieve the transfer state data of the last 2 weeks.

#### Rate Limit: 10 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/transfer-state`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| transId | String | Conditional | Transfer ID  
Either transId or clientId is required. If both are passed, transId will be used. |
| clientId | String | Conditional | Client-supplied ID  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| type | String | No | Transfer type  
`0`: transfer within account  
`1`: master account to sub-account (Only applicable to API Key from master account)  
`2`: sub-account to master account (Only applicable to API Key from master account)  
`3`: sub-account to master account (Only applicable to APIKey from sub-account)  
`4`: sub-account to sub-account (Only applicable to APIKey from sub-account, and target account needs to be another sub-account which belongs to same master account)  
The default is `0`.  
For Custody accounts, can choose not to pass this parameter or pass `0`. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| transId | String | Transfer ID |
| clientId | String | Client-supplied ID |
| ccy | String | Currency, e.g. `USDT` |
| amt | String | Amount to be transferred |
| type | String | Transfer type  
`0`: transfer within account  
`1`: master account to sub-account (Only applicable to API Key from master account)  
`2`: sub-account to master account (Only applicable to APIKey from master account)  
`3`: sub-account to master account (Only applicable to APIKey from sub-account)  
`4`: sub-account to sub-account (Only applicable to APIKey from sub-account, and target account needs to be another sub-account which belongs to same master account) |
| from | String | The remitting account  
`6`: Funding account  
`18`: Trading account |
| to | String | The beneficiary account  
`6`: Funding account  
`18`: Trading account |
| subAcct | String | Name of the sub-account |
| instId | String | deprecated |
| toInstId | String | deprecated |
| state | String | Transfer state  
`success`  
`pending`  
`failed` |
