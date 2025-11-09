# GET Withdraw Quota (KEYED)

**Source:** [Withdraw Quota (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Withdraw Quota (KEYED)

`Query withdraw quota for currencies`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/withdraw/charge`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/account/v1/withdraw/charge?currency=BTC`

| Field    | Type   | Required? | Description               |
| -------- | ------ | --------- | ------------------------- |
| currency | String | Yes       | Token symbol, e.g., 'BTC' |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"62a80bde-0cb4-4bf1-b8e5-5ad2c71463e7",     "data":{         "today_available_withdraw_BTC":"100.0000",         "min_withdraw":"0.00000000",         "withdraw_precision":8,         "withdraw_fee":"0.00000000",         "withdraw_Precision_GeTen": 10     } }`

| Field                        | Type   | Description                                                                                                         |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| today_available_withdraw_BTC | String | Amount available for withdrawal today, unit: BTC                                                                    |
| min_withdraw                 | String | Minimum withdrawal amount                                                                                           |
| withdraw_precision           | Int    | Withdrawal amount must be accurate to several decimal places.                                                       |
| withdraw_fee                 | String | Withdrawal fee                                                                                                      |
| withdraw_Precision_GeTen     | Long   | Withdrawal amount must be an integral multiple of this value. If it is null, it means there is no such requirement. |

This interface is not available for sub-account

1\. When \`withdraw_precision\`=5, then the decimal point of the withdrawal
amount cannot exceed 5 digits.  
2\. When \`withdraw_Precision_GeTen\`=10, then the withdrawal amount must be an
integral multiple of 10.
