# GET /openApi/spot/v1/account/balance

**Source:**
[/openApi/spot/v1/account/balance](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Spot Account

GET /openApi/spot/v1/account/balance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                             |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name | Type  | Description                                             |
| -------------- | ----- | ------------------------------------------------------- |
| balances       | Array | Asset list, element fields refer to the following table |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html](https://bingx-api.github.io/docs/#/en-us/common/account-api.html)
