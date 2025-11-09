# GET [General] Query Estimated Funding Rate Kline Data

**Source:**
[[General] Query Estimated Funding Rate Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb813aa-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /index/market/history/linear_swap_estimated_rate_kline (\[General\] Query Estimated Funding Rate Kline Data)

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
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                                            | Default Value |
| ------------- | --------- | -------- | ------------- | -------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT","ETH-USDT". |               |
| period        | string    | true     | kline period  | 1min,5min, 15min, 30min, 60min,4hour,1day,1week,1mon                                   |               |
| size          | int       | true     | kline size    | \[1,2000\]                                                                             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                          | Value Range          |
| -------------- | --------- | -------- | -------------------------------------------------------------------- | -------------------- |
| ch             | string    | true     | data channel                                                         | eg： market.period   |
| DATA_START     |           | false    | object                                                               |                      |
| id             | long      | true     | kline ID                                                             |                      |
| vol            | string    | true     | Trade Volume(Cont.) The value is 0                                   |                      |
| count          | string    | true     | Order Quantity The value is 0                                        |                      |
| open           | string    | true     | Opening Price                                                        |                      |
| close          | string    | true     | Closing Price, the price in the last kline is the latest order price |                      |
| low            | string    | true     | Lowest Price                                                         |                      |
| high           | string    | true     | Highest Price                                                        |                      |
| amount         | string    | true     | Trade Amount(Coin), The value is 0. )                                |                      |
| trade_turnover | string    | true     | Transaction amount, the value is 0.                                  |                      |
| DATA_END       |           | false    |                                                                      |                      |
| status         | string    | true     | process status                                                       | "ok" , "error"       |
| ts             | long      | true     | timestamp of the response of the server                              | unit：millionseconds |

#### Request example

`curl "https://api.hbdm.com/index/market/history/linear_swap_estimated_rate_kline?contract_code=BTC-USDT&period=1min&size=1"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT.estimated_rate.1min"

"data":\[

0:{

"amount":

"0"

"close":

"0.0001"

"count":

"0"

"high":

"0.0001"

"id":

1603697100

"low":

"0.0001"

"open":

"0.0001"

"trade_turnover":

"0"

"vol":

"0"

}

\]

"status":

"ok"

"ts":

1603697104902

}
