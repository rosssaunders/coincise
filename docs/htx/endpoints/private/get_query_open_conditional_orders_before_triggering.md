# GET Query open conditional orders (before triggering)

**Source:** [Query open conditional orders (before triggering)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec51082-7773-11ed-9966-0242ac110003)

**Category:** Conditional Order

## Authentication

Required (Private Endpoint)

### /v2/algo-orders/opening ( Query open conditional orders (before triggering))

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: Search by orderOrigTime This endpoint only returns those conditional orders which have not triggered with orderStatus value as created. Before a conditional order triggering, it can be queried out through this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | integer | false | Account ID |  |  |
| symbol | string | false | Trading symbol |  |  |
| orderSide | string | false | Order side | buy,sell |  |
| orderType | string | false | Order type | limit,market |  |
| sort | string | false | Sorting order | asc, desc | desc |
| limit | integer | false | Maximum number of items in one page | \[1,500\] | 100 |
| fromId | long | false | First record ID in this query (only valid for next page querying) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | In ascening/descending order defined in 'sort' |  |
| accountId | integer | false | Account ID |  |
| source | string | false | Order source (api,web,ios,android,mac,windows,sys) |  |
| clientOrderId | string | false | Client order ID |  |
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
| orderStatus | string | false | Order status (created) |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/algo-orders/opening?accountId=xxx&symbol=xxxx&orderSide=xxx&orderType=xxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"lastActTime":

1630657250326

"orderOrigTime":

1630657250238

"symbol":

"adausdt"

"source":

"api"

"clientOrderId":

"123"

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

"created"

}

1:{

"lastActTime":

1630657243576

"orderOrigTime":

1630657243534

"symbol":

"adausdt"

"source":

"api"

"clientOrderId":

"12"

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

"created"

}

\]

}