# GET [Isolated] Get History Orders(New)

**Source:**
[[Isolated] Get History Orders(New)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85a53-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap_hisorders (\[Isolated\] Get History Orders(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode. All
via API interface submited price limit orders that had been cancelled will only
be kept for 2 hours.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                            | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract   | string    | true     | contract code                                                                                                                                                                            | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT"                                                                                                                                             |               |
| trade_type | int       | true     | trade type                                                                                                                                                                               | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode)                                              |               |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                            | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days.                                                                               |               |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                              | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days.                                                                                       | now           |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev                                                                                                                                                                                             | next          |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with                                                                                                                                                                                          |               |
| type       | int       | true     | Type                                                                                                                                                                                     | 1:All Orders,2:Order in Finished Status                                                                                                                                                                                |               |
| status     | string    | true     | status                                                                                                                                                                                   | support multiple query seperated by ',',such as '3,4,5', 0: all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |               |

#### Response Parameter

| Parameter              | Data Type    | Required | Description                                                                                     | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                   | int          | true     | State code                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| msg                    | string       | true     | The code description                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long         | true     | Timestamp                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| DATA_START             | object array | true     |                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| query_id               | long         | true     | Query id, which can be used as the from_id field for the next query request.                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long         | true     | order id                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string       | true     | order id in string                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                 | string       | true     | symbol                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_code          | string       | true     | contract code                                                                                   | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| margin_mode            | string       | true     | margin mode                                                                                     | isolated: isolated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| margin_account         | string       | true     | margin account                                                                                  | such as:BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| lever_rate             | int          | true     | lever rate                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| direction              | string       | true     | direction                                                                                       | "buy"/"sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| offset                 | string       | true     | offset                                                                                          | "open","close","both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| volume                 | decimal      | true     | volume                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal      | true     | price                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| create_date            | long         | true     | create date                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| update_time            | long         | true     | order update time，millesecond timestamp                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_source           | string       | true     | order source                                                                                    | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| order_price_type       | string       | true     | order price type                                                                                | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| margin_asset           | string       | true     | margin asset                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_frozen          | decimal      | true     | margin frozen                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal      | true     | profit                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| real_profit            | decimal      | true     | real profit                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade volume                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade turnover                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee                    | decimal      | true     | fee                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_avg_price        | decimal      | true     | trade avg price                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| status                 | int          | true     | status                                                                                          | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling.                                                                                                                                                                                                                                                                                                  |
| order_type             | int          | true     | order type                                                                                      | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| fee_asset              | string       | true     | fee asset                                                                                       | （"USDT"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| liquidation_type       | string       | true     | liquidation type                                                                                | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| is_tpsl                | int          | true     | is tpsl                                                                                         | 1: yes; 0:no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| reduce_only            | int          | true     | reduce only                                                                                     | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canceled_source        | string       | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent     | int          | false    | Self trading prevention                                                                         | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |
| self_match_prevent_new | string       | true     | Prevent self-trading                                                                            | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA_END               |              | false    |                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

#### Request example

{

"contract":

"BTC-USDT"

"trade_type":

0

"status":

0

"type":

1

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

13580806498

"order_id":

770336866451992600

"contract_code":

"BTC-USDT"

"symbol":

"BTC"

"lever_rate":

10

"direction":

"sell"

"offset":

"close"

"volume":

1

"price":

13100

"create_date":

1603704221118

"update_time":

1603704221118

"order_source":

"web"

"order_price_type":

6

"order_type":

1

"margin_frozen":

0

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

"770336866451992576"

"fee_asset":

"USDT"

"liquidation_type":

"0"

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

"canceled_source":

"timeout-canceled-order"

"self_match_prevent_new":

"cancel_both"

}

\]

"ts":

1604312615051

}
