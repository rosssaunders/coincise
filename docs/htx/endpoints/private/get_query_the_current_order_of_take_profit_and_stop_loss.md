# GET Query the current order of take profit and stop loss

**Source:**
[Query the current order of take profit and stop loss](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-191271a45ea)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/tpsl_open_orders (Query the current order of take profit and stop loss)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used to query the currently unfilled
take-profit and stop-loss orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                        | Value Range      | Default Value |
| ------------- | --------- | -------- | ---------------------------------- | ---------------- | ------------- |
| contract_code | string    | true     | Contract code, if empty, query all | "BTC-USDT"... ， |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description         | Value Range |
| --------------- | --------- | -------- | ------------------- | ----------- |
| tid             | String    | true     | request id          |             |
| DATA_START      | array     | true     |                     |             |
| contract_code   | String    | true     | contract code       |             |
| volume          | String    | true     |                     |             |
| margin_mode     | String    | true     | isolated：，cross： |             |
| position_side   | String    | true     | :long, :short       |             |
| trigger_type    | String    | true     | ge or le            |             |
| tpsl_order_type | String    | true     | sl or tp            |             |
| price           | String    | true     | trigger price       |             |
| DATA_START      |           | true     |                     |             |
| code            | Long      | true     |                     |             |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/tpsl_open_orders?contract_code=DOT-USDT"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"position_side":

"long"

"contract_code":

"DOT-USDT"

"margin_mode":

"isolated"

"volume":

"1"

"trigger_type":

"le"

"tpsl_order_type":

"tp"

"price":

"9.79902"

}

1:{

"position_side":

"long"

"contract_code":

"DOT-USDT"

"margin_mode":

"isolated"

"volume":

"1"

"trigger_type":

"ge"

"tpsl_order_type":

"sl"

"price":

"10.19898"

}

2:{

"position_side":

"short"

"contract_code":

"DOT-USDT"

"margin_mode":

"cross"

"volume":

"1"

"trigger_type":

"ge"

"tpsl_order_type":

"tp"

"price":

"10.2"

}

3:{

"position_side":

"short"

"contract_code":

"DOT-USDT"

"margin_mode":

"cross"

"volume":

"1"

"trigger_type":

"le"

"tpsl_order_type":

"sl"

"price":

"9.8"

}

\]

"tid":

"727a1da93a10450794bde074e25ed235"

"success":

true

}
