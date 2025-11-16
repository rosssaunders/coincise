# Assets overview

Frequency limit: 1 times/1s (User ID)

Assets overview

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/account/all-account-balance

Request Example

```
curl "https://api.bitget.com/api/v2/account/all-account-balance" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |

Response example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1712129301188,  "data": [    {      "accountType": "spot",      "usdtBalance": "326883.9190752508"    },    {      "accountType": "futures",      "usdtBalance": "280108.503808983783"    },    {      "accountType": "funding",      "usdtBalance": "0"    },    {      "accountType": "earn",      "usdtBalance": "142313.7"    },    {      "accountType": "bots",      "usdtBalance": "210.585022843422"    },    {      "accountType": "margin",      "usdtBalance": "54616.35774218"    }  ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter      | Type          | Description  |
| :------------- | :------------ | :----------- |
| data           | List<Object\> | assetsList   |
| \> accountType | String        | account Type |
| \> usdtBalance | String        | USDT amount  |

> **Source:** https://www.bitget.com/api-doc/common/account/All-Account-Balance
