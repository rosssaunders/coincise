# GET /v5/asset/coin-greeks

**Source:**
[Get Coin Greeks](https://bybit-exchange.github.io/docs/v5/account/coin-greeks)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Get Coin Greeks

On this page

# Get Coin Greeks

Get current account Greeks information

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/coin-greeks`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                                                                             |
| :-------- | :------- | :----- | ---------------------------------------------------------------------------------------------------- |
| baseCoin  | false    | string | Base coin, uppercase only. If not passed, all supported base coin greeks will be returned by default |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter     | Type   | Comments                          |
| :------------ | :----- | --------------------------------- |
| list          | array  | Object                            |
| \> baseCoin   | string | Base coin. e.g.,`BTC`,`ETH`,`SOL` |
| \> totalDelta | string | Delta value                       |
| \> totalGamma | string | Gamma value                       |
| \> totalVega  | string | Vega value                        |
| \> totalTheta | string | Theta value                       |

[RUN >>](/docs/api-explorer/v5/account/coin-greeks)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/asset/coin-greeks?baseCoin=BTC HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672287887610X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_coin_greeks(    baseCoin="BTC",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .getCoinGreeks('BTC')    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "list": [            {                "baseCoin": "BTC",                "totalDelta": "0.00004001",                "totalGamma": "-0.00000009",                "totalVega": "-0.00039689",                "totalTheta": "0.01243824"            }        ]    },    "retExtInfo": {},    "time": 1672287887942}
```

[

Previous

Get Collateral Info

](/docs/v5/account/collateral-info)[

Next

Get Fee Rate

](/docs/v5/account/fee-rate)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
