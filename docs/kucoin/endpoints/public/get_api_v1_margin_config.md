# GET /api/v1/margin/config

**Source:** [/api/v1/margin/config](https://www.kucoin.com/docs/rest//api/v1/margin/config)

## Authentication

Not Required (Public Endpoint)

## Description

Get Margin Config

Request the configure info of the cross margin via this endpoint.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.currencyList | required | array | Available currencies for margin trade |
| data.maxLeverage | required | integer | Max. leverage available |
| data.warningDebtRatio | required | string | The warning debt ratio of the forced liquidation |
| data.liqDebtRatio | required | string | The debt ratio of the forced liquidation |

