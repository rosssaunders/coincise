# GET Query contract information on order limit

**Source:**
[Query contract information on order limit](https://www.htx.com/en-us/opend/newApiPages/?id=28c2fcb2-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract_order_limit (Query contract information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description   | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value |
| ---------------- | --------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol           | string    | false    | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contracts by default                                                                                                                                                                                                                                                                                                                                                                                                                              |               |
| order_price_type | string    | true     | Order Type    | "limit": Limit Order，"opponent":BBO，"lightning": Flash Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order,"opponent_ioc"：IOC order using the BBO price，"lightning_ioc"：lightning IOC，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC， "optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"lightning_fok"：lightning FOK，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |               |

#### Response Parameter

| Parameter        | Data Type | Required | Description                                   | Value Range                                                                                                                                                                                            |
| ---------------- | --------- | -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status           | string    | true     | Request Processing Result                     | "ok" , "error"                                                                                                                                                                                         |
| ts               | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                                                                                                                        |
| DATA_START       |           | false    |                                               |                                                                                                                                                                                                        |
| order_price_type | string    | true     | Order Type                                    | "limit": Limit Order，"opponent":BBO，"lightning": Flash Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order |
| LIST_START       |           | false    |                                               |                                                                                                                                                                                                        |
| symbol           | string    | true     | Contract Code                                 | "BTC","ETH"...                                                                                                                                                                                         |
| TYPES_START      |           | false    |                                               |                                                                                                                                                                                                        |
| contract_type    | string    | true     | Contract Type                                 | Weekly:"this_week", Bi-weekly:"next_week", Quarterly:"quarter". Next Quarterly Contract: "next_quarter"                                                                                                |
| open_limit       | long      | true     | Max open order limit                          |                                                                                                                                                                                                        |
| close_limit      | long      | true     | Max close order limit                         |                                                                                                                                                                                                        |
| TYPES_END        |           | false    |                                               |                                                                                                                                                                                                        |
| LIST_END         |           | false    |                                               |                                                                                                                                                                                                        |
| DATA_END         |           | false    |                                               |                                                                                                                                                                                                        |

#### Request example

{

"symbol":

"btc"

"order_price_type":

"limit"

}

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

"ADA"

"types":\[

0:{

"contract_type":

"this_week"

"open_limit":

6000

"close_limit":

12000

}

1:{

"contract_type":

"next_week"

"open_limit":

6000

"close_limit":

12000

}

2:{

"contract_type":

"quarter"

"open_limit":

6000

"close_limit":

12000

}

3:{

"contract_type":

"next_quarter"

"open_limit":

6000

"close_limit":

12000

}

\]

}

\]

}

"ts":

1604306946036

}
