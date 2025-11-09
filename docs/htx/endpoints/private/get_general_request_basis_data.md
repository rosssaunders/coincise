# GET [General] Request Basis Data

**Source:** [[General] Request Basis Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7d4c7-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.basis.$period.$basis\_price\_type (\[General\] Request Basis Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |  |
| basis\_price\_type | string | false | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data belonged channel Format: market.basis |  |
| status | string | true | Return Statu | "ok" , "error" |
| id | string | true | Request ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, unit: millisecond |  |
| DATA\_START | object array | false |  |  |
| id | long | true | unique id |  |
| contract\_price | string | true | contract last price |  |
| index\_price | string | true | index price |  |
| basis | string | true | basis=contract\_price - index\_price |  |
| basis\_rate | string | true | basis\_rate=basis/index\_price |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"req":

"market.btc-usdt.basis.1min.open"

"id":

"id4"

"from":

1579247342

"to":

1579247342

}

#### Example of a Successful Subscription

{

"data":\[

0:{

"basis":

"-27.593412766666006"

"basis\_rate":

"-0.0021317871729511838"

"contract\_price":

"12916.2"

"id":

1603641600

"index\_price":

"12943.793412766667"

}

\]

"id":

"id4"

"rep":

"market.BTC-USDT.basis.15min.open"

"status":

"ok"

"ts":

1603783024207

"wsid":

1308653018

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data