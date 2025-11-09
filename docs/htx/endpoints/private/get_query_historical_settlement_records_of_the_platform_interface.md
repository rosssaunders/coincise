# GET Query historical settlement records of the platform interface

**Source:**
[Query historical settlement records of the platform interface](https://www.htx.com/en-us/opend/newApiPages/?id=5d516eca-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_settlement_records (Query historical settlement records of the platform interface)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                 | Value Range                                                                                      | Default Value |
| ------------- | --------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | Contract Code                               | "BTC-USD","ETH-USD"...                                                                           |               |
| start_time    | long      | false    | Start time（timestamp，unit: millisecond）  | Value range: \[(Current time minus 90 days), Current time\] ，default current time minus 90 days |               |
| end_time      | long      | false    | End time（timestamp，unit: millisecond）    | Value range: (start_time, current time)，default current time                                    |               |
| page_index    | int       | false    | Page, default page 1 if not filled          |                                                                                                  |               |
| page_size     | int       | false    | Page items, default 20, shall not exceed 50 |                                                                                                  |               |

#### Response Parameter

| Parameter               | Data Type    | Required | Description                                                                                                                                                                             | Value Range                                    |
| ----------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| status                  | string       | true     | Request Processing Result                                                                                                                                                               | "ok" , "error"                                 |
| ts                      | long         | true     | Response generation time point, unit: millisecond                                                                                                                                       |                                                |
| DATA_START              | object array | true     |                                                                                                                                                                                         |                                                |
| SETTLEMENT_RECORD_START | object array | true     |                                                                                                                                                                                         |                                                |
| symbol                  | string       | true     | Token Code                                                                                                                                                                              |                                                |
| contract_code           | string       | true     | Contract Code                                                                                                                                                                           | "BTC-USD" ...                                  |
| settlement_time         | long         | true     | Settlement Time（timestamp，unit: millisecond）（when the settlement_type is delivery, the time is delivery time; when the settlement_type is settlement, the time is settlement time） |                                                |
| clawback_ratio          | decimal      | true     | Clawback Ratio                                                                                                                                                                          |                                                |
| settlement_price        | decimal      | true     | Settlement Price（when the settlement_type is delivery, the price is delivery price; when the settlement_type is settlement, the price is settlement price；）                          |                                                |
| settlement_type         | string       | true     | Settlement Type                                                                                                                                                                         | “delivery”：Delivery，“settlement”：Settlement |
| SETTLEMENT_RECORD_END   |              | false    |                                                                                                                                                                                         |                                                |
| total_page              | int          | true     | Total Pages                                                                                                                                                                             |                                                |
| current_page            | int          | true     | Current Page                                                                                                                                                                            |                                                |
| total_size              | int          | true     | Total page items                                                                                                                                                                        |                                                |
| DATA_END                |              | false    |                                                                                                                                                                                         |                                                |

#### Request example

`curl"https://api.hbdm.com/swap-api/v1/swap_settlement_records?contract_code=BTC-USD&sub_uid=321456"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

271

"current_page":

1

"total_size":

271

"settlement_record":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USD"

"settlement_time":

1606377600000

"clawback_ratio":

0

"settlement_price":

17596.8

"settlement_type":

"settlement"

}

\]

}

"ts":

1606379293628

}
