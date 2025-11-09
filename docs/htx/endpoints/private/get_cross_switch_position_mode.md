# GET [Cross]Switch Position Mode

**Source:** [[Cross]Switch Position Mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb843e0-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_switch\_position\_mode (\[Cross\]Switch Position Mode)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | such as: "USDT" |  |
| position\_mode | string | true | position mode | single\_side; dual\_side |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| margin\_account | string | true | margin account | such as: "USDT" |
| position\_mode | string | true | position mode | single\_side; dual\_side |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"margin\_account":

"BTC-USDT"

"position\_mode":

"dual\_side"

}

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