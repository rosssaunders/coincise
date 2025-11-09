# GET Position Mode

**Source:** [Get Position Mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1959442c16b)

**Category:** Positions

## Authentication

Required (Private Endpoint)

### /v5/position/mode (Get Position Mode)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get the current position mode

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| position\_mode | string | true | Position mode | single\_side: One-way mode; dual\_side: Hedge mode |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":{

"position\_mode":

"dual\_side"

}

"ts":

1740453311795

}