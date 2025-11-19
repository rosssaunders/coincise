# Get Fills

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Fills(It only supports to get the data within 90days.The older data can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/trade/fills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/fills?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \    -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \  
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | No | Trading pair name |
| orderId | String | No | Order ID |
| startTime | String | No | The start time of the orders, i.e. to get orders after that timestamp  
Unix millisecond timestamp, e.g. 1690196141868. (For Managed Sub-Account, the StartTime cannot be earlier than the binding time) |
| endTime | String | No | The end time of a fulfilled order, i.e., get orders prior to that timestamp  
Unix millisecond timestamp, e.g. 1690196141868  
The interval between startTime and endTime must not exceed 90 days. |
| limit | String | No | Number of results returned: Default: 100, max 100 |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the tradeId of the corresponding interface. |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695865274510,
  "data": [
    {
      "userId": "**********",
      "symbol": "BTCUSDT",
      "orderId": "12345678910",
      "tradeId": "12345678910",
      "orderType": "market",
      "side": "buy",
      "priceAvg": "13000",
      "size": "0.0007",
      "amount": "9.1",
      "feeDetail": {
        "deduction": "no",
        "feeCoin": "BTC",
        "totalDeductionFee": "",
        "totalFee": "-0.0000007"
      },
      "tradeScope": "taker",
      "cTime": "1695865232579",
      "uTime": "1695865233027"
    }
  ]
}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| userId | String | Account ID |
| symbol | String | Trading pair name |
| orderId | String | Order ID |
| tradeId | String | Transaction id |
| orderType | String | Order type |
| side | String | Order direction |
| priceAvg | String | Filled price |
| size | String | Filled quantity |
| amount | String | Total trading amount () |
| cTime | String | Creation time  
Unix second timestamp, e.g. 1622697148 |
| uTime | String | Update time  
Unix second timestamp, e.g. 1622697148 |
| tradeScope | String | Trader tag  
taker Taker  
maker Maker |
| feeDetail | Object | Transaction fee breakdown |
| \>deduction | String | Discount or not |
| \>feeCoin | String | Transaction fee coin |
| \>totalDeductionFee | String | Total transaction fee discount |
| \>totalFee | String | Total transaction fee |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Get-Fills
