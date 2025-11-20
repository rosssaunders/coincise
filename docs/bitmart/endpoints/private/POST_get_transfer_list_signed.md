# POST Get Transfer List (SIGNED)

**Source:** [Get Transfer List (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Transfer List (SIGNED)

`Query futures account transfer records`

#### Request URl

`POST https://api-cloud-v2.bitmart.com/account/v1/transfer-contract-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "currency":"USDT",     "time_start":1684391137804,     "time_end":1684392577804,     "page":1,     "limit":10,     "recvWindow":5000 }' https://api-cloud-v2.bitmart.com/account/v1/transfer-contract-list`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | No | Currency (like `USDT`) |
| time\_start | Long | No | Start time(Timestamp in Milliseconds, e.g. 1681701557927) |
| time\_end | Long | No | End time (Timestamp in Milliseconds, e.g. 1681701557927) |
| page | Int | Yes | Number of pages, allowed range \[1,1000\] |
| limit | Int | Yes | Number of queries, allowed range \[10,100\] |
| recvWindow | Long | No | Trade time limit, allowed range (0,60000\], default: 5000 milliseconds |

##### Note

-   If the time range `time_start` and `time_end` are not filled in, all data will be displayed by default.
-   When filling in the time range, `time_end` must be greater than the value of `time_start`.
-   If only `time_start` is filled in, query the historical records starting from the timestamp.
-   If only `time_end` is filled in, query the historical records starting from this timestamp.

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "82abff12-b9d9-4f66-89ea-3b604c6d84",
  "data": {
    "records": [
      {
        "transfer_id": "664651258694168576",
        "currency": "USDT",
        "amount": "0.1",
        "type": "contract_to_spot",
        "state": "FINISHED",
        "timestamp": 1638631674326
      }
    ]
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| transfer\_id | String | ID |
| currency | String | Currency |
| amount | String | Amount |
| type | String | Type  
\-`spot_to_contract`  
\-`contract_to_spot` |
| state | String | Result  
\-`PROCESSING`\=Waiting to execute  
\-`FINISHED`\=Successful transfer  
\-`FAILED`\=Transfer failed |
| timestamp | Long | Transfer creation time in milliseconds, e.g. 1638631674326 |