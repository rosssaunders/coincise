# GET Place a conditional order

**Source:** [Place a conditional order](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50918-7773-11ed-9966-0242ac110003)

**Category:** Conditional Order

## Authentication

Required (Private Endpoint)

### /v2/algo-orders (Place a conditional order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 20times/2sec

Interface description: Conditional order can be only placed via this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | integer | false | Account ID | At present only support spot account id, margin account id, super-margin account. C2C margin account id is not supported at this point of time. |  |
| symbol | string | false | Trading symbol |  |  |
| orderPrice | string | false | Order price (invalid for market order) |  |  |
| orderSide | string | false | Order side | buy,sell |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |  |
| timeInForce | string | false | Time in force | gtc (invalid for orderType=market), boc (invalid for orderType=market), ioc, fok (invalid for orderType=market) | gtc for orderType=limit; ioc for orderType=market |
| orderType | string | false | Order type | limit,market |  |
| clientOrderId | string | false | Client order ID (max length 64-char) |  |  |
| stopPrice | string | false | Stop price |  |  |
| trailingRate | string | false | Trailing rate (only valid for trailing stop order) | \[0.001-0.050\] |  |

Notes:  
• The gap between orderPrice and stopPrice shouldn't exceed the price limit ratio. For example, a limit buy order's price couldn't be higher than 110% of market price, this limitation should be also applicable to orderPrice/stopPrice ratio.  
• User has to make sure the clientOrderId's uniqueness. While the conditional order being triggered, if the clientOrderId is duplicated with another order (within 24hour) coming from same user, the conditional order will fail triggering.  
• User has to make sure the corresponding account has sufficient fund for triggering this conditional order, otherwise it would cause conditional order triggering failure.  
• timeInForce enum values: gtc - good till cancel，boc - book or cancel (also called as post only, or book only), ioc - immediate or cancel, fok - fill or kill  

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| clientOrderId | string | false | Client order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"accountId":

178211

"symbol":

"178211"

"orderPrice":

"178211"

"orderSide":

"178211"

"orderSize":

"178211"

"orderValue":

"178211"

"timeInForce":

"178211"

"orderType":

"178211"

"clientOrderId":

"178211"

"stopPrice":

"178211"

"trailingRate":

"178211"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"clientOrderId":

"a001"

}

}