# GET /v5/market/open-interest

**Source:**
[Get Open Interest](https://bybit-exchange.github.io/docs/v5/market/open-interest)

## Authentication

Not Required (Public Endpoint)

- [](/docs/)
- Market
- Get Open Interest

On this page

# Get Open Interest

Get the
[open interest](https://www.bybit.com/en-US/help-center/s/article/Glossary-Bybit-Trading-Terms)
of each symbol.

> **Covers: USDT contract / USDC contract / Inverse contract**

info

- The upper limit time you can query is the launch time of the symbol.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/open-interest`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                  | Required | Type    | Comments                                                    |
| :----------------------------------------- | :------- | :------ | ----------------------------------------------------------- |
| [category](/docs/v5/enum#category)         | **true** | string  | Product type. `linear`,`inverse`                            |
| symbol                                     | **true** | string  | Symbol name, like `BTCUSDT`, uppercase only                 |
| [intervalTime](/docs/v5/enum#intervaltime) | **true** | string  | Interval time. `5min`,`15min`,`30min`,`1h`,`4h`,`1d`        |
| startTime                                  | false    | integer | The start timestamp (ms)                                    |
| endTime                                    | false    | integer | The end timestamp (ms)                                      |
| limit                                      | false    | integer | Limit for data size per page. \[`1`, `200`\]. Default: `50` |
| cursor                                     | false    | string  | Cursor. Used to paginate                                    |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                                               | Type   | Comments                                           |
| :---------------------------------------------------------------------- | :----- | -------------------------------------------------- |
| category                                                                | string | Product type                                       |
| symbol                                                                  | string | Symbol name                                        |
| list                                                                    | array  | Object                                             |
| \> openInterest                                                         | string | Open interest. The value is the sum of both sides. |
| The unit of value, e.g., BTCUSD(inverse) is USD, BTCUSDT(linear) is BTC |
| \> timestamp                                                            | string | The timestamp (ms)                                 |
| nextPageCursor                                                          | string | Used to paginate                                   |

[RUN >>](/docs/api-explorer/v5/market/open-interest)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- GO
- Java
- Node.js

```
GET /v5/market/open-interest?category=inverse&symbol=BTCUSD&intervalTime=5min&startTime=1669571100000&endTime=1669571400000 HTTP/1.1Host: api-testnet.bybit.com
```

```
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_open_interest(    category="inverse",    symbol="BTCUSD",    intervalTime="5min",    startTime=1669571100000,    endTime=1669571400000,))
```

```
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "linear", "symbol": "BTCUSDT"}client.NewUtaBybitServiceWithParams(params).GetOpenInterests(context.Background())
```

```
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var openInterest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").marketInterval(MarketInterval.FIVE_MINUTES).build();client.getOpenInterest(openInterest, System.out::println);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client    .getOpenInterest({        category: 'inverse',        symbol: 'BTCUSD',        intervalTime: '5min',        startTime: 1669571100000,        endTime: 1669571400000,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "symbol": "BTCUSD",        "category": "inverse",        "list": [            {                "openInterest": "461134384.00000000",                "timestamp": "1669571400000"            },            {                "openInterest": "461134292.00000000",                "timestamp": "1669571100000"            }        ],        "nextPageCursor": ""    },    "retExtInfo": {},    "time": 1672053548579}
```

[

Previous

Get Recent Public Trades

](/docs/v5/market/recent-trade)[

Next

Get Historical Volatility

](/docs/v5/market/iv)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
