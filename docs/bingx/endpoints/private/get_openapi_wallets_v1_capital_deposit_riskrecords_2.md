# GET /openApi/wallets/v1/capital/deposit/riskRecords

**Source:**
[/openApi/wallets/v1/capital/deposit/riskRecords](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Deposit risk control records

GET /openApi/wallets/v1/capital/deposit/riskRecords

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

|     | Parameter Name | Type | Required | Description |
| --- | -------------- | ---- | -------- | ----------- |

### Response Parameters

| Parameter Name | Type     | Description      |
| -------------- | -------- | ---------------- |
| uid            | string   | User ID          |
| coin           | string   | Currency name    |
| amount         | decimal  | Amount           |
| sourceAddress  | string   | Source address   |
| address        | string   | Recharge address |
| insetTime      | datetime | Creation time    |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html)
