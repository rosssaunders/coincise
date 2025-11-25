# GET /openApi/wallets/v1/capital/config/getall

**Source:**
[/openApi/wallets/v1/capital/config/getall](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query currency deposit and withdrawal data

GET /openApi/wallets/v1/capital/config/getall

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                     |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| coin           | string | no       | Coin identification                                                                                                             |
| displayName    | string | 否       | The platform displays the currency pair name for display only. Unlike coins, coins need to be used for withdrawal and recharge. |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                         |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                             |

### Response Parameters

| Parameter Name | Type    | Description                                                                                                                     |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| coin           | string  | Coin identification                                                                                                             |
| displayName    | string  | The platform displays the currency pair name for display only. Unlike coins, coins need to be used for withdrawal and recharge. |
| name           | string  | Coin name                                                                                                                       |
| networkList    | Network | Network information                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html)
