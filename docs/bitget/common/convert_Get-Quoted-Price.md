# Get Quoted Price

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Quoted Price

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/convert/quoted-price

Request Example

```
curl "https://api.bitget.com/api/v2/convert/quoted-price?fromCoin=USDT&fromCoinSz=444&toCoin=ETH" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| fromCoin | String | Yes | Quote currency 
| fromCoinSize | String | No | Number of coins to inquire about fromCoinSz and toCoinSz are only allowed to be passed in at the same time. 
| toCoin | String | Yes | Target currency 
| toCoinSize | String | No | Number of target coins fromCoinSz and toCoinSz are only allowed to be passed in at the same time. 

Response Example

```
{    "code": "00000",    "data": {        "fee": "0",        "fromCoinSize": 100,        "fromCoin": "USDT",        "cnvtPrice": "0.0005226794534969",        "toCoinSize": "0.23206967",        "toCoin": "ETH",        "traceId": "1"    },    "msg": "success",    "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| fromCoin | String | Quote currency 
| fromCoinSize | String | Number of currencies 
| cnvtPrice | String | Swap price<br>Flash price = Quote currency price / Target currency price 
| toCoin | String | Target currency 
| toCoinSize | String | Number of target currencies 
| traceId | String | RFQ id 
| fee | String | Transaction fee

> **Source:** https://www.bitget.com/api-doc/common/convert/Get-Quoted-Price
