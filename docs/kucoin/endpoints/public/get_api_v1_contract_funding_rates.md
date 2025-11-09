# GET /api/v1/contract/funding-rates

**Source:**
[/api/v1/contract/funding-rates](https://www.kucoin.com/docs/rest//api/v1/contract/funding-rates)

## Authentication

Not Required (Public Endpoint)

## Description

Get Public Funding History

Query the funding rate at each settlement time point within a certain time range
of the corresponding contract.

## Parameters

| Parameter | Required | Type    | Description                                                                                                        |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| from      | required | integer | Begin time (milliseconds)                                                                                          |
|  |
| to        | required | integer | End time (milliseconds)                                                                                            |
|  |

## Responses

### 200

| Parameter          | Required | Type    | Description                                                                                                        |
| ------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| code               | required | string  |                                                                                                                    |
| data               | required | array   |                                                                                                                    |
| data[].symbol      | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| data[].fundingRate | required | number  | Funding rate                                                                                                       |
| data[].timepoint   | required | integer | Time point (milliseconds)                                                                                          |

|
