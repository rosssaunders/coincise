# GET Get Deposit And Withdraw History (KEYED)

**Source:** [Get Deposit And Withdraw History (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Deposit And Withdraw History (KEYED)

`The original /account/v1/deposit-withdraw/history interface, the old interface is no longer supported, please switch to the new interface as soon as possible`

`Search for all existed withdraws and deposits and return their latest status.`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v2/deposit-withdraw/history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v2/deposit-withdraw/history?N=100&operation_type=withdraw&startTime=1739499865000`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | No | Token symbol, e.g., 'BTC' |
| operation\_type | String | Yes | type  
\-`deposit`\=deposit  
\-`withdraw`\=withdraw |
| startTime | Long | No | Default: 90 days from current timestamp (milliseconds) |
| endTime | Long | No | Default: present timestamp (milliseconds) |
| N | Int | Yes | Recent N records (value range 1-1000) |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "142bf92a-fc50-4689-92b6-590886f90b97",
  "data": {
    "records": [
      {
        "withdraw_id": "1679952",
        "deposit_id": "",
        "operation_type": "withdraw",
        "currency": "BMX",
        "apply_time": 1588867374000,
        "arrival_amount": "59.000000000000",
        "fee": "1.000000000000",
        "status": 0,
        "address": "0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",
        "address_memo": "",
        "tx_id": ""
      }
    ]
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| withdraw\_id | String | withdraw id |
| deposit\_id | String | deposit id |
| operation\_type | String | type  
\-`deposit`\=deposit  
\-`withdraw`\=withdraw |
| currency | String | Token symbol, e.g., 'BTC' |
| apply\_time | Long | The request timestamp is accurate to milliseconds(UTC-0) |
| arrival\_amount | String | Actual amount received |
| fee | String | fee |
| status | Int | status  
\- `0`\=Create  
\- `1`\=Submitted, waiting for withdrawal  
\- `2`\=Processing  
\- `3`\=Done  
\- `4`\=Cancel  
\- `5`\=Fail |
| address | String | Address |
| address\_memo | String | Address tag |
| tx\_id | String | Hash record |

1\. The deposit id has a value when \`operation\_type\` = 'deposit'. The withdraw id has a value when \`operation\_type\` = 'withdraw'.  
2\. Tx\_id is an empty string before it is chained.  
3\. Please notice the default startTime and endTime to make sure that time interval is within 0-90 days.  
4\. If both startTime and endTime are sent, time between startTime and endTime must be less than 90 days.  

This endpoint is not available for sub-account