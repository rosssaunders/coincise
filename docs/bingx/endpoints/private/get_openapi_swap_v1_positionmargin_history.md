# GET /openApi/swap/v1/positionMargin/history

**Source:**
[/openApi/swap/v1/positionMargin/history](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Isolated Margin Change History

GET /openApi/swap/v1/positionMargin/history

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                            |
| -------------- | ------ | -------- | ---------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT, please use uppercase letters             |
| positionId     | string | Yes      | Position ID                                                            |
| startTime      | int64  | Yes      | Start timestamp, in milliseconds                                       |
| endTime        | int64  | Yes      | End timestamp, in milliseconds                                         |
| pageIndex      | int64  | Yes      | Page number, must be greater than 0, if not provided, the default is 1 |
| pageSize       | int64  | Yes      | Page size, must be greater than 0, maximum value is 100                |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                     |
| recvWindow     | int64  | No       | Request valid window value, in milliseconds                            |

### Response Parameters

| Parameter Name    | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol            | string | Trading pair, e.g.: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                             |
| positionId        | string | Position ID                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| changeReason      | string | ManualMarginAddition: Manually add margin / ManualMarginReduction: Reduce margin manually / IncreaseLeverage: Increase leverage / ReduceLeverage: Reduce leverage / OpenPosition: Open position / ClosePosition: Close position / Liquidation: Liquidation / ADL:Automatically reduce positions / CloseOpenPosition : Close first and then open a position /FundingFeeSettlement: Funding rate settlement/ AutoMarginAddition: Automatic margin addition |
| marginChange      | string | change amount                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| marginAfterChange | string | Total amount after change                                                                                                                                                                                                                                                                                                                                                                                                                                |
| time              | int64  | Change time                                                                                                                                                                                                                                                                                                                                                                                                                                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
