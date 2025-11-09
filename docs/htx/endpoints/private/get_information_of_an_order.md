# GET Information of an Order

**Source:**
[Get Information of an Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a400-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_order_info (Get Information of an Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                                  | Value Range | Default Value |
| --------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ | ----------- | ------------- |
| order_id        | string    | false    | Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time）                |             |               |
| client_order_id | string    | false    | Client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |             |               |
| contract_code   | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD"                                    |             |               |

Notes:  
When getting information on order cancellation via get order Information
interface, users can only query last 2-hour data.  
At least one of order_id and client_order_id must be filled in  
Both order_id and client_order_id can be used for order withdrawl，one of them
needed at one time，if both of them are set，the default will be order id. The
order completed( 5.partially fulfilled but cancelled by client; 6. Fully
fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate
on 04:00(GMT+8), 12:00(GMT+8) and 20:00(GMT+8).  
client_order_id，order status query is available for orders placed within 8
hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                   |
| ------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | string    | true     | Request Processing Result                                                                                         | "ok" , "error"                                                                                                                                                                                                                                                |
| data <list>        |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                               |
| symbol             | string    | true     | symbol                                                                                                            | eg."BTC"                                                                                                                                                                                                                                                      |
| contract_code      | string    | true     | Contract Code                                                                                                     | "BTC-USD" ...                                                                                                                                                                                                                                                 |
| volume             | decimal   | true     | Numbers of order                                                                                                  |                                                                                                                                                                                                                                                               |
| price              | decimal   | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                                               |
| order_price_type   | string    | true     | order price type                                                                                                  | "limit", "opponent","post_only" Position limit will be applied to post_only while order limit will not.                                                                                                                                                       |
| order_type         | int       | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                           |
| direction          | string    | true     | Transaction direction                                                                                             |                                                                                                                                                                                                                                                               |
| offset             | string    | true     | "open": "close"                                                                                                   |                                                                                                                                                                                                                                                               |
| lever_rate         | int       | true     | Leverage rate                                                                                                     | 1\\5\\10\\20                                                                                                                                                                                                                                                  |
| order_id           | long      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                               |
| order_id_str       | string    | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                               |
| client_order_id    | long      | true     | Client order ID                                                                                                   |                                                                                                                                                                                                                                                               |
| created_at         | long      | true     | Creation time                                                                                                     |                                                                                                                                                                                                                                                               |
| canceled_at        | long      | true     | Canceled time                                                                                                     |                                                                                                                                                                                                                                                               |
| trade_volume       | decimal   | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                                               |
| trade_turnover     | decimal   | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                                               |
| fee                | decimal   | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                                               |
| trade_avg_price    | decimal   | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                                               |
| margin_frozen      | decimal   | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                                               |
| profit             | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                               |
| status             | int       | true     | status                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order_source       | string    | true     | Order source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                         |
| fee_asset          | string    | true     | the corresponding cryptocurrency to the given fee                                                                 | "BTC","ETH"...                                                                                                                                                                                                                                                |
| liquidation_type   | string    | true     | Liquidation type                                                                                                  | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated                                                                                                                                                                          |
| is_tpsl            | int       | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                 |
| real_profit        | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                               |
| canceled_source    | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                                               |
| self_match_prevent | int       | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                  |
| LIST_END           |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                               |
| ts                 | long      | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                                               |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And in the other
orders created before that times, it is 0.

#### Request example

{

"contract_code":

"BTC-USD"

"order_price_type":

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

"contract_code":

"THETA-USD"

"volume":

1

"price":

0.6

"order_price_type":

"post_only"

"order_type":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

20

"order_id":

771043577949732900

"client_order_id":

NULL

"created_at":

1603872714279

"trade_volume":

0

"trade_turnover":

0

"fee":

0

"trade_avg_price":

NULL

"margin_frozen":

0.8333333333333334

"profit":

0

"status":

3

"order_source":

"api"

"order_id_str":

"771043577949732864"

"fee_asset":

"THETA"

"liquidation_type":

"0"

"canceled_at":

0

"real_profit":

0

"canceled_source":

"timeout-canceled-order"

"is_tpsl":

0

}

\]

"ts":

1603872729321

}
