# GET Set Leverage

**Source:** [Set Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1959439f997)

**Category:** Positions

## Authentication

Required (Private Endpoint)

### /v5/position/lever (Set Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get the list of leverage.

#### Request Address

| Environment | Address |
| --- | --- |
| Online (preferred by aws customers) | https://api.hbdm.vn |
| Online | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol | "BTC-USDT", "ETH-USDT"…… |  |
| margin\_mode | String | true | Margin mode | cross: Cross margin |  |
| lever\_rate | Long | true | Leverage | Target leverage |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol | "BTC-USDT", "ETH-USDT"…… |
| margin\_mode | String | true | Margin mode | cross: Cross margin |
| lever\_rate | Long | true | Leverage | Target leverage |

#### Request example

{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"lever\_rate":

5

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"lever\_rate":

5

}

"ts":

1740452492265

}