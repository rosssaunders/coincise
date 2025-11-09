# GET Obtain leverage position limit（Cross）

**Source:** [Obtain leverage position limit（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec512ec-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v2/margin/limit (Obtain leverage position limit（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This interface returns the position limit at the user level.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | If empty, all currencies will be queried by default. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Incorrect description (if any) |  |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| currency | string | false | currency |  |
| maxHoldings | string | false | Position limit |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/margin/limit?currency=xxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"currency":

"btc"

"max-holdings":

"-1"

}

1:{

"currency":

"eth"

"max-holdings":

"-1"

}

2:{

"currency":

"ada"

"max-holdings":

"3000000"

}

\]

"code":

200

}