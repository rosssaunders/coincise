# Get spot fund flow

Rate limit: 1 req/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot fund flow

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/market/fund-flow

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fund-flow?symbol=BTCUSDT&period=1d"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pairs, BTCUSDT |
| period | String | No | Query period: 15m(default),30m,1h,2h,4h,1d |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": {        "whaleBuyVolume": "50.901579",        "dolphinBuyVolume": "1.506897",        "fishBuyVolume": "0.529853",        "whaleSellVolume": "50.635982",        "dolphinSellVolume": "1.429034",        "fishSellVolume": "0.344032",        "whaleBuyRatio": "50.901579",        "dolphinBuyRatio": "1.506897",        "fishBuyRatio": "0.529853",        "whaleSellRatio": "50.635982",        "dolphinSellRatio": "1.429034",        "fishSellRatio": "0.344032"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| whaleBuyVolume | String | Whale buy volume |
| dolphinBuyVolume | String | Dolphin Buy Volume |
| fishBuyVolume | String | Fish Buy Volume |
| whaleSellVolume | String | Whale Sell Volume |
| dolphinSellVolume | String | Dolphin Sell Volume |
| fishSellVolume | String | Fish Sell Volume |
| whaleBuyRatio | String | Whale Buy Ratio |
| dolphinBuyRatio | String | Dolphin Buy Ratio |
| fishBuyRatio | String | Fish Buy Ratio |
| whaleSellRatio | String | Whale Sell Ratio |
| dolphinSellRatio | String | Dolphin Sell Ratio |
| fishSellRatio | String | Fish Sell Ratio |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Get-Spot-Fund-Flow
