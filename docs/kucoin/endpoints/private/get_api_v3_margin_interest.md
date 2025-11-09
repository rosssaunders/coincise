# GET /api/v3/margin/interest

**Source:**
[/api/v3/margin/interest](https://www.kucoin.com/docs/rest//api/v3/margin/interest)

## Authentication

Required (Private Endpoint)

## Description

Get Interest History.

Request the interest records of the cross/isolated margin lending via this
endpoint.

## Parameters

| Parameter   | Required | Type    | Description                                                                                                                                                            |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency    | optional | string  | currency                                                                                                                                                               |
| isIsolated  | optional | boolean | true-isolated, false-cross; default is false                                                                                                                           |
| symbol      | optional | string  | symbol, mandatory for isolated margin account                                                                                                                          |
| startTime   | optional | integer | The start and end times are not restricted. If the start time is empty or less than 1680278400000, the default value is set to 1680278400000 (April 1, 2023, 00:00:00) |
| endTime     | optional | integer | End time                                                                                                                                                               |
| currentPage | optional | integer | Current query page, with a starting value of 1. Default:1                                                                                                              |
|             |
| pageSize    | optional | integer | Number of results per page. Default is 50, minimum is 10, maximum is 500                                                                                               |

## Responses

### 200

| Parameter                   | Required | Type    | Description         |
| --------------------------- | -------- | ------- | ------------------- |
| code                        | required | string  |                     |
| data                        | required | object  |                     |
| data.timestamp              | required | integer |                     |
| data.currentPage            | required | integer | current page        |
| data.pageSize               | required | integer | page size           |
| data.totalNum               | required | integer | total number        |
| data.totalPage              | required | integer | total pages         |
| data.items                  | required | array   |                     |
| data.items[].currency       | required | string  | currency            |
| data.items[].dayRatio       | required | string  | Daily interest rate |
| data.items[].interestAmount | required | string  | Interest amount     |
| data.items[].createdTime    | required | integer | Interest Timestamp  |
