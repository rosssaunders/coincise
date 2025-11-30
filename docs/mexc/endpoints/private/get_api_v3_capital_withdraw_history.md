# GET /api/v3/capital/withdraw/history

**Source:**
https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#withdraw-history-supporting-network

> Request

```bash
get /api/v3/capital/withdraw/history?coin=USDT&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
[
  {
    "id": "bb17a2d452684f00a523c015d512a341",
    "txId": null,
    "coin": "EOS",
    "network": "EOS",
    "address": "zzqqqqqqqqqq",
    "amount": "10",
    "transferType": 0,
    "status": 3,
    "transactionFee": "0",
    "confirmNo": null,
    "applyTime": 1665300874000,
    "remark": "",
    "memo": "MX10086",
    "transHash": "0x0ced593b8b5adc9f600334d0d7335456a7ed772ea5547beda7ffc4f33a065c",
    "updateTime": 1712134082000,
    "coinId": "128f589271cb495b03e71e6323eb7be",
    "vcoinId": "af42c6414b9a46c8869ce30fd51660f"
  }
]
```

- **GET** `/api/v3/capital/withdraw/history`

**Permission:** SPOT_WITHDRAW_READ

**Weight(IP):** 1

Parameters:

| Name      | Type   | Mandatory | Description                           |
| --------- | ------ | --------- | ------------------------------------- |
| coin      | string | NO        | coin                                  |
| status    | string | NO        | withdraw status                       |
| limit     | string | NO        | default:1000, max:1000                |
| startTime | string | NO        | default: 7 days ago from current time |
| endTime   | string | NO        | default:current time                  |
| timestamp | string | YES       | timestamp                             |
| signature | string | YES       | signature                             |

1.  default return the records of the last 7 days.
2.  Ensure that the default timestamp of 'startTime' and 'endTime' does not
    exceed 7 days.
3.  can query 90 days data at most.
4.  Supported multiple network coins's withdraw history may not return the
    'network' field.

Response:

| Name                                                 | Description                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| address                                              | withdraw address                                                         |
| amount                                               | withdraw amount                                                          |
| applyTime                                            | apply time                                                               |
| coin                                                 | coin                                                                     |
| id                                                   | withdraw id                                                              |
| withdrawOrderId                                      | withdrawOrderId                                                          |
| network                                              | withdraw network                                                         |
| transferType                                         | transferType, 0: outside transfer,1: inside transfer                     |
| status                                               | withdraw status,1:APPLY,2:AUDITING,3:WAIT,4:PROCESSING,5:WAIT_PACKAGING, |
| 6:WAIT_CONFIRM,7:SUCCESS,8:FAILED,9:CANCEL,10:MANUAL |
| transactionFee                                       | transactionFee                                                           |
| confirmNo                                            | confirmNo                                                                |
| txId                                                 | txId                                                                     |
| remark                                               | remark                                                                   |
| memo                                                 | memo                                                                     |
| transHash                                            | transaction Hash                                                         |
| coinId                                               | asset id                                                                 |
| vcoinId                                              | currency id                                                              |
