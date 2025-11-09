# GET Query information on contract insurance fund balance and estimated clawback rate

**Source:**
[Query information on contract insurance fund balance and estimated clawback rate](https://www.htx.com/en-us/opend/newApiPages/?id=5d5161f1-77b6-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_risk_info (Query information on contract insurance fund balance and estimated clawback rate)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                    | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------ | ------------- |
| contract_code | string    | false    | contract code | Case-Insenstive.e.g. "BTC-USD" |               |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                   | Value Range    |
| ------------------ | --------- | -------- | --------------------------------------------- | -------------- |
| status             | string    | true     | Request processing Result                     | "ok" , "error" |
| ts                 | long      | true     | Time of Respond Generation, Unit: Millisecond |                |
| DATA_START         |           | false    |                                               |                |
| contract_code      | string    | true     | e.g. "BTC-USD"                                |                |
| insurance_fund     | decimal   | true     | Insurance Fund Balance                        |                |
| estimated_clawback | decimal   | true     | Estimated Clawback Rate                       |                |
| DATA_END           |           | false    |                                               |                |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_settlement_records?contract_code=BTC-USD&start_time=1670987797000&end_time=1671074197330&page_index=1&page_size=20"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"BTC-USD"

"insurance_fund":

593.7706304354919

"estimated_clawback":

0

}

\]

"ts":

1603852879216

}
