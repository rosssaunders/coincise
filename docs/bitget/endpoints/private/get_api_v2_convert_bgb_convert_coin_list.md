# Get BGB Convert Coins

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get a list of Convert Bgb Currencies

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/convert/bgb-convert-coin-list

Request Example

```
curl "https://api.bitget.com/api/v2/convert/bgb-convert-coin-list" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1703831563264,    "data": {        "coinList": [            {                "coin": "SEAM",                "available": "0.00303329",                "bgbEstAmount": "0.03794680",                "precision": "8",                "feeDetail": [                    {                        "feeRate": "0.02",                        "fee": "0.00075893"                    }                ],                "cTime": "1703831563514"            }        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type   | Description                                 |
| :----------- | :----- | :------------------------------------------ |
| coin         | String | Token name                                  |
| available    | String | Currency accounts available                 |
| bgbEstAmount | String | Expected number of BGB redeemable           |
| precision    | String | bgb scale                                   |
| feeDetail    | String | fee detail                                  |
| \> feeRate   | String | fee rate                                    |
| \> fee       | String | fee                                         |
| cTime        | String | Currently Time (time stamp in milliseconds) |

> **Source:**
> https://www.bitget.com/api-doc/common/bgb-convert/Get-BGB-Convert-Coins
