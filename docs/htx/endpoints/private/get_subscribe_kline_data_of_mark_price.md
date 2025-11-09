# GET Subscribe Kline Data of Mark Price

**Source:** [Subscribe Kline Data of Mark Price](https://www.htx.com/en-us/opend/newApiPages/?id=5d51525d-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.mark\_price.$period (Subscribe Kline Data of Mark Price)

Signature verification: Yes

Interface permission: Read

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
| contract\_code | string | true | contract code | "BTC-USD","ETH-USD"... |  |
| period | string | true | period | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | channel, format: market.$contract\_code.mark\_price.$period |  |
| TICK\_START | object array | true |  |  |
| id | long | true | id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | trade amount(coin), value is 0 |  |
| trade\_turnover | string | true | trade turnover, value is 0 |  |
| TICK\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit：Millisecond |  |

#### Subscription Example

{

"req":

"market.BTC-USD.mark\_price.5min"

"id":

"id4"

"from":

1579247342

"to":

1579247342

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.$contract\_code.mark\_price.$period"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.mark\_price.1min"

"ts":

1489474082831

"tick":{

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

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.$contract\_code.mark\_price.$period"

"id":

"id1"

}