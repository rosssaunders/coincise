# Get Funding Rate History

Query for historical funding rates. Each symbol has a different funding interval. For example, if the interval is 8 hours and the current time is UTC 12, then it returns the last funding rate, which settled at UTC 8.

To query the funding rate interval, please refer to the [instruments-info](/docs/v5/market/instrument) endpoint.

> **Covers: USDT and USDC perpetual / Inverse perpetual**

info

-   Passing only `startTime` returns an error.
-   Passing only `endTime` returns 200 records up till `endTime`.
-   Passing neither returns 200 records up till the current time.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/funding/history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type. `linear`,`inverse` |
| symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| startTime | false | integer | The start timestamp (ms) |
| endTime | false | integer | The end timestamp (ms) |
| limit | false | integer | Limit for data size per page. \[`1`, `200`\]. Default: `200` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| category | string | Product type |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> fundingRate | string | Funding rate |
| \> fundingRateTimestamp | string | Funding rate timestamp (ms) |

[RUN >>](/docs/api-explorer/v5/market/history-fund-rate)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
GET /v5/market/funding/history?category=linear&symbol=ETHPERP&limit=1 HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP()print(session.get_funding_rate_history(    category="linear",    symbol="ETHPERP",    limit=1,))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "spot", "symbol": "BTCUSDT"}client.NewUtaBybitServiceWithParams(params).GetFundingRateHistory(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var fundingHistoryRequest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSD).startTime(1632046800000L).endTime(1632133200000L).limit(150).build();client.getFundingHistory(fundingHistoryRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client    .getFundingRateHistory({        category: 'linear',        symbol: 'ETHPERP',        limit: 1,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "linear",
    "list": [
      {
        "symbol": "ETHPERP",
        "fundingRate": "0.0001",
        "fundingRateTimestamp": "1672041600000"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672051897447
}
```