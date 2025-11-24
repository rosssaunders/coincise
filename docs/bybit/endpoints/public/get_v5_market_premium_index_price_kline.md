# Get Premium Index Price Kline

Query for historical
[premium index](https://www.bybit.com/data/basic/linear/index-price/premium-index?symbol=BTCUSDT)
klines. Charts are returned in groups based on the requested interval.

> **Covers: USDT and USDC perpetual**

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/premium-index-price-kline`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type    | Comments                                                                       |
| :--------------------------------- | :------- | :------ | ------------------------------------------------------------------------------ |
| [category](/docs/v5/enum#category) | false    | string  | Product type. `linear`                                                         |
| symbol                             | **true** | string  | Symbol name, like `BTCUSDT`, uppercase only                                    |
| [interval](/docs/v5/enum#interval) | **true** | string  | Kline interval. `1`,`3`,`5`,`15`,`30`,`60`,`120`,`240`,`360`,`720`,`D`,`W`,`M` |
| start                              | false    | integer | The start timestamp (ms)                                                       |
| end                                | false    | integer | The end timestamp (ms)                                                         |
| limit                              | false    | integer | Limit for data size per page. \[`1`, `1000`\]. Default: `200`                  |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                          | Type   | Comments     |
| :--------------------------------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | string | Product type |
| symbol                             | string | Symbol name  |
| list                               | array  |

- Sort in reverse by `start`

| | \> list\[0\] | string | Start time of the candle (ms) | | \> list\[1\] |
string | Open price | | \> list\[2\] | string | Highest price | | \> list\[3\] |
string | Lowest price | | \> list\[4\] | string | Close price. _Is the last
traded price when the candle is not closed_ |

[RUN >>](/docs/api-explorer/v5/market/premium-index-kline)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/market/premium-index-price-kline?category=linear&symbol=BTCUSDT&interval=D&start=1652112000000&end=1652544000000 HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP()print(session.get_premium_index_price_kline(    category="linear",    symbol="BTCUSDT",    inverval="D",    start=1652112000000,    end=1652544000000,))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "spot", "symbol": "BTCUSDT", "interval": "1"}client.NewUtaBybitServiceWithParams(params).GetPremiumIndexPriceKline(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var marketKLineRequest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").marketInterval(MarketInterval.WEEKLY).build();client.getPremiumIndexPriceLinesData(marketKLineRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({ testnet: true })
client
  .getPremiumIndexPriceKline({
    category: "linear",
    symbol: "BTCUSDT",
    interval: "D",
    start: 1652112000000,
    end: 1652544000000
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
    "list": [
      ["1652486400000", "-0.000587", "-0.000344", "-0.000480", "-0.000344"],
      ["1652400000000", "-0.000989", "-0.000561", "-0.000587", "-0.000587"]
    ]
  },
  "retExtInfo": {},
  "time": 1672765216291
}
```
