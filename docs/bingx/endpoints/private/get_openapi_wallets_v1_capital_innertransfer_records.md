# GET /openApi/wallets/v1/capital/innerTransfer/records

**Source:**
[/openApi/wallets/v1/capital/innerTransfer/records](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Main account internal transfer records

GET /openApi/wallets/v1/capital/innerTransfer/records

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name   | Type   | Required | Description                                                                                                                                               |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | string | no       | Internal transfer ID                                                                                                                                      |
| coin             | string | Yes      | Transfer coin name                                                                                                                                        |
| transferClientId | string | no       | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| startTime        | long   | No       | Start time                                                                                                                                                |
| endTime          | long   | No       | End time                                                                                                                                                  |
| offset           | int    | No       | Starting record number, default is 0                                                                                                                      |
| limit            | int    | No       | Page size, default is 100, maximum is 1000                                                                                                                |
| timestamp        | int64  | Yes      | Request timestamp in milliseconds                                                                                                                         |
| recvWindow       | int64  | No       | Request valid time window in milliseconds                                                                                                                 |

### Response Parameters

| Parameter Name   | Type    | Description                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | object  | Inner transfer records list                                                                                                                               |
| total            | int     | Total number of addresses                                                                                                                                 |
| id               | long    | Inner transfer ID                                                                                                                                         |
| coin             | string  | Coin name                                                                                                                                                 |
| receiver         | long    | Receiver UID                                                                                                                                              |
| amount           | decimal | Transfer amount                                                                                                                                           |
| time             | long    | Internal transfer time                                                                                                                                    |
| status           | Integer | Status 4-Pending review 5-Failed 6-Completed                                                                                                              |
| transferClientId | string  | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| fromUid          | long    | Payer's account                                                                                                                                           |
| recordType       | string  | Out: transfer out record, in: transfer in record                                                                                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
