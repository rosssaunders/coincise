# POST / Compute margin balance

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-compute-margin-balance](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-compute-margin-balance)

### POST / Compute margin balance

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/compute-margin-balance`

#### Request Parameters

| Parameter        | Type   | Required | Description                  |
| ---------------- | ------ | -------- | ---------------------------- |
| algoId           | String | Yes      | Algo ID                      |
| type             | String | Yes      | Adjust margin balance type   |
| `add` `reduce`   |
| amt              | String | No       | Adjust margin balance amount |
| Default is zero. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                             |
| ------------- | -------- | ------------------------------------------- |
| maxAmt        | String   | Maximum adjustable margin balance amount    |
| lever         | String   | Leverage after adjustment of margin balance |
