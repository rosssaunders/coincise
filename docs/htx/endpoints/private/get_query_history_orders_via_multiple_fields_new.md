# GET Query history orders via multiple fields(New)

**Source:**
[Query history orders via multiple fields(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51aa7d-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap_hisorders_exact (Query history orders via multiple fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                   | Default Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time | long      | false    |                                                                                                                                                                                          | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order | (now) – 48h                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| end_time   | long      | false    |                                                                                                                                                                                          | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order            | now                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev                                                                                                                                                                                    | next                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| contract   | string    | true     | contract code                                                                                                                                                                            |                                                                                                                                                                                                               | "BTC-USD" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| trade_type | int       | true     | trading type                                                                                                                                                                             |                                                                                                                                                                                                               | 0:all,1: buy long,2: sell short,3: buy short,4: sell long,5: sell liquidation,6: buy liquidation,7:Delivery long,8: Delivery short 11:reduce positions to close long，12:reduce positions to close short                                                                                                                                                                                                                                                                                                                               |
| type       | int       | true     | Type                                                                                                                                                                                     |                                                                                                                                                                                                               | 1:All Orders,2:Order in Finished Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| status     | string    | true     | Order Status                                                                                                                                                                             |                                                                                                                                                                                                               | support multiple query seperated by ',',such as '3,4,5','0': all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled;                                                                                                                                                                                                                                                                                                                |
| price_type | string    | false    | order price types                                                                                                                                                                        |                                                                                                                                                                                                               | "limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order. "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |

#### Response Parameter

| Parameter          | Data Type    | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code               | int          | true     | State code                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| msg                | string       | true     | The code description                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ts                 | long         | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| DATA_START         | object array | true     |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| query_id           | long         | true     | Query id, which can be used as the from_id field for the next query request.                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| order_id           | long         | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| order_id_str       | string       | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| symbol             | string       | true     | Variety code                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| contract_code      | string       | true     | Contract Code                                                                                                     | "BTC-USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| lever_rate         | int          | true     | Leverage Rate                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| direction          | string       | true     | Transaction direction                                                                                             | 【buy : sell】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| offset             | string       | true     | offset direction                                                                                                  | 【open : close】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| volume             | decimal      | true     | Number of Order                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| price              | decimal      | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| create_date        | long         | true     | Creation time                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| order_source       | string       | true     | Order Source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| order_price_type   | string       | true     | order price types                                                                                                 | "limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order. "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| margin_frozen      | decimal      | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| profit             | decimal      | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| trade_volume       | decimal      | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| trade_turnover     | decimal      | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| fee                | decimal      | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| trade_avg_price    | decimal      | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status             | int          | true     | order status                                                                                                      | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling.                                                                                                                                                                                                                                                                                            |
| order_type         | int          | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| fee_asset          | string       | true     | the corresponding cryptocurrency to the given fee                                                                 | （"BTC","ETH"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| liquidation_type   | string       | true     | liquidation type                                                                                                  | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| is_tpsl            | int          | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| real_profit        | decimal      | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| canceled_source    | string       | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| self_match_prevent | int          | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                           |
| DATA_END           |              | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

Notes:  
All via API interface submited price limit orders that had been cancelled will
only be kept for 2 hours.

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

"query_id":

111000

"order_id":

770434885714452500

"contract_code":

"THETA-USD"

"symbol":

"THETA"

"lever_rate":

20

"direction":

"buy"

"offset":

"close"

"volume":

10

"price":

0.66

"create_date":

1603727590740

"order_source":

"android"

"order_price_type":

"post_only"

"order_type":

1

"margin_frozen":

0

"profit":

1.0803950690222015

"trade_volume":

10

"trade_turnover":

100

"fee":

\-0.030303030303030304

"trade_avg_price":

0.66

"status":

6

"order_id_str":

"770434885714452480"

"fee_asset":

"THETA"

"liquidation_type":

"0"

"is_tpsl":

0

"real_profit":

0

"canceled_source":

"timeout-canceled-order"

}

\]

"ts":

1604312615051

}
