# POST Transfer (SIGNED)

**Source:** [Transfer (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Transfer (SIGNED)

`Transfer between spot account and contract account`

#### Request URl

`POST https://api-cloud-v2.bitmart.com/account/v1/transfer-contract`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "currency":"USDT",   "amount":"10",   "type":"spot_to_contract",   "recvWindow":5000 }' https://api-cloud-v2.bitmart.com/account/v1/transfer-contract`

| Field    | Type   | Required? | Description                                        |
| -------- | ------ | --------- | -------------------------------------------------- |
| currency | String | Yes       | Currency (Only `USDT` is supported)                |
| amount   | String | Yes       | Transfer amount，allowed range\[0.01,10000000000\] |
| type     | String | Yes       | Transfer type                                      |

\-`spot_to_contract`  
\-`contract_to_spot` | | recvWindow | Long | No | Trade time limit, allowed
range (0,60000\], default: 5000 milliseconds |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "34018ca3-fe24-446a-9e1d-f82edfb3e3",
  "data": {
    "currency": "USDT",
    "amount": "10"
  }
}
```

| Field    | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| currency | String | currency                        |
| amount   | String | Amount successfully transferred |

code returns 1000, which means the transfer is successful.
