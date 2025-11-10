# Get Interest rate history

Frequency limit:5 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Interest rate history

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/union-interest-rate-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/union-interest-rate-history?coin=USDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | Yes | Coin asset |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725948522731,    "data": {        "coin": "USDT",        "historyInterestRateList": [            {                "ts": "1723533015946",                "annualInterestRate": "0.02555",                "dailyInterestRate": "0.00007"            },            {                "ts": "1723446615946",                "annualInterestRate": "0.02555",                "dailyInterestRate": "0.00007"            },            {                "ts": "1723360215946",                "annualInterestRate": "0.02555",                "dailyInterestRate": "0.00007"            }        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| coin | String | Assets |
| historyInterestRateList | List | History Interest list |
| \> annualInterestRate | String | Annual interest rate |
| \> dailyInterestRate | String | Daily interest rate |
| \> ts | String | Interest time |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Interest-Rate
