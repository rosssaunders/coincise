# GET /api/v3/margin/repay

**Source:** [/api/v3/margin/repay](https://www.kucoin.com/docs/rest//api/v3/margin/repay)

## Authentication

Required (Private Endpoint)

## Description

Get Repay History

This API endpoint is used to get the borrowing orders for cross and isolated margin accounts.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | required | string | currency |
| isIsolated | optional | boolean | true-isolated, false-cross; default is false |
| symbol | optional | string | symbol, mandatory for isolated margin account |
| orderNo | optional | string | Repay order ID |
| startTime | optional | integer | The start and end times are not restricted. If the start time is empty or less than 1680278400000, the default value is set to 1680278400000 (April 1, 2023, 00:00:00) |
| endTime | optional | integer | End time |
| currentPage | optional | integer | Current query page, with a starting value of 1. Default:1
 |
| pageSize | optional | integer | Number of results per page. Default is 50, minimum is 10, maximum is 500 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.timestamp | required | integer |  |
| data.currentPage | required | integer | current page |
| data.pageSize | required | integer | page size |
| data.totalNum | required | integer | total number |
| data.totalPage | required | integer | total pages |
| data.items | required | array |  |
| data.items[].orderNo | required | string | Repay order ID |
| data.items[].symbol | required | string | Isolated Margin symbol; empty for cross margin |
| data.items[].currency | required | string | currency |
| data.items[].size | required | string | Amount of initiated repay |
| data.items[].principal | required | string | Amount of principal paid |
| data.items[].interest | required | string | Amount of interest paid |
| data.items[].status | required | string | PENDING: Processing, SUCCESS: Successful, FAILED: Failed |
| data.items[].createdTime | required | integer | Repayment time |

