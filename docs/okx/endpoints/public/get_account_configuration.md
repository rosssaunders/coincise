# GET / Account configuration

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-account-configuration](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-account-configuration)

### GET / Account configuration

Retrieve current account configuration related to copy/lead trading.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/config`

#### Request Parameters

None

#### Response parameters

| **Parameter** | **Type**         | **Description**  |
| ------------- | ---------------- | ---------------- |
| uniqueCode    | String           | User unique code |
| nickName      | String           | Nickname         |
| portLink      | String           | Portrait link    |
| details       | Array of objects | Details          |
| \> instType   | String           | Instrument type  |

`SPOT`  
`SWAP` | | \> roleType | String | Role type  
`0`: General user  
`1`: Leading trader  
`2`: Copy trader | | \> profitSharingRatio | String | Profit sharing ratio.  
Only applicable to lead trader, or it will be "". 0.1 represents 10% | | \>
maxCopyTraderNum | String | Maximum number of copy traders | | \> copyTraderNum
| String | Current number of copy traders |
