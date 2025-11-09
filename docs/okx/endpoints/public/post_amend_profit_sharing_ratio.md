# POST / Amend profit sharing ratio

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-amend-profit-sharing-ratio](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-amend-profit-sharing-ratio)

### POST / Amend profit sharing ratio

It is used to amend profit sharing ratio.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/copytrading/amend-profit-sharing-ratio`

#### Request Parameters

| Parameter          | Type   | Required | Description           |
| ------------------ | ------ | -------- | --------------------- |
| instType           | String | No       | Instrument type       |
| `SWAP`             |
| profitSharingRatio | String | Yes      | Profit sharing ratio. |
| 0.1 represents 10% |

#### Response parameters

| **Parameter** | **Type** | **Description**       |
| ------------- | -------- | --------------------- |
| result        | Boolean  | The result of setting |
| `true`        |
