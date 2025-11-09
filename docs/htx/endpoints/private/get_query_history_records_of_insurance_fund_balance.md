# GET Query history records of insurance fund balance

**Source:**
[Query history records of insurance fund balance](https://www.htx.com/en-us/opend/newApiPages/?id=5d51632f-77b6-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_insurance_fund (Query history records of insurance fund balance)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                           | Value Range                    | Default Value |
| ------------- | --------- | -------- | ------------------------------------- | ------------------------------ | ------------- |
| contract_code | string    | true     | contract code                         | Case-Insenstive.e.g. "BTC-USD" |               |
| page_index    | int       | false    | page index. 1 by default              | 1                              |               |
| page_size     | int       | false    | page size.100 by default. 100 at most | 100                            |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                   | Value Range     |
| -------------- | --------- | -------- | --------------------------------------------- | --------------- |
| status         | string    | true     | Request Processing Result                     | "ok" , "error"  |
| ts             | long      | true     | Time of Respond Generation, Unit: Millisecond |                 |
| DATA_START     |           | false    |                                               | Dictionary Data |
| symbol         | string    | true     | symbol                                        | "BTC","ETH"...  |
| contract_code  | string    | true     | contract code                                 | e.g. "BTC-USD"  |
| TICK_START     |           | false    |                                               |                 |
| insurance_fund | decimal   | true     | Insurance Fund Balance                        |                 |
| ts             | long      | true     | Timestamp, Unit: Millisecond                  |                 |
| TICK_END       |           | false    |                                               |                 |
| total_page     | int       | true     | total page                                    |                 |
| current_page   | int       | true     | current page                                  |                 |
| total_size     | int       | true     | total size                                    |                 |
| DATA_END       |           | false    |                                               |                 |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_ladder_margin?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

89

"current_page":

1

"total_size":

89

"symbol":

"BTC"

"contract_code":

"BTC-USD"

"tick":\[

0:{

"insurance_fund":

593.7706304354919

"ts":

1603785600000

}

\]

}

"ts":

1603865805070

}
