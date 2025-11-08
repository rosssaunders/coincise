# Change Leverage

Frequency limit: 5 times/1s (uid)

### Description[​](#description "Direct link to Description")

Adjust the leverage on the given symbol and productType

Note: When adjusting leverage in cross margin mode, please use the leverage parameter instead of `longLeverage` or `shortLeverage`. Currently, there is no mandatory validation for `longLeverage` and `shortLeverage`. If these two parameters are passed in cross margin mode, they will still take effect, with `longLeverage` taking priority.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/mix/account/set-leverage

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/account/set-leverage" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol":"btcusdt","productType":"USDT-FUTURES","marginCoin":"usdt","leverage":"20","holdSide":"long"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| marginCoin | String | Yes | Margin coin must be capitalized 
| leverage | String | No | Leverage ratio<br>- Applicable to cross-margin mode<br>- Applicable to one-way position scenarios in isolated margin mode<br>- Applicable to scenarios where the same leverage ratio is set for different directions under hedge-mode in isolated margin mode 
| longLeverage | String | No | Long position leverage<br>- Only applicable to scenarios where different leverage ratios are set for different directions under hedge-mode in isolated margin mode<br>- In two-way position scenarios, if both leverage and longLeverage parameters are passed, longLeverage will take effect and leverage will be ignored 
| shortLeverage | String | No | Short position leverage<br>- Only applicable to scenarios where different leverage ratios are set for different directions under hedge-mode in isolated margin mode<br>- In two-way position scenarios, if both leverage and shortLeverage parameters are passed, shortLeverage will take effect and leverage will be ignored 
| holdSide | String | No | Position direction<br><code>long</code>： Long position；<br><code>short</code>：Short position<br>Cross-margin mode: The holdSide parameter does not need to be filled in<br>Isolated margin mode: For one-way positions, the holdSide parameter does not need to be filled in; for hedge-mode, the holdSide parameter must be filled in. And when long and short leverages are set simultaneously for hedge-mode, holdSide is not required 

Response Example

```
{  "code": "00000",  "data": {    "symbol": "BTCUSDT",    "marginCoin": "USDT",    "longLeverage": "25",    "shortLeverage": "20",    "crossMarginLeverage": "20",    "marginMode": "crossed"  },  "msg": "success",  "requestTime": 1627293049406}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| symbol | String | Trading pair name 
| marginCoin | String | Margin coin 
| longLeverage | String | Leverage of long positions 
| shortLeveage | String | Leverage of short positions 
| crossMarginLeverage | String | Leverage of 'crossed' margin mode 
| marginMode | String | Margin mode.<br>isolated – isolated margin mode;<br>crossed – cross margin mode

> **Source:** https://www.bitget.com/api-doc/contract/account/Change-Leverage
