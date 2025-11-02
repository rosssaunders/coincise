## Subscription transaction by transaction

Subscribe to the trade detail data of a trading pair

Due to multi-threaded push, it cannot be guaranteed that the push transaction ID
is orderedg

Subscription Type

The dataType is <symbol>@trade E.g. BTC-USDT@trade ETH-USDT@trade

Subscription example

{"id":"24dd0e35-56a4-4f7a-af8a-394c7060909c","reqType":
"sub","dataType":"BTC-USDT@trade"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                   |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| id             | string | yes      | Subscription ID                                                     |
| reqType        | string | yes      | Request type: Subscribe - sub; Unsubscribe - unsub                  |
| dataType       | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD |

### Data Parameters

|     | Description                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------- |
| e   | Event Type                                                                                                                   |
| E   | event time                                                                                                                   |
| s   | trading pair                                                                                                                 |
| t   | Transaction ID                                                                                                               |
| p   | transaction price                                                                                                            |
| q   | Executed quantity                                                                                                            |
| T   | transaction time                                                                                                             |
| m   | Whether the buyer is a market maker. If true, this transaction is an active sell order, otherwise it is an active buy order. |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html](https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html)
