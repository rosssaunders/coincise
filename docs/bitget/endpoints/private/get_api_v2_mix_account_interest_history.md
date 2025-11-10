# Get USDT-M futures Interest history

Frequency limit： 5 times/s (UID)

### Description[​](#description "Direct link to Description")

Get USDT-M futures Interest history

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/account/interest-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/interest-history?productType=usdt-futures&startTime=1725330167000&endTime=1725848567893" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | coin |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT professional futures |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface. |
| startTime | String | No | Start timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085 |
| endTime | String | No | End timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085 |
| limit | String | No | Number of queries: Default: 20, maximum: 100 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725875190690,    "data": {        "nextSettleTime": "1725876300000",        "borrowAmount": "0",        "borrowLimit": "600000",        "interestList": [            {                "coin": "USDT",                "liability": "100",                "interestFreeLimit": "100",                "interestLimit": "500",                "hourInterestRate": "0.12",                "interest": "0.12",                "cTime": "1725848567893"            }         ],        "endId": "xxxxxxxxxxxxxxx"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| nextSettleTime | String | Next interest payment time |
| borrowAmount | String | Current USDT-M Futures debt |
| borrowLimit | String | Loan limit |
| interestList | List<Object\> | interest data |
| \>coin | String | Coin |
| \>liability | String | Total debt |
| \>interestFreeLimit | String | Interest-free amount |
| \>interestLimit | String | Interest-accruing amount |
| \>hourInterestRate | String | Hourly interest rate |
| \>interset | String | interset |
| \>cTime | String | create time |
| endId | String | This is used when 'idLessThan' is set as a range. |

> **Source:** https://www.bitget.com/api-doc/contract/account/Interest-History
