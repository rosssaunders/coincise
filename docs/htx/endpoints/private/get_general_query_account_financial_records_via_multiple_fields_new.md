# GET [General]Query account financial records via Multiple Fields(New)

**Source:** [[General]Query account financial records via Multiple Fields(New)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82aca-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap\_financial\_record\_exact (\[General\]Query account financial records via Multiple Fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| mar\_acct | string | true | margin account | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| type | string | false | if not fill this parameter, it will query all types \[please use "," to seperate multiple types\] | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 16:settle unrealized PnL-long positions; 17:settle unrealized PnL-short positions; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| contract | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| mar\_acct | string | true | margin account | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
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
| query\_id | long | true |  |  |
| id | long | true |  |  |
| ts | long | true | create time |  |
| asset | string | true | asset | "USDT"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_account | string | true | margin account | "BTC-USDT","USDT"... |
| face\_margin\_account | string | true | the counterparty margin account, only has value when the transaction Type is 34, 35, 36, 37, 38, 39, and the other types are empty strings | "BTC-USDT"... |
| type | int | true | transaction Type | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |
| amount | decimal | true | amount(quote currency) |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract":

"BTC-USDT"

"mar\_acct":

"BTC-USDT"

"type":

"3,4,5,6,7"

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

138798248

"id":

117840

"type":

5

"amount":

\-0.02446485

"ts":

1638758435635

"contract\_code":

"BTC-USDT-211210"

"asset":

"USDT"

"margin\_account":

"USDT"

"face\_margin\_account":

""

}

\]

"ts":

1604312615051

}