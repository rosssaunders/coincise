# GET futures settlement history

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-futures-settlement-history](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-futures-settlement-history)

### Get futures settlement history

Retrieve settlement records of futures in the last 3 months.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP + (Instrument Family)

#### HTTP Request

`GET /api/v5/public/settlement-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instFamily | String | Yes | Instrument family |
| after | String | No | Pagination of data to return records earlier than (not include) the requested `ts` |
| before | String | No | Pagination of data to return records newer than (not include) the requested `ts` |
| limit | String | No | Number of results per request. The maximum is `100`. The default is `100` |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ts | String | Settlement time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| details | Array of objects | Settlement info |
| \> instId | String | Instrument ID |
| \> settlePx | String | Settlement price |
