# GET Query batcher rebate detail information

**Source:**
[Query batcher rebate detail information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-197ca28067c)

**Category:** Referral

## Authentication

Required (Private Endpoint)

### /v2/invitee/rebate/batcher_rebate/detail (Query batcher rebate detail information)

Request type: GET

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter      | Data Type | Required | Description                  | Value Range | Default Value |
| -------------- | --------- | -------- | ---------------------------- | ----------- | ------------- |
| inviteeUidList | String    | false    | Query the uid of the invitee |             |               |

Notes: Remarks: m1: inviter m2: invitee kn: nth level in multi-level link

#### Response Parameter

| Parameter                            | Data Type | Required | Description                                                                                                                                                           | Value Range  |
| ------------------------------------ | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| status                               | string    | false    |                                                                                                                                                                       | ok , "error" |
| DATA_START                           | object    | true     |                                                                                                                                                                       |              |
| invitee_uid                          | Integer   | false    | Query the uid of the invitee                                                                                                                                          |              |
| invitee_type                         | string    | true     | Invitee type. 0: Invitee, 1: partner, 1: Invitee + partner                                                                                                            |              |
| invitee_rebate_rate_spot_m2          | string    | true     |                                                                                                                                                                       |              |
| invitee_rebate_rate_contract_m2      |           | true     |                                                                                                                                                                       |              |
| invitee_rebate_rate_partner_spot     |           | true     |                                                                                                                                                                       |              |
| invitee_rebate_rate_partner_contract |           | true     |                                                                                                                                                                       |              |
| join_time_m2                         | string    | true     | The time to create the commission. Note: If invite_type = 2, there will be two times to create the commission, such as 10000000 (direct customer), 20000000 (partner) |              |
| join_time_partner                    |           | true     |                                                                                                                                                                       |              |
| Invitee_total_commission_usdt        | string    | true     | Invitee Total rebate amount, amount of USDT                                                                                                                           |              |
| Invitee_total_commission_trx         | string    | true     | Invitee Total rebate amount, amount of TRX                                                                                                                            |              |
| Invitee_total_commission_htx         | string    | true     | Invitee Total rebate amount, amount of HTX                                                                                                                            |              |
| partner_total_commission_usdt        | string    | true     | partner Total rebate amount, amount of USDT                                                                                                                           |              |
| partner_total_commission_trx         | string    | true     | partner Total rebate amount, amount of TRX                                                                                                                            |              |
| partner_total_commission_htx         | string    | true     | partner Total rebate amount, amount of HTX                                                                                                                            |              |
| DATA_END                             |           | true     |                                                                                                                                                                       |              |
| ts                                   | long      | true     |                                                                                                                                                                       |              |

#### Request example

`https://api.huobi.pro/v2/invitee/rebate/batcher_rebate/detail`

#### Response Example

##### Success Example

{

"code":

200

"status":

"ok"

"ts":

1756361442781

"data":\[

0:{

"invitee_uid":

413069986

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.2

"invitee_rebate_rate_contract_m2":

0.1

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1724657374000

"join_time_partner":

NULL

"invitee_total_commission_usdt":

0

"invitee_total_commission_htx":

0

"invitee_total_commission_trx":

0

"partner_total_commission_usdt":

0

"partner_total_commission_htx":

0

"partner_total_commission_trx":

0

}

\]

}
