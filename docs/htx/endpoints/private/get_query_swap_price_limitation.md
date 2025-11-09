# GET Query Swap Price Limitation

**Source:**
[Query Swap Price Limitation](https://www.htx.com/en-us/opend/newApiPages/?id=5d51727b-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_price_limit (Query Swap Price Limitation)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                        | Value Range | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-insenstive.such as:BTC-USD, All swaps default |             |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range      |
| ------------- | --------- | -------- | --------------------------------------------- | ---------------- |
| status        | string    | true     | Request Processing Result                     | "ok" ,"error"    |
| DATA_START    |           | false    |                                               |                  |
| symbol        | string    | true     | Variety code                                  | "BTC","ETH" ...  |
| high_limit    | decimal   | true     | Highest Buying Price                          |                  |
| low_limit     | decimal   | true     | Lowest Selling Price                          |                  |
| contract_code | string    | true     | Contract Code                                 | eg "BTC-USD" ... |
| DATA_START    |           | false    |                                               |                  |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                  |

#### Request example

`curl"https://api.hbdm.com/swap-api/v1/swap_price_limit?contract_code=BTC-USD&order_id=123456"`

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

"high_limit":

14313.1

"low_limit":

13212.2

}

\]

"ts":

1603851945000

}
