# GET / Total unrealized profit sharing

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-total-unrealized-profit-sharing](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-total-unrealized-profit-sharing)

### GET / Total unrealized profit sharing

The leading trader gets the total unrealized amount of profit shared.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/total-unrealized-profit-sharing`

#### Request Parameters

| Parameter                  | Type   | Required | Description     |
| -------------------------- | ------ | -------- | --------------- |
| instType                   | String | No       | Instrument type |
| `SWAP`, the default value. |

#### Response parameters

| **Parameter**                   | **Type** | **Description**                                                                                                              |
| ------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| profitSharingTs                 | String   | The settlement time for the total unrealized profit sharing amount. Unix timestamp format in milliseconds, e.g.1597026383085 |
| totalUnrealizedProfitSharingAmt | String   | Total unrealized profit sharing amount                                                                                       |
