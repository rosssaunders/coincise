# GET Adjust margin for isolated positions

**Source:**
[Adjust margin for isolated positions](https://www.htx.com/en-us/opend/newApiPages/?id=10000076-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/fix_position_margin_change (Adjust margin for isolated positions)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: It is used to increase or decrease the margin of isolated
positions. Through "/linear-swap-api/v3/unified_account_info", you can query the
margin that can be increased or decreased for corresponding isolated positions.
The margin value that can be increased is determined through the
"margin_available" field, and the margin value that can be reduced is confirmed
through the "withdraw_available" field..

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                 | Value Range                                           | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| amount        | Double    | true     | Adjustment amount                                                           |                                                       |               |
| asset         | String    | true     | Currency                                                                    | USDT                                                  |               |
| contract_code | String    | true     | Contract code                                                               | "BTC-USDT","ETH-USDT"……                               |               |
| type          | int       | true     | Adjustment direction 1: increase isolated margin, 2: reduce isolated margin | 1: Increase isolated margin;2: Reduce isolated margin |               |
| direction     | int       | true     | Position direction                                                          | 1: buy;2: sell                                        |               |
| clientOrderId | Long      | false    | Client order ID                                                             |                                                       |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                 | Value Range                                           |
| --------------- | --------- | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------- |
| code            | int       | true     | Status code                                                                 |                                                       |
| msg             | string    | true     | Result description                                                          |                                                       |
| ts              | long      | true     | Timestamp                                                                   |                                                       |
| DATA_START      |           | true     |                                                                             |                                                       |
| amount          | Double    | true     | Adjustment amount                                                           |                                                       |
| asset           | String    | true     | Currency                                                                    | USDT                                                  |
| contract_code   | String    | true     | Contract code                                                               | "BTC-USDT","ETH-USDT"……                               |
| type            | int       | true     | Adjustment direction 1: increase isolated margin, 2: reduce isolated margin | 1: Increase isolated margin;2: Reduce isolated margin |
| direction       | int       | true     | Position direction                                                          | 1: buy;2: sell                                        |
| order_id        | string    | true     | Adjust Margin Order ID                                                      |                                                       |
| client_order_id | long      | true     | Customer-defined order ID                                                   |                                                       |
| DATA_END        |           | false    |                                                                             |                                                       |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":{

"order_id":

"1051945088512643072"

"client_order_id":

NULL

}

"ts":

1670844857777

}
