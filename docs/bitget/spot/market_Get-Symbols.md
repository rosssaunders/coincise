# Get Symbol Info

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot trading pair information,supporting both individual and full queries

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/public/symbols

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/symbols"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | No       | trading pair name, e.g. BTCUSDT<br>If the field is left blank, all trading pair information will be returned by default |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1744276707885,  "data": [    {      "symbol": "BTCUSDT",      "baseCoin": "BTC",      "quoteCoin": "USDT",      "minTradeAmount": "0",      "maxTradeAmount": "900000000000000000000",      "takerFeeRate": "0.002",      "makerFeeRate": "0.002",      "pricePrecision": "2",      "quantityPrecision": "6",      "quotePrecision": "8",      "status": "online",      "minTradeUSDT": "1",      "buyLimitPriceRatio": "0.05",      "sellLimitPriceRatio": "0.05",      "areaSymbol": "no",      "orderQuantity": "200",      "openTime": "1532454360000",      "offTime": ""    }  ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter           | Type   | Description                                                                                                                                          |
| :------------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | String | Trading pair                                                                                                                                         |
| baseCoin            | String | Base currency, e.g. "BTC" in the pair "BTCUSDT".                                                                                                     |
| quoteCoin           | String | Quoting currency, e.g. "USDT" in the trading pair "BTCUSDT".                                                                                         |
| minTradeAmount      | String | Minimum order(obsolete)<br>Please refer to <code>minTradeUSDT</code>                                                                                 |
| maxTradeAmount      | String | Maximum order(obsolete)<br>The maximum quantity is generally unlimited                                                                               |
| takerFeeRate        | String | Default taker transaction fee, can be overridden by individual transaction fee                                                                       |
| makerFeeRate        | String | Default maker transaction fee, can be overridden by individual transaction fee                                                                       |
| pricePrecision      | String | Pricing precision                                                                                                                                    |
| quantityPrecision   | String | Amount precision                                                                                                                                     |
| quotePrecision      | String | Quote coin precision                                                                                                                                 |
| minTradeUSDT        | String | Minimum trading volume (USDT)                                                                                                                        |
| status              | String | Symbol status<br><code>offline</code>: offline<br><code>gray</code>: grey scale<br><code>online</code>: normal<br><code>halt</code>: suspend trading |
| buyLimitPriceRatio  | String | Percentage spread between bid and ask, in decimal form<br>E.g. 0.05 means 5%                                                                         |
| sellLimitPriceRatio | String | Percentage spread between sell and current price, in decimal form<br>E.g. 0.05 means 5%                                                              |
| orderQuantity       | String | The maximum number of orders allowed for the current symbol                                                                                          |
| areaSymbol          | String | Area symbol<br><code>yes</code>, <code>no</code>                                                                                                     |
| offTime             | String | Symbol off time, e.g: 1744797600000                                                                                                                  |
| openTime            | String | This field has been deprecated                                                                                                                       |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Symbols
