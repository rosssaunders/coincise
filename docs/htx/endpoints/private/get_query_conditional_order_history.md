# GET Query conditional order history

**Source:**
[Query conditional order history](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50dcf-7773-11ed-9966-0242ac110003)

**Category:** Conditional Order

## Authentication

Required (Private Endpoint)

### /v2/algo-orders/history (Query conditional order history)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: Search by orderOrigTime This endpoint only returns those
conditional orders which have been cancelled before triggering
(orderStatus=canceled), or which have failed to trigger (orderStatus=rejected),
or which have successfully triggered (orderStatus=triggered). To further query
the latest status of a successfully triggered conditonal order, please refer to
the endpoints in "Trading" section. The cancelled conditional order before
triggering, as well as the conditional order failed to trigger, can be queried
out through this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter   | Data Type | Required | Description                                                       | Value Range                 | Default Value |
| ----------- | --------- | -------- | ----------------------------------------------------------------- | --------------------------- | ------------- |
| accountId   | integer   | false    | Account ID                                                        |                             |               |
| symbol      | string    | false    | Trading symbol                                                    |                             |               |
| orderSide   | string    | false    | Order side                                                        | buy,sell                    |               |
| orderType   | string    | false    | Order type                                                        | limit,market                |               |
| orderStatus | string    | false    | Order status                                                      | canceled,rejected,triggered |               |
| startTime   | long      | false    | Farthest time                                                     |                             | current time  |
| endTime     | long      | false    | Nearest time                                                      |                             | desc          |
| sort        | string    | false    | Sorting order                                                     | asc, desc                   | 100           |
| limit       | integer   | false    | Maximum number of items in one page                               | \[1-500\]                   |               |
| fromId      | long      | false    | First record ID in this query (only valid for next page querying) |                             |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                             | Value Range |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------- | ----------- |
| code            | integer   | false    | Status code                                                                             |             |
| message         | string    | false    | Error message (if any)                                                                  |             |
| DATA_START      | object    | false    | In ascening/descending order defined in 'sort'                                          |             |
| accountId       | integer   | false    | Account ID                                                                              |             |
| source          | string    | false    | Order source                                                                            |             |
| clientOrderId   | string    | false    | Client order ID                                                                         |             |
| orderId         | string    | false    | Order ID (only valid for orderStatus=triggered)                                         |             |
| symbol          | string    | false    | Trading symbol                                                                          |             |
| orderPrice      | string    | false    | Order price (invalid for market order)                                                  |             |
| orderSize       | string    | false    | Order size (invalid for market buy order)                                               |             |
| orderValue      | string    | false    | Order value (only valid for market buy order)                                           |             |
| orderSide       | string    | false    | Order side                                                                              |             |
| timeInForce     | string    | false    | Time in force                                                                           |             |
| orderType       | string    | false    | Order type                                                                              |             |
| stopPrice       | string    | false    | Stop price                                                                              |             |
| trailingRate    | string    | false    | Trailing rate (only valid for trailing stop order)                                      |             |
| orderOrigTime   | long      | false    | Order original time                                                                     |             |
| lastActTime     | long      | false    | Order last activity time                                                                |             |
| orderCreateTime | long      | false    | Order trigger time (only valid for orderStatus=triggered)                               |             |
| orderStatus     | string    | false    | Order status (triggered,canceled,rejected)                                              |             |
| errCode         | integer   | false    | Status code in case of order triggering failure (only valid for orderStatus=rejected)   |             |
| errMessage      | string    | false    | Error message in case of order triggering failure (only valid for orderStatus=rejected) |             |
| DATA_END        |           | false    |                                                                                         |             |
| nextId          | long      | false    | First record ID in next page (only valid if exceeded page size)                         |             |

#### Request example

`curl"https://api.huobi.pro/v2/algo-orders/history?accountId=xxxx&symbol=xxxx&orderSide=xxx&orderType=limite&orderStatus=canceled"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"orderOrigTime":

1630656758442

"lastActTime":

1630656880512

"symbol":

"adausdt"

"source":

"api"

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

"orderStatus":

"canceled"

}

\]

"nextId":

9585084

}
