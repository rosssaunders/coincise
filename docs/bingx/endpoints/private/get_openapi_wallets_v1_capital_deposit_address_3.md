# GET /openApi/wallets/v1/capital/deposit/address

**Source:**
[/openApi/wallets/v1/capital/deposit/address](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Main Account Deposit Address

GET /openApi/wallets/v1/capital/deposit/address

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                |
| -------------- | ------ | -------- | ------------------------------------------ |
| coin           | string | Yes      | Name of the coin for transfer              |
| offset         | int    | No       | Starting record number, default is 0       |
| limit          | int    | No       | Page size, default is 100, maximum is 1000 |
| timestamp      | int64  | Yes      | Timestamp of the request in milliseconds   |
| recvWindow     | int64  | No       | Request window validity, in milliseconds   |

### Response Parameters

| Parameter Name    | Type   | Description                                                                              |
| ----------------- | ------ | ---------------------------------------------------------------------------------------- |
| data              | object | List of deposit addresses                                                                |
| total             | int    | Total number of addresses                                                                |
| coin              | string | Name of the coin                                                                         |
| network           | string | Name of the network                                                                      |
| address           | string | Deposit address                                                                          |
| addressWithPrefix | string | Deposit address with prefix                                                              |
| tag               | string | Address tag                                                                              |
| status            | int    | 0 for activated, 1 for applied, 2 for not applied                                        |
| walletType        | int    | 1 for Fund Account, 2 for Standard Account, 3 for Perpetual Account, 15 for Spot Account |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html)
