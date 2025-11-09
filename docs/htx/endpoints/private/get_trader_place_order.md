# GET Trader place order

**Source:**
[Trader place order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126a06eab)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/place_order (Trader place order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used by traders to place orders

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                              | Value Range | Default Value |
| ---------------- | --------- | -------- | ---------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code    | String    | true     | contract code                                                                            |             |               |
| price            | String    | false    |                                                                                          |             |               |
| amount           | String    | true     |                                                                                          |             |               |
| margin_mode      | String    | true     | isolated：，cross：                                                                      |             |               |
| order_price_type | Integer   | true     | 1:limit、 2:opponent、6:optimal_20、8:fok、13:opponent_fok、16:optimal_20_fok、17:market |             |               |
| order_direction  | Integer   | true     | 1-buy,2-sell                                                                             |             |               |
| lever            | Integer   | true     |                                                                                          |             |               |
| tp_trigger_price | String    | false    |                                                                                          |             |               |
| sl_trigger_price | String    | false    |                                                                                          |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description         | Value Range    |
| --------- | --------- | -------- | ------------------- | -------------- |
| tid       | String    | true     | request id          |                |
| data      | Boolean   | true     | Transaction results | true ,or false |
| code      | long      | true     |                     |                |

#### Request example

{

"contract_code":

"DOT-USDT"

"price":

8

"amount":

1

"margin_mode":

"cross"

"order_price_type":

1

"order_direction":

2

"lever":

5

"tp_trigger_price":

10

"sl_trigger_price":

10

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"9d94488290b1468d9d79b98c12898ca3"

"success":

true

}
