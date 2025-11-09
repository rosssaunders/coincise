# GET sub-account list

Source:
[https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-list](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-list)

### Get sub-account list

Applies to master accounts only

#### Rate limit：20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/users/subaccount/list`

> Request sample

#### Request Parameters

| Parameter                      | Type   | Required | Description                                                                                                                                               |
| ------------------------------ | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable                         | String | No       | Sub-account status                                                                                                                                        |
| `true`: Normal `false`: Frozen |
| subAcct                        | String | No       | Sub-account name                                                                                                                                          |
| after                          | String | No       | Query the data earlier than the requested subaccount creation timestamp, the value should be a Unix timestamp in millisecond format. e.g. `1597026383085` |
| before                         | String | No       | Query the data newer than the requested subaccount creation timestamp, the value should be a Unix timestamp in millisecond format. e.g. `1597026383085`   |
| limit                          | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                                    |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**  |
| ------------------ | -------- | ---------------- |
| type               | String   | Sub-account type |

`1`: Standard sub-account  
`2`: Managed trading sub-account  
`5`: Custody trading sub-account - Copper  
`9`: Managed trading sub-account - Copper  
`12`: Custody trading sub-account - Komainu | | enable | Boolean | Sub-account
status  
`true`: Normal  
`false`: Frozen (global) | | subAcct | String | Sub-account name | | uid |
String | Sub-account uid | | label | String | Sub-account note | | mobile |
String | Mobile number that linked with the sub-account. | | gAuth | Boolean |
If the sub-account switches on the Google Authenticator for login
authentication.  
`true`: On `false`: Off | | frozenFunc | Array of strings | Frozen functions  
`trading`  
`convert`  
`transfer`  
`withdrawal`  
`deposit`  
`flexible_loan` | | canTransOut | Boolean | Whether the sub-account has the
right to transfer out.  
`true`: can transfer out  
`false`: cannot transfer out | | ts | String | Sub-account creation time, Unix
timestamp in millisecond format. e.g. `1597026383085` | | subAcctLv | String |
Sub-account level  
`1`: First level sub-account  
`2`: Second level sub-account. | | firstLvSubAcct | String | The first level
sub-account.  
For subAcctLv: 1, firstLvSubAcct is equal to subAcct  
For subAcctLv: 2, subAcct belongs to firstLvSubAcct. | | ifDma | Boolean |
Whether it is dma broker sub-account.  
`true`: Dma broker sub-account  
`false`: It is not dma broker sub-account. |
