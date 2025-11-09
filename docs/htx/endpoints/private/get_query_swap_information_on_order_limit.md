# GET Query swap information on order limit

**Source:**
[Query swap information on order limit](https://www.htx.com/en-us/opend/newApiPages/?id=5d5196d5-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_order_limit (Query swap information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description        | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default Value |
| ---------------- | --------- | -------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code    | string    | false    | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |               |
| order_price_type | string    | true     | Order Type         | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent_ioc"：IOC order using the BBO price，"lightning_ioc"：lightning IOC，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"lightning_fok"：lightning FOK，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |               |

#### Response Parameter

| Parameter        | Data Type | Required | Description                                   | Value Range                                                                                                                                                                                                |
| ---------------- | --------- | -------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status           | string    | true     | Request Processing Result                     | "ok" , "error"                                                                                                                                                                                             |
| ts               | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                                                                                                                            |
| DATA_START       |           | false    |                                               |                                                                                                                                                                                                            |
| order_price_type | string    | true     | Order Type                                    | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order |
| LIST_START       |           | false    |                                               |                                                                                                                                                                                                            |
| symbol           | string    | true     | Contract Code                                 | "BTC","ETH"...                                                                                                                                                                                             |
| contract_code    | string    | true     | contract type code                            | "BTC-USD",...                                                                                                                                                                                              |
| open_limit       | decimal   | true     | Max open order limit                          |                                                                                                                                                                                                            |
| close_limit      | decimal   | true     | Max close order limit                         |                                                                                                                                                                                                            |
| LIST_END         |           | false    |                                               |                                                                                                                                                                                                            |
| DATA_END         |           | false    |                                               |                                                                                                                                                                                                            |

#### Request example

{

"contract_code":

"BTC-USD"

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

"THETA"

"contract_code":

"THETA-USD"

"open_limit":

6000

"close_limit":

12000

}

\]

}

"ts":

1603870733069

}
