# GET /api/v3/project/list

**Source:**
[/api/v3/project/list](https://www.kucoin.com/docs/rest//api/v3/project/list)

## Authentication

Required (Private Endpoint)

## Description

Get Loan Market

This API endpoint is used to get the information about the currencies available
for lending.

## Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| currency  | optional | string | currency    |

## Responses

### 200

| Parameter                 | Required | Type    | Description                                               |
| ------------------------- | -------- | ------- | --------------------------------------------------------- |
| code                      | required | string  |                                                           |
| data                      | required | array   |                                                           |
| data[].currency           | optional | string  | Currency                                                  |
| data[].purchaseEnable     | optional | boolean | Whether purchase is supported.                            |
| data[].redeemEnable       | optional | boolean | Whether redeem is supported.                              |
| data[].increment          | optional | string  | Increment precision for purchase and redemption           |
| data[].minPurchaseSize    | optional | string  | Minimum purchase amount                                   |
| data[].minInterestRate    | optional | string  | Minimum lending rate                                      |
| data[].maxInterestRate    | optional | string  | Maximum lending rate                                      |
| data[].interestIncrement  | optional | string  | Increment precision for interest; default is 0.0001       |
| data[].maxPurchaseSize    | optional | string  | Maximum purchase amount                                   |
| data[].marketInterestRate | optional | string  | Latest market lending rate                                |
| data[].autoPurchaseEnable | optional | boolean | Whether to allow automatic purchase: True: on; false: off |
