# GET History Orders(New)

**Source:**
[Get History Orders(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a7ee-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap_hisorders (Get History Orders(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                   | Default Value                                                                                                                                                                                                           |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time | long      | false    |                                                                                                                                                                                          | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order | (now) – 48h                                                                                                                                                                                                             |
| end_time   | long      | false    |                                                                                                                                                                                          | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order            | now                                                                                                                                                                                                                     |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev                                                                                                                                                                                    | next                                                                                                                                                                                                                    |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with                                                                                                                                                                                 |                                                                                                                                                                                                                         |
| contract   | string    | true     | contract code                                                                                                                                                                            |                                                                                                                                                                                                               | "BTC-USD" ...                                                                                                                                                                                                           |
| trade_type | int       | true     | trading type                                                                                                                                                                             |                                                                                                                                                                                                               | 0:all,1: buy long,2: sell short,3: buy short,4: sell long,5: sell liquidation,6: buy liquidation,7:Delivery long,8: Delivery short 11:reduce positions to close long，12:reduce positions to close short                |
| type       | int       | true     | Type                                                                                                                                                                                     |                                                                                                                                                                                                               | 1:All Orders,2:Order in Finished Status                                                                                                                                                                                 |
| status     | string    | true     | Order Status                                                                                                                                                                             |                                                                                                                                                                                                               | support multiple query seperated by ',',such as '3,4,5','0': all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |

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
| update_time        | long         | true     | order update time，millesecond timestamp                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
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

{

"contract":

"BTC-USD"

"trade_type":

0

"status":

0

"type":

1

"price_type":

"opponent"

"start_time":

1660119810000

"end_time":

1660274746031

"direct":

"next"

"from_id":

1110

}

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

771043577949732900

"contract_code":

"THETA-USD"

"symbol":

"THETA"

"lever_rate":

20

"direction":

"buy"

"offset":

"open"

"volume":

1

"price":

0.6

"create_date":

1603872714279

"update_time":

1603872714279

"order_source":

"api"

"order_price_type":

6

"order_type":

1

"margin_frozen":

0.8333333333333334

"profit":

0

"trade_volume":

0

"trade_turnover":

0

"fee":

0

"trade_avg_price":

0

"status":

3

"order_id_str":

"771043577949732864"

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
