# GET /api/v5/account/spot-borrow-repay-history

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-borrow-repay-history](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-borrow-repay-history)

### Get borrow/repay history

Retrieve the borrow/repay history under `Spot mode`

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/spot-borrow-repay-history`

#### Request Parameters

| Parameter | Type   | Required | Description          |
| --------- | ------ | -------- | -------------------- |
| ccy       | String | No       | Currency, e.g. `BTC` |
| type      | String | No       | Event type           |

`auto_borrow`  
`auto_repay`  
`manual_borrow`  
`manual_repay` | | after | String | No | Pagination of data to return records
earlier than the requested `ts` (included), Unix timestamp format in
milliseconds, e.g. `1597026383085` | | before | String | No | Pagination of data
to return records newer than the requested `ts`(included), Unix timestamp format
in milliseconds, e.g. `1597026383085` | | limit | String | No | Number of
results per request. The maximum is 100. The default is 100. |

#### Response Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| ccy       | String | Currency, e.g. `BTC` |
| type      | String | Event type           |

`auto_borrow`  
`auto_repay`  
`manual_borrow`  
`manual_repay` | | amt | String | Amount | | accBorrowed | String | Accumulated
borrow amount | | ts | String | Timestamp for the event, Unix timestamp format
in milliseconds, e.g. `1597026383085` |
