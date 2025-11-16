# Get Interest Exchange Rate

Rate limit:5 requests/sec/IP

### Description[​](#description "Direct link to Description")

Get Interest exchange rate

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/exchange-rate

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/exchange-rate"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725948315516,    "data": [        {            "coin": "BTC",            "exchangeRateList": [                {                    "tier": "1",                    "minAmount": "0",                    "maxAmount": "1000",                    "exchangeRate": "0.99"                },                {                    "tier": "2",                    "minAmount": "1000",                    "maxAmount": "5000",                    "exchangeRate": "0.98"                },                {                    "tier": "3",                    "minAmount": "5000",                    "maxAmount": "10000",                    "exchangeRate": "0.97"                },                {                    "tier": "4",                    "minAmount": "10000",                    "maxAmount": "50000",                    "exchangeRate": "0.96"                },                {                    "tier": "5",                    "minAmount": "50000",                    "maxAmount": "-1",                    "exchangeRate": "0.95"                }            ]        },        {            "coin": "ETH",            "exchangeRateList": [                {                    "tier": "1",                    "minAmount": "0",                    "maxAmount": "1000",                    "exchangeRate": "0.99"                },                {                    "tier": "2",                    "minAmount": "1000",                    "maxAmount": "5000",                    "exchangeRate": "0.98"                },                {                    "tier": "3",                    "minAmount": "5000",                    "maxAmount": "10000",                    "exchangeRate": "0.97"                },                {                    "tier": "4",                    "minAmount": "10000",                    "maxAmount": "50000",                    "exchangeRate": "0.96"                },                {                    "tier": "5",                    "minAmount": "50000",                    "maxAmount": "-1",                    "exchangeRate": "0.95"                }            ]        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter                         | Type   | Description        |
| :-------------------------------- | :----- | :----------------- |
| coin                              | String | Assets             |
| exchangeRateList                  | List   | Tier exchange rate |
| \> tier                           | String | Tier               |
| \> minAmount                      | String | Min                |
| \> maxAmount                      | String | Max                |
| `-1` means there is no limitation |
| \> exchangeRate                   | String | Exchange rate      |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Exchange-Rate
