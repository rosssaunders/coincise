# GET Query Swap Info

**Source:**
[Query Swap Info](https://www.htx.com/en-us/opend/newApiPages/?id=5d516f96-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_contract_info (Query Swap Info)

Request type: GET

Signature verification: No

Interface permission: Read

Interface description: contract elements it can display more futures fields, we
recommend you to use it.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                           | Value Range | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-insenstive.such as "BTC-USD". All swaps default. |             |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                                                 | Value Range                                                                                                                     |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| status          | string    | true     | Request Processing Result                                                                                                   | "ok" , "error"                                                                                                                  |
| data <list>     |           | false    |                                                                                                                             |                                                                                                                                 |
| symbol          | string    | true     | symbol                                                                                                                      | "BTC","ETH"...                                                                                                                  |
| contract_code   | string    | true     | Contract Code                                                                                                               | "BTC-USD" ...                                                                                                                   |
| contract_size   | decimal   | true     | Contract Value (USD of one contract)                                                                                        | 10, 100...                                                                                                                      |
| price_tick      | decimal   | true     | Minimum Variation of Contract Price                                                                                         | 0.001, 0.01...                                                                                                                  |
| settlement_date | string    | true     | Settlement Date                                                                                                             | eg "1490759594752"                                                                                                              |
| create_date     | string    | true     | Listing Date                                                                                                                | eg "20190808"                                                                                                                   |
| delivery_time   | string    | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |                                                                                                                                 |
| contract_status | int       | true     | Contract Status                                                                                                             | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| LIST_END        |           | false    |                                                                                                                             |                                                                                                                                 |
| ts              | long      | true     | Time of Respond Generation，Unit：Millisecond                                                                               |                                                                                                                                 |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_contract_info?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USD"

"contract_size":

100

"price_tick":

0.0001

"delivery_time":

""

"create_date":

"20200116"

"contract_status":

7

"settlement_date":

"1609765200000"

}

\]

"ts":

1603851828069

}
