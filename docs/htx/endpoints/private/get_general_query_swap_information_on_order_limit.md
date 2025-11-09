# GET [General] Query swap information on order limit

**Source:**
[[General] Query swap information on order limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83090-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_order_limit (\[General\] Query swap information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                    | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default Value |
| ---------------- | --------- | -------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code    | string    | false    | contract type code             | Case-Insenstive.Both uppercase and lowercase are supported.e.g. swap:"BTC-USDT"... , future:"BTC-USDT-210625"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |               |
| order_price_type | string    | true     | Order Type                     | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent_ioc"：IOC order using the BBO price，"lightning_ioc"：lightning IOC，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"lightning_fok"：lightning FOK，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |               |
| pair             | string    | false    | pair                           | BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |               |
| contract_type    | string    | false    | contract type                  | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |               |
| business_type    | string    | false    | business type, default is swap | futures, swap, all                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |               |

#### Response Parameter

| Parameter        | Data Type | Required | Description                                   | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | --------- | -------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status           | string    | true     | Request Processing Result                     | "ok" , "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ts               | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| DATA_START       |           | false    |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| order_price_type | string    | true     | Order Type                                    | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent_ioc"：IOC order using the BBO price，"lightning_ioc"：lightning IOC，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"lightning_fok"：lightning FOK，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| LIST_START       |           | false    |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| symbol           | string    | true     | symbol                                        | "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| contract_code    | string    | true     | contract type code                            | swap:"BTC-USDT"... , future:"BTC-USDT-210625"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| open_limit       | decimal   | true     | Max open order limit                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| close_limit      | decimal   | true     | Max close order limit                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| contract_type    | string    | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| pair             | string    | true     | pair                                          | such as: “BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| business_type    | string    | true     | business type                                 | futures, swap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| LIST_END         |           | false    |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| DATA_END         |           | false    |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

#### Request example

`{ "contract_code": "BTC-USDT", "order_price_type": "limit", "pair": "BTC-USDT", "contract_type": "swap" "business_type": "swap" }`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_price_type":

"limit"

"list":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"open_limit":

170000

"close_limit":

170000

"business_type":

"swap"

"contract_type":

"swap"

"pair":

"BTC-USDT"

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"open_limit":

170000

"close_limit":

170000

"business_type":

"futures"

"contract_type":

"next_week"

"pair":

"BTC-USDT"

}

2:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"open_limit":

170000

"close_limit":

170000

"business_type":

"futures"

"contract_type":

"this_week"

"pair":

"BTC-USDT"

}

3:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"open_limit":

170000

"close_limit":

170000

"business_type":

"futures"

"contract_type":

"quarter"

"pair":

"BTC-USDT"

}

\]

}

"ts":

1638760136200

}
