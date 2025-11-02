# GET strategy history.

**Source:**
[strategy history.](https://docs.backpack.exchange/#tag/History/operation/get_strategies_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_strategies_history)Get strategy history.

Retrieves the strategy history for the user. This returns strategies that are no
longer active as they have either been completed, cancelled by the user or
cancelled by the system.

**Instruction:** `strategyHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| strategyId    | optional | string           | Filter to the given strategy.                        |
| symbol        | optional | string           | Filter to the given symbol.                          |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset        | optional | integer <uint64> | Offset. Default 0.                                   |
| marketType    | optional | strings          | Market type.                                         |
| sortDirection | optional | string           | Sort direction.                                      |

##### header Parameters

| Parameter   | Required | Type             | Description                                                                 |
| ----------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| X-API-KEY   | optional | string           | API key                                                                     |
| X-SIGNATURE | optional | string           | Signature of the request                                                    |
| X-TIMESTAMP | optional | integer <int64>  | Timestamp of the request in milliseconds                                    |
| X-WINDOW    | optional | integer <uint64> | Time the request is valid for in milliseconds (default 5000, maximum 60000) |

### Responses

**200**

Success.

| Parameter                     | Required | Type             | Description |
| ----------------------------- | -------- | ---------------- | ----------- |
| ACCESS-CONTROL-EXPOSE-HEADERS | required | string           |             |
| X-PAGE-COUNT                  | required | integer <uint64> |             |
| X-CURRENT-PAGE                | required | integer <uint64> |             |
| X-PAGE-SIZE                   | required | integer <uint64> |             |
| X-TOTAL                       | required | integer <uint64> |             |

##### Response Schema: application/json; charset=utf-8

Array

| Parameter                  | Required | Type                     | Description                                                                  |
| -------------------------- | -------- | ------------------------ | ---------------------------------------------------------------------------- |
| id                         | required | string                   | Unique ID of the strategy.                                                   |
| createdAt                  | required | string <naive-date-time> | Time the strategy was created.                                               |
| executedQuantity           | optional | string <decimal>         | Quantity of the strategy that has been filled.                               |
| executedQuoteQuantity      | optional | string <decimal>         | Quote quantity of the strategy that has been filled.                         |
| cancelReason               | optional | string                   | Strategy cancel reason.                                                      |
| strategyType               | required | string                   | Type of strategy.                                                            |
| quantity                   | optional | string <decimal>         | Quantity of the strategy.                                                    |
| selfTradePrevention        | required | string                   | Self trade prevention setting of the strategy's orders.                      |
| status                     | required | string                   | Status of the strategy.                                                      |
| side                       | required | string                   | Side of the strategy.                                                        |
| symbol                     | required | string                   | Market symbol of the strategy.                                               |
| timeInForce                | required | string                   | Time in force of the strategy.                                               |
| clientStrategyId           | optional | integer <uint32>         | Custom order strategy ID.                                                    |
| duration                   | required | integer <uint64>         | Duration of the strategy in milliseconds.                                    |
| interval                   | required | integer <uint64>         | Interval of the strategy in milliseconds.                                    |
| randomizedIntervalQuantity | required | boolean                  | Determines whether the strategy will execute a randomized interval quantity. |
| slippageTolerance          | optional | string <decimal>         | Slippage tolerance allowed for the order.                                    |
| slippageToleranceType      | optional | string                   | Slippage tolerance type                                                      |

**400**

Bad request.

**401**

Unauthorized.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
