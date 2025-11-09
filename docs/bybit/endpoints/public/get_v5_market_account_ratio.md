# GET /v5/market/account-ratio

**Source:**
[Get Long Short Ratio](https://bybit-exchange.github.io/docs/v5/market/long-short-ratio)

## Authentication

Not Required (Public Endpoint)

- [](/docs/)
- Market
- Get Long Short Ratio

On this page

# Get Long Short Ratio

This refers to the net long and short positions as percentages of all position
holders during the selected time.  
Long account ratio = Number of holders with long positions / Total number of
holders  
Short account ratio = Number of holders with short positions / Total number of
holders  
Long-short account ratio = Long account ratio / Short account ratio

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/account-ratio`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                   | Required | Type    | Comments                                                                                             |
| :------------------------------------------ | :------- | :------ | ---------------------------------------------------------------------------------------------------- |
| [category](/docs/v5/enum#category)          | **true** | string  | Product type. `linear`(USDT Contract),`inverse`                                                      |
| [symbol](/docs/v5/enum#symbol)              | **true** | string  | Symbol name, like `BTCUSDT`, uppercase only                                                          |
| [period](/docs/v5/enum#datarecordingperiod) | **true** | string  | Data recording period. `5min`, `15min`, `30min`, `1h`, `4h`, `1d`                                    |
| startTime                                   | false    | string  | The start timestamp (ms)                                                                             |
| endTime                                     | false    | string  | The end timestamp (ms)                                                                               |
| limit                                       | false    | integer | Limit for data size per page. \[`1`, `500`\]. Default: `50`                                          |
| cursor                                      | false    | string  | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter      | Type   | Comments                                  |
| :------------- | :----- | ----------------------------------------- |
| list           | array  | Object                                    |
| \> symbol      | string | Symbol name                               |
| \> buyRatio    | string | The ratio of the number of long position  |
| \> sellRatio   | string | The ratio of the number of short position |
| \> timestamp   | string | Timestamp (ms)                            |
| nextPageCursor | string | Refer to the `cursor` request parameter   |

[RUN >>](/docs/api-explorer/v5/market/long-short-ratio)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- GO
- Java
- Node.js

```
GET /v5/market/account-ratio?category=linear&symbol=BTCUSDT&period=1h&limit=2&startTime=1696089600000&endTime=1696262400000 HTTP/1.1Host: api-testnet.bybit.com
```

```

```

```
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "linear", "symbol": "BTCUSDT", "period": "5min"}client.NewUtaBybitServiceWithParams(params).GetLongShortRatio(context.Background())
```

```
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var marketAccountRatioRequest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").dataRecordingPeriod(DataRecordingPeriod.FIFTEEN_MINUTES).limit(10).build();client.getMarketAccountRatio(marketAccountRatioRequest, System.out::println);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,});client  .getLongShortRatio({    category: 'linear',    symbol: 'BTCUSDT',    period: '1h',    limit: 100,  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "list": [            {                "symbol": "BTCUSDT",                "buyRatio": "0.49",                "sellRatio": "0.51",                "timestamp": "1696262400000"            },            {                "symbol": "BTCUSDT",                "buyRatio": "0.4927",                "sellRatio": "0.5073",                "timestamp": "1696258800000"            }        ],        "nextPageCursor": "lastid%3D0%26lasttime%3D1696258800"    },    "retExtInfo": {},    "time": 1731567491688}
```

[

Previous

Get New Delivery Price

](/docs/v5/market/new-delivery-price)[

Next

Get Index Price Components

](/docs/v5/market/index-components)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
