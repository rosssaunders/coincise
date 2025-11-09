# GET [Cross]Query Settlement Records of Users

**Source:** [[Cross]Query Settlement Records of Users](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82cf8-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### linear-swap-api/v1/swap\_cross\_user\_settlement\_records (\[Cross\]Query Settlement Records of Users)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "USDT", now only support USDT |  |
| start\_time | long | false | start time(timestamp, Unit: Millisecond) | Value Range：\[(now - 90 days), now\] , now - 90 days |  |
| end\_time | long | false | end time(timestamp, Unit: Millisecond) | Value Range：(start\_time, now\], now |  |
| page\_index | int | false | page index | if not filled in is 1st |  |
| page\_size | int | false | page size | if not filled is 10, 25 at most(if more than 25, treated as 50) |  |

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
| margin\_mode | string | true | margin mode | cross/isolated |
| margin\_account | string | true | margin account | such as “USDT” |
| margin\_balance\_init | decimal | true | margin balance init |  |
| margin\_balance | decimal | true | margin balance after current settlement |  |
| settlement\_profit\_real | decimal | true | settlement profit real |  |
| settlement\_time | long | true | settlement time/delivery time |  |
| clawback | decimal | true | clawback |  |
| funding\_fee | decimal | true | total funding fee(delivery fee included) |  |
| offset\_profitloss | decimal | true | offset profit or loss |  |
| fee | decimal | true | fee |  |
| fee\_asset | string | true | fee asset |  |
| CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| offset\_profitloss | decimal | true | offset profit or loss current settlement |  |
| fee | decimal | true | fee current settlement |  |
| fee\_asset | string | true | fee asset |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| POSITIONS\_START | object array | true | positions(just place when has positions) |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| direction | string | true | direction | "buy"/"sell" |
| volume | decimal | true | volume before settlement(cont) |  |
| cost\_open | decimal | true | cost open |  |
| cost\_hold\_pre | decimal | true | cost hold before settlement |  |
| cost\_hold | decimal | true | cost hold after current settlement |  |
| settlement\_profit\_unreal | decimal | true | settlement profit unreal |  |
| settlement\_price | decimal | true | settlement price/delivery price |  |
| settlement\_type | string | true | settlement type | settlement/delivery |
| pair | string | true | pair | such as: “BTC-USDT” |
| POSITIONS\_END |  | false |  |  |
| CONTRACT\_DETAIL\_END |  | true |  |  |
| SETTLEMENT\_RECORDS\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

#### Request example

{

"margin\_account":

"USDT"

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

2

"current\_page":

1

"total\_size":

13

"settlement\_records":\[

0:{

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"margin\_balance\_init":

5000

"margin\_balance":

5007.6708

"settlement\_profit\_real":

7.6708

"settlement\_time":

1611051602040

"clawback":

0

"funding\_fee":

0

"offset\_profitloss":

0

"fee":

0.6708

"fee\_asset":

"USDT"

"contract\_detail":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"offset\_profitloss":

0

"fee":

0.6708

"fee\_asset":

"USDT"

"positions":\[

0:{

"symbol":

"BTC-USDT"

"contract\_code":

"BTC-USDT"

"direction":

"buy"

"volume":

9

"cost\_open":

27911.11111111111

"cost\_hold\_pre":

27911.11111111111

"cost\_hold":

34361.25

"settlement\_profit\_unreal":

580.5125

"settlement\_price":

34361.25

"settlement\_type":

"settlement"

}

1:{

"symbol":

"BTC-USDT"

"contract\_code":

"BTC-USDT"

"direction":

"sell"

"volume":

9

"cost\_open":

27988.88888888889

"cost\_hold\_pre":

27988.88888888889

"cost\_hold":

34361.25

"settlement\_profit\_unreal":

\-573.5125

"settlement\_price":

34361.25

"settlement\_type":

"settlement"

}

\]

}

\]

}

1:{

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"margin\_balance\_init":

5000

"margin\_balance":

5000

"settlement\_profit\_real":

0

"settlement\_time":

1611047654316

"clawback":

0

"funding\_fee":

0

"offset\_profitloss":

0

"fee":

0

"fee\_asset":

"USDT"

"contract\_detail":\[\]

}

\]

}

"ts":

1611051729365

}