# Account Funding Flow (USER_DATA)

### API Description

Query account funding flows.

### HTTP Request

GET `/eapi/v1/bill`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                                 |
| ---------- | ------ | --------- | ------------------------------------------------------------------------------------------- |
| currency   | STRING | YES       | Asset type, only support USDT as of now                                                     |
| recordId   | LONG   | NO        | Return the recordId and subsequent data, the latest data is returned by default, e.g 100000 |
| startTime  | LONG   | NO        | Start Time, e.g 1593511200000                                                               |
| endTime    | LONG   | NO        | End Time, e.g 1593512200000                                                                 |
| limit      | INT    | NO        | Number of result sets returned Default:100 Max:1000                                         |
| recvWindow | LONG   | NO        |                                                                                             |
| timestamp  | LONG   | YES       |                                                                                             |

### Response Example

```json
[
  {
    "id": 1125899906842624000,
    "asset": "USDT", // Asset type
    "amount": "-0.552", // Amount (positive numbers represent inflow, negative numbers represent outflow)
    "type": "FEE", // type (fees)
    "createDate": 1592449456000 // Time
  },
  {
    "id": 1125899906842624000,
    "asset": "USDT", // Asset type
    "amount": "100", // Amount (positive numbers represent inflow, negative numbers represent outflow)
    "type": "CONTRACT", // type (buy/sell contracts)
    "createDate": 1592449456000 // Time
  },
  {
    "id": 1125899906842624000,
    "asset": "USDT", // Asset type
    "amount": "10000", // Amount (positive numbers represent inflow, negative numbers represent outflow)
    "type": "TRANSFER", // type（Funds transfer）
    "createDate": 1592448410000 // Time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account/Account-Funding-Flow](https://developers.binance.com/docs/derivatives/option/account/Account-Funding-Flow)
