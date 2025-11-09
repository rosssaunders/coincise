# GET the Aggregated Balance of all Sub-users

**Source:** [Get the Aggregated Balance of all Sub-users](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4fd28-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v1/subuser/aggregate-balance ( Get the Aggregated Balance of all Sub-users)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns the aggregated balance from all the sub-users.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | list | false |  |  |
| currency | string | false | The currency of this balance |  |
| type | string | false | account type | spot, margin, point,super-margin |
| balance | string | false | The total balance in the main currency unit including all balance and frozen banlance |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/subuser/aggregate-balance"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"currency":

"hbpoint"

"balance":

"10"

"type":

"point"

}

1:{

"currency":

"ada"

"balance":

"0"

"type":

"spot"

}

2:{

"currency":

"usdt"

"balance":

"8.08559165"

"type":

"spot"

}

\]

}