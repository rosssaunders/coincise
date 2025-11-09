# POST /api/v1/hf/orders/dead-cancel-all

**Source:**
[/api/v1/hf/orders/dead-cancel-all](https://www.kucoin.com/docs/rest//api/v1/hf/orders/dead-cancel-all)

## Authentication

Required (Private Endpoint)

## Description

Set DCP

Set Disconnection Protect (Deadman Switch). Through this interface, call this
interface to automatically cancel all orders of the set trading pair after the
specified time. If this interface is not called again for renewal or
cancellation before the set time, the system will help the user to cancel the
order of the corresponding trading pair. Otherwise it will not.

## Request Body

| Parameter | Required | Type    | Description                                                                                                                                                                                                                                                                                                                          |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| timeout   | required | integer | Auto cancel order trigger setting time, the unit is second. Range: timeout=-1 (meaning unset) or 5 <= timeout <= 86400. For example, timeout=5 means that the order will be automatically canceled if no user request is received for more than 5 seconds. When this parameter is changed, the previous setting will be overwritten. |
| symbols   | optional | string  | List of trading pairs. When this parameter is not empty, separate it with commas and support up to 50 trading pairs. Empty means all trading pairs. When this parameter is changed, the previous setting will be overwritten.                                                                                                        |

## Responses

### 200

| Parameter        | Required | Type    | Description                                         |
| ---------------- | -------- | ------- | --------------------------------------------------- |
| code             | required | string  |                                                     |
| data             | required | object  | If the data is empty, it means that DCP is not set. |
| data.currentTime | required | integer | System current time (in seconds)                    |
| data.triggerTime | required | integer | Trigger cancellation time (in seconds)              |
