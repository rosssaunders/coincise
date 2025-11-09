# GET Market Depth

**Source:** [Get Market Depth](https://www.htx.com/en-us/opend/newApiPages/?id=5d517804-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /swap-ex/market/depth (Get Market Depth)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |  |  |
| type | string | true | Get depth data within step 150, use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17（merged depth data 0-5,14-17）；when step is 0，depth data will not be merged; Get depth data within step 20, use step6, step7, step8, step9, step10, step11, step12, step13, step18, step19(merged depth data 7-13,18-19); when step is 6, depth data will not be merged. |  |  |

Notes:  
step16, step17, step18, and step19 are only for SHIB-USD contract, and the other contracts is not supported now.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.period |  |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| TICK\_START |  | false |  |  |
| mrid | string | true | Order ID |  |
| id | string | true | tick ID |  |
| asks | object | false | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bids | object | false | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| version | long | true | version ID |  |
| ch | string | true | Data channel, Format： market.period |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-ex/market/detail/merged?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.depth.step6"

"status":

"ok"

"ts":

1603852132212

"tick":{

"mrid":

50950394258

"id":

1603852132

"bids":\[

0:\[

0

:

13762.2

1

:

22198

\]

1:\[

0

:

13762.1

1

:

566

\]

\]

"asks":\[

0:\[

0

:

13762.3

1

:

4193

\]

1:\[

0

:

13762.4

1

:

2

\]

\]

"ts":

1603852132152

"version":

1603852132

"ch":

"market.BTC-USD.depth.step6"

}

}