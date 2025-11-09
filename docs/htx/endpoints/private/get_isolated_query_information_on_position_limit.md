# GET [Isolated] Query information on position limit

**Source:** [[Isolated] Query information on position limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb835b7-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_position\_limit (\[Isolated\] Query information on position limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Responding Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract type code | "BTC-USDT",... |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| buy\_limit | decimal | true | max qty of position on long positions, unit: piece(calculated with mark\_price) |  |
| sell\_limit | decimal | true | max qty of position on short positions, unit: piece(calculated with mark\_price) |  |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| mark\_price | decimal | true | mark price(use this price to calculate the qty of open positions) |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"buy\_limit":

1026154

"sell\_limit":

1026154

"margin\_mode":

"isolated"

"lever\_rate":

5

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

"mark\_price":

48725.6

}

\]

"ts":

1638770954672

}