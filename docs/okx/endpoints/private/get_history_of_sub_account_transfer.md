# GET history of sub-account transfer

Source: [https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-history-of-sub-account-transfer](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-history-of-sub-account-transfer)

### Get history of sub-account transfer

This endpoint is only available for master accounts. Transfer records are available from September 28, 2022 onwards.

#### Rate limit：6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/asset/subaccount/bills`

> Request sample

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ccy | String | No | Currency, such as BTC |
| type | String | No | Transfer type  
`0`: Transfers from master account to sub-account  
`1` : Transfers from sub-account to master account. |
| subAcct | String | No | Sub-account name |
| after | String | No | Query the data prior to the requested bill ID creation time (exclude), the value should be a Unix timestamp in millisecond format. e.g. `1597026383085` |
| before | String | No | Query the data after the requested bill ID creation time (exclude), the value should be a Unix timestamp in millisecond format. e.g. `1597026383085` |
| limit | String | No | Number of results per request. The maximum is 100. The default is 100. |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description** |
| --- | --- | --- |
| billId | String | Bill ID |
| ccy | String | Transfer currency |
| amt | String | Transfer amount |
| type | String | Bill type |
| subAcct | String | Sub-account name |
| ts | String | Bill ID creation time, Unix timestamp in millisecond format, e.g. `1597026383085` |
