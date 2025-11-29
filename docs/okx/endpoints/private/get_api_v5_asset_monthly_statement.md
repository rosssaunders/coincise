# GET /api/v5/asset/monthly-statement

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-monthly-statement-last-year](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-monthly-statement-last-year)

### Get monthly statement (last year)

Retrieve monthly statement in the past year.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/monthly-statement`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                         |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| month     | String | Yes      | Month, valid value is `Jan`, `Feb`, `Mar`, `Apr`,`May`, `Jun`, `Jul`,`Aug`, `Sep`,`Oct`,`Nov`,`Dec` |

#### Response Parameters

| **Parameter**        | **Type** | **Description**                                                                            |
| -------------------- | -------- | ------------------------------------------------------------------------------------------ |
| fileHref             | String   | Download file link                                                                         |
| ts                   | Int      | Download link generation time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| state                | String   | Download link status                                                                       |
| "finished" "ongoing" |
