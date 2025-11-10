# Get Contract Config

Rate Limit: 20 req/sec/IP

### Description[​](#description "Direct link to Description")

Interface is used to get future contract details.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/contracts

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/contracts?productType=usdt-futures&symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | No | Trading pair, based on the symbolName, i.e. BTCUSDT |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695793701269,    "data": [        {            "symbol": "BTCUSDT",            "baseCoin": "BTC",            "quoteCoin": "USDT",            "buyLimitPriceRatio": "0.9",            "sellLimitPriceRatio": "0.9",            "feeRateUpRatio": "0.1",            "makerFeeRate": "0.0004",            "takerFeeRate": "0.0006",            "openCostUpRatio": "0.1",            "supportMarginCoins": [                "USDT"            ],            "minTradeNum": "0.01",            "priceEndStep": "1",            "volumePlace": "2",            "pricePlace": "1",            "sizeMultiplier": "0.01",            "symbolType": "perpetual",            "minTradeUSDT": "5",            "maxSymbolOrderNum": "999999",            "maxProductOrderNum": "999999",            "maxPositionNum": "150",            "symbolStatus": "normal",            "offTime": "-1",            "limitOpenTime": "-1",            "deliveryTime": "",            "deliveryStartTime": "",            "launchTime": "",            "fundInterval": "8",            "minLever": "1",            "maxLever": "125",            "posLimit": "0.05",            "maintainTime": "1680165535278",            "maxMarketOrderQty": "220",            "maxOrderQty": "1200"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| \> symbol | String | Product name |
| \> baseCoin | String | Base currency  
Specifically refers to ETH as in ETHUSDT |
| \> quoteCoin | String | Quote currency  
Specifically refers to USDT as in ETHUSDT |
| \> buyLimitPriceRatio | String | Ratio of bid price to limit price |
| \> sellLimitPriceRatio | String | Ratio of ask price to limit price |
| \> feeRateUpRatio | String | Transaction fee increase ratio |
| \> makerFeeRate | String | Maker rate |
| \> takerFeeRate | String | Taker rate |
| \> openCostUpRatio | String | Opening cost increase ratio |
| \> \>supportMarginCoins | List<String\> | Supported margin coins |
| \> minTradeNum | String | Minimum opening amount (base currency) |
| \> priceEndStep | String | price step length |
| \> volumePlace | String | Decimal places of the quantity |
| \> pricePlace | String | Decimal places of the price |
| \> sizeMultiplier | String | Quantity multiplier, the quantity of the order must be greater than minTradeNum and is a multiple of sizeMulti. |
| \> symbolType | String | Futures types: perpetual; delivery |
| \> minTradeUSDT | String | Minimum USDT transaction amount |
| \> maxSymbolOrderNum | String | Maximum number of orders held-symbol dimension |
| \> maxProductOrderNum | String | Maximum number of held orders-product type dimension |
| \> maxPositionNum | String | Maximum number of positions held |
| \> symbolStatus | String | Trading pair status  
`listed` Listing symbol  
`normal` trade normal  
`maintain` can't open/close position  
`limit_open`: can't place orders(can close position)  
`restrictedAPI`:can't place orders with API  
`off`: offline |
| \> offTime | String | Removal time, '-1' means normal |
| \> limitOpenTime | String | Time to open positions, '-1' means normal; other values indicate that the symbol is under maintenance or to be maintained and trading is prohibited after the specified time. |
| \> deliveryTime | String | Delivery time |
| \> deliveryStartTime | String | Delivery start time |
| \> deliveryPeriod | String | Delivery period  
`this_quarter` current quarter  
`next_quarter` second quarter |
| \> launchTime | String | Listing time |
| \> fundInterval | String | Funding fee settlement cycle, hourly/every 8 hours |
| \> minLever | String | minimum leverage |
| \> maxLever | String | Maximum leverage |
| \> posLimit | String | Position limits |
| \> maintainTime | String | Maintenance time (there will be a value when the status is under maintenance/upcoming maintenance) |
| \> maxMarketOrderQty | String | Maximum order quantity for a single market order  
This refers to the maximum allowed quantity when placing an order using the base coin |
| \> maxOrderQty | String | Maximum order quantity for a single limit order  
This refers to the maximum allowed quantity when placing an order using the base coin |
| \> openTime | String | This field has been deprecated |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-All-Symbols-Contracts
