# GET /api/v5/account/risk-state

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-account-risk-state](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-account-risk-state)

### Get account risk state

Only applicable to Portfolio margin account

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/risk-state`

#### Response Parameters

| **Parameters** | **Types** | **Description**                         |
| -------------- | --------- | --------------------------------------- |
| atRisk         | Boolean   | Account risk status in auto-borrow mode |

true: the account is currently in a specific risk state  
false: the account is currently not in a specific risk state | | atRiskIdx |
Array of strings | derivatives risk unit list | | atRiskMgn | Array of strings |
margin risk unit list | | ts | String | Unix timestamp format in milliseconds,
e.g.`1597026383085` |
