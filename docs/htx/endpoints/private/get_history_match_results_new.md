# GET History Match Results(New)

**Source:**
[Get History Match Results(New)](https://www.htx.com/en-us/opend/newApiPages/?id=28c31b5f-77ae-11ed-9966-0242ac110003)

**Category:** Future Trade Interface

## Authentication

Required (Private Endpoint)

### /api/v3/contract_matchresults (Get History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                                                              | Value Range | Default Value                                                                                                                   |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | string    | true     | symbol                                                                                                                                                                                                                   |             | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                                                       |
| contract   | string    | true     | contract code                                                                                                                                                                                                            |             |                                                                                                                                 |
| trade_type | int       | true     | Transaction type                                                                                                                                                                                                         |             | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions    |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                                                            |             |                                                                                                                                 |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                                                              | now         | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order                                             | next        | next, prev                                                                                                                      |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min(the last entry)query_id in the last query result. If the query direction is next, from_id should be the max (the first entry)query_id in the last query result |             | Search query_id to begin with                                                                                                   |

#### Response Parameter

| Parameter         | Data Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                         | Value Range                                                                                                                                                      |
| ----------------- | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code              | int         | true     | State code                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                  |
| msg               | string      | true     | The code description                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                  |
| ts                | long        | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                  |
| DATA_START        | objectarray | true     |                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                  |
| query_id          | long        | true     | query id, can use as next request's from_id                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                  |
| id                | string      | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                  |
| match_id          | long        | true     | match_id is the same with trade_id of the websocket subscriptions: orders.$symbol and matchOrders.$symbol.match_id is the result of sets of order execution and trade confirmation. NOTE: match_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match_id. |                                                                                                                                                                  |
| order_id          | long        | true     | order ID                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                  |
| order_id_str      | string      | true     | order ID                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                  |
| symbol            | string      | true     | contract type code                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                  |
| contract_type     | string      | true     | contract type                                                                                                                                                                                                                                                                                                                                                                       | deliver on this Friday then "this_week"; deliver on next Friday then "next_week"; for quarterly contract then "quarter", Next Quarterly Contract: "next_quarter" |
| contract_code     | string      | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                                       | "BTC180914" ...                                                                                                                                                  |
| direction         | string      | true     | ransaction direction                                                                                                                                                                                                                                                                                                                                                                | 【buy : sell"】                                                                                                                                                  |
| offset            | string      | true     | offset direction                                                                                                                                                                                                                                                                                                                                                                    | "open": open positions; "close": close positions                                                                                                                 |
| trade_volume      | decimal     | true     | the number of traded contract with unit of lot                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                  |
| trade_price       | decimal     | true     | the price at which orders get filled                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                  |
| trade_turnover    | decimal     | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                  |
| create_date       | long        | true     | the time when orders get filled                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                  |
| offset_profitloss | decimal     | true     | profits and losses generated from closing positions(calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                           |                                                                                                                                                                  |
| trade_fee         | decimal     | true     | fees charged by platform                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                  |
| role              | string      | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                  |
| real_profit       | decimal     | true     | real profit (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                                      |                                                                                                                                                                  |
| fee_asset         | string      | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                                   | （"BTC","ETH"...）                                                                                                                                               |
| order_source      | string      | true     | Order Source                                                                                                                                                                                                                                                                                                                                                                        | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                            |
| DATA_END          |             | false    |                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                  |
| ts                | long        | true     | timestamp                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                  |

#### Request example

{

"contract":

"BTC-USD"

"trade_type":

0

"symbol":

"BTC"

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

113891764710

"order_id":

773135295142658000

"symbol":

"ADA"

"contract_type":

"quarter"

"contract_code":

"ADA201225"

"direction":

"buy"

"offset":

"open"

"trade_volume":

1

"trade_price":

0.092

"trade_turnover":

10

"trade_fee":

\-0.021739130434782608

"offset_profitloss":

0

"create_date":

1604371703183

"role":

"Maker"

"order_source":

"web"

"order_id_str":

"773135295142658048"

"fee_asset":

"ADA"

"real_profit":

0

"id":

"113891764710-773135295142658048-1"

}

\]

"ts":

1604312615051

}
