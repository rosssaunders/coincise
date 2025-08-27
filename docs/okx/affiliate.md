# OKX API Documentation - Affiliate

### Get the invitee's detail [🔗](https://www.okx.com/docs-v5/en/#affiliate-rest-api-get-the-invitee-39-s-detail "Direct link to: https://www.okx.com/docs-v5/en/#affiliate-rest-api-get-the-invitee-39-s-detail")

#### Rate limit：20 requests per 2 seconds

#### Rate limit rule: User ID

#### HTTP request

`GET /api/v5/affiliate/invitee/detail`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                            |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| uid       | String | Yes      | UID of the invitee. Only applicable to the UID of invitee master account.<br>The data returned covers invitee master account and invitee sub-accounts. |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**                                                                                                                                                                                                                      |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| inviteeLevel       | String   | Invitee's relative level to the affiliate<br>If the user is a invitee, the level will be <code>2</code>.                                                                                                                             |
| joinTime           | String   | Timestamp that the rebate relationship is established, Unix timestamp in millisecond format, e.g. <code>1597026383085</code>                                                                                                         |
| inviteeRebateRate  | String   | Self rebate rate of the invitee (in decimal), e.g. <code>0.01</code> represents <code>10%</code>                                                                                                                                     |
| totalCommission    | String   | Total commission earned from the invitee, unit in <code>USDT</code>                                                                                                                                                                  |
| firstTradeTime     | String   | Timestamp that the first trade is completed after the latest rebate relationship is established with the parent affiliate<br>Unix timestamp in millisecond format, e.g. 1597026383085<br>If user has not traded, "" will be returned |
| level              | String   | Invitee trading fee level, e.g. Lv1                                                                                                                                                                                                  |
| depAmt             | String   | Accumulated amount of deposit in USDT<br>If user has not deposited, 0 will be returned                                                                                                                                               |
| volMonth           | String   | Accumulated Trading volume in the current month in USDT<br>If user has not traded, 0 will be returned                                                                                                                                |
| accFee             | String   | Accumulated Amount of trading fee in USDT<br>If there is no any fee, 0 will be returned                                                                                                                                              |
| kycTime            | String   | KYC2 verification time. Unix timestamp in millisecond format and the precision is in day<br>If user has not passed KYC2, "" will be returned                                                                                         |
| region             | String   | User country or region. e.g. "United Kingdom"                                                                                                                                                                                        |
| affiliateCode      | String   | Affiliate invite code that the invitee registered/recalled via                                                                                                                                                                       |

---
