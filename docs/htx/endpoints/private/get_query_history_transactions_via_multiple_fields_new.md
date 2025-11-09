# GET Query history transactions via multiple fields(New)

**Source:** [Query history transactions via multiple fields(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51ad31-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap\_matchresults\_exact (Query history transactions via multiple fields(New))

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
| contract | string | true | contract code |  |  |
| trade\_type | int | true | Transaction type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions |  |
| start\_time | long | false | Query start time, query by data creation time |  |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min(the last entry)query\_id in the last query result. If the query direction is next, from\_id should be the max (the first entry)query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | query id, can use as next request's from\_id |  |
| id | string | true | the global unique ID of the trade. |  |
| match\_id | long | true | match\_id is the same with trade\_id of the websocket subscriptions: orders.$symbol and matchOrders.$symbol.match\_id is the result of sets of order execution and trade confirmation. NOTE: match\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match\_id. |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USDT"... |
| direction | string | true | ransaction direction | 【buy : sell"】 |
| offset | string | true | offset direction | 【open : close】 |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_price | decimal | true | the price at which orders get filled |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| create\_date | long | true | Creation time |  |
| offset\_profitloss | decimal | true | profits and losses generated from closing positions(calculated with the average price of position, exclude profit in history settlement.) |  |
| trade\_fee | decimal | true | fees charged by platform |  |
| role | string | true | taker or maker |  |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | （"BTC","ETH"...） |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

#### Request example

`curl "https://api.hbdm.com/swap-ex/market/bbo?contract_code=BTC-USD"`

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

49637561388

"order\_id":

770434885714452500

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"direction":

"buy"

"offset":

"close"

"trade\_volume":

10

"trade\_price":

0.66

"trade\_turnover":

100

"trade\_fee":

\-0.030303030303030304

"offset\_profitloss":

1.0803950690222015

"create\_date":

1603728041854

"role":

"Maker"

"order\_source":

"android"

"order\_id\_str":

"770434885714452480"

"id":

"49637561388-770434885714452480-1"

"fee\_asset":

"THETA"

"real\_profit":

0

}

\]

"ts":

1604312615051

}