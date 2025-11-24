# GET /api/v5/public/instrument-tick-bands

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-option-tick-bands](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-option-tick-bands)

### Get option tick bands

Get option tick bands information

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/instrument-tick-bands`

#### Request Parameters

| Parameter                 | Type   | Required | Description       |
| ------------------------- | ------ | -------- | ----------------- |
| instType                  | String | Yes      | Instrument type   |
| `OPTION`                  |
| instFamily                | String | No       | Instrument family |
| Only applicable to OPTION |

#### Response Parameters

| **Parameter** | **Type**         | **Description**                      |
| ------------- | ---------------- | ------------------------------------ |
| instType      | String           | Instrument type                      |
| instFamily    | String           | Instrument family                    |
| tickBand      | Array of objects | Tick size band                       |
| \> minPx      | String           | Minimum price while placing an order |
| \> maxPx      | String           | Maximum price while placing an order |
| \> tickSz     | String           | Tick size, e.g. 0.0001               |
