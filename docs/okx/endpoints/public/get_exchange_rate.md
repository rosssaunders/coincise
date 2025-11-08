# GET exchange rate

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-exchange-rate](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-exchange-rate)

### Get exchange rate

This interface provides the average exchange rate data for 2 weeks

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/exchange-rate`

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| usdCny | String | Exchange rate |
