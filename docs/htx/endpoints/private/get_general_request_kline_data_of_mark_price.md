# GET [General]Request Kline Data of Mark Price

**Source:** [[General]Request Kline Data of Mark Price](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7d77f-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.mark\_price.$period (\[General\]Request Kline Data of Mark Price)

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
| period | string | true | period | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| req | string | true | channel, format: market.period |  |
| status | string | true | status | "ok" , "error" |
| id | string | true | id |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | kline id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | trade amount, value is 0 |  |
| trade\_turnover | string | true | trade turnover, value is 0 |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"req":

"market.BTC-USDT.mark\_price.5min"

"id":

"id4"

"from":

1579247342

"to":

1579247342

}

#### Example of a Successful Subscription

{

"rep":

"market.BTC-USDT.mark\_price.1min"

"status":

"ok"

"id":

"id4"

"wsid":

1231323423

"ts":

1579489028884

"data":\[

0:{

"vol":

"0"

"close":

"9800.12"

"count":

"0"

"high":

"9800.12"

"id":

1529898780

"low":

"9800.12"

"open":

"9800.12"

"trade\_turnover":

"0"

"amount":

"0"

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data