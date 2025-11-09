# POST /v5/position/set-auto-add-margin

**Source:**
[Set Auto Add Margin](https://bybit-exchange.github.io/docs/v5/position/auto-add-margin)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Position
- Set Auto Add Margin

On this page

# Set Auto Add Margin

Turn on/off auto-add-margin for **isolated** margin position

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/set-auto-add-margin`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments     |
| :--------------------------------- | :------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | **true** | string | Product type |

- [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10):
  `linear` (USDT Contract, USDC Contract)
- Classic account: `linear` (USDT Perps)

| | symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only | |
autoAddMargin | **true** | integer | Turn on/off. `0`: off. `1`: on | |
[positionIdx](/docs/v5/enum#positionidx) | false | integer | Used to identify
positions in different position modes. For hedge mode position, this param is
**required**

- `0`: one-way mode
- `1`: hedge-mode Buy side
- `2`: hedge-mode Sell side

|

### Response Parameters[​](#response-parameters "Direct link to heading")

None

[RUN >>](/docs/api-explorer/v5/position/auto-add-margin)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- Node.js

```
POST /v5/position/set-auto-add-margin HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN-TYPE: 2X-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1675255134857X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category": "linear",    "symbol": "BTCUSDT",    "autoAddmargin": 1,    "positionIdx": null}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_auto_add_margin(    category="linear",    symbol="BTCUSDT",    autoAddmargin=1,))
```

```
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var setAutoAddMarginRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").autoAddMargin(AutoAddMargin.ON).build();client.setAutoAddMargin(setAutoAddMarginRequest, System.out::println);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .setAutoAddMargin({        category: 'linear',        symbol: 'BTCUSDT',        autoAddMargin: 1,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {},    "retExtInfo": {},    "time": 1675255135069}
```

[

Previous

Set Trading Stop

](/docs/v5/position/trading-stop)[

Next

Add Or Reduce Margin

](/docs/v5/position/manual-add-margin)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
