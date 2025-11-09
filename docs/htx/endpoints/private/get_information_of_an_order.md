# GET Information of an Order

**Source:** [Get Information of an Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a400-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_order\_info (Get Information of an Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

Notes:  
When getting information on order cancellation via get order Information interface, users can only query last 2-hour data.  
At least one of order\_id and client\_order\_id must be filled in  
Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id. The order completed( 5.partially fulfilled but cancelled by client; 6. Fully fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate on 04:00(GMT+8), 12:00(GMT+8) and 20:00(GMT+8).  
client\_order\_id，order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| data <list> |  | false |  |  |
| symbol | string | true | symbol | eg."BTC" |
| contract\_code | string | true | Contract Code | "BTC-USD" ... |
| volume | decimal | true | Numbers of order |  |
| price | decimal | true | Price committed |  |
| order\_price\_type | string | true | order price type | "limit", "opponent","post\_only" Position limit will be applied to post\_only while order limit will not. |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| direction | string | true | Transaction direction |  |
| offset | string | true | "open": "close" |  |
| lever\_rate | int | true | Leverage rate | 1\\5\\10\\20 |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| created\_at | long | true | Creation time |  |
| canceled\_at | long | true | Canceled time |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| fee | decimal | true | Service fee |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order\_source | string | true | Order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| liquidation\_type | string | true | Liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| LIST\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

{

"contract\_code":

"BTC-USD"

"order\_price\_type":

"limit"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"volume":

1

"price":

0.6

"order\_price\_type":

"post\_only"

"order\_type":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

20

"order\_id":

771043577949732900

"client\_order\_id":

NULL

"created\_at":

1603872714279

"trade\_volume":

0

"trade\_turnover":

0

"fee":

0

"trade\_avg\_price":

NULL

"margin\_frozen":

0.8333333333333334

"profit":

0

"status":

3

"order\_source":

"api"

"order\_id\_str":

"771043577949732864"

"fee\_asset":

"THETA"

"liquidation\_type":

"0"

"canceled\_at":

0

"real\_profit":

0

"canceled\_source":

"timeout-canceled-order"

"is\_tpsl":

0

}

\]

"ts":

1603872729321

}