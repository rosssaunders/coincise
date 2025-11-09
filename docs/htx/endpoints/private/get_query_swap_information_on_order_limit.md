# GET Query swap information on order limit

**Source:** [Query swap information on order limit](https://www.htx.com/en-us/opend/newApiPages/?id=5d5196d5-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_order\_limit (Query swap information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent\_ioc"：IOC order using the BBO price，"lightning\_ioc"：lightning IOC，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"lightning\_fok"：lightning FOK，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order |
| LIST\_START |  | false |  |  |
| symbol | string | true | Contract Code | "BTC","ETH"... |
| contract\_code | string | true | contract type code | "BTC-USD",... |
| open\_limit | decimal | true | Max open order limit |  |
| close\_limit | decimal | true | Max close order limit |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_price\_type":

"limit"

"list":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"open\_limit":

6000

"close\_limit":

12000

}

\]

}

"ts":

1603870733069

}