# GET the estimated settlement price

**Source:**
[Get the estimated settlement price](https://www.htx.com/en-us/opend/newApiPages/?id=5d5169d1-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_estimated_settlement_price (Get the estimated settlement price)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address                    |
| ----------------------------------- | -------------------------- |
| Online                              | wss://api.hbdm.com/swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-ws  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                  | Value Range   | Default Value |
| ------------- | --------- | -------- | -------------------------------------------- | ------------- | ------------- |
| contract_code | string    | false    | contract code, return all without filling in | "BTC-USD" ... |               |

#### Response Parameter

| Parameter                  | Data Type    | Required | Description                                                                                                                                                                                              | Value Range              |
| -------------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| status                     | string       | true     | status                                                                                                                                                                                                   |                          |
| DATA_START                 | object array | true     |                                                                                                                                                                                                          |                          |
| contract_code              | string       | true     | contract code                                                                                                                                                                                            | "BTC-USD" ...            |
| estimated_settlement_price | decimal      | true     | Current-period estimated settlement price /Current-period estimated delivery price (When the settlement type is "delivery", it is estimated delivery price; Otherwise, it is estimated settlement price) |                          |
| settlement_type            | string       | true     | settlement type                                                                                                                                                                                          | “delivery”，“settlement” |
| DATA_END                   |              | false    |                                                                                                                                                                                                          |                          |
| ts                         | long         | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                                            |                          |

Notes:  
When the "settlement_type" is "settlement", the "estimated_settlement_price"
will be calculated and updated from 10 minutes before settlement and until the
settlement. In the other moment(including settlement),
"estimated_settlement_price" is empty, but the other fields will be displayed
normally.  
When the "settlement_type" is "delivery", the "estimated_settlement_price" will
be calculated and updated from 10 minutes before settlement and until the
delivery. In the other moment(including delivery), "estimated_settlement_price"
is empty, but the other fields will be displayed normally.  
Estimated settlement price will be calculated and updated every 6 seconds.

#### Request example

`curl"https://api.hbdm.com/swap-api/v1/swap_estimated_settlement_price?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"LTC-USD"

"estimated_settlement_price":

NULL

"settlement_type":

"settlement"

}

1:{

"contract_code":

"ETH-USD"

"estimated_settlement_price":

NULL

"settlement_type":

"settlement"

}

\]

"ts":

1608628413428

}
