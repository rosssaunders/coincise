# GET Acquire History Match Results(New)

**Source:**
[Acquire History Match Results(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51abec-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap_matchresults (Acquire History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                                                              | Value Range                                                                                                                     | Default Value |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract   | string    | true     | contract code                                                                                                                                                                                                            |                                                                                                                                 |               |
| trade_type | int       | true     | Transaction type                                                                                                                                                                                                         | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions    |               |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                                                            |                                                                                                                                 |               |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                                                              | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days | now           |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order                                             | next, prev                                                                                                                      | next          |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min(the last entry)query_id in the last query result. If the query direction is next, from_id should be the max (the first entry)query_id in the last query result | Search query_id to begin with                                                                                                   |               |

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                         | Value Range                                                                           |
| ----------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| code              | int          | true     | State code                                                                                                                                                                                                                                                                                                                                                                          |                                                                                       |
| msg               | string       | true     | The code description                                                                                                                                                                                                                                                                                                                                                                |                                                                                       |
| ts                | long         | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                                           |                                                                                       |
| DATA_START        | object array | true     |                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                       |
| query_id          | long         | true     | query id, can use as next request's from_id                                                                                                                                                                                                                                                                                                                                         |                                                                                       |
| id                | string       | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                                  |                                                                                       |
| match_id          | long         | true     | match_id is the same with trade_id of the websocket subscriptions: orders.$symbol and matchOrders.$symbol.match_id is the result of sets of order execution and trade confirmation. NOTE: match_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match_id. |                                                                                       |
| order_id          | long         | true     | order ID                                                                                                                                                                                                                                                                                                                                                                            |                                                                                       |
| order_id_str      | string       | true     | order ID                                                                                                                                                                                                                                                                                                                                                                            |                                                                                       |
| symbol            | string       | true     | Variety code                                                                                                                                                                                                                                                                                                                                                                        |                                                                                       |
| contract_code     | string       | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                                       | "BTC-USDT"...                                                                         |
| direction         | string       | true     | ransaction direction                                                                                                                                                                                                                                                                                                                                                                | 【buy : sell"】                                                                       |
| offset            | string       | true     | offset direction                                                                                                                                                                                                                                                                                                                                                                    | 【open : close】                                                                      |
| trade_volume      | decimal      | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                                                |                                                                                       |
| trade_price       | decimal      | true     | the price at which orders get filled                                                                                                                                                                                                                                                                                                                                                |                                                                                       |
| trade_turnover    | decimal      | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                                        |                                                                                       |
| create_date       | long         | true     | Creation time                                                                                                                                                                                                                                                                                                                                                                       |                                                                                       |
| offset_profitloss | decimal      | true     | profits and losses generated from closing positions(calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                           |                                                                                       |
| trade_fee         | decimal      | true     | fees charged by platform                                                                                                                                                                                                                                                                                                                                                            |                                                                                       |
| role              | string       | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                                      |                                                                                       |
| real_profit       | decimal      | true     | real profit (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                                      |                                                                                       |
| fee_asset         | string       | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                                   | （"BTC","ETH"...）                                                                    |
| order_source      | string       | true     | Order Source                                                                                                                                                                                                                                                                                                                                                                        | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| DATA_END          |              | false    |                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                       |
| ts                | long         | true     | timestamp                                                                                                                                                                                                                                                                                                                                                                           |                                                                                       |

#### Request example

{

"contract":

"BTC-USD"

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

111000

"match_id":

49637561388

"order_id":

770434885714452500

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"direction":

"buy"

"offset":

"close"

"trade_volume":

10

"trade_price":

0.66

"trade_turnover":

100

"trade_fee":

\-0.030303030303030304

"offset_profitloss":

1.0803950690222015

"create_date":

1603728041854

"role":

"Maker"

"order_source":

"android"

"order_id_str":

"770434885714452480"

"id":

"49637561388-770434885714452480-1"

"fee_asset":

"THETA"

"real_profit":

0

}

\]

"ts":

1604312615051

}
