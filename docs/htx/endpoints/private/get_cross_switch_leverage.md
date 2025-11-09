# GET [Cross] Switch Leverage

**Source:**
[[Cross] Switch Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb850d7-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_switch_lever_rate (\[Cross\] Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds.

Interface description: The interface only supports cross margin mode. Only if a
user has positions of a single token and has no open orders, the leverage is
available to be switched flexibly. The interface limits the number of requests
to 1 time per 3 seconds. The request parameter "contract_code" supports the
contract code of futures, in that the format is BTC-USDT-210625. one of
(pair+contract_type) and contract_code must be filled in(if all of them not
filled in, will get 1014 error code); and all filled in, the contract_code is
the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                                                                              | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                                                                       | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                                                              | swap, this_week, next_week, quarter, next_quarter   |               |
| lever_rate    | int       | true     | The leverage multiple to be switched; high leverage has a high risk factor, so please use it with caution. |                                                     |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description       | Value Range                                         |
| ------------- | --------- | -------- | ----------------- | --------------------------------------------------- |
| status        | string    | true     | ok/error          |                                                     |
| DATA_START    | object    | false    |                   |                                                     |
| contract_code | string    | false    | contract code     | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode   | string    | false    | margin mode       | cross: cross margin mode                            |
| lever_rate    | int       | false    | switched leverage |                                                     |
| contract_type | string    | true     | contract type     | swap, this_week, next_week, quarter, next_quarter   |
| pair          | string    | true     | pair              | such as: “BTC-USDT”                                 |
| business_type | string    | true     | business type     | futures, swap                                       |
| DATA_END      |           | false    |                   |                                                     |
| err-code      | int       | false    | error code        |                                                     |
| err-msg       | string    | false    | error message     |                                                     |
| ts            | long      | true     | timestamp         |                                                     |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

"lever_rate":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"contract_type":

"swap"

"pair":

"BTC-USDT"

"business_type":

"swap"

"contract_code":

"BTC-USDT"

"lever_rate":

2

"margin_mode":

"cross"

}

"ts":

1639099382678

}
