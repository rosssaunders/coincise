# GET Place leading tpsl order

**Source:**
[Place leading tpsl order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126ecf98a)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/tpsl_order (Place leading tpsl order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used by traders to set stop-profit and
stop-loss for open positions with orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                                                                              | Value Range | Default Value |
| ---------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| sub_position_id  | String    | true     | copy position ID                                                                                                                                         |             |               |
| tp_trigger_price | String    | false    | Take-profit trigger price. Take-profit order price will be the market price after triggering. At least one of tpTriggerPx and slTriggerPx must be filled |             |               |
| sl_trigger_price | String    | false    | Stop-loss trigger price. Stop-loss order price will be the market price after triggering.At least one of tpTriggerPx and slTriggerPx must be filled      |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |
| tid       | String    | true     | request id  |             |
| data      | boolean   | true     |             |             |
| code      | Long      | true     |             |             |

#### Request example

{

"sub_position_id":

"249867"

"tp_trigger_price":

3

"sl_trigger_price":

3

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"52f72d8f88ea4e50a0f0b915346472ec"

"success":

true

}
