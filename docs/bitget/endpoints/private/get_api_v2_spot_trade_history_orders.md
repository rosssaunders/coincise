# Get History Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get History Orders(It only supports to get the data within 90days. The older data can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/trade/history-orders

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/history-orders?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### request parameter[​](#request-parameter "Direct link to request parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | No | Trading pair |
| startTime | String | No | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868. (For Managed Sub-Account, the StartTime cannot be earlier than the binding time) |
| endTime | String | No | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868 |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit | String | No | Limit number default 100 max 100 |
| orderId | String | No | OrderId |
| tpslType | String | No | order type deafult `normal`  
`normal` spot order  
`tpsl` spot tpsl order |
| requestTime | String | No | request Time Unix millisecond timestamp |
| receiveWindow | String | No | valid window period Unix millisecond timestamp Unix millisecond timestamp |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695808949356,
  "data": [
    {
      "userId": "*********",
      "symbol": "ETHUSDT",
      "orderId": "*****************************",
      "clientOid": "*****************************",
      "price": "0",
      "size": "20.0000000000000000",
      "orderType": "market",
      "side": "buy",
      "status": "filled",
      "priceAvg": "1598.1000000000000000",
      "baseVolume": "0.0125000000000000",
      "quoteVolume": "19.9762500000000000",
      "enterPointSource": "WEB",
      "feeDetail": "{\"newFees\":{\"c\":0,\"d\":0,\"deduction\":false,\"r\":-0.112079256,\"t\":-0.112079256,\"totalDeductionFee\":0},\"USDT\":{\"deduction\":false,\"feeCoinCode\":\"ETH\",\"totalDeductionFee\":0,\"totalFee\":-0.1120792560000000}}",
      "orderSource": "market",
      "cTime": "1698736299656",
      "uTime": "1698736300363",
      "tpslType": "normal",
      "cancelReason": "",
      "triggerPrice": null
    }
  ]
}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| userId | String | User id |
| symbol | String | Trading pair name |
| orderId | String | Order ID |
| clientOid | String | Client Order ID |
| price | String | Order price |
| size | String | Amount  
(orderType = `limit` means base coin; orderType = `market` means quote coin) |
| orderType | String | Order type  
limit Limit price  
market Market price |
| side | String | Direction |
| status | String | Order status  
`live`:unfilled;  
`partially_filled`:partially filled;  
`filled`:filled;  
`cancelled`:cancelled; |
| priceAvg | String | Average fill price |
| baseVolume | String | Filled volume (base coin) |
| quoteVolume | String | Filled volume (quote coin) |
| enterPointSource | String | Client  
WEB WEB Client  
APP APP Client  
API API Client  
SYS SYS Client  
ANDROID ANDROID Client  
IOS IOS Client |
| orderSource | String | Order source  
normal Normal order  
market Market order  
spot\_trader\_buy Elite spot trade to buy (elite traders)  
spot\_follower\_buy Copy trade to buy (followers)  
spot\_trader\_sell Elite spot trade to sell (elite traders)  
spot\_follower\_sell Copy trade to sell (followers) |
| cTime | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868 |
| uTime | String | Update time, Unix millisecond timestamp, e.g. 1690196141868 |
| feeDetail | String | Fee details. If there is a "newFees" field, then "newFees" represents the fee details. If not, the remaining information is the fee details. |
| \> newFees | String | Fee details for "newFees". |
| \>\> c | String | Amount deducted by coupons, unit：currency obtained from the transaction. |
| \>\> d | String | Amount deducted in BGB (Bitget Coin), unit：BGB |
| \>\> r | String | If the BGB balance is insufficient to cover the fees, the remaining amount is deducted from the currency obtained from the transaction. |
| \>\> t | String | The total fee amount to be paid, unit ：currency obtained from the transaction. |
| \>\> deduction | String | Ignore. |
| \>\> totalDeductionFee | String | Ignore. |
| \> BGB | String | If there is no "newFees" field, this data represents earlier historical data. This key represents the currency used for fee deduction (it is not fixed; if BGB deduction is enabled, it's BGB, otherwise, it's the currency obtained from the transaction). |
| \>\> deduction | String | Whether there is a fee deduction. |
| \>\> feeCoinCode | String | Transaction fee coin code |
| \>\> totalDeductionFee | String | Deduction amount unit： BGB |
| \>\> totalFee | String | The total fee amount to be paid, unit：currency obtained from the transaction. |
| triggerPrice | String | spot tpsl trigger price |
| tpslType | String | `normal` spot order  
`tpsl` spot tpsl order |
| cancelReason | String | Cancel reason  
`normal_cancel`: Normal cancel  
`stp_cancel`: Cancelled by STP |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Get-History-Orders
