# GET [General] Query swap information on order limit

**Source:** [[General] Query swap information on order limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83090-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_order\_limit (\[General\] Query swap information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string  | false | contract type code  | Case-Insenstive.Both uppercase and lowercase are supported.e.g. swap:"BTC-USDT"... , future:"BTC-USDT-210625"... |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent\_ioc"：IOC order using the BBO price，"lightning\_ioc"：lightning IOC，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"lightning\_fok"：lightning FOK，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent\_ioc"：IOC order using the BBO price，"lightning\_ioc"：lightning IOC，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"lightning\_fok"：lightning FOK，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| LIST\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract type code | swap:"BTC-USDT"... , future:"BTC-USDT-210625"... |
| open\_limit | decimal | true | Max open order limit |  |
| close\_limit | decimal | true | Max close order limit |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`{ "contract_code": "BTC-USDT", "order_price_type": "limit", "pair": "BTC-USDT", "contract_type": "swap" "business_type": "swap" }`

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

"BTC"

"contract\_code":

"BTC-USDT"

"open\_limit":

170000

"close\_limit":

170000

"business\_type":

"swap"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"open\_limit":

170000

"close\_limit":

170000

"business\_type":

"futures"

"contract\_type":

"next\_week"

"pair":

"BTC-USDT"

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"open\_limit":

170000

"close\_limit":

170000

"business\_type":

"futures"

"contract\_type":

"this\_week"

"pair":

"BTC-USDT"

}

3:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"open\_limit":

170000

"close\_limit":

170000

"business\_type":

"futures"

"contract\_type":

"quarter"

"pair":

"BTC-USDT"

}

\]

}

"ts":

1638760136200

}