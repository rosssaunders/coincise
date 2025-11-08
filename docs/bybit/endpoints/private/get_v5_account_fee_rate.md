# GET /v5/account/fee-rate

**Source:**
[Get Fee Rate](https://bybit-exchange.github.io/docs/v5/account/fee-rate)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Get Fee Rate

On this page

# Get Fee Rate

Get the trading fee rate.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/fee-rate`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                                                           |
| :-------- | :------- | :----- | ---------------------------------------------------------------------------------- |
| category  | **true** | string | Product type. `spot`, `linear`, `inverse`, `option`                                |
| symbol    | false    | string | Symbol name, like `BTCUSDT`, uppercase only. Valid for `linear`, `inverse`, `spot` |
| baseCoin  | false    | string | Base coin, uppercase only. `SOL`, `BTC`, `ETH`. Valid for `option`                 |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter   | Type   | Comments                                                               |
| :---------- | :----- | ---------------------------------------------------------------------- |
| category    | string | Product type. `spot`, `option`. _Derivatives does not have this field_ |
| list        | array  | Object                                                                 |
| \> symbol   | string | Symbol name. Keeps `""` for Options                                    |
| \> baseCoin | string | Base coin. `SOL`, `BTC`, `ETH`                                         |

- Derivatives does not have this field
- Keeps `""` for Spot

| | \> takerFeeRate | string | Taker fee rate | | \> makerFeeRate | string |
Maker fee rate |

[RUN >>](/docs/api-explorer/v5/account/fee-rate)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/account/fee-rate?symbol=ETHUSDT HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676360412362X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_fee_rates(    symbol="ETHUSDT",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .getFeeRate({        category: 'linear',        symbol: 'ETHUSDT',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "list": [            {                "symbol": "ETHUSDT",                "takerFeeRate": "0.0006",                "makerFeeRate": "0.0001"            }        ]    },    "retExtInfo": {},    "time": 1676360412576}
```

[

Previous

Get Coin Greeks

](/docs/v5/account/coin-greeks)[

Next

Get Account Info

](/docs/v5/account/account-info)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
