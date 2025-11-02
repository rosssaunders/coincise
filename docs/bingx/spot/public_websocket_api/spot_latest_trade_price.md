## Spot Latest Trade Price

Real-time Push

Subscription Type

dataType is <symbol>@lastPrice, for example, BTC-USDT@lastPrice

Subscription Example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType":
"sub","dataType":"BTC-USDT@lastPrice"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                   |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| id             | string | yes      | Subscription ID                                                     |
| reqType        | string | yes      | Request type: Subscribe - sub; Unsubscribe - unsub                  |
| dataType       | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html](https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html)
