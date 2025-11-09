# GET Query Deposit Address of Sub User

**Source:** [Query Deposit Address of Sub User](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5255a-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/deposit-address ( Query Deposit Address of Sub User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Parent user could query sub user's deposit address on corresponding chain, for a specific crypto currency (except IOTA).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false |  |  | Sub user UID (limited to 1 per request) |
| currency | string | false |  |  | Crypto currency,refer to GET /v1/common/currencys |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false |  |  |
| message | string | false |  |  |
| DATA\_START | object | false |  |  |
| currency | string | false |  |  |
| address | string | false |  |  |
| addressTag | string | false |  |  |
| chain | string | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/deposit-address?subUid=xxxx¤cy=xxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"userId":

12345678

"currency":

"btc"

"address":

"0x4efee1ca7fc887d921f4bbcc444fbc12c464d87f"

"addressTag":

""

"chain":

"hbtc"

}

1:{

"userId":

12345678

"currency":

"btc"

"address":

"1C4o8WmACM8yHBbJjbdzLbc9ei7WFLFoMk"

"addressTag":

""

"chain":

"btc"

}

2:{

"userId":

12345678

"currency":

"btc"

"address":

"0x4efee1ca7fc887d921f4bbcc444fbc12c464d87f"

"addressTag":

""

"chain":

"hrc20btc"

}

\]

}