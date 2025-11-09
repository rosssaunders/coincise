# GET [Isolated] Acquire History Match Results(New)

**Source:**
[[Isolated] Acquire History Match Results(New)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85fa3-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap_matchresults (\[Isolated\] Acquire History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports isolated margin mode. The
request parameter "contract" supports the contract code of futures, in that the
format is BTC-USDT-210625. one of pair and contract must be filled in(if all of
them not filled in, will get 1014 error code); and all filled in, the contract
is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                               | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
|            |           | false    |                                                                                                                                                                                          |                                                                                                                                                                           |               |
| contract   | string    | true     | contract code                                                                                                                                                                            | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT"                                                                                                |               |
| pair       | string    | false    | pair                                                                                                                                                                                     | BTC-USDT                                                                                                                                                                  |               |
| trade_type | int       | true     | trade type                                                                                                                                                                               | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |               |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                            | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days.                                  |               |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                              | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days.                                          | now           |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev                                                                                                                                                | next          |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with                                                                                                                                             |               |

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                              | Value Range                                                                           |
| ----------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| code              | int          | true     | State code                                                                                                                                                                                                                                                                                                                                                               |                                                                                       |
| msg               | string       | true     | The code description                                                                                                                                                                                                                                                                                                                                                     |                                                                                       |
| ts                | long         | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                                |                                                                                       |
| DATA_START        | object array | true     |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                       |
| id                | string       | true     | unique id of the trade, and match_id is not unique id. The specific method of use is to use match_id and id as the joint primary key to form a unique transaction ID.                                                                                                                                                                                                    |                                                                                       |
| query_id          | long         | true     | Query id, which can be used as the from_id field for the next query request.                                                                                                                                                                                                                                                                                             |                                                                                       |
| match_id          | long         | true     | match_id is the same with trade_id of the websocket subscriptions: orders_cross.$contract_code match_id is the result of sets of order execution and trade confirmation. NOTE: match_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match_id. |                                                                                       |
| order_id          | long         | true     | order id                                                                                                                                                                                                                                                                                                                                                                 |                                                                                       |
| order_id_str      | string       | true     | order id in string                                                                                                                                                                                                                                                                                                                                                       |                                                                                       |
| symbol            | string       | true     | symbol                                                                                                                                                                                                                                                                                                                                                                   |                                                                                       |
| contract_code     | string       | true     | contract code                                                                                                                                                                                                                                                                                                                                                            | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                   |
| margin_mode       | string       | true     | margin mode                                                                                                                                                                                                                                                                                                                                                              | isolated；                                                                            |
| margin_account    | string       | true     | margin account                                                                                                                                                                                                                                                                                                                                                           | such as:USDT”                                                                         |
| direction         | string       | true     | direction                                                                                                                                                                                                                                                                                                                                                                | "buy"/"sell"                                                                          |
| offset            | string       | true     | offset                                                                                                                                                                                                                                                                                                                                                                   | "open","close","both"                                                                 |
| trade_volume      | decimal      | true     | trade volume                                                                                                                                                                                                                                                                                                                                                             |                                                                                       |
| trade_price       | decimal      | true     | trade price                                                                                                                                                                                                                                                                                                                                                              |                                                                                       |
| trade_turnover    | decimal      | true     | trade turnover                                                                                                                                                                                                                                                                                                                                                           |                                                                                       |
| create_date       | long         | true     | create date                                                                                                                                                                                                                                                                                                                                                              |                                                                                       |
| offset_profitloss | decimal      | true     | profit or loss when cloase position                                                                                                                                                                                                                                                                                                                                      |                                                                                       |
| real_profit       | decimal      | true     | real profit                                                                                                                                                                                                                                                                                                                                                              |                                                                                       |
| trade_fee         | decimal      | true     | trade fee                                                                                                                                                                                                                                                                                                                                                                |                                                                                       |
| role              | string       | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                           |                                                                                       |
| fee_asset         | string       | true     | fee asset                                                                                                                                                                                                                                                                                                                                                                | （"USDT"...）                                                                         |
| order_source      | string       | true     | order source                                                                                                                                                                                                                                                                                                                                                             | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| contract_type     | string       | true     | contract type                                                                                                                                                                                                                                                                                                                                                            | swap, this_week, next_week, quarter, next_quarter                                     |
| pair              | string       | true     | pair                                                                                                                                                                                                                                                                                                                                                                     | such as: “BTC-USDT”                                                                   |
| business_type     | string       | true     | business type                                                                                                                                                                                                                                                                                                                                                            | futures, swap                                                                         |
| reduce_only       | int          | true     | reduce only                                                                                                                                                                                                                                                                                                                                                              | 0: no, 1: yes                                                                         |
| DATA_END          |              | false    |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                       |

#### Request example

{

"contract":

"BTC-USDT"

"trade_type":

0

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

452057

"contract_type":

"this_week"

"pair":

"BTC-USDT"

"business_type":

"futures"

"match_id":

2902136

"order_id":

918800256249405400

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"direction":

"buy"

"offset":

"open"

"trade_volume":

100

"trade_price":

48555.6

"trade_turnover":

4855.56

"trade_fee":

\-2.42778

"offset_profitloss":

0

"create_date":

1639100651577

"role":

"Taker"

"order_source":

"api"

"order_id_str":

"918800256249405440"

"id":

"2902136-918800256249405440-1"

"fee_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"real_profit":

0

"reduce_only":

0

}

\]

"ts":

1604312615051

}
