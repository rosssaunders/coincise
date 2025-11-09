# GET History Match Results(New)

**Source:** [Get History Match Results(New)](https://www.htx.com/en-us/opend/newApiPages/?id=28c31b5f-77ae-11ed-9966-0242ac110003)

**Category:** Future Trade Interface

## Authentication

Required (Private Endpoint)

### /api/v3/contract\_matchresults (Get History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds. Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol |  | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |
| contract | string | true | contract code |  |  |
| trade\_type | int | true | Transaction type |  | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions |
| start\_time | long | false | Query start time, query by data creation time |  |  |
| end\_time | long | false | Query end time, query data by creation time | now | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next | next, prev |
| from\_id | long | false | If the query direction is prev, from\_id should be the min(the last entry)query\_id in the last query result. If the query direction is next, from\_id should be the max (the first entry)query\_id in the last query result |  | Search query\_id to begin with |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | objectarray | true |  |  |
| query\_id | long | true | query id, can use as next request's from\_id |  |
| id | string | true | the global unique ID of the trade. |  |
| match\_id | long | true | match\_id is the same with trade\_id of the websocket subscriptions: orders.$symbol and matchOrders.$symbol.match\_id is the result of sets of order execution and trade confirmation. NOTE: match\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match\_id. |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| symbol | string | true | contract type code |  |
| contract\_type | string | true | contract type | deliver on this Friday then "this\_week"; deliver on next Friday then "next\_week"; for quarterly contract then "quarter", Next Quarterly Contract: "next\_quarter" |
| contract\_code | string | true | Contract Code | "BTC180914" ... |
| direction | string | true | ransaction direction | 【buy : sell"】 |
| offset | string | true | offset direction | "open": open positions; "close": close positions |
| trade\_volume | decimal | true | the number of traded contract with unit of lot |  |
| trade\_price | decimal | true | the price at which orders get filled |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| create\_date | long | true | the time when orders get filled |  |
| offset\_profitloss | decimal | true | profits and losses generated from closing positions(calculated with the average price of position, exclude profit in history settlement.) |  |
| trade\_fee | decimal | true | fees charged by platform |  |
| role | string | true | taker or maker |  |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | （"BTC","ETH"...） |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

#### Request example

{

"contract":

"BTC-USD"

"trade\_type":

0

"symbol":

"BTC"

"start\_time":

1660119810000

"end\_time":

1660274746031

"direct":

"next"

"from\_id":

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

"query\_id":

111000

"match\_id":

113891764710

"order\_id":

773135295142658000

"symbol":

"ADA"

"contract\_type":

"quarter"

"contract\_code":

"ADA201225"

"direction":

"buy"

"offset":

"open"

"trade\_volume":

1

"trade\_price":

0.092

"trade\_turnover":

10

"trade\_fee":

\-0.021739130434782608

"offset\_profitloss":

0

"create\_date":

1604371703183

"role":

"Maker"

"order\_source":

"web"

"order\_id\_str":

"773135295142658048"

"fee\_asset":

"ADA"

"real\_profit":

0

"id":

"113891764710-773135295142658048-1"

}

\]

"ts":

1604312615051

}