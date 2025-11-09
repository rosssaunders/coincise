# GET [Isolated]Query Users' Position Limit for All Leverages

**Source:** [[Isolated]Query Users' Position Limit for All Leverages](https://www.htx.com/en-us/opend/newApiPages/?id=8cb838ef-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_lever\_position\_limit (\[Isolated\]Query Users' Position Limit for All Leverages)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: \\This interface only supports isolated margin mode. If the status of contract is Pending Listing, Listing, Suspension, or Suspending of Listing, the data of that contract will not be returned when querying all; If that contract is queried separately, error 1014 will be reported; lever\_rate must fall within the user's available leverage rate, otherwise error 1037 will be reported

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code, NA means all | such as "BTC-USDT", "ETH-USDT" |  |
| lever\_rate | int | false | leverage rate, NA means all |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status code | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_mode | string | true | margin mode | isolated |
| LIST\_START | object array | true |  |  |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"lever\_rate":

20

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

"margin\_mode":

"isolated"

"list":\[

0:{

"lever\_rate":

2

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

}

\]

}

\]

"ts":

1638769536897

}