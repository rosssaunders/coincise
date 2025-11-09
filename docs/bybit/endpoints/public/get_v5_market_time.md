# GET /v5/market/time

**Source:**
[Get Bybit Server Time](https://bybit-exchange.github.io/docs/v5/market/time)

## Authentication

Not Required (Public Endpoint)

- [](/docs/)
- Market
- Get Bybit Server Time

On this page

# Get Bybit Server Time

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/time`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter  | Type   | Comments                      |
| :--------- | :----- | ----------------------------- |
| timeSecond | string | Bybit server timestamp (sec)  |
| timeNano   | string | Bybit server timestamp (nano) |

[RUN >>](/docs/api-explorer/v5/market/time)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- Go
- Node.js

```
GET /v5/market/time HTTP/1.1Host: api.bybit.com
```

```
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_server_time())
```

```
import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();client.getServerTime(System.out::println);
```

```
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))client.NewUtaBybitServiceNoParams().GetServerTime(context.Background())
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,});client  .getServerTime()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "timeSecond": "1688639403",        "timeNano": "1688639403423213947"    },    "retExtInfo": {},    "time": 1688639403423}
```

[

Previous

Get System Status

](/docs/v5/system-status)[

Next

Get Kline

](/docs/v5/market/kline)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
