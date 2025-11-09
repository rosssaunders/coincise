# GET [Cross] Get Information of order

**Source:** [[Cross] Get Information of order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85379-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_order\_info (\[Cross\] Get Information of order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |

Notes:  
When getting information on order cancellation via get order Information interface, users can only query last 2-hour data  
Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id. The order completed( 5.partially fulfilled but cancelled by client; 6. Fully fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate on 00:00(GMT+8), 08:00(GMT+8) and 16:00(GMT+8).  
client\_order\_id，order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code |  |
| margin\_mode | string | true | margin mode |  |
| margin\_account | string | true | margin account |  |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | direction |  |
| offset | string | true | offset |  |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| created\_at | long | true | created time |  |
| trade\_volume | decimal | true | trade quantity |  |
| trade\_turnover | decimal | true | trade amount |  |
| fee | decimal | true | service fee |  |
| trade\_avg\_price | decimal | true | trade average price |  |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |  |
| canceled\_at | long | true | canceled time |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| fee\_amount | decimal | true | HTX fee amount |  |
| fee\_quote\_amount | decimal | true | fee\_quote\_amount |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

{

"order\_id":

"456789321"

"client\_order\_id":

"456234321"

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

}

#### Response Example

##### Success Example

`{ "status": "ok", "data": [{ "symbol": "BTC", "contract_code": "BTC-USDT", "volume": 1, "price": 13059.8, "order_price_type": "opponent", "order_type": 1, "direction": "sell", "offset": "open", "lever_rate": 10, "order_id": 770334322963152900, "client_order_id": 57012021045, "created_at": 1603703614712, "trade_volume": 1, "trade_turnover": 13.0598, "fee": -0.00522392, "trade_avg_price": 13059.8, "margin_frozen": 0, "profit": 0, "status": 6, "order_source": "api", "order_id_str": "770334322963152896", "fee_asset": "USDT", "liquidation_type": "0", "canceled_at": 0, "margin_asset": "USDT", "margin_mode": "isolated", "margin_account": "BTC-USDT", "is_tpsl": 0, "real_profit": 0, "reduce_only": 0, "fee_amount": 11, "fee_quote_amount": 11, "canceled_source": "timeout-canceled-order", /linear-swap-api/v1/swap_cross_order_info }], "ts": 1603703631815 }`