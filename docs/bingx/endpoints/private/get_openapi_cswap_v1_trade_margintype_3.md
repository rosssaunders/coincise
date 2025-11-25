# GET /openApi/cswap/v1/trade/marginType

**Source:**
[/openApi/cswap/v1/trade/marginType](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Margin Type

GET /openApi/cswap/v1/trade/marginType

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| symbol         | string | Trading pair                         |
| marginType     | string | Margin type, e.g., CROSSED, ISOLATED |

### Response Parameters

| Parameter Name | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| symbol         | string | Trading pair                         |
| marginType     | string | Margin type, e.g., CROSSED, ISOLATED |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
