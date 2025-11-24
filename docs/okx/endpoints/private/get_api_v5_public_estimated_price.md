# GET /api/v5/public/estimated-price

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price)

### Get estimated delivery/exercise price

Retrieve the estimated delivery price which will only have a return value one
hour before the delivery/exercise.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/estimated-price`

#### Request Parameters

| Parameter                             | Type   | Required | Description                          |
| ------------------------------------- | ------ | -------- | ------------------------------------ |
| instId                                | String | Yes      | Instrument ID, e.g. `BTC-USD-200214` |
| only applicable to `FUTURES`/`OPTION` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| instType      | String   | Instrument type |

`FUTURES`  
`OPTION` | | instId | String | Instrument ID, e.g. `BTC-USD-200214` | | settlePx
| String | Estimated delivery/exercise price | | ts | String | Data return time,
Unix timestamp format in milliseconds, e.g. `1597026383085` |
