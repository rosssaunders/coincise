# GET /api/v1/funding-rate/{symbol}/current

**Source:**
[/api/v1/funding-rate/{symbol}/current](https://www.kucoin.com/docs/rest//api/v1/funding-rate/{symbol}/current)

## Authentication

Not Required (Public Endpoint)

## Description

Get Current Funding Rate

Get Current Funding Rate.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter        | Required | Type    | Description                                                  |
| ---------------- | -------- | ------- | ------------------------------------------------------------ |
| code             | required | string  |                                                              |
| data             | required | object  |                                                              |
| data.symbol      | required | string  | Funding Rate Symbol                                          |
|                  |
| data.granularity | required | integer | Granularity (milliseconds)                                   |
|                  |
| data.timePoint   | required | integer | The funding rate settlement time point of the previous cycle |

(milliseconds) Before going live, the system will pre-generate the first funding
rate record to ensure the billing cycle can start immediately after the contract
is launched. The timePoint field represents the time the funding rate data was
generated, not the actual time it takes effect or is settled. The first actual
settlement will occur at the designated settlement time (00:00 / 08:00 / 14:00)
after the contract goes live.

| | data.value | required | number | Current cycle funding rate | |
data.predictedValue | required | number | Predicted funding rate | |
data.fundingRateCap | required | number | Maximum Funding Rate | |
data.fundingRateFloor | required | number | Minimum Funding Rate | | data.period
| required | integer | Indicates whether the current funding fee is charged
within this cycle | | data.fundingTime | required | integer | Indicates the next
funding fee settlement time point, which can be used to synchronize periodic
settlement timing. |
