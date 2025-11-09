# GET Query Referral Information

**Source:** [Query Referral Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-192939028b0)

**Category:** Referral

## Authentication

Required (Private Endpoint)

### /v2/invitee/rebate/detail (Query Referral Information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This interface can query the rebate information of invitees.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| inviteeUid | Integer | true | Query the uid of the invitee |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA>\_START | object | true |  |  |
| invitee\_type | string | true | Invitee type. 0: Invitee, 1: partner, 1: Invitee + partner |  |
| invitee\_rebate\_rate\_spot\_m2 | string | true |  |  |
| invitee\_rebate\_rate\_contract\_m2 | string | true |  |  |
| invitee\_rebate\_rate\_partner\_spot | string | true |  |  |
| invitee\_rebate\_rate\_partner\_contract | string | false |  |  |
| join\_time\_m2 | string | true | The time to create the commission. Note: If invite\_type = 2, there will be two times to create the commission, such as 10000000 (direct customer), 20000000 (partner) |  |
| join\_time\_partner | string | true |  |  |
| Invitee\_total\_commission\_usdt | string | true | Invitee Total rebate amount, amount of USDT |  |
| Invitee\_total\_commission\_trx | string | true | Invitee Total rebate amount, amount of TRX |  |
| Invitee\_total\_commission\_htx | string | true | Invitee Total rebate amount, amount of HTX |  |
| partner\_total\_commission\_usdt | string | true | partner Total rebate amount, amount of USDT |  |
| partner\_total\_commission\_trx | string | true | partner Total rebate amount, amount of TRX |  |
| partner\_total\_commission\_htx | string | true | partner Total rebate amount, amount of HTX |  |
| DATA>\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.huobi.proinvitee/v2/invitee/rebate/detail?inviteeUid= 100009"`

#### Response Example

##### Success Example

{

"code":

"200"

"status":

NULL

"data":{

"invitee\_type":

0

"invitee\_rebate\_rate\_spot\_m2":

0.2

"invitee\_rebate\_rate\_contract\_m2":

0.3

"join\_time\_m2":

1692118528000

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

"success":

true

}