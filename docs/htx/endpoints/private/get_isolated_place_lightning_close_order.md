# GET [Isolated] Place Lightning Close Order

**Source:** [[Isolated] Place Lightning Close Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86944-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_lightning\_close\_position (\[Isolated\] Place Lightning Close Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode..By default, the maximum liquidable amount of the current position is used to place a lightning closing order.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| direction | string | true | “buy”:Open，“sell”:Close |  |  |
| client\_order\_id | long | false | Client needs to provide unique API and have to maintain the API themselves afterwards. | \[1, 9223372036854775807\] |  |
| order\_price\_type | string | false | order price type | "market" by default."market": market Order type," "lightning\_fok": lightning FOK type,"lightning\_ioc": lightning IOC type |  |

Notes:  
Lightning Close Position，is order with rival price and optimal 30 grades. And the unsettled part will be automatically converted into a limited price order.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" :Order placed successfully, "error"：Order failed |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  | Dictionary |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | false | user’s own order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"order\_price\_type":

"lightning"

"direction":

"buy"

"client\_order\_id":

1010222

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

9861634

"order\_id\_str":

"9861634"

"client\_order\_id":

9086

}

"ts":

158797866555

}