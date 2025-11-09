# GET [General]Get Kline Data of Mark Price

**Source:**
[[General]Get Kline Data of Mark Price](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80ba5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /index/market/history/linear_swap_mark_price_kline (\[General\]Get Kline Data of Mark Price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| period        | string    | true     | period                         | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week,1mon                                                    |               |
| size          | int       | true     | size                           | \[1,2000\]                                                                                                |               |

Notes:  
At one time 2000 at most  
The input parameters are not case sensitive and all support

#### Response Parameter

| Parameter      | Data Type    | Required | Description                                   | Value Range |
| -------------- | ------------ | -------- | --------------------------------------------- | ----------- |
| ch             | string       | true     | channel, format: market.period                |             |
| DATA_START     | object array | true     |                                               |             |
| id             | long         | true     | id                                            |             |
| vol            | string       | true     | trade vol(cont), value is 0                   |             |
| count          | string       | true     | trade count, value is 0                       |             |
| open           | string       | true     | open price                                    |             |
| close          | string       | true     | close price                                   |             |
| low            | string       | true     | low price                                     |             |
| high           | string       | true     | high price                                    |             |
| amount         | string       | true     | trade amount, value is 0                      |             |
| trade_turnover | string       | true     | trade turnover, value is 0                    |             |
| DATA_END       |              | false    |                                               |             |
| ts             | long         | true     | Time of Respond Generation, Unit: Millisecond |             |

#### Request example

`curl"https://api.hbdm.com/index/market/history/linear_swap_mark_price_kline?contract_code=BTC-USDT&period=5&size=100"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT.mark_price.5min"

"data":\[

0:{

"amount":

"0"

"close":

"31078.68"

"count":

"0"

"high":

"31078.68"

"id":

1611105300

"low":

"31078.68"

"open":

"31078.68"

"trade_turnover":

"0"

"vol":

"0"

}

1:{

"amount":

"0"

"close":

"31078.68"

"count":

"0"

"high":

"31078.68"

"id":

1611105600

"low":

"31078.68"

"open":

"31078.68"

"trade_turnover":

"0"

"vol":

"0"

}

\]

"status":

"ok"

"ts":

1611106791703

}
