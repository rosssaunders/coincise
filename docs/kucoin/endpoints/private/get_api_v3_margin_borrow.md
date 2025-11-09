# GET /api/v3/margin/borrow

**Source:**
[/api/v3/margin/borrow](https://www.kucoin.com/docs/rest//api/v3/margin/borrow)

## Authentication

Required (Private Endpoint)

## Description

Get Borrow History

This API endpoint is used to get the borrowing orders for cross and isolated
margin accounts.

## Parameters

| Parameter   | Required | Type    | Description                                                                                                                                                            |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency    | required | string  | currency                                                                                                                                                               |
| isIsolated  | optional | boolean | true-isolated, false-cross; default is false                                                                                                                           |
| symbol      | optional | string  | symbol, mandatory for isolated margin account                                                                                                                          |
| orderNo     | optional | string  | Borrow Order ID                                                                                                                                                        |
| startTime   | optional | integer | The start and end times are not restricted. If the start time is empty or less than 1680278400000, the default value is set to 1680278400000 (April 1, 2023, 00:00:00) |
| endTime     | optional | integer | End time                                                                                                                                                               |
| currentPage | optional | integer | Current query page, with a starting value of 1. Default:1                                                                                                              |
|             |
| pageSize    | optional | integer | Number of results per page. Default is 50, minimum is 10, maximum is 500                                                                                               |

## Responses

### 200

| Parameter                | Required | Type    | Description                                              |
| ------------------------ | -------- | ------- | -------------------------------------------------------- |
| code                     | required | string  |                                                          |
| data                     | required | object  |                                                          |
| data.timestamp           | required | integer |                                                          |
| data.currentPage         | required | integer | current page                                             |
| data.pageSize            | required | integer | page size                                                |
| data.totalNum            | required | integer | total number                                             |
| data.totalPage           | required | integer | total pages                                              |
| data.items               | required | array   |                                                          |
| data.items[].orderNo     | required | string  | Borrow Order ID                                          |
| data.items[].symbol      | required | string  | Isolated Margin symbol; empty for cross margin           |
| data.items[].currency    | required | string  | currency                                                 |
| data.items[].size        | required | string  | Initiated borrow amount                                  |
| data.items[].actualSize  | required | string  | Actual borrow amount                                     |
| data.items[].status      | required | string  | PENDING: Processing, SUCCESS: Successful, FAILED: Failed |
| data.items[].createdTime | required | integer | Borrow time                                              |
