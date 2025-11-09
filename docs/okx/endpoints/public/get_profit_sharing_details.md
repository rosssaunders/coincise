# GET / Profit sharing details

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-profit-sharing-details](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-profit-sharing-details)

### GET / Profit sharing details

The leading trader gets profits shared details for the last 3 months.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/profit-sharing-details`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | No       | Instrument type |

`SPOT`  
`SWAP`  
It returns all types by default. | | after | String | No | Pagination of data to
return records earlier than the requested `profitSharingId` | | before | String
| No | Pagination of data to return records newer than the requested
`profitSharingId` | | limit | String | No | Number of results per request.
Maximum is 100. Default is 100. |

#### Response parameters

| **Parameter**    | **Type** | **Description**                                                         |
| ---------------- | -------- | ----------------------------------------------------------------------- |
| ccy              | String   | The currency of profit sharing.                                         |
| profitSharingAmt | String   | Profit sharing amount. It would be 0 if there is no any profit sharing. |
| nickName         | String   | Nickname of copy trader.                                                |
| profitSharingId  | String   | Profit sharing ID.                                                      |
| instType         | String   | Instrument type                                                         |
| portLink         | String   | Portrait link                                                           |
| ts               | String   | Profit sharing time.                                                    |
