# Get Kline

Query for historical klines (also known as candles/candlesticks). Charts are returned in groups based on the requested interval.

> **Covers: Spot / USDT contract / USDC contract / Inverse contract**

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/kline`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | false | string | Product type. `spot`,`linear`,`inverse`-   When `category` is not passed, use `linear` by default |
| [symbol](/docs/v5/enum#symbol) | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| [interval](/docs/v5/enum#interval) | **true** | string | Kline interval. `1`,`3`,`5`,`15`,`30`,`60`,`120`,`240`,`360`,`720`,`D`,`W`,`M` |
| start | false | integer | The start timestamp (ms) |
| end | false | integer | The end timestamp (ms) |
| limit | false | integer | Limit for data size per page. \[`1`, `1000`\]. Default: `200` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| category | string | Product type |
| symbol | string | Symbol name |
| list | array | 

-   Sort in reverse by `startTime`

 |
| \> list\[0\]: startTime | string | Start time of the candle (ms) |
| \> list\[1\]: openPrice | string | Open price |
| \> list\[2\]: highPrice | string | Highest price |
| \> list\[3\]: lowPrice | string | Lowest price |
| \> list\[4\]: closePrice | string | Close price. *Is the last traded price when the candle is not closed* |
| \> list\[5\]: volume | string | Trade volume-   USDT or USDC contract: unit is base coin (e.g., BTC)
-   Inverse contract: unit is quote coin (e.g., USD) |
| \> list\[6\]: turnover | string | Turnover.-   USDT or USDC contract: unit is quote coin (e.g., USDT)
-   Inverse contract: unit is base coin (e.g., BTC) |

[RUN >>](/docs/api-explorer/v5/market/kline)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
GET /v5/market/kline?category=inverse&symbol=BTCUSD&interval=60&start=1670601600000&end=1670608800000 HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_kline(    category="inverse",    symbol="BTCUSD",    interval=60,    start=1670601600000,    end=1670608800000,))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "spot", "symbol": "BTCUSDT", "interval": "1"}client.NewUtaBybitServiceWithParams(params).GetMarketKline(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var marketKLineRequest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").marketInterval(MarketInterval.WEEKLY).build();client.getMarketLinesData(marketKLineRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client    .getKline({        category: 'inverse',        symbol: 'BTCUSD',        interval: '60',        start: 1670601600000,        end: 1670608800000,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "symbol": "BTCUSD",
    "category": "inverse",
    "list": [
      [
        "1670608800000",
        "17071",
        "17073",
        "17027",
        "17055.5",
        "268611",
        "15.74462667"
      ],
      [
        "1670605200000",
        "17071.5",
        "17071.5",
        "17061",
        "17071",
        "4177",
        "0.24469757"
      ],
      [
        "1670601600000",
        "17086.5",
        "17088",
        "16978",
        "17071.5",
        "6356",
        "0.37288112"
      ]
    ]
  },
  "retExtInfo": {},
  "time": 1672025956592
}
```