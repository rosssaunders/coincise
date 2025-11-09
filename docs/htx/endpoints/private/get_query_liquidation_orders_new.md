# GET Query Liquidation Orders(New)

**Source:** [Query Liquidation Orders(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d516e00-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap\_liquidation\_orders (Query Liquidation Orders(New))

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| start\_time | long | false |  | Value range \[((end-time) – 2h), (end-time)\], maximum query window size is 2 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order | (now) – 2h |
| end\_time | long | false |  | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| contract | string | true | contract code | Case-Insenstive.e.g. "BTC-USD" |  |
| trade\_type | int | true | trading type | when “0”, request fully filled liquidated orders; when “5’, request liquidated close orders; when “6”, request liquidated open orders |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | Contract Code | e.g. "BTC-USD" |
| direction | string | true | "buy":buy"sell": sell |  |
| offset | string | true | "open":open "close": close |  |
| volume | decimal | true | liquidation volume (cont) |  |
| price | decimal | true | bankruptcy price |  |
| created\_at | long | true | liquidation time |  |
| amount | decimal | true | liquidation amount (token) |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/swap-api/v3/swap_liquidation_orders?trade_type=5&contract=BTC-USDT"`

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

"contract\_code":

"BTC-USD"

"symbol":

"BTC"

"direction":

"buy"

"offset":

"close"

"volume":

173

"price":

17102.9

"created\_at":

1606381842485

"amount":

1.0115243613656164

}

\]

"ts":

1604312615051

}