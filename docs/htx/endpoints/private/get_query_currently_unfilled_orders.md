# GET Query currently unfilled orders

**Source:**
[Query currently unfilled orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19127113268)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/open_orders (Query currently unfilled orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used to query the currently unfilled
pending orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                        | Value Range      | Default Value |
| ------------- | --------- | -------- | ---------------------------------- | ---------------- | ------------- |
| contract_code | string    | false    | Contract code, if empty, query all | "BTC-USDT"... ， |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                | Value Range |
| --------------- | --------- | -------- | -------------------------- | ----------- |
| tid             | String    | true     | request id                 |             |
| DATA_START      | array     | true     |                            |             |
| contract_code   | String    | true     | contract code              |             |
| price           | String    | false    |                            |             |
| volume          | String    | true     |                            |             |
| margin_mode     | String    | true     | isolated：，cross：        |             |
| position_side   | String    | true     | :long, :short              |             |
| order_direction | Integer   | true     | 1-buy,2-sell               |             |
| lever           | Integer   | true     | lever                      |             |
| avg_price       | String    | true     | average transaction price  |             |
| avg_volume      | String    | true     | The number of transactions |             |
| fee             | String    | true     | fee                        |             |
| DATA_START      |           | true     |                            |             |
| code            | long      | true     |                            |             |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/open_orders?contract_code=DOT-USDT"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"position_side":

"short"

"contract_code":

"DOT-USDT"

"order_direction":

"open"

"lever":

5

"margin_mode":

"isolated"

"volume":

"1.000000000000000000"

"price":

"11"

"avg_volume":

"0.000000000000000000"

"avg_price":

NULL

"fee":

"0"

}

1:{

"position_side":

"long"

"contract_code":

"DOT-USDT"

"order_direction":

"open"

"lever":

5

"margin_mode":

"isolated"

"volume":

"1.000000000000000000"

"price":

"8"

"avg_volume":

"0.000000000000000000"

"avg_price":

NULL

"fee":

"0"

}

2:{

"position_side":

"short"

"contract_code":

"DOT-USDT"

"order_direction":

"open"

"lever":

5

"margin_mode":

"cross"

"volume":

"1.000000000000000000"

"price":

"11"

"avg_volume":

"0.000000000000000000"

"avg_price":

NULL

"fee":

"0"

}

3:{

"position_side":

"long"

"contract_code":

"DOT-USDT"

"order_direction":

"open"

"lever":

5

"margin_mode":

"cross"

"volume":

"1.000000000000000000"

"price":

"8"

"avg_volume":

"0.000000000000000000"

"avg_price":

NULL

"fee":

"0"

}

\]

"tid":

"3edcabbedf3d4de596c840ca0b380f26"

"success":

true

}
