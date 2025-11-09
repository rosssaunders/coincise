# GET Query information on open interest

**Source:**
[Query information on open interest](https://www.htx.com/en-us/opend/newApiPages/?id=5d51653e-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_his_open_interest (Query information on open interest)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                      | Default Value |
| ------------- | --------- | -------- | ------------------ | ---------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code      | Case-Insenstive. e.g. "BTC-USD"                                  |               |
| period        | string    | true     | Period Type        | 1 hour:"60min"，4 hours:"4hour"，12 hours:"12hour"，1 day:"1day" |               |
| size          | int       | false    | Request Amount     | Default：48，Data Range \[1,200\]                                |               |
| amount_type   | int       | true     | Open interest unit | 1:-cont，2:-cryptocurrenty                                       |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                 |
| ------------- | --------- | -------- | --------------------------------------------- | --------------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"              |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                             |
| DATA_START    |           | false    | Dictionary Data                               |                             |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...              |
| contract_code | string    | true     | Contract Code                                 | e.g. "BTC-USD"              |
| TICK_START    |           | false    |                                               |                             |
| volume        | decimal   | true     | Open Interest. Sum of both buy and sell sides |                             |
| amount_type   | int       | true     | Open Interest Unit                            | 1:-cont，2:- cryptocurrency |
| ts            | long      | true     | Recording Time                                |                             |
| TICK_END      |           | false    |                                               |                             |
| DATA_END      |           | false    |                                               |                             |

Notes:  
tick field：Tick data is arranged in reverse chronological order；  
data field：Dictionary database.

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_index?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"BTC"

"tick":\[

0:{

"volume":

2428660

"amount_type":

1

"ts":

1603857600000

}

\]

"contract_code":

"BTC-USD"

}

"ts":

1603865983492

}
