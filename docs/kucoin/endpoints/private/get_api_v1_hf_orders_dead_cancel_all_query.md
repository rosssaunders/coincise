# GET /api/v1/hf/orders/dead-cancel-all/query

**Source:**
[/api/v1/hf/orders/dead-cancel-all/query](https://www.kucoin.com/docs/rest//api/v1/hf/orders/dead-cancel-all/query)

## Authentication

Required (Private Endpoint)

## Description

Get DCP

Get Disconnection Protect (Deadman Switch). Through this interface, you can
query the settings of automatic order cancellation.

## Responses

### 200

| Parameter        | Required | Type    | Description                                                                                                            |
| ---------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| code             | required | string  |                                                                                                                        |
| data             | required | object  | If the data is empty, it means that DCP is not set.                                                                    |
| data.timeout     | optional | integer | Auto cancel order trigger setting time, the unit is second. Range: timeout=-1 (meaning unset) or 5 <= timeout <= 86400 |
| data.symbols     | optional | string  | List of trading pairs. Separated by commas; empty means all trading pairs                                              |
| data.currentTime | optional | integer | System current time (in seconds)                                                                                       |
| data.triggerTime | optional | integer | Trigger cancellation time (in seconds)                                                                                 |
