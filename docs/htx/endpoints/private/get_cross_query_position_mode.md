# GET 【cross】Query position mode

**Source:** [【cross】Query position mode](https://www.htx.com/en-us/opend/newApiPages/?id=10000090-77b7-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_position\_side (【cross】Query position mode)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: query the cross position mode of the current user's U-margin contract

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | String | true | margin account | such as: "USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | String | true | status | ok , 'error' |
| DATA\_START | object array | true |  |  |
| margin\_account | String | true | margin account | such as:'BTC-USDT'，'ETH-USDT'... |
| position\_mode | String | true | position mode | single\_side; dual\_side |
| DATA\_END | String | true |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_position_side?margin_account=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin\_account":

"USDT"

"position\_mode":

"single\_side"

}

\]

"ts":

1566899973811

}