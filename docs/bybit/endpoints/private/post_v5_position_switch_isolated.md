# POST /v5/position/switch-isolated

**Source:**
[Switch Cross/Isolated Margin](https://bybit-exchange.github.io/docs/v5/position/cross-isolate)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Position
- Switch Cross/Isolated Margin

On this page

# Switch Cross/Isolated Margin

Select cross margin mode or isolated margin mode per symbol level

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/switch-isolated`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments     |
| :--------------------------------- | :------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | **true** | string | Product type |

- [UTA2.0](/docs/v5/acct-mode#uta-20): not supported
- [UTA1.0](/docs/v5/acct-mode#uta-10): `inverse`
- Classic: `linear`(USDT Preps), `inverse`

| | symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only | |
tradeMode | **true** | integer | `0`: cross margin. `1`: isolated margin | |
buyLeverage | **true** | string | The value must be equal to `sellLeverage`
value | | sellLeverage | **true** | string | The value must be equal to
`buyLeverage` value |

[RUN >>](/docs/api-explorer/v5/position/cross-isolate)

---

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- Node.js

```
POST /v5/position/switch-isolated HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN-TYPE: 2X-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1675248447965X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 121{    "category": "linear",    "symbol": "ETHUSDT",    "tradeMode": 1,    "buyLeverage": "10",    "sellLeverage": "10"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.switch_margin_mode(    category="linear",    symbol="ETHUSDT",    tradeMode=1,    buyLeverage="10",    sellLeverage="10",))
```

```
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var switchMarginRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTC-31MAR23").tradeMode(MarginMode.CROSS_MARGIN).buyLeverage("5").sellLeverage("5").build();client.swithMarginRequest(switchMarginRequest, System.out::println);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .switchIsolatedMargin({        category: 'linear',        symbol: 'ETHUSDT',        tradeMode: 1,        buyLeverage: '10',        sellLeverage: '10',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {},    "retExtInfo": {},    "time": 1675248433635}
```

[

Previous

Set Leverage

](/docs/v5/position/leverage)[

Next

Switch Position Mode

](/docs/v5/position/position-mode)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
