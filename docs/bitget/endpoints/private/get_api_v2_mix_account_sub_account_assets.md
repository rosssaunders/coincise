# Get Subaccount Assets

Frequency limit: 1 time/10s (uid)

### Description[​](#description "Direct link to Description")

Query the contract asset information of all sub-accounts. **ND Brokers are not
allowed to call this endpoint**

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/account/sub-account-assets

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/sub-account-assets?productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description  |
| :---------- | :----- | :------- | :----------- |
| productType | String | Yes      | Product type |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |

Response Example

```
{    "code": "00000",    "data": [        {            "userId": 1234567890,            "assetList": [                {                    "marginCoin": "USDT",                    "locked": "0",                    "available": "23.123",                    "crossedMaxAvailable": "23.123",                    "isolatedMaxAvailable": "23.123",                    "maxTransferOut": "23.123",                    "accountEquity": "23.123",                    "usdtEquity": "23.123",                    "btcEquity": "0.001403612744",                    "unrealizedPL": "0",                    "coupon": ""                }            ]        },        {            "userId": 1234567890,            "assetList": [                {                    "marginCoin": "USDT",                    "locked": "0",                    "available": "11",                    "crossedMaxAvailable": "11",                    "isolatedMaxAvailable": "11",                    "maxTransferOut": "11",                    "accountEquity": "11",                    "usdtEquity": "11",                    "btcEquity": "0.000667722189",                    "unrealizedPL": "0",                    "coupon": ""                }            ]        }    ],    "msg": "success",    "requestTime": 1630901215622}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter                | Type   | Description                                                                              |
| :----------------------- | :----- | :--------------------------------------------------------------------------------------- |
| \>userId                 | String | Sub account userId                                                                       |
| \>assetList              | String | Collection of all futures assets under sub-accounts                                      |
| \>\>marginCoin           | String | Margin coin                                                                              |
| \>\>locked               | String | Locked quantity (margin coin)                                                            |
| \>\>available            | String | Available quantity in the account                                                        |
| \>\>crossedMaxAvailable  | String | Maximum available balance to open positions under the cross margin mode (margin coin)    |
| \>\>isolatedMaxAvailable | String | Maximum available balance to open positions under the isolated margin mode (margin coin) |
| \>\>maxTransferOut       | String | Maximum transferable amount                                                              |
| \>\>equity               | String | Account equity (margin coin)                                                             |
| \>\>usdtEquity           | String | Account equity in USDT                                                                   |
| \>\>btcEquity            | String | Account equity in BTC                                                                    |
| \>\>unrealizedPL         | String | PnL of open positions                                                                    |
| \>\>coupon               | String | Trading bonus                                                                            |

> **Source:**
> https://www.bitget.com/api-doc/contract/account/Get-Sub-Account-Contract-Assets
