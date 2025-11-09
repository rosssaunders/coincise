# GET Assets Available for Multi-Assets Collateral mode

**Source:**
[Assets Available for Multi-Assets Collateral mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a1d8e7ef)

**Category:** Basic Information

## Authentication

Required (Private Endpoint)

### /v5/market/multi_assets_margin (Assets Available for Multi-Assets Collateral mode)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get assets available for the Multi-Assets Collateral mode

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter    | Data Type | Required | Description                                           | Value Range |
| ------------ | --------- | -------- | ----------------------------------------------------- | ----------- |
| multi_assets | list      | true     | Assets available for the Multi-Assets Collateral mode |             |

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

"multi_assets":\[

0

:

"BTC"

1

:

"USDT"

2

:

"ETH"

3

:

"EOS"

\]

}

"ts":

1740454189686

}
