# GET Query a specific conditional order

**Source:** [Query a specific conditional order](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5121b-7773-11ed-9966-0242ac110003)

**Category:** Conditional Order

## Authentication

Required (Private Endpoint)

### /v2/algo-orders/specific ( Query a specific conditional order)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: Search by orderOrigTime To further query the latest status of a successfully triggered conditonal order, please refer to the endpoints in "Trading" section. The conditional order before triggering, as well as the conditional order failed to trigger, can be queried out through this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| clientOrderId | string | false | Client order ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| accountId | integer | false | Account ID |  |
| source | string | false | Order source |  |
| clientOrderId | string | false | Client order ID |  |
| orderId | string | false | Order ID (only valid for orderStatus=triggered) |  |
| symbol | string | false | Trading symbol |  |
| orderPrice | string | false | Order price (invalid for market order) |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |
| orderSide | string | false | Order side |  |
| timeInForce | string | false | Time in force |  |
| orderType | string | false | Order type |  |
| stopPrice | string | false | Stop price |  |
| trailingRate | string | false | Trailing rate (only valid for trailing stop order) |  |
| orderOrigTime | long | false | Order original time |  |
| lastActTime | long | false | Order last activity time |  |
| orderCreateTime | long | false | Order trigger time (only valid for orderStatus=triggered) |  |
| orderStatus | string | false | Order status (created,triggered,canceled,rejected) |  |
| errCode | integer | false | Status code in case of order triggering failure (only valid for orderStatus=rejected) |  |
| errMessage | string | false | Error message in case of order triggering failure (only valid for orderStatus=rejected) |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/algo-orders/specific?clientOrderId=xxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"lastActTime":

1630656880512

"orderOrigTime":

1630656758442

"symbol":

"adausdt"

"source":

"api"

"orderStatus":

"canceled"

"clientOrderId":

"1234567"

"orderSide":

"buy"

"orderType":

"limit"

"orderPrice":

"0.1"

"orderSize":

"100"

"accountId":

13496526

"timeInForce":

"gtc"

"stopPrice":

"0.1"

}

}