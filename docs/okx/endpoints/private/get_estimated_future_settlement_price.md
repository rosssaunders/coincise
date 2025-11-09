# GET estimated future settlement price

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-future-settlement-price](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-future-settlement-price)

### Get estimated future settlement price

Retrieve the estimated settlement price which will only have a return value one
hour before the settlement.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/estimated-settlement-info`

#### Request Parameters

| Parameter                    | Type   | Required | Description                           |
| ---------------------------- | ------ | -------- | ------------------------------------- |
| instId                       | String | Yes      | Instrument ID, e.g. `XRP-USDT-250307` |
| only applicable to `FUTURES` |

#### Response Parameters

| **Parameter**  | **Type** | **Description**                                                                   |
| -------------- | -------- | --------------------------------------------------------------------------------- |
| instId         | String   | Instrument ID, e.g. `XRP-USDT-250307`                                             |
| nextSettleTime | String   | Next settlement time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| estSettlePx    | String   | Estimated settlement price                                                        |
| ts             | String   | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085`     |
