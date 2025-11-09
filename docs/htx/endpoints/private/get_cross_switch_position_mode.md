# GET [Cross]Switch Position Mode

**Source:**
[[Cross]Switch Position Mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb843e0-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_switch_position_mode (\[Cross\]Switch Position Mode)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description    | Value Range            | Default Value |
| -------------- | --------- | -------- | -------------- | ---------------------- | ------------- |
| margin_account | string    | true     | margin account | such as: "USDT"        |               |
| position_mode  | string    | true     | position mode  | single_side; dual_side |               |

#### Response Parameter

| Parameter      | Data Type    | Required | Description                                   | Value Range            |
| -------------- | ------------ | -------- | --------------------------------------------- | ---------------------- |
| status         | string       | true     | status                                        | "ok" , "error"         |
| DATA_START     | object array | true     |                                               |                        |
| margin_account | string       | true     | margin account                                | such as: "USDT"        |
| position_mode  | string       | true     | position mode                                 | single_side; dual_side |
| DATA_END       |              | false    |                                               |                        |
| ts             | long         | true     | Time of Respond Generation, Unit: Millisecond |                        |

#### Request example

{

"margin_account":

"BTC-USDT"

"position_mode":

"dual_side"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin_account":

"USDT"

"position_mode":

"single_side"

}

\]

"ts":

1566899973811

}
