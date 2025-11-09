# GET Query all rebate detail information

**Source:**
[Query all rebate detail information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-197ca1dc071)

**Category:** Referral

## Authentication

Required (Private Endpoint)

### /v2/invitee/rebate/all_rebate/detail (Query all rebate detail information)

Request type: GET

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                                                                                              | Value Range                | Default Value |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| direct    | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev |               |
| fromId    | string    | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                            |               |
| limit     | long      | false    | Number of results per request. Maximum is 100. Default is 100.                                                                                                                           |                            |               |

Notes: Remarks: m1: inviter m2: invitee kn: nth level in multi-level link

#### Response Parameter

| Parameter                            | Data Type | Required | Description                                                                                                                                                           | Value Range  |
| ------------------------------------ | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| status                               | String    | false    |                                                                                                                                                                       | ok , "error" |
| invitee_uid                          | Integer   | false    | Query the uid of the invitee                                                                                                                                          |              |
| DATA_START                           | object    | true     |                                                                                                                                                                       |              |
| invitee_type                         | String    | true     | Invitee type. 0: Invitee, 1: partner, 1: Invitee + partner                                                                                                            |              |
| invitee_rebate_rate_spot_m2          | String    | true     |                                                                                                                                                                       |              |
| invitee_rebate_rate_contract_m2      | String    | true     |                                                                                                                                                                       |              |
| invitee_rebate_rate_partner_spot     | String    | true     |                                                                                                                                                                       |              |
| invitee_rebate_rate_partner_contract | String    | true     |                                                                                                                                                                       |              |
| join_time_m2                         | String    | true     | The time to create the commission. Note: If invite_type = 2, there will be two times to create the commission, such as 10000000 (direct customer), 20000000 (partner) |              |
| join_time_partner                    | String    | true     |                                                                                                                                                                       |              |
| Invitee_total_commission_usdt        | String    | true     | Invitee Total rebate amount, amount of USDT                                                                                                                           |              |
| Invitee_total_commission_trx         | String    | true     | Invitee Total rebate amount, amount of TRX                                                                                                                            |              |
| Invitee_total_commission_htx         | String    | true     | Invitee Total rebate amount, amount of HTX                                                                                                                            |              |
| partner_total_commission_usdt        | String    | true     | partner Total rebate amount, amount of USDT                                                                                                                           |              |
| partner_total_commission_trx         | String    | true     | partner Total rebate amount, amount of TRX                                                                                                                            |              |
| partner_total_commission_htx         | String    | true     | partner Total rebate amount, amount of HTX                                                                                                                            |              |
| DATA_END                             |           | true     |                                                                                                                                                                       |              |
| ts                                   | long      | true     |                                                                                                                                                                       |              |
| nextId                               | String    | true     |                                                                                                                                                                       |              |

#### Request example

`https://api.huobi.pro/v2/invitee/rebate/all_rebate/detail`

#### Response Example

##### Success Example

{

"code":

200

"message":

"success"

"status":

"ok"

"ts":

1756361290420

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

1:{

"invitee_uid":

413070397

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.3

"invitee_rebate_rate_contract_m2":

0.1

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1724774492000

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

2:{

"invitee_uid":

413070458

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.3

"invitee_rebate_rate_contract_m2":

0.1

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1724815498000

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

3:{

"invitee_uid":

413193464

"invitee_type":

2

"invitee_rebate_rate_spot_m2":

0.3

"invitee_rebate_rate_contract_m2":

0.3

"invitee_rebate_rate_partner_spot":

0.3

"invitee_rebate_rate_partner_contract":

0.3

"join_time_m2":

1750919768000

"join_time_partner":

1750920808719

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

4:{

"invitee_uid":

413193583

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1750925265000

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

5:{

"invitee_uid":

413194731

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751855136000

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

6:{

"invitee_uid":

413194745

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751855236000

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

7:{

"invitee_uid":

413194804

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751856665000

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

8:{

"invitee_uid":

413194825

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751857911000

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

9:{

"invitee_uid":

413194960

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751883149000

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

10:{

"invitee_uid":

413194992

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751938539000

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

11:{

"invitee_uid":

413195009

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751938706000

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

12:{

"invitee_uid":

413195989

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751946333000

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

13:{

"invitee_uid":

413196005

"invitee_type":

0

"invitee_rebate_rate_spot_m2":

0.4

"invitee_rebate_rate_contract_m2":

0.4

"invitee_rebate_rate_partner_spot":

NULL

"invitee_rebate_rate_partner_contract":

NULL

"join_time_m2":

1751957800000

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

"nextId":

"413069986"

}
