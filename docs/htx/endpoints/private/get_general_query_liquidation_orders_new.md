# GET [General] Query Liquidation Orders(New)

**Source:** [[General] Query Liquidation Orders(New)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f19e-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap\_liquidation\_orders (\[General\] Query Liquidation Orders(New))

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in; and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 2h), (end-time)\], maximum query window size is 2 hours, query window shift should be within past 90 days. |  |
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
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| created\_at | long | true | liquidation time |  |
| direction | string | true |  | "buy":buy"sell": sell |
| offset | string | true |  | "open":open "close": close, "both" |
| volume | decimal | true | liquidation volume (cont) |  |
| amount | decimal | true | liquidation amount (token) |  |
| price | decimal | true | bankruptcy price |  |
| trade\_turnover | decimal | true | liquidation amount (quotation token) |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |

#### Request example

`curl"/linear-swap-api/v3/swap_liquidation_orders?trade_type=5&contract=BTC-USDT"`

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

"contract\_code":

"BTC-USDT-211210"

"symbol":

"USDT"

"direction":

"sell"

"offset":

"close"

"volume":

479

"price":

51441.7

"created\_at":

1638593647864

"amount":

0.479

"trade\_turnover":

24640.5743

"business\_type":

"futures"

"pair":

"BTC-USDT"

}

\]

"ts":

1604312615051

}