# GET Query history orders via multiple fields(New)

**Source:** [Query history orders via multiple fields(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51aa7d-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap\_hisorders\_exact (Query history orders via multiple fields(New))

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
| start\_time | long | false |  | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order | (now) – 48h |
| end\_time | long | false |  | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| contract | string | true | contract code |  | "BTC-USD" ... |
| trade\_type | int | true | trading type |  | 0:all,1: buy long,2: sell short,3: buy short,4: sell long,5: sell liquidation,6: buy liquidation,7:Delivery long,8: Delivery short 11:reduce positions to close long，12:reduce positions to close short |
| type | int | true | Type |  | 1:All Orders,2:Order in Finished Status |
| status | string | true | Order Status |  | support multiple query seperated by ',',such as '3,4,5','0': all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |
| price\_type | string | false | order price types |  | "limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order. "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USDT"... |
| lever\_rate | int | true | Leverage Rate |  |
| direction | string | true | Transaction direction | 【buy : sell】 |
| offset | string | true | offset direction | 【open : close】 |
| volume | decimal | true | Number of Order |  |
| price | decimal | true | Price committed |  |
| create\_date | long | true | Creation time |  |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price types | "limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order. "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_frozen | decimal | true | Frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| fee | decimal | true | Service fee |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| status | int | true | order status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | （"BTC","ETH"...） |
| liquidation\_type | string | true | liquidation type | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| DATA\_END |  | false |  |  |

Notes:  
All via API interface submited price limit orders that had been cancelled will only be kept for 2 hours.

#### Request example

`curl "https://api.hbdm.com/swap-api/v3/swap_liquidation_orders?contract=BTC-USD&period=1day&start_time=1670987797000&end_time=1671074197330&direct=next&from_id=1&trade_type=5"`

#### Response Example

##### Success Example

{

"code":

200

"msg":

""

"data":\[

0:{

"query\_id":

111000

"order\_id":

770434885714452500

"contract\_code":

"THETA-USD"

"symbol":

"THETA"

"lever\_rate":

20

"direction":

"buy"

"offset":

"close"

"volume":

10

"price":

0.66

"create\_date":

1603727590740

"order\_source":

"android"

"order\_price\_type":

"post\_only"

"order\_type":

1

"margin\_frozen":

0

"profit":

1.0803950690222015

"trade\_volume":

10

"trade\_turnover":

100

"fee":

\-0.030303030303030304

"trade\_avg\_price":

0.66

"status":

6

"order\_id\_str":

"770434885714452480"

"fee\_asset":

"THETA"

"liquidation\_type":

"0"

"is\_tpsl":

0

"real\_profit":

0

"canceled\_source":

"timeout-canceled-order"

}

\]

"ts":

1604312615051

}