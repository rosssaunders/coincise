# GET system time

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time)

### Get system time

Retrieve API server time.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/time`

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                          |
| ------------- | -------- | ------------------------------------------------------------------------ |
| ts            | String   | System time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
