# GET Account Balance of a Specific Account

**Source:**
[Get Account Balance of a Specific Account](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4b429-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/account/accounts/{account-id}/balance ( Get Account Balance of a Specific Account)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the balance of an account specified
by account id.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

Notes:  
'account-id': The specified account id to get balance for, can be found by query
'/v1/account/accounts' endpoint. OTC account inquiries are not supported.

#### Request Parameter

| Parameter  | Data Type | Required | Description                  | Value Range                               | Default Value |
| ---------- | --------- | -------- | ---------------------------- | ----------------------------------------- | ------------- |
| account-id | string    | false    | account-id in the path field | The value can be GET /v1/account/accounts |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description                           | Value Range                                                                                               |
| ---------- | --------- | -------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status     | string    | false    | Request Processing Result             | "ok","error"                                                                                              |
| DATA_START | object    | false    |                                       |                                                                                                           |
| id         | long      | false    | Unique account id                     |                                                                                                           |
| state      | string    | false    | Account state                         | working, lock                                                                                             |
| type       | string    | false    | The type of this account              | spot, margin, point, super-margin, grid-trading, otc-options,trust-credit ( third-party trust account )， |
| LIST_START | Array     | false    |                                       |                                                                                                           |
| currency   | string    | false    | The currency of this balance          |                                                                                                           |
| type       | string    | false    | The balance type                      | trade, frozen, loan, interest, lock, bank,credit-repay,trust-asset                                        |
| balance    | string    | false    | The balance in the main currency unit |                                                                                                           |
| debt       | string    | false    | Invalid field                         |                                                                                                           |
| available  | string    | false    | Invalid field                         |                                                                                                           |
| seq-num    | string    | false    | Serial Number of Account Change       |                                                                                                           |
| LIST_END   |           | false    |                                       |                                                                                                           |

#### Request example

`curl"https://api.huobi.pro/v1/account/accounts/{account-id}/balance"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"id":

1000001

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

"91.850043797676510303"

"debt":

"invalid"

"available":

"invalid"

"seq-num":

"477"

}

1:{

"currency":

"usdt"

"type":

"frozen"

"balance":

"5.160000000000000015"

"debt":

"invalid"

"available":

"invalid"

"seq-num":

"477"

}

2:{

"currency":

"poly"

"type":

"trade"

"balance":

"147.928994082840236"

"debt":

"invalid"

"available":

"invalid"

"seq-num":

"2"

}

\]

}

}
