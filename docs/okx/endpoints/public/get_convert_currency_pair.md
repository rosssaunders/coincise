# GET convert currency pair

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currency-pair](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currency-pair)

### Get convert currency pair

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/convert/currency-pair`

#### Response parameters

| **Parameters** | **Types** | **Required** | **Description**                       |
| -------------- | --------- | ------------ | ------------------------------------- |
| fromCcy        | String    | Yes          | Currency to convert from, e.g. `USDT` |
| toCcy          | String    | Yes          | Currency to convert to, e.g. `BTC`    |

#### Response Parameters

| Parameter   | Type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| instId      | String | Currency pair, e.g. `BTC-USDT`            |
| baseCcy     | String | Base currency, e.g. `BTC` in `BTC-USDT`   |
| baseCcyMax  | String | Maximum amount of base currency           |
| baseCcyMin  | String | Minimum amount of base currency           |
| quoteCcy    | String | Quote currency, e.g. `USDT` in `BTC-USDT` |
| quoteCcyMax | String | Maximum amount of quote currency          |
| quoteCcyMin | String | Minimum amount of quote currency          |
