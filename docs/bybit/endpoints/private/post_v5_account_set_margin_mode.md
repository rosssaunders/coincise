# POST /v5/account/set-margin-mode

**Source:**
[Set Margin Mode](https://bybit-exchange.github.io/docs/v5/account/set-margin-mode)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Set Margin Mode

On this page

# Set Margin Mode

Default is regular margin mode

info

- This switch does not work for the inverse trading in
  [UTA1.0](/docs/v5/acct-mode#uta-10), which margin mode is set per symbol.
  Please use [Switch Cross/Isolated Margin](/docs/v5/position/cross-isolate)

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/account/set-margin-mode`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter     | Required | Type   | Comments                                                                   |
| :------------ | :------- | :----- | -------------------------------------------------------------------------- |
| setMarginMode | **true** | string | `ISOLATED_MARGIN`, `REGULAR_MARGIN`(i.e. Cross margin), `PORTFOLIO_MARGIN` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter     | Type   | Comments                                                |
| :------------ | :----- | ------------------------------------------------------- |
| reasons       | array  | Object. If requested successfully, it is an empty array |
| \> reasonCode | string | Fail reason code                                        |
| \> reasonMsg  | string | Fail reason msg                                         |

[RUN >>](/docs/api-explorer/v5/account/set-margin-mode)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/account/set-margin-mode HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672134396332X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "setMarginMode": "PORTFOLIO_MARGIN"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_margin_mode(    setMarginMode="PORTFOLIO_MARGIN",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .setMarginMode('PORTFOLIO_MARGIN')    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 3400045,    "retMsg": "Set margin mode failed",    "result": {        "reasons": [            {                "reasonCode": "3400000",                "reasonMsg": "Equity needs to be equal to or greater than 1000 USDC"            }        ]    }}
```

[

Previous

Get SMP Group ID

](/docs/v5/account/smp-group)[

Next

Set Spot Hedging

](/docs/v5/account/set-spot-hedge)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
