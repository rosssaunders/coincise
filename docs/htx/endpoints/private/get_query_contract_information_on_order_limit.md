# GET Query contract information on order limit

**Source:** [Query contract information on order limit](https://www.htx.com/en-us/opend/newApiPages/?id=28c2fcb2-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_order\_limit (Query contract information on order limit)

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
| symbol | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contracts by default |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Flash Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order,"opponent\_ioc"：IOC order using the BBO price，"lightning\_ioc"：lightning IOC，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC， "optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"lightning\_fok"：lightning FOK，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Flash Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order |
| LIST\_START |  | false |  |  |
| symbol | string | true | Contract Code | "BTC","ETH"... |
| TYPES\_START |  | false |  |  |
| contract\_type | string | true | Contract Type | Weekly:"this\_week", Bi-weekly:"next\_week", Quarterly:"quarter". Next Quarterly Contract: "next\_quarter" |
| open\_limit | long | true | Max open order limit |  |
| close\_limit | long | true | Max close order limit |  |
| TYPES\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"symbol":

"btc"

"order\_price\_type":

"limit"

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

"ADA"

"types":\[

0:{

"contract\_type":

"this\_week"

"open\_limit":

6000

"close\_limit":

12000

}

1:{

"contract\_type":

"next\_week"

"open\_limit":

6000

"close\_limit":

12000

}

2:{

"contract\_type":

"quarter"

"open\_limit":

6000

"close\_limit":

12000

}

3:{

"contract\_type":

"next\_quarter"

"open\_limit":

6000

"close\_limit":

12000

}

\]

}

\]

}

"ts":

1604306946036

}