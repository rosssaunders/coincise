# Get All Positions

Rate limit: 5 requests/sec/UID

### Description[​](#description "Direct link to Description")

Returns information about all current positions with the given `productType`

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/position/all-position

Request Example

```
curl "https://api.bitget.com/api/v2/mix/position/all-position?productType=USDT-FUTURES&marginCoin=USDT" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| marginCoin | String | No | Margin coin, capitalized. e.g. USDT 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 21312312312321,    "data": [        {            "marginCoin": "USDT",            "symbol": "BTCUSDT",            "holdSide": "long",            "openDelegateSize": "0.01",            "marginSize": "9.6695050093373343",            "available": "0.01",            "locked": "0.09",            "total": "0.01",            "leverage": "20",            "achievedProfits": "0",            "openPriceAvg": "25000",            "marginMode": "isolated",            "posMode": "hedge_mode",            "unrealizedPL": "1",            "liquidationPrice": "24144.1124161806977798",            "keepMarginRate": "0.004",            "markPrice": "25100",            "breakEvenPrice": "24778.97",            "totalFee": "1.45",            "deductedFee": "0.388",            "takeProfit": "3",            "stopLoss": "2",            "takeProfitId": "11111111",            "stopLossId": "11111111",            "marginRatio": "0.1082149545822005",            "assetMode":"single",            "cTime": "1691382137448",            "uTime": "1691382137999"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| &gt;symbol | String | Trading pair name 
| &gt;marginCoin | String | Margin coin 
| &gt;holdSide | String | Position direction<br><code>long</code>: long position<br><code>short</code>: short position 
| &gt;openDelegateSize | String | Amount to be filled of the current order (base coin) 
| &gt;marginSize | String | Margin amount (margin coin) 
| &gt;available | String | Available amount for positions (base currency) 
| &gt;locked | String | Frozen amount in the position (base currency) 
| &gt;total | String | Total amount of all positions (available amount + locked amount) 
| &gt;leverage | String | Leverage 
| &gt;achievedProfits | String | Realized PnL(exclude the funding fee and transaction fee) 
| &gt;openPriceAvg | String | Average entry price 
| &gt;marginMode | String | Margin mode<br><code>isolated</code>: isolated margin<br><code>crossed</code>: cross margin 
| &gt;posMode | String | Position mode<br><code>one_way_mode</code> positions in one-way mode<br><code>hedge_mode</code> positions in hedge-mode 
| &gt;unrealizedPL | String | Unrealized PnL 
| &gt;liquidationPrice | String | Estimated liquidation price<br>If the value &lt;= 0, it means the position is at low risk and there is no liquidation price at this time 
| &gt;keepMarginRate | String | Tiered maintenance margin rate 
| &gt;markPrice | String | Mark price 
| &gt;marginRatio | String | Maintenance margin rate (MMR), 0.1 represents 10% 
| &gt;breakEvenPrice | String | Position breakeven price 
| &gt;totalFee | String | Funding fee, the accumulated value of funding fee during the position,The initial value is empty, indicating that no funding fee has been charged yet. 
| &gt;takeProfit | String | Take profit price 
| &gt;stopLoss | String | Stop loss price 
| &gt;takeProfitId | String | Take profit order ID 
| &gt;stopLossId | String | Stop loss order ID 
| &gt;deductedFee | String | Deducted transaction fees: transaction fees deducted during the position 
| &gt;cTime | String | Creation time, timestamp, milliseconds<br>The set is in descending order from the latest time. 
| &gt;assetMode | String | <code>single</code> : single asset mode<br><code>union</code> multi-Assets mode 
| &gt;uTime | String | Last updated time, timestamp, milliseconds

> **Source:** https://www.bitget.com/api-doc/contract/position/get-all-position
