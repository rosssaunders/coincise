# GET Switch Leverage

**Source:** [Switch Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a32f-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_switch\_lever\_rate (Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | “BTC-USD” |  |
| lever\_rate | int | true | Leverage to switch.\[Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time.\] |  |  |

Notes:  
Only if a user has positions of a single token and has no open orders, the leverage is available to be switched flexibly.  
The interface limits the number of requests to 1 time per 3 seconds.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status: ok,error |  |
| DATA\_START | object | false |  |  |
| contract\_code | string | false | contract code |  |
| lever\_rate | int | false | Switched leverage |  |
| DATA\_END |  | false |  |  |
| err\_code | int | false | error code |  |
| err\_msg | string | false | error msg |  |
| ts | long | true | Timestamp |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"order\_id":

"12345678"

}

#### Response Example

##### Success Example

`正确： { "status": "ok", "data": { "contract_code": "theta-usd", "lever_rate": 10 }, "ts": 1603872234454 } 错误： { "status": "error", "err_code": 1037, "err_msg": "The leverage is invalid. Please contact the customer service.", "ts": 1603872583224 }`