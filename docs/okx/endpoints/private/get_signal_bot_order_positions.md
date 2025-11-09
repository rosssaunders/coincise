# GET / Signal bot order positions

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-order-positions](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-order-positions)

### GET / Signal bot order positions

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/signal/positions`

#### Request Parameters

| Parameter                   | Type   | Required | Description     |
| --------------------------- | ------ | -------- | --------------- |
| algoOrdType                 | String | Yes      | Algo order type |
| `contract`: Contract signal |
| algoId                      | String | Yes      | Algo ID         |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------------------ |
| algoId        | String   | Algo ID                                                                              |
| algoClOrdId   | String   | Client-supplied Algo ID. Used to be extended in the future.                          |
| instType      | String   | Instrument type                                                                      |
| instId        | String   | Instrument ID, e.g. `BTC-USDT-SWAP`                                                  |
| cTime         | String   | Algo order created time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime         | String   | Algo order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| avgPx         | String   | Average open price                                                                   |
| ccy           | String   | Margin currency                                                                      |
| lever         | String   | Leverage                                                                             |
| liqPx         | String   | Estimated liquidation price                                                          |
| posSide       | String   | Position side                                                                        |
| `net`         |
| pos           | String   | Quantity of positions                                                                |
| mgnMode       | String   | Margin mode                                                                          |

`cross`  
`isolated` | | mgnRatio | String | Maintenance margin ratio | | imr | String |
Initial margin requirement | | mmr | String | Maintenance margin requirement | |
upl | String | Unrealized profit and loss | | uplRatio | String | Unrealized
profit and loss ratio | | last | String | Latest traded price | | notionalUsd |
String | Notional value of positions in `USD` | | adl | String |
Automatic-Deleveraging, signal area  
Divided into 5 levels, from 1 to 5, the smaller the number, the weaker the adl
intensity. | | markPx | String | Mark price |
