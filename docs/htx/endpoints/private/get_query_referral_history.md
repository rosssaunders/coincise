# GET Query Referral History

**Source:**
[Query Referral History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1929398ed07)

**Category:** Referral

## Authentication

Required (Private Endpoint)

### /v2/invitee/rebate/history (Query Referral History)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This interface can query the historical rebate
information of invitees.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                          | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| inviteeUid | Integer   | true     | Query the uid of the invitee                                                                                                                                                             |                                      |               |
| startTime  | string    | false    | yyyy-MM-dd queries the start time and queries data based on the creation time.                                                                                                           | The query window is the last 90 days |               |
| endTime    | string    | false    | yyyy-MM-dd query end time, query data according to creation time.                                                                                                                        | The query window is the last 90 days |               |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev           | now           |
| fromId     | string    | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                      |               |
| limit      | long      | false    | Number of results per request. Maximum is 100. Default is 100.                                                                                                                           |                                      |               |

#### Response Parameter

| Parameter                     | Data Type    | Required | Description                                 | Value Range |
| ----------------------------- | ------------ | -------- | ------------------------------------------- | ----------- |
| status                        | string       | false    |                                             |             |
| DATA>\_START                  | List<Object> | true     |                                             |             |
| date                          | long         | true     |                                             |             |
| Invitee_total_commission_usdt | string       | true     | Invitee Total rebate amount, amount of USDT |             |
| Invitee_total_commission_trx  | string       | true     | Invitee Total rebate amount, amount of TRX  |             |
| Invitee_total_commission_htx  | string       | true     | Invitee Total rebate amount, amount of HTX  |             |
| partner_total_commission_usdt | string       | true     | partner Total rebate amount, amount of USDT |             |
| partner_total_commission_trx  | string       | true     | partner Total rebate amount, amount of TRX  |             |
| partner_total_commission_htx  | string       | true     | partner Total rebate amount, amount of HTX  |             |
| DATA>\_END                    |              | false    |                                             |             |
| ts                            | long         | true     |                                             |             |

#### Request example

`curl"https://api.huobi.proinvitee/v2/invitee/rebate/history?inviteeUid= 100009"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"date":

20240710

"invitee_rebate_rate_contract_m2":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_spot_m2":

NULL

"invitee_total_commission_htx":

0

"invitee_total_commission_trx":

0

"invitee_total_commission_usdt":

0

"invitee_type":

NULL

"join_time_m2":

NULL

"join_time_partner":

NULL

"partner_total_commission_htx":

NULL

"partner_total_commission_trx":

NULL

"partner_total_commission_usdt":

NULL

}

1:{

"date":

20240709

"invitee_rebate_rate_contract_m2":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_spot_m2":

NULL

"invitee_total_commission_htx":

0

"invitee_total_commission_trx":

0

"invitee_total_commission_usdt":

0

"invitee_type":

NULL

"join_time_m2":

NULL

"join_time_partner":

NULL

"partner_total_commission_htx":

0

"partner_total_commission_trx":

0

"partner_total_commission_usdt":

0

}

\]

"message":

NULL

"success":

true

}
