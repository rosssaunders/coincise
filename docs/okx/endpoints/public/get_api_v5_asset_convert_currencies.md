# GET /api/v5/asset/convert/currencies

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currencies](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currencies)

### Get convert currencies

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/convert/currencies`

#### Response parameters

none

#### Response Parameters

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| ccy       | String | Currency, e.g. BTC                       |
| min       | String | Minimum amount to convert ( Deprecated ) |
| max       | String | Maximum amount to convert ( Deprecated ) |
