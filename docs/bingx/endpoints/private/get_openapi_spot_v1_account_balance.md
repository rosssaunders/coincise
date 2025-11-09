# GET /openApi/spot/v1/account/balance

**Source:**
[/openApi/spot/v1/account/balance](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Asset transfer records

GET /openApi/spot/v1/account/balance

GET /openApi/api/v3/asset/transfer

POST /openApi/wallets/v1/capital/innerTransfer/apply

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Withdraw

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

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
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
