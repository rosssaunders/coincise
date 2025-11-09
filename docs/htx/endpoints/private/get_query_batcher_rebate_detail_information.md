# GET Query batcher rebate detail information

**Source:** [Query batcher rebate detail information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-197ca28067c)

**Category:** Referral

## Authentication

Required (Private Endpoint)

### /v2/invitee/rebate/batcher\_rebate/detail (Query batcher rebate detail information)

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
| inviteeUidList | String | false | Query the uid of the invitee |  |  |

Notes: Remarks: m1: inviter m2: invitee kn: nth level in multi-level link

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object | true |  |  |
| invitee\_uid | Integer | false | Query the uid of the invitee |  |
| invitee\_type | string | true | Invitee type. 0: Invitee, 1: partner, 1: Invitee + partner |  |
| invitee\_rebate\_rate\_spot\_m2 | string | true |  |  |
| invitee\_rebate\_rate\_contract\_m2 |  | true |  |  |
| invitee\_rebate\_rate\_partner\_spot |  | true |  |  |
| invitee\_rebate\_rate\_partner\_contract |  | true |  |  |
| join\_time\_m2 | string | true | The time to create the commission. Note: If invite\_type = 2, there will be two times to create the commission, such as 10000000 (direct customer), 20000000 (partner) |  |
| join\_time\_partner |  | true |  |  |
| Invitee\_total\_commission\_usdt | string | true | Invitee Total rebate amount, amount of USDT |  |
| Invitee\_total\_commission\_trx | string | true | Invitee Total rebate amount, amount of TRX |  |
| Invitee\_total\_commission\_htx | string | true | Invitee Total rebate amount, amount of HTX |  |
| partner\_total\_commission\_usdt | string | true | partner Total rebate amount, amount of USDT |  |
| partner\_total\_commission\_trx | string | true | partner Total rebate amount, amount of TRX |  |
| partner\_total\_commission\_htx | string | true | partner Total rebate amount, amount of HTX |  |
| DATA\_END |  | true |  |  |
| ts | long | true |  |  |

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

\]

}