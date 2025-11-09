# GET Query information on swap trading fee

**Source:**
[Query information on swap trading fee](https://www.htx.com/en-us/opend/newApiPages/?id=5d519908-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_fee (Query information on swap trading fee)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                                   | Default Value |
| ------------- | --------- | -------- | ------------------ | ----------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD",... |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                       | Value Range    |
| --------------- | --------- | -------- | ------------------------------------------------- | -------------- |
| status          | string    | true     | Request Processing Result                         | "ok" , "error" |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond     |                |
| DATA_START      |           | false    |                                                   |                |
| contract_code   | string    | true     | contract type code                                | "BTC-USD",...  |
| open_maker_fee  | string    | true     | Open maker order fee, decimal                     |                |
| open_taker_fee  | string    | true     | Open taker order fee, decimal                     |                |
| close_maker_fee | string    | true     | Close maker order fee, decimal                    |                |
| close_taker_fee | string    | true     | Close taker order fee, decimal                    |                |
| delivery_fee    | string    | true     | delivery fee, decimal                             |                |
| fee_asset       | string    | true     | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| DATA_END        |           | false    |                                                   |                |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_funding_rate?contract_code=BTC-USD"`

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

"open_maker_fee":

"0.0002"

"open_taker_fee":

"0.0005"

"close_maker_fee":

"0.0002"

"close_taker_fee":

"0.0005"

"fee_asset":

"THETA"

}

\]

"ts":

1603870760621

}
