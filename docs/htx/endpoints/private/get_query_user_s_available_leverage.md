# GET Query user’s available leverage

**Source:**
[Query user’s available leverage](https://www.htx.com/en-us/opend/newApiPages/?id=5d51934f-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_available_level_rate (Query user’s available leverage)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                 | Value Range     | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------- | --------------- | ------------- |
| contract_code | string    | false    | Contract code, if not filled in, the actual available leverage of all contracts will be returned by default | “BTC-USD”。。。 |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                       | Value Range    |
| -------------------- | ------------ | -------- | ------------------------------------------------- | -------------- |
| status               | string       | true     | Request Processing Result                         | "ok" , "error" |
| DATA_START           | object array | true     |                                                   |                |
| contract_code        | string       | true     | contract code                                     | "BTC-USD"      |
| available_level_rate | string       | true     | available level rate,splited by ','               | "1,5,10"       |
| DATA_END             |              | false    |                                                   |                |
| ts                   | long         | true     | Response generation time point, unit: millisecond |                |

#### Request example

{

"contract_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"THETA-USD"

"available_level_rate":

"1,2,3,5,10,20,30,50,75"

}

\]

"ts":

1603870691811

}
