# GET Leverage List

**Source:** [Get Leverage List](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1959436a93a)

**Category:** Positions

## Authentication

Required (Private Endpoint)

### /v5/position/lever (Get Leverage List)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get the list of leverage.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Symbol | "BTC-USDT", "ETH-USDT"…… |  |
| margin\_mode | String | false | Margin mode | cross: Cross margin |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol | "BTC-USDT", "ETH-USDT"…… |
| contract\_type | String | true | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| margin\_mode | String | true | Margin mode | cross: Cross margin |
| lever\_rate | Long | true | Leverage |  |
| available\_lever | String | true | Leverage available | Leverage available |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":\[

0:{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"lever\_rate":

5

"contract\_type":

"swap"

"available\_lever":

\[

0 - 100

\]

\[

100 - 194

\]

}

\]

"ts":

1740452428851

}