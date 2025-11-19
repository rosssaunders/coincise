# Get VIP Fee Rate

Frequency limit: 10 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get VIP Fee Rate

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/market/vip-fee-rate

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/vip-fee-rate"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1675759699382,
  "data": [
    {
      "level": 1,
      "dealAmount": "1000000",
      "assetAmount": "50000",
      "takerFeeRate": "0",
      "makerFeeRate": "0",
      "btcWithdrawAmount": "300",
      "usdtWithdrawAmount": "5000000"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| level | String | VIP level |
| dealAmount | String | Total trading volume in last 30 days, USDT |
| assetAmount | String | Total assets in USDT |
| takerFeeRate | String | Taker fee. Refer to the official announcement for the real rate when 0 is shown. |
| makerFeeRate | String | Maker fee. Refer to the official announcement for the real rate when 0 is shown. |
| btcWithdrawAmount | String | 24-hour withdrawal limit in BTC |
| usdtWithdrawAmount | String | 24-hour withdrawal limit in USDT |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-VIP-Fee-Rate
