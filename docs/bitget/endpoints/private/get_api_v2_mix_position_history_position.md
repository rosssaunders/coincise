# Get Historical Position

20times/S （uid）

### Description[​](#description "Direct link to Description")

Check position history (Only check the data within 3 months)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/position/history-position

Request

```
curl "https://api.bitget.com/api/v2/mix/position/history-position?productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | No | Trading pair |
| productType | String | No | Product type, default:`USDT-FUTURES`, if symbol parameter reuqest, then this parameter will not take effect  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface. |
| startTime | String | No | Start time(timestamp in milliseconds)  
timestampis Unix time in milliseconds，for example 1597026383085  
（Wildest time range is 3 months，if this field is empty then the default time range is 3 months.） |
| endTime | String | No | Start time (timestamp in milliseconds)  
timestampis Unix time in milliseconds，for example 1597026383085  
（Wildest time range is 3 months，if this field is empty then the default time range is 3 months.） |
| limit | String | No | Default 20 Max 100 |

Response

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1312312312321,
  "data": {
    "list": [
      {
        "positionId": "xxxxxxxxxxx",
        "marginCoin": "USDT",
        "symbol": "BTCUSDT",
        "holdSide": "long",
        "openAvgPrice": "32000",
        "closeAvgPrice": "32500",
        "marginMode": "isolated",
        "openTotalPos": "0.01",
        "closeTotalPos": "0.01",
        "pnl": "14.1",
        "netProfit": "12.1",
        "totalFunding": "0.1",
        "openFee": "0.01",
        "closeFee": "0.01",
        "posMode": "one_way_mode",
        "ctime": "1988824171000",
        "utime": "1988824171000"
      }
    ],
    "endId": "23423432423423234"
  }
}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| list | Array | Historical Position Data |
| \>positionId | String | History position ID |
| \>symbol | String | Trading pair |
| \>marginCoin | String | Margin coin |
| \>holdSide | String | Position direction  
long: long position  
short: short position |
| \>posMode | String | Position mode  
`one_way_mode`: positions in one-way mode  
`hedge_mode`: positions in hedge-mode |
| \>openAvgPrice | String | Average price of opening position |
| \>closeAvgPrice | String | Average price of closing position |
| \>marginMode | String | Margin Mode  
`isolated`: Isolated margin  
`crossed`: Cross margin |
| \>openTotalPos | String | Accumulated amount of long positions |
| \>closeTotalPos | String | Accumulated amount of short positions |
| \>pnl | String | realized profit and loss |
| \>netProfit | String | net profit |
| \>totalFunding | String | Accumulated funding costs |
| \>openFee | String | Total handling fee for position opening |
| \>closeFee | String | Total handling fee for position closing |
| \>uTime | String | Last update time Timestamp milliseconds |
| \>cTime | String | Create time Timestamp milliseconds |
| endId | String | ID of the last data。id value is tracking No and use it to check based on idLessThan |

> **Source:** https://www.bitget.com/api-doc/contract/position/Get-History-Position
