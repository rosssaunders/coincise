# GET Query Available Leverage Rate

**Source:** [Query Available Leverage Rate](https://www.htx.com/en-us/opend/newApiPages/?id=28c30cab-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_available\_level\_rate (Query Available Leverage Rate)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds. Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | case-insensitive | "BTC" , "ETH" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| ts | long | true | response millionseconds |  |
| DATA\_START | arrayobject | true |  |  |
| symbol | string | false | case-insensitive | "BTC" , "ETH" |
| available\_level\_rate | string | true | available level rate,splited by ',' | "1,5,10" |
| DATA\_END |  | false |  |  |

#### Request example

{

"symbol":

"BTC"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"ADA"

"available\_level\_rate":

"1,2,3,5,10,20,30,50,75"

}

\]

"ts":

1604312615051

}