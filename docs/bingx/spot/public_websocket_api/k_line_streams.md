## K-line Streams

Subscribe to market k-line data of one trading pair

Subscription Type

The dataType is <symbol>@kline\_<interval> E.g.BTC-USDT@kline_1min

Subscription Example

{"id":"e745cd6d-d0f6-4a70-8d5a-043e4c741b40","reqType":
"sub","dataType":"BTC-USDT@kline_1min"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                                                            |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| id             | string | yes      | Subscription ID                                                                                              |
| reqType        | string | yes      | Request type: Subscribe - sub; Unsubscribe - unsub                                                           |
| dataType       | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD.Reference field description, K-line type |

### Data Parameters

|     | Description  |
| --- | ------------ |
| E   | event time   |
| K   | data         |
| e   | Event Type   |
| s   | trading pair |

### Order Parameters

|     | Description                                             |
| --- | ------------------------------------------------------- |
| T   | The end time of this K-line                             |
| c   | The last transaction price during this K-line period    |
| h   | The highest transaction price during this K-line period |
| i   | K-line interval                                         |
| l   | The lowest transaction price during this K-line period  |
| n   | Number of transactions during this K-line period        |
| o   | The first transaction price during this K-line period   |
| q   | Transaction volume during this K-line period            |
| s   | trading pair                                            |
| t   | The starting time of this K-line                        |
| v   | Trading volume during this K-line period                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html](https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html)
