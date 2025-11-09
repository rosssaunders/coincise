# GET /api/v1/position

**Source:**
[/api/v1/position](https://www.kucoin.com/docs/rest//api/v1/position)

## Authentication

Required (Private Endpoint)

## Description

Get Position Details

Get the position details of a specified position.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter              | Required | Type    | Description                                                                                                                                             |
| ---------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                   | required | string  |                                                                                                                                                         |
| data                   | required | object  |                                                                                                                                                         |
| data.id                | required | string  | Position ID                                                                                                                                             |
|  |
| data.symbol            | required | string  | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)                                      |
| data.crossMode         | required | boolean | Whether it is cross margin.                                                                                                                             |
| data.delevPercentage   | required | number  | ADL ranking percentile                                                                                                                                  |
|  |
| data.openingTimestamp  | required | integer | First opening time                                                                                                                                      |
| data.currentTimestamp  | required | integer | Current timestamp                                                                                                                                       |
|  |
| data.currentQty        | required | integer | Current postion quantity                                                                                                                                |
|  |
| data.currentCost       | required | number  | Current postion value                                                                                                                                   |
|  |
| data.currentComm       | required | number  | Current commission                                                                                                                                      |
|  |
| data.unrealisedCost    | required | number  | Unrealised value                                                                                                                                        |
|  |
| data.realisedGrossCost | required | number  | Accumulated realised gross profit value                                                                                                                 |
|  |
| data.realisedCost      | required | number  | Current realised position value                                                                                                                         |
|  |
| data.isOpen            | required | boolean | Opened position or not                                                                                                                                  |
|  |
| data.markPrice         | required | number  | Mark price                                                                                                                                              |
|  |
| data.markValue         | required | number  | Mark Value                                                                                                                                              |
|  |
| data.posCost           | required | number  | Position value                                                                                                                                          |
|  |
| data.posInit           | required | number  | Inital margin Cross = opening value/cross leverage; isolated = accumulation of initial margin for each transaction                                      |
|  |
| data.posMargin         | required | number  | Bankruptcy cost Cross = mark value \* imr; Isolated = position margin (accumulation of initial margin, additional margin, generated funding fees, etc.) |
|  |
| data.realisedGrossPnl  | required | number  | Accumulated realised gross profit value                                                                                                                 |
|  |
| data.realisedPnl       | required | number  | Realised profit and loss                                                                                                                                |
|  |
| data.unrealisedPnl     | required | number  | Unrealised profit and loss                                                                                                                              |
|  |
| data.unrealisedPnlPcnt | required | number  | Profit-loss ratio of the position                                                                                                                       |
|  |
| data.unrealisedRoePcnt | required | number  | Rate of return on investment                                                                                                                            |
|  |
| data.avgEntryPrice     | required | number  | Average entry price                                                                                                                                     |
|  |
| data.liquidationPrice  | required | number  | Liquidation price For Cross Margin, you can refer to the liquidationPrice, and the liquidation is based on the risk rate.                               |
|  |
| data.bankruptPrice     | required | number  | Bankruptcy price For Cross Margin, you can refer to the bankruptPrice, and the liquidation is based on the risk rate.                                   |
|  |
| data.settleCurrency    | required | string  | Currency used to clear and settle the trades                                                                                                            |
|  |
| data.isInverse         | required | boolean | Reverse contract or not                                                                                                                                 |
|  |
| data.marginMode        | required | string  | Margin Mode: CROSS，ISOLATED                                                                                                                            |
|  |
| data.positionSide      | required | string  | Position Side                                                                                                                                           |
|  |
| data.leverage          | required | number  | Leverage                                                                                                                                                |
| data.autoDeposit       | optional | boolean | Auto deposit margin or not **Only applicable to Isolated Margin**                                                                                       |
|  |
| data.maintMarginReq    | optional | number  | Maintenance margin requirement                                                                                                                          |
|  |
| data.riskLimit         | optional | integer | Risk limit **Only applicable to Isolated Margin**                                                                                                       |
|  |
| data.realLeverage      | optional | number  | Leverage of the order **Only applicable to Isolated Margin**                                                                                            |
|  |
| data.posCross          | optional | number  | added margin **Only applicable to Isolated Margin**                                                                                                     |
|  |
| data.posCrossMargin    | optional | integer | Additional margin calls (automatic, manual, adjusted risk limits) **Only applicable to Isolated Margin**                                                |
|  |
| data.posComm           | optional | number  | Bankruptcy cost **Only applicable to Isolated Margin**                                                                                                  |
|  |
| data.posCommCommon     | optional | number  | Part of bankruptcy cost (positioning, add margin) **Only applicable to Isolated Margin**                                                                |
|  |
| data.posLoss           | optional | number  | Funding fees paid out **Only applicable to Isolated Margin**                                                                                            |
|  |
| data.posFunding        | optional | number  | The current remaining unsettled funding fee for the position **Only applicable to Isolated Margin**                                                     |
|  |
| data.posMaint          | optional | number  | Maintenance margin                                                                                                                                      |
|  |
| data.maintMargin       | optional | number  | Position margin **Only applicable to Isolated Margin**                                                                                                  |
|  |
| data.maintainMargin    | optional | number  | Maintenance margin rate **Only applicable to Isolated Margin**                                                                                          |
|  |
