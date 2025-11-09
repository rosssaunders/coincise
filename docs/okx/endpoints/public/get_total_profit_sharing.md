# GET / Total profit sharing

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-total-profit-sharing](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-total-profit-sharing)

### GET / Total profit sharing

The leading trader gets the total amount of profit shared since joining the
platform.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/total-profit-sharing`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | No       | Instrument type |

`SPOT`  
`SWAP`  
It returns all types by default. |

#### Response parameters

| **Parameter**         | **Type** | **Description**                 |
| --------------------- | -------- | ------------------------------- |
| ccy                   | String   | The currency of profit sharing. |
| totalProfitSharingAmt | String   | Total profit sharing amount.    |
| instType              | String   | Instrument type                 |
