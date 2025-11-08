# POST /v5/account/set-collateral-switch-batch

**Source:**
[Batch Set Collateral Coin](https://bybit-exchange.github.io/docs/v5/account/batch-set-collateral)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Batch Set Collateral Coin

On this page

# Batch Set Collateral Coin

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/account/set-collateral-switch-batch`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                  |
| :-------- | :------- | :----- | ------------------------- |
| request   | **true** | array  | Object                    |
| \> coin   | **true** | string | Coin name, uppercase only |

- You can get collateral coin from [here](/docs/v5/account/collateral-info)
- USDT, USDC cannot be set

| | \> collateralSwitch | **true** | string | `ON`: switch on collateral, `OFF`:
switch off collateral |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter            | Type   | Comments                                                 |
| :------------------- | :----- | -------------------------------------------------------- |
| result               | Object |                                                          |
| \> list              | array  | Object                                                   |
| \>> coin             | string | Coin name                                                |
| \>> collateralSwitch | string | `ON`: switch on collateral, `OFF`: switch off collateral |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/account/set-collateral-switch-batch HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1704782042755X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 371{    "request": [        {            "coin": "MATIC",            "collateralSwitch": "OFF"        },        {            "coin": "BTC",            "collateralSwitch": "OFF"        },        {            "coin": "ETH",            "collateralSwitch": "OFF"        },        {            "coin": "SOL",            "collateralSwitch": "OFF"        }    ]}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.batch_set_collateral_coin(  request=[    {      "coin": "BTC",      "collateralSwitch": "ON",    },    {      "coin": "ETH",      "collateralSwitch": "ON",    }  ]))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .batchSetCollateralCoin({    request: [      {        coin: 'BTC',        collateralSwitch: 'ON',      },      {        coin: 'ETH',        collateralSwitch: 'OFF',      },    ],  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "SUCCESS",    "result": {        "list": [            {                "coin": "MATIC",                "collateralSwitch": "OFF"            },            {                "coin": "BTC",                "collateralSwitch": "OFF"            },            {                "coin": "ETH",                "collateralSwitch": "OFF"            },            {                "coin": "SOL",                "collateralSwitch": "OFF"            }        ]    },    "retExtInfo": {},    "time": 1704782042913}
```

[

Previous

Set Collateral Coin

](/docs/v5/account/set-collateral)[

Next

Get Collateral Info

](/docs/v5/account/collateral-info)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
