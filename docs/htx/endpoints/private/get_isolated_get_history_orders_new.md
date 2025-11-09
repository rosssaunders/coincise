# GET [Isolated] Get History Orders(New)

**Source:** [[Isolated] Get History Orders(New)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85a53-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap\_hisorders (\[Isolated\] Get History Orders(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode. All via API interface submited price limit orders that had been cancelled will only be kept for 2 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| type | int | true | Type | 1:All Orders,2:Order in Finished Status |  |
| status | string | true | status | support multiple query seperated by ',',such as '3,4,5', 0: all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | isolated: isolated |
| margin\_account | string | true | margin account | such as:BTC-USDT” |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| volume | decimal | true | volume |  |
| price | decimal | true | price |  |
| create\_date | long | true | create date |  |
| update\_time | long | true | order update time，millesecond timestamp |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit |  |
| real\_profit | decimal | true | real profit |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | is tpsl | 1: yes; 0:no |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract":

"BTC-USDT"

"trade\_type":

0

"status":

0

"type":

1

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

13580806498

"order\_id":

770336866451992600

"contract\_code":

"BTC-USDT"

"symbol":

"BTC"

"lever\_rate":

10

"direction":

"sell"

"offset":

"close"

"volume":

1

"price":

13100

"create\_date":

1603704221118

"update\_time":

1603704221118

"order\_source":

"web"

"order\_price\_type":

6

"order\_type":

1

"margin\_frozen":

0

"profit":

0

"trade\_volume":

0

"trade\_turnover":

0

"fee":

0

"trade\_avg\_price":

0

"status":

3

"order\_id\_str":

"770336866451992576"

"fee\_asset":

"USDT"

"liquidation\_type":

"0"

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"is\_tpsl":

0

"real\_profit":

0

"reduce\_only":

0

"canceled\_source":

"timeout-canceled-order"

"self\_match\_prevent\_new":

"cancel\_both"

}

\]

"ts":

1604312615051

}