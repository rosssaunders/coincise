# GET Query financial records via multiple fields(New)

**Source:** [Query financial records via multiple fields(New)](https://www.htx.com/en-us/opend/newApiPages/?id=5d5190ae-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v3/swap\_financial\_record\_exact (Query financial records via multiple fields(New))

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
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| type | string | false | if not fill this parameter, it will query all types \[please use "," to seperate multiple types\] | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;66 (system advance account - user currency perpetual account (transfer out advance account)); 67 (user currency perpetual account - system advance issuance account (transfer into advance account)) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. | (now) – 48h |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true |  |  |
| id | string | true |  |  |
| ts | long | true | create time |  |
| symbol | string | true | asset | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT"... |
| type | int | true | transaction Type | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;66 (system advance account - user currency perpetual account (transfer out advance account)); 67 (user currency perpetual account - system advance issuance account (transfer into advance account)) |
| amount | decimal | true | amount |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract":

"BTC-USD"

"trade\_type":

0

"status":

0

"type":

1

"price\_type":

"opponent"

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

"id":

927489216

"symbol":

"THETA"

"type":

34

"amount":

\-100

"ts":

1603869236526

"contract\_code":

"THETA-USD"

}

\]

"ts":

1604312615051

}