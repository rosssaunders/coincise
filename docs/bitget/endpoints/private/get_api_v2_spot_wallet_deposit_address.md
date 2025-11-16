# Get Deposit Address

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Deposit Address

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/deposit-address

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-address?coin=USDT&chain=trc20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                                                                                                               | Type   | Required | Description                                                         |
| :---------------------------------------------------------------------------------------------------------------------- | :----- | :------- | :------------------------------------------------------------------ |
| coin                                                                                                                    | String | Yes      | Coin name, e.g. USDT                                                |
| All coin names can be returned from [Get Coin Info](https://www.bitget.com/api-doc/spot/market/Get-Coin-List) interface |
| chain                                                                                                                   | String | No       | Chain name, e.g. trc20                                              |
| You can get the chain names via [Get Coin Info](https://www.bitget.com/api-doc/spot/market/Get-Coin-List) interface     |
| size                                                                                                                    | String | No       | Bitcoin Lightning Network withdrawal amount，limit：0.000001 - 0.01 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "address": "xxx",        "chain": "BTC-Bitcoin",        "coin": "BTC",        "tag": "",        "url": "https://btc.com/xxx"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| address   | String | Deposit address    |
| chain     | String | chain name         |
| coin      | String | Token name         |
| tag       | String | Tag                |
| url       | String | blockchain address |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Deposit-Address
