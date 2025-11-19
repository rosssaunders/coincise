# Get P2P Merchant List

Rate limit:10 requests/s (UID)

### Description[​](#description "Direct link to Description")

Get P2P merchant list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/p2p/merchantList

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/merchantList?online=yes&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| online | String | No | Whether online?  
yes: online  
no: offline |
| idLessThan | String | No | The minMerchantId returned from the previous query.  
Returns data whose ID is less than the entry parameter. |
| limit | String | No | Number of queries  
The default value is 100 |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1681195810516,
  "data": {
    "merchantList": [
      {
        "registerTime": "1678674575000",
        "nickName": "test1",
        "isOnline": "no",
        "avgPaymentTime": "0",
        "avgReleaseTime": "0",
        "totalTrades": "0",
        "totalBuy": "0",
        "totalSell": "0",
        "totalCompletionRate": "0",
        "trades30d": "8",
        "sell30d": "4",
        "buy30d": "4",
        "completionRate30d": "0.8"
      }
    ],
    "minMerchantId": "1"
  }
}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| \> merchantList | Array | Merchant list |
| \> registerTime | String | Registration time |
| \> nickName | String | Alias |
| \> isOnline | String | Whether online |
| \> avgPaymentTime | String | Average payment time  
(in minutes) |
| \> avgReleaseTime | String | Average time to release coins  
(in minutes) |
| \> totalTrades | String | Total traded orders |
| \> totalBuy | String | Total number of purchase orders |
| \> totalSell | String | Total number of sell orders |
| \> totalCompletionRate | String | Total execution rate |
| \> trades30d | String | 30-day trading volume |
| \> sell30d | String | 30-day sell orders |
| \> buy30d | String | 30-day purchase orders |
| \> completionRate30d | String | 30-day close rate |
| minMerchantId | String | Returns the smallest merchantId in the result |

> **Source:** https://www.bitget.com/api-doc/common/p2p/Get-P2P-Merchant-List
