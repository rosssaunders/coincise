# GET Switch Leverage

**Source:**
[Switch Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a32f-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_switch_lever_rate (Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                        | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | contract code                                                                                                                      | “BTC-USD”   |               |
| lever_rate    | int       | true     | Leverage to switch.\[Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time.\] |             |               |

Notes:  
Only if a user has positions of a single token and has no open orders, the
leverage is available to be switched flexibly.  
The interface limits the number of requests to 1 time per 3 seconds.

#### Response Parameter

| Parameter     | Data Type | Required | Description       | Value Range |
| ------------- | --------- | -------- | ----------------- | ----------- |
| status        | string    | true     | status: ok,error  |             |
| DATA_START    | object    | false    |                   |             |
| contract_code | string    | false    | contract code     |             |
| lever_rate    | int       | false    | Switched leverage |             |
| DATA_END      |           | false    |                   |             |
| err_code      | int       | false    | error code        |             |
| err_msg       | string    | false    | error msg         |             |
| ts            | long      | true     | Timestamp         |             |

#### Request example

{

"contract_code":

"BTC-USD"

"order_id":

"12345678"

}

#### Response Example

##### Success Example

`正确： { "status": "ok", "data": { "contract_code": "theta-usd", "lever_rate": 10 }, "ts": 1603872234454 } 错误： { "status": "error", "err_code": 1037, "err_msg": "The leverage is invalid. Please contact the customer service.", "ts": 1603872583224 }`
