# GET Query information on position limit

**Source:**
[Query information on position limit](https://www.htx.com/en-us/opend/newApiPages/?id=5d519b01-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_position_limit (Query information on position limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ------------------ | ------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                      | Value Range    |
| ------------- | --------- | -------- | ------------------------------------------------ | -------------- |
| status        | string    | true     | Request Processing Result                        | "ok" , "error" |
| ts            | long      | true     | Time of Responding Generation, Unit: Millisecond |                |
| DATA_START    |           | false    |                                                  |                |
| symbol        | string    | true     | Contract Code                                    | "BTC","ETH"... |
| contract_code | string    | true     | contract type code                               | "BTC-USD",...  |
| buy_limit     | decimal   | true     | Max long position limit, Unit: Cont              |                |
| sell_limit    | decimal   | true     | Max short position limit, Unit: Cont             |                |
| DATA_END      |           | false    |                                                  |                |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_price_limit?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"buy_limit":

60000

"sell_limit":

60000

}

\]

"ts":

1603870983335

}
