# GET Account Balance of a Sub-User

**Source:** [Get Account Balance of a Sub-User](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4b62b-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v1/account/accounts/{sub-uid} ( Get Account Balance of a Sub-User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns the balance of a sub-user specified by sub-uid.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub-uid | long | false | Sub user UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status "OK" or "Error" |  |
| DATA\_START | object | false |  |  |
| id | long | false | account's ID |  |
| type | string | false | The type of this account: spot, margin, otc, point,super-margin |  |
| LIST\_START | string | false |  |  |
| currency | object | false | The currency of this balance |  |
| type | string | false | The balance type: trade, frozen, loan, interest, lock, bank |  |
| balance | string | false | The balance in the main currency unit |  |
| debt | string | false | Invalid field |  |
| available | string | false | Invalid field |  |
| LIST\_END | decimal | false |  |  |
| symbol |  | false |  |  |
| DATA\_END | string | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/account/accounts/{sub-uid}"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"id":

13704588

"type":

"spot"

"state":

"working"

"list":\[

0:{

"currency":

"usdt"

"type":

"trade"

"balance":

"8.0855916572"

"debt":

"invalid"

"available":

"invalid"

}

\]

"symbol":

""

}

1:{

"id":

24994285

"type":

"point"

"state":

"working"

"list":\[

0:{

"currency":

"hbpoint"

"type":

"trade"

"balance":

"10"

}

\]

"symbol":

""

}

\]

}