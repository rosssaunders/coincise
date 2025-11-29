# GET /api/v5/public/underlying

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-underlying](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-underlying)

### Get underlying

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/underlying`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | Yes      | Instrument type |

`SWAP`  
`FUTURES`  
`OPTION` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| uly           | Array    | Underlying      |
