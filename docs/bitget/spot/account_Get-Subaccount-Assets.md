# Get Sub-accounts Assets

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Sub-accounts Assets(only return the sub-accounts which assets > 0).  
**ND Brokers are not allowed to call this endpoint**

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/subaccount-assets

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/subaccount-assets" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                                                          |
| :--------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| idLessThan | String | No       | Cursor ID<br>Pagination cursor. Do not pass it in the first request. For subsequent requests, pass the last ID returned previously.. |
| limit      | String | No       | The number of sub-accounts returned per page.<br>The default value is 10, and the maximum value is 50.                               |

Response Example

```
{  "code": "00000",  "message": "success",  "requestTime": 1695808949356,  "data": [    {      "id": 1111,      "userId": 1234567890,      "assetsList": [        {          "coin": "BTC",          "available": "1.1",          "limitAvailable": "12.1",          "frozen": "0",          "locked": "1.1",          "uTime": "1337654897651"        }      ]    },    {      "id": 2222,      "userId": 1234567890,      "assetsList": [        {          "coin": "ETH",          "available": "12.1",          "limitAvailable": "12.1",          "frozen": "0",          "locked": "1.1",          "uTime": "1337654897651"        }      ]    }  ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter           | Type   | Description                                      |
| :------------------ | :----- | :----------------------------------------------- |
| id                  | String | Cursor ID                                        |
| userId              | String | User ID                                          |
| assetsList          | Array  | List of spot assets                              |
| &gt; coin           | String | Token name                                       |
| &gt; available      | String | Available assets                                 |
| &gt; limitAvailable | String | Restricted availability<br>For spot copy trading |
| &gt; frozen         | String | Assets frozen                                    |
| &gt; locked         | String | Assets locked                                    |
| &gt; uTime          | string | update time, Unix, ms                            |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Subaccount-Assets
