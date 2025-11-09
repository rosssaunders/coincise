# GET [Isolated] Acquire History Match Results(New)

**Source:** [[Isolated] Acquire History Match Results(New)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85fa3-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap\_matchresults (\[Isolated\] Acquire History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports isolated margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
|  |  | false |  |  |  |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| id | string | true | unique id of the trade, and match\_id is not unique id. The specific method of use is to use match\_id and id as the joint primary key to form a unique transaction ID. |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| match\_id | long | true | match\_id is the same with trade\_id of the websocket subscriptions: orders\_cross.$contract\_code match\_id is the result of sets of order execution and trade confirmation. NOTE: match\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match\_id. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | isolated； |
| margin\_account | string | true | margin account | such as:USDT” |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_turnover | decimal | true | trade turnover |  |
| create\_date | long | true | create date |  |
| offset\_profitloss | decimal | true | profit or loss when cloase position |  |
| real\_profit | decimal | true | real profit |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker or maker |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract":

"BTC-USDT"

"trade\_type":

0

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

452057

"contract\_type":

"this\_week"

"pair":

"BTC-USDT"

"business\_type":

"futures"

"match\_id":

2902136

"order\_id":

918800256249405400

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"direction":

"buy"

"offset":

"open"

"trade\_volume":

100

"trade\_price":

48555.6

"trade\_turnover":

4855.56

"trade\_fee":

\-2.42778

"offset\_profitloss":

0

"create\_date":

1639100651577

"role":

"Taker"

"order\_source":

"api"

"order\_id\_str":

"918800256249405440"

"id":

"2902136-918800256249405440-1"

"fee\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"real\_profit":

0

"reduce\_only":

0

}

\]

"ts":

1604312615051

}