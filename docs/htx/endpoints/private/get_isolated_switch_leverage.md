# GET [Isolated] Switch Leverage

**Source:**
[[Isolated] Switch Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb84ff2-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_switch_lever_rate (\[Isolated\] Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds.

Interface description: This interface only supports isolated margin mode. Only
if a user has positions of a single token and has no open orders, the leverage
is available to be switched flexibly. The interface limits the number of
requests to 1 time per 3 seconds.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                | Value Range   | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| contract_code | string    | true     | contract code                                                                                              | "BTC-USDT"... |               |
| lever_rate    | int       | true     | The leverage multiple to be switched; high leverage has a high risk factor, so please use it with caution. |               |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description       | Value Range           |
| ------------- | --------- | -------- | ----------------- | --------------------- |
| status        | string    | true     | status: ok,error  |                       |
| DATA_START    | object    | false    |                   |                       |
| contract_code | string    | false    | contract code     | "BTC-USDT"...         |
| margin_mode   | string    | false    | margin mode       | isolated : "isolated" |
| lever_rate    | int       | false    | Switched leverage |                       |
| DATA_END      |           | false    |                   |                       |
| err_code      | int       | false    | error code        |                       |
| err_msg       | string    | false    | error msg         |                       |
| ts            | long      | true     | Timestamp         |                       |

#### Request example

{

"contract_code":

"BTC-USDT"

"lever_rate":

20

}

#### Response Example

##### Success Example

`正确： { "status": "ok", "data": { "contract_code": "btc-usdt", "margin_mode": "isolated", "lever_rate": 10 }, "ts": 1603699417036 } 错误： { "status": "error", "err_code": 1045, "err_msg": "Unable to switch leverage due to current holdings or open orders.", "ts": 1603701654205 }`
