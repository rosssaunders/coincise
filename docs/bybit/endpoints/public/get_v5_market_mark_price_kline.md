# Get Mark Price Kline

Query for historical
[mark price](https://www.bybit.com/en-US/help-center/s/article/Glossary-Bybit-Trading-Terms)
klines. Charts are returned in groups based on the requested interval.

> **Covers: USDT contract / USDC contract / Inverse contract**

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/mark-price-kline`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type    | Comments                                                                                 |
| :--------------------------------- | :------- | :------ | ---------------------------------------------------------------------------------------- |
| [category](/docs/v5/enum#category) | false    | string  | Product type. `linear`,`inverse`- When `category` is not passed, use `linear` by default |
| symbol                             | **true** | string  | Symbol name, like `BTCUSDT`, uppercase only                                              |
| [interval](/docs/v5/enum#interval) | **true** | string  | Kline interval. `1`,`3`,`5`,`15`,`30`,`60`,`120`,`240`,`360`,`720`,`D`,`M`,`W`           |
| start                              | false    | integer | The start timestamp (ms)                                                                 |
| end                                | false    | integer | The end timestamp (ms)                                                                   |
| limit                              | false    | integer | Limit for data size per page. \[`1`, `1000`\]. Default: `200`                            |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments     |
| :-------- | :----- | ------------ |
| category  | string | Product type |
| symbol    | string | Symbol name  |
| list      | array  |

- Sort in reverse by `startTime`

| | \> list\[0\]: startTime | string | Start time of the candle (ms) | | \>
list\[1\]: openPrice | string | Open price | | \> list\[2\]: highPrice | string
| Highest price | | \> list\[3\]: lowPrice | string | Lowest price | | \>
list\[4\]: closePrice | string | Close price. _Is the last traded price when the
candle is not closed_ |

[RUN >>](/docs/api-explorer/v5/market/mark-kline)

---

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/market/mark-price-kline?category=linear&symbol=BTCUSDT&interval=15&start=1670601600000&end=1670608800000&limit=1 HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_mark_price_kline(    category="linear",    symbol="BTCUSDT",    interval=15,    start=1670601600000,    end=1670608800000,    limit=1,))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "spot", "symbol": "BTCUSDT", "interval": "1"}client.NewUtaBybitServiceWithParams(params).GetMarkPriceKline(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var marketKLineRequest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").marketInterval(MarketInterval.WEEKLY).build();client.getMarketPriceLinesData(marketKLineRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({ testnet: true })
client
  .getMarkPriceKline({
    category: "linear",
    symbol: "BTCUSD",
    interval: "15",
    start: 1670601600000,
    end: 1670608800000,
    limit: 1
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "symbol": "BTCUSDT",
    "category": "linear",
    "list": [["1670608800000", "17164.16", "17164.16", "17121.5", "17131.64"]]
  },
  "retExtInfo": {},
  "time": 1672026361839
}
```
