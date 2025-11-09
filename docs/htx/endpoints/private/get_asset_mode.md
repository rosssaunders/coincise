# GET Asset Mode

**Source:**
[Get Asset Mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1958871f034)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v5/account/asset_mode (Get Asset Mode)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface allows users to query the current asset
mode.

#### Request Address

| Environment | Address |
| ----------- | ------- |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter   | Data Type | Required | Description             | Value Range                                                      |
| ----------- | --------- | -------- | ----------------------- | ---------------------------------------------------------------- |
| assets_mode | int       | true     | Multi-Assets Collateral | 0: Single-asset collateral mode; 1: Multi-assets collateral mode |

#### Request example

`no`

#### Response Example

##### Success Example

{

"code":

200

"msg":

"Success"

"data":{

"assets_mode":

0

}

"ts":

1547521135713

}
