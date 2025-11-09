# GET Query all rebate detail information

**Source:** [Query all rebate detail information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-197ca1dc071)

**Category:** Referral

## Authentication

Required (Private Endpoint)

### /v2/invitee/rebate/all\_rebate/detail (Query all rebate detail information)

Request type: GET

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev |  |
| fromId | string | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  |  |
| limit | long | false | Number of results per request. Maximum is 100. Default is 100. |  |  |

Notes: Remarks: m1: inviter m2: invitee kn: nth level in multi-level link

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | String | false |  | ok , "error" |
| invitee\_uid | Integer | false | Query the uid of the invitee |  |
| DATA\_START | object | true |  |  |
| invitee\_type | String | true | Invitee type. 0: Invitee, 1: partner, 1: Invitee + partner |  |
| invitee\_rebate\_rate\_spot\_m2 | String | true |  |  |
| invitee\_rebate\_rate\_contract\_m2 | String | true |  |  |
| invitee\_rebate\_rate\_partner\_spot | String | true |  |  |
| invitee\_rebate\_rate\_partner\_contract | String | true |  |  |
| join\_time\_m2 | String | true | The time to create the commission. Note: If invite\_type = 2, there will be two times to create the commission, such as 10000000 (direct customer), 20000000 (partner) |  |
| join\_time\_partner | String | true |  |  |
| Invitee\_total\_commission\_usdt | String | true | Invitee Total rebate amount, amount of USDT |  |
| Invitee\_total\_commission\_trx | String | true | Invitee Total rebate amount, amount of TRX |  |
| Invitee\_total\_commission\_htx | String | true | Invitee Total rebate amount, amount of HTX |  |
| partner\_total\_commission\_usdt | String | true | partner Total rebate amount, amount of USDT |  |
| partner\_total\_commission\_trx | String | true | partner Total rebate amount, amount of TRX |  |
| partner\_total\_commission\_htx | String | true | partner Total rebate amount, amount of HTX |  |
| DATA\_END |  | true |  |  |
| ts | long | true |  |  |
| nextId | String | true |  |  |

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

"invitee\_uid":

413069986

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.2

"invitee\_rebate\_rate\_contract\_m2":

0.1

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1724657374000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

1:{

"invitee\_uid":

413070397

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.3

"invitee\_rebate\_rate\_contract\_m2":

0.1

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1724774492000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

2:{

"invitee\_uid":

413070458

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.3

"invitee\_rebate\_rate\_contract\_m2":

0.1

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1724815498000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

3:{

"invitee\_uid":

413193464

"invitee\_type":

2

"invitee\_rebate\_rate\_spot\_m2":

0.3

"invitee\_rebate\_rate\_contract\_m2":

0.3

"invitee\_rebate\_rate\_partner\_spot":

0.3

"invitee\_rebate\_rate\_partner\_contract":

0.3

"join\_time\_m2":

1750919768000

"join\_time\_partner":

1750920808719

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

4:{

"invitee\_uid":

413193583

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1750925265000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

5:{

"invitee\_uid":

413194731

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751855136000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

6:{

"invitee\_uid":

413194745

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751855236000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

7:{

"invitee\_uid":

413194804

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751856665000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

8:{

"invitee\_uid":

413194825

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751857911000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

9:{

"invitee\_uid":

413194960

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751883149000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

10:{

"invitee\_uid":

413194992

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751938539000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

11:{

"invitee\_uid":

413195009

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751938706000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

12:{

"invitee\_uid":

413195989

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751946333000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

13:{

"invitee\_uid":

413196005

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.4

"invitee\_rebate\_rate\_contract\_m2":

0.4

"invitee\_rebate\_rate\_partner\_spot":

NULL

"invitee\_rebate\_rate\_partner\_contract":

NULL

"join\_time\_m2":

1751957800000

"join\_time\_partner":

NULL

"invitee\_total\_commission\_usdt":

0

"invitee\_total\_commission\_htx":

0

"invitee\_total\_commission\_trx":

0

"partner\_total\_commission\_usdt":

0

"partner\_total\_commission\_htx":

0

"partner\_total\_commission\_trx":

0

}

\]

"nextId":

"413069986"

}