# GET Query Top Trader Sentiment Index Function-Account

**Source:**
[Query Top Trader Sentiment Index Function-Account](https://www.htx.com/en-us/opend/newApiPages/?id=5d51674d-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_elite_account_ratio (Query Top Trader Sentiment Index Function-Account)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                          | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------------ | ------------- |
| contract_code | string    | true     | Contract Code | Case-Insenstive.e.g. "BTC-USD"       |               |
| period        | string    | true     | period        | 5min, 15min, 30min, 60min,4hour,1day |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range    |
| ------------- | --------- | -------- | --------------------------------------------- | -------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error" |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                |
| DATA_START    |           | false    |                                               |                |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"... |
| contract_code | string    | true     | contract code                                 | e.g. "BTC-USD" |
| LIST_START    |           | false    |                                               |                |
| buy_ratio     | decimal   | true     | net long accounts ratio                       |                |
| sell_ratio    | decimal   | true     | net short accounts ratio                      |                |
| locked_ratio  | decimal   | true     | locked accounts ratio                         |                |
| ts            | long      | true     | Time of Respond Generation                    |                |
| LIST_END      |           | false    |                                               |                |
| DATA_END      |           | false    |                                               |                |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_elite_account_ratio?contract_code=BTC-USD&period=5min"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"list":\[

0:{

"buy_ratio":

0.47

"sell_ratio":

0.52

"locked_ratio":

0.01

"ts":

1603857300000

}

1:{

"buy_ratio":

0.47

"sell_ratio":

0.52

"locked_ratio":

0.01

"ts":

1603857600000

}

\]

"symbol":

"BTC"

"contract_code":

"BTC-USD"

}

"ts":

1603866026216

}
