# Get Trade Rate

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Trade Rate

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/common/trade-rate

Request Example

```
curl "https://api.bitget.com/api/v2/common/trade-rate?symbol=BTCUSDT&business=mix" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair name, e.g. BTCUSDT 
| businessType | String | Yes | Business type<br>mix contract<br>spot Spot<br>margin leverage 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "makerFeeRate": "0.0002",        "takerFeeRate": "0.0006"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| makerRate | String | Pending Order Handling Rates<br>Fractional form, i.e., 0.0002 for two parts per million 
| takerFeeRate | String | Taking Order Handling Rates<br>Fractional form, i.e., 0.0002 for two parts per million

> **Source:** https://www.bitget.com/api-doc/common/public/Get-Trade-Rate
