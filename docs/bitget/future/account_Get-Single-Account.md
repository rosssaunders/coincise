# Get Single Account

Frequency limit: 10 times/1s (uid)

### Description[​](#description "Direct link to Description")

Get account details with the given 'marginCoin' and 'productType'

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/account/account

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/account?symbol=btcusdt&productType=USDT-FUTURES&marginCoin=usdt" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| marginCoin | String | Yes | Margin coin 

Response Example

```
{  "code": "00000",  "data": {    "marginCoin": "USDT",    "locked": "0",    "available": "13168.86110692",    "crossedMaxAvailable": "13168.86110692",    "isolatedMaxAvailable": "13168.86110692",    "maxTransferOut": "13168.86110692",    "accountEquity": "13178.86110692",    "usdtEquity": "13178.861106922",    "btcEquity": "0.344746495477",    "crossedRiskRate": "0",    "crossedMarginLeverage": "20",    "isolatedLongLever": "20",    "isolatedShortLever": "20",    "marginMode": "crossed",    "posMode": "hedge_mode",    "unrealizedPL": "",    "coupon": "0",    "crossedUnrealizedPL":"23",    "isolatedUnrealizedPL":"0",    "assetMode": "union"  },  "msg": "success",  "requestTime": 1627292199523}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| &gt;marginCoin | String | Margin coin 
| &gt;locked | String | Locked quantity (margin coin). Lockup will be triggered when there is a position to be closed. 
| &gt;available | String | Available quantity in the account 
| &gt;crossedMaxAvailable | String | Maximum available balance to open positions under the cross margin mode (margin coin) 
| &gt;isolatedMaxAvailable | String | Maximum available balance to open positions under the isolated margin mode (margin coin) 
| &gt;maxTransferOut | String | Maximum transferable amount 
| &gt;accountEquity | String | Account equity (margin coin), including unrealized PnL (based on mark price) 
| &gt;usdtEquity | String | Account equity in USDT 
| &gt;btcEquity | String | Account equity in BTC 
| &gt;crossedRiskRate | String | Risk ratio in cross margin mode 
| &gt;crossedMarginLeverage | String | Leverage in cross margin mode 
| &gt;isolatedLongLever | String | Leverage of long positions in isolated margin mode 
| &gt;isolatedShortLever | String | Leverage of short positions in isolated margin mode 
| &gt;marginMode | String | Margin mode.<br>isolated – isolated margin mode;<br>crossed – cross margin mode 
| &gt;posMode | String | Position mode<br>one_way_mode: one-way mode<br>hedge_mode: hedge mode 
| &gt;unrealizedPL | String | Unrealized PnL 
| &gt;coupon | String | Trading bonus 
| &gt;crossedUnrealizedPL | String | unrealizedPL for croessed 
| &gt;isolatedUnrealizedPL | String | unrealizedPL for isolated 
| &gt;assetMode | String | Assets mode<br><code>union</code> Multi-assets mode<br><code>single</code> Single-assets mode

> **Source:** https://www.bitget.com/api-doc/contract/account/Get-Single-Account
