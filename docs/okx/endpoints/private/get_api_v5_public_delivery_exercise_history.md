# GET /api/v5/public/delivery-exercise-history

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history)

### Get delivery/exercise history

Retrieve delivery records of Futures and exercise records of Options in the last
3 months.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP + (Instrument Type + instFamily)

#### HTTP Request

`GET /api/v5/public/delivery-exercise-history`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | Yes      | Instrument type |

`FUTURES`  
`OPTION` | | instFamily | String | Yes | Instrument family, only applicable to
`FUTURES`/`OPTION` | | after | String | No | Pagination of data to return
records earlier than the requested `ts` | | before | String | No | Pagination of
data to return records newer than the requested `ts` | | limit | String | No |
Number of results per request. The maximum is `100`; The default is `100` |

#### Response Parameters

| Parameter | Type             | Description                                                                         |
| --------- | ---------------- | ----------------------------------------------------------------------------------- |
| ts        | String           | Delivery/exercise time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| details   | Array of objects | Delivery/exercise details                                                           |
| \> insId  | String           | Delivery/exercise contract ID                                                       |
| \> px     | String           | Delivery/exercise price                                                             |
| \> type   | String           | Type                                                                                |

`delivery`  
`exercised`  
`expired_otm`:Out of the money |
