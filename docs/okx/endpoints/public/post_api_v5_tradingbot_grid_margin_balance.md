# POST /api/v5/tradingBot/grid/margin-balance

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-adjust-margin-balance](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-adjust-margin-balance)

### POST / Adjust margin balance

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/margin-balance`

#### Request Parameters

| Parameter                              | Type   | Required    | Description                      |
| -------------------------------------- | ------ | ----------- | -------------------------------- |
| algoId                                 | String | Yes         | Algo ID                          |
| type                                   | String | Yes         | Adjust margin balance type       |
| `add` `reduce`                         |
| amt                                    | String | Conditional | Adjust margin balance amount     |
| Either `amt` or `percent` is required. |
| percent                                | String | Conditional | Adjust margin balance percentage |

#### Response Parameters

| **Parameter** | **Type** | **Description**         |
| ------------- | -------- | ----------------------- |
| algoId        | String   | Algo ID                 |
| algoClOrdId   | String   | Client-supplied Algo ID |
