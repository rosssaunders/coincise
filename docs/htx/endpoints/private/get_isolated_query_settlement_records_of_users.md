# GET [Isolated]Query Settlement Records of Users

**Source:** [[Isolated]Query Settlement Records of Users](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82ba7-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### linear-swap-api/v1/swap\_user\_settlement\_records (\[Isolated\]Query Settlement Records of Users)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract\_code | "BTC-USDT"... |  |
| start\_time | long | false | start time(timestamp, Unit: Millisecond) | Value Range：\[(now - 90 days), now\] , now - 90 days |  |
| end\_time | long | false | end time(timestamp, Unit: Millisecond) | Value Range：(start\_time, now\], now |  |
| page\_index | int | false | page index | if not filled in is 1st |  |
| page\_size | int | false | page size | if not filled in is 20, and 50 at most(if more than 50, treated as 50 |  |

Notes:  
The data of response is descending sorted, the latest the first.  
The settlement records is between "from" and "to"  
This interface only supports users to query data for the last 90 days.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status |  |
| DATA\_START | object | true |  |  |
| SETTLEMENT\_RECORDS\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_mode | string | true | margin mode | cross/isolated |
| margin\_account | string | true | margin account | such as: “BTC-USDT” |
| margin\_balance\_init | decimal | true | Initial account equity of this period (this value is only valid for non-unified account users, and invalid for unified account users) |  |
| margin\_balance | decimal | true | Account equity after settlement in the current period (this value is only valid for non-unified account users, and invalid for unified account users) |  |
| settlement\_profit\_real | decimal | true | settlement profit real |  |
| settlement\_time | long | true | settlement time/delivery time |  |
| clawback | decimal | true | clawback |  |
| funding\_fee | decimal | true | current funding fee(or current delivery fee) |  |
| offset\_profitloss | decimal | true | offset profit or loss |  |
| fee | decimal | true | fee |  |
| fee\_asset | string | true | fee asset |  |
| POSITIONS\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| direction | string | true | direction | "buy"/"sell" |
| volume | decimal | true | volume before settlement(cont) |  |
| cost\_open | decimal | true | cost open |  |
| cost\_hold\_pre | decimal | true | cost hold before settlement |  |
| cost\_hold | decimal | true | cost hold after settlement |  |
| settlement\_profit\_unreal | decimal | true | settlement profit unreal |  |
| settlement\_price | decimal | true | settlement price/delivery time |  |
| settlement\_type | string | true | settlement type | settlement/delivery |
| POSITIONS\_END |  | false |  |  |
| SETTLEMENT\_RECORDS\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"start\_time":

1660119810000

"end\_time":

1660274746031

"page\_index":

1

"page\_size":

50

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

1

"current\_page":

1

"total\_size":

13

"settlement\_records":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"margin\_balance\_init":

5000

"margin\_balance":

4891.74704672

"settlement\_profit\_real":

\-108.25295328

"settlement\_time":

1611040802012

"clawback":

0

"funding\_fee":

0

"offset\_profitloss":

0

"fee":

\-2.63615328

"fee\_asset":

"USDT"

"positions":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"direction":

"buy"

"volume":

12

"cost\_open":

27900

"cost\_hold\_pre":

27900

"cost\_hold":

27459.93

"settlement\_profit\_unreal":

\-52.8084

"settlement\_price":

27459.93

"settlement\_type":

"settlement"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"direction":

"sell"

"volume":

12

"cost\_open":

27019.86

"cost\_hold\_pre":

27019.86

"cost\_hold":

27459.93

"settlement\_profit\_unreal":

\-52.8084

"settlement\_price":

27459.93

"settlement\_type":

"settlement"

}

\]

}

\]

}

"ts":

1611052289681

}