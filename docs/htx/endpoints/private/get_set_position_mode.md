# GET Set Position Mode

**Source:**
[Set Position Mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1959443cae3)

**Category:** Positions

## Authentication

Required (Private Endpoint)

### /v5/position/mode (Set Position Mode)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Switch the current position mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                      | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------------------------ | ------------- |
| position_mode | string    | true     | Position mode | single_side: One-way mode; dual_side: Hedge mode |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                      |
| ------------- | --------- | -------- | ------------- | ------------------------------------------------ |
| position_mode | string    | true     | Position mode | single_side: One-way mode; dual_side: Hedge mode |

#### Request example

{

"position_mode":

"dual_side"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":{

"position_mode":

"dual_side"

}

"ts":

1740463132267

}
