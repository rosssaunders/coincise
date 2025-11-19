# GET /openApi/swap/v3/user/balance

**Source:** [/openApi/swap/v3/user/balance](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query account data

GET /openApi/swap/v3/user/balance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp in milliseconds                   |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

### Response Parameters

| Parameter Name   | Type   | Description                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------ |
| code             | int64  | error code, 0 means successfully response, others means response failure |
| msg              | string | Error Details Description                                                |
| asset            | string | user asset                                                               |
| balance          | string | asset balance                                                            |
| equity           | string | net asset value                                                          |
| unrealizedProfit | string | unrealized profit and loss                                               |
| realisedProfit   | string | realized profit and loss                                                 |
| availableMargin  | string | available margin                                                         |
| usedMargin       | string | used margin                                                              |
| freezedMargin    | string | frozen margin                                                            |
| shortUid         | string | short uid                                                                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
