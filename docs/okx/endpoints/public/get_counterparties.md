# GET Counterparties

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-counterparties](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-counterparties)

### Get Counterparties

Retrieves the list of counterparties that the user is permitted to trade with.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/counterparties`

#### Request parameters

None

#### Response Parameters

| Parameter  | Type   | Description                                                                                                                                                   |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| traderName | String | The long formative username of trader or entity on the platform.                                                                                              |
| traderCode | String | A unique identifier of maker which will be publicly visible on the platform. All RFQ and Quote endpoints will use this as the unique counterparty identifier. |
| type       | String | The counterparty type. `LP` refers to API connected auto market makers.                                                                                       |
