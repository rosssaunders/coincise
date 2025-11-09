# GET [Isolated] Get Information of an Order

**Source:**
[[Isolated] Get Information of an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85222-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_order_info (\[Isolated\] Get Information of an Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

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
| contract_code   | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT"                                   |             |               |

Notes:  
When getting information on order cancellation via get order Information
interface, users can only query last 2-hour data  
At least one of order_id and client_order_id must be filled in  
Both order_id and client_order_id can be used for order withdrawl，one of them
needed at one time，if both of them are set，the default will be order id. The
order completed( 5.partially fulfilled but cancelled by client; 6. Fully
fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate
on 00:00(GMT+8), 08:00(GMT+8) and 16:00(GMT+8).  
client_order_id，order status query is available for orders placed within 8
hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter              | Data Type | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string    | true     | Request Processing Result                                                                                         | "ok" , "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA_START             |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                 | string    | true     | symbol                                                                                                            | eg."BTC"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| contract_code          | string    | true     | Contract Code                                                                                                     | "BTC-USDT" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| volume                 | decimal   | true     | Numbers of order                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal   | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_price_type       | string    | true     | order price type                                                                                                  | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| order_type             | int       | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| direction              | string    | true     | Transaction direction                                                                                             | "buy":"sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| offset                 | string    | true     | "open": "close"                                                                                                   | "open", "close", "both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| lever_rate             | int       | true     | Leverage rate                                                                                                     | 1\\5\\10\\20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| order_id               | long      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string    | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| client_order_id        | long      | true     | Client order ID                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long      | true     | Creation time                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_at            | long      | true     | Canceled time                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal   | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal   | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee                    | decimal   | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_avg_price        | decimal   | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_frozen          | decimal   | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_asset           | string    | true     | margin asset                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| status                 | int       | true     | status                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling.                                                                                                                                                                                                                                                                                                                    |
| order_source           | string    | true     | Order source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| fee_asset              | string    | true     | the corresponding cryptocurrency to the given fee                                                                 | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| liquidation_type       | string    | true     | Liquidation type                                                                                                  | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| margin_mode            | string    | true     | margin mode                                                                                                       | isolated : "isolated"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| margin_account         | string    | true     | margin account                                                                                                    | "BTC-USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| is_tpsl                | int       | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| real_profit            | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| reduce_only            | int       | true     | reduce only                                                                                                       | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| fee_amount             | decimal   | true     | HTX fee amount                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_quote_amount       | decimal   | true     | fee_quote_amount                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_source        | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent     | int       | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |
| self_match_prevent_new | string    | true     | Prevent self-trading                                                                                              | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA_END               |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long      | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And in the other
orders created before that times, it is 0.

#### Request example

{

"order_id":

"456789321"

"client_order_id":

"456234321"

"contract_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"volume":

1

"price":

13059.8

"order_price_type":

"opponent"

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

10

"order_id":

770334322963152900

"client_order_id":

57012021045

"created_at":

1603703614712

"trade_volume":

1

"trade_turnover":

13.0598

"fee":

\-0.00522392

"trade_avg_price":

13059.8

"margin_frozen":

0

"profit":

0

"status":

6

"order_source":

"api"

"order_id_str":

"770334322963152896"

"fee_asset":

"USDT"

"liquidation_type":

"0"

"canceled_at":

0

"margin_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"is_tpsl":

0

"real_profit":

0

"reduce_only":

0

"fee_amount":

11

"fee_quote_amount":

11

"canceled_source":

"timeout-canceled-order"

"self_match_prevent_new":

"cancel_both"

}

\]

"ts":

1603703631815

}
