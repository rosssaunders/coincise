# GET Assets Available for Trading Fee Deduction

**Source:** [Assets Available for Trading Fee Deduction](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a1d7c31a)

**Category:** Basic Information

## Authentication

Required (Private Endpoint)

### /v5/market/assets\_deduction\_currency (Assets Available for Trading Fee Deduction)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get the list of assets that can be used to deduct trading fees.

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
| currency | list | true | 币种 |  |

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

"currency":\[

0

:

"HTX"

1

:

"TRX"

\]

}

"ts":

1740454112540

}