# Get Recent Public Trades

Query recent public trading history in Bybit.

> **Covers: Spot / USDT contract / USDC contract / Inverse contract / Option**

You can download archived historical trades from the [website](https://www.bybit.com/derivatives/en/history-data)

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/recent-trade`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type. `spot`,`linear`,`inverse`,`option` |
| [symbol](/docs/v5/enum#symbol) | false | string | Symbol name, like `BTCUSDT`, uppercase only
-   **required** for spot/linear/inverse

 |
| baseCoin | false | string | Base coin, uppercase only-   Apply to `option` **only**
-   If the field is not passed, return **BTC** data by default |
| optionType | false | string | Option type. `Call` or `Put`. Apply to `option` **only** |
| limit | false | integer | Limit for data size per page

-   `spot`: \[1,60\], default: `60`
-   others: \[1,1000\], default: `500`

 |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| category | string | Products category |
| list | array | Object |
| \> execId | string | Execution ID |
| \> symbol | string | Symbol name |
| \> price | string | Trade price |
| \> size | string | Trade size |
| \> side | string | Side of taker `Buy`, `Sell` |
| \> time | string | Trade time (ms) |
| \> isBlockTrade | boolean | Whether the trade is block trade |
| \> isRPITrade | boolean | Whether the trade is RPI trade |
| \> mP | string | Mark price, unique field for `option` |
| \> iP | string | Index price, unique field for `option` |
| \> mIv | string | Mark iv, unique field for `option` |
| \> iv | string | iv, unique field for `option` |
| \> seq | string | cross sequence |

[RUN >>](/docs/api-explorer/v5/market/recent-trade)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/market/recent-trade?category=spot&symbol=BTCUSDT&limit=1 HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_public_trade_history(    category="spot",    symbol="BTCUSDT",    limit=1,))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "linear", "symbol": "BTCUSDT"}client.NewUtaBybitServiceWithParams(params).GetPublicRecentTrades(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var recentTrade = MarketDataRequest.builder().category(CategoryType.OPTION).symbol("ETH-30JUN23-2050-C").build();client.getRecentTradeData(recentTrade, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client    .getPublicTradingHistory({        category: 'spot',        symbol: 'BTCUSDT',        limit: 1,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "spot",
    "list": [
      {
        "execId": "2100000000007764263",
        "symbol": "BTCUSDT",
        "price": "16618.49",
        "size": "0.00012",
        "side": "Buy",
        "time": "1672052955758",
        "isBlockTrade": false,
        "isRPITrade": true,
        "seq": "123456"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672053054358
}
```