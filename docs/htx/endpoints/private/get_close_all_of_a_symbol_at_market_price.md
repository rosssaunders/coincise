# GET Close All of a Symbol at Market Price

**Source:** [Close All of a Symbol at Market Price](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1958953a715)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/position (Close All of a Symbol at Market Price)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Sell designated positions at market price.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol |  |  |
| margin\_mode | String | true | Margin mode | cross: Cross margin |  |
| position\_side | String | true | Position side | The side of your position. Under the buy/sell mode, "both" is default. Under the long/short mode, "long" refers to going long; "short" refers to going short. |  |
| client\_order\_id | String | false | Order ID you entered |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| client\_order\_id | String | false | Your order ID |  |

#### Request example

{

"contract\_code":

"BTC-USDT-241129"

"margin\_mode":

"cross"

"position\_side":

"long"

"client\_order\_id":

"1330969352647610368"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"client\_order\_id":

"1330969352647610368"

"order\_id":

1339200243479453700

}

"message":

"Success"

"ts":

1739331819194

}