# POST /v5/position/set-tpsl-mode

**Source:**
[Set TP/SL Mode](https://bybit-exchange.github.io/docs/v5/position/tpsl-mode)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Position
- Set TP/SL Mode (deprecated)

On this page

# Set TP/SL Mode

tip

_To some extent, this endpoint is **deprecated** because now tpsl is based on
order level. This API was used for position level change before._

_However, you still can use it to set an implicit tpsl mode for a certain symbol
because when you don't pass "tpslMode" in the place order or trading stop
request, system will get the tpslMode by the default setting._

Set TP/SL mode to Full or Partial

info

For partial TP/SL mode, you can set the TP/SL size smaller than position size.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/set-tpsl-mode`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments     |
| :--------------------------------- | :------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | **true** | string | Product type |

- Unified account: `linear`, `inverse`
- Classic account: `linear`, `inverse`. _Please note that `category` is **not**
  involved with business logic_

| | symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only | |
tpSlMode | **true** | string | TP/SL mode. `Full`,`Partial` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments         |
| :-------- | :----- | ---------------- |
| tpSlMode  | string | `Full`,`Partial` |

[RUN >>](/docs/api-explorer/v5/position/tpsl-mode)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- Node.js

```
POST /v5/position/set-tpsl-mode HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672279325035X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "symbol": "XRPUSDT",    "category": "linear",    "tpSlMode": "Full"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_tp_sl_mode(    symbol="XRPUSDT",    category="linear",    tpSlMode="Full",))
```

```
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var setTpSlRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").tpslMode(TpslMode.PARTIAL).build();client.swithMarginRequest(setTpSlRequest, System.out::println);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .setTPSLMode({        symbol: 'XRPUSDT',        category: 'linear',        tpSlMode: 'Full',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "tpSlMode": "Full"    },    "retExtInfo": {},    "time": 1672279322666}
```

[

Previous

Confirm New Risk Limit

](/docs/v5/position/confirm-mmr)[

Next

Set Risk Limit (deprecated)

](/docs/v5/position/set-risk-limit)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
