# GET /api/v5/rubik/stat/trading-data/support-coin

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-support-coin](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-support-coin)

### Get support coin

Retrieve the currencies supported by the trading statistics endpoints.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/trading-data/support-coin`

#### Response Parameters

| **Parameter** | **Type**         | **Description**                                |
| ------------- | ---------------- | ---------------------------------------------- |
| contract      | Array of strings | Currency supported by derivatives trading data |
| option        | Array of strings | Currency supported by option trading data      |
| spot          | Array of strings | Currency supported by spot trading data        |
