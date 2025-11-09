# GET all Accounts of the Current User

**Source:**
[Get all Accounts of the Current User](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4b291-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/account/accounts ( Get all Accounts of the Current User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns a list of accounts owned by this
API user.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                                                            | Value Range                                                                                                                                                                                                                                                                                                                                 |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status     | string    | false    | Request Processing Result                                                                              | "ok","error"                                                                                                                                                                                                                                                                                                                                |
| DATA_START | object    | false    |                                                                                                        |                                                                                                                                                                                                                                                                                                                                             |
| id         | long      | false    | Unique account id                                                                                      |                                                                                                                                                                                                                                                                                                                                             |
| state      | string    | false    | Account state                                                                                          | working, lock                                                                                                                                                                                                                                                                                                                               |
| type       | string    | false    | The type of this account                                                                               | spot, margin, point, super-margin,, grid-trading, otc-options,trust-credit ( third-party trust account )                                                                                                                                                                                                                                    |
| subtype    | string    | false    | Sub-account type (only valid for isolated margin accounts and trust-credit third-party trust account ) | The corresponding trading symbol (currency pair) the isolated margin is based on, e.g. btcusdt; Under the trust-credit account type, the value on the subtype identifies the chain where its assets or credit assets are located. Possible values ​​include (reference chain information): btc, eth, usdterc20, trc20usdt, usdc, trx1, etc. |
| DATA_END   | object    | false    |                                                                                                        |                                                                                                                                                                                                                                                                                                                                             |

#### Request example

`curl"https://api.huobi.pro/v1/account/accounts"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"id":

10000001

"type":

"spot"

"subtype":

""

"state":

"working"

}

1:{

"id":

10000002

"type":

"otc"

"subtype":

""

"state":

"working"

}

2:{

"id":

10000003

"type":

"point"

"subtype":

""

"state":

"working"

}

\]

}
