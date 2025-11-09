# GET Contract Price Limitation

**Source:**
[Get Contract Price Limitation](https://www.htx.com/en-us/opend/newApiPages/?id=28c2d41e-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /api/v1/contract_price_limit (Get Contract Price Limitation)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP
(this 120 times every 3 seconds public interface rate limit is shared by all the
requests from that IP of non-marketing information, like above)

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                   | Value Range | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------------------------- | ----------- | ------------- |
| symbol        | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported.e.g."BTC","ETH"... |             |               |
| contract_type | string    | false    | Contract Type ("this_week","next_week","quarter", "next_quarter")             |             |               |
| contract_code | string    | false    | BTC180914 ...                                                                 |             |               |

Notes:  
If not any parameter is filled, the interface returns the price limitation data
of all currently available contracts. If the contract_code is filled in, query
by the contract_code; The contract_type parameter needs to together with symbol,
and can't get contract data only by contract_type

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                                       |
| ------------- | --------- | -------- | --------------------------------------------- | ------------------------------------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" ,"error"                                     |
| DATA_START    |           | false    |                                               |                                                   |
| symbol        | string    | true     | Variety code                                  | "BTC","ETH" ...                                   |
| high_limit    | decimal   | true     | Highest Buying Price                          |                                                   |
| low_limit     | decimal   | true     | Lowest Selling Price                          |                                                   |
| contract_code | string    | true     | Contract Code                                 | eg "BTC180914" ...                                |
| contract_type | string    | true     | Contract Type                                 | "this_week","next_week","quarter" ,"next_quarter" |
| DATA_END      |           | false    |                                               |                                                   |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                   |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_price_limit?symbol=BTC&contract_type=this_week"`

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

"BTC210813"

"contract_type":

"this_week"

"high_limit":

46365.84

"low_limit":

44547.58

}

\]

"ts":

1628650919495

}
