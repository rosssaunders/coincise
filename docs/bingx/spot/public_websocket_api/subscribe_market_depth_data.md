## Subscribe Market Depth Data

Push limited file depth information every 300ms .default level 20

Subscription Type

The dataType is <symbol>@depth<level> E.g.BTC-USDT@depth50

Subscription example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType":
"sub","dataType":"BTC-USDT@depth50"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                                                            |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| id             | string | yes      | Subscription ID                                                                                              |
| reqType        | string | yes      | Request type: Subscribe - sub; Unsubscribe - unsub                                                           |
| dataType       | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD.Reference field description, K-line type |

### Order Parameters

|          | Description |
| -------- | ----------- |
| level5   | level 5     |
| level10  | level 10    |
| level20  | level 20    |
| level50  | level 50    |
| level100 | level 100   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html](https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html)
