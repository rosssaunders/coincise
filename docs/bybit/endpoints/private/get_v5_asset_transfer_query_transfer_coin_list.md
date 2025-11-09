# GET /v5/asset/transfer/query-transfer-coin-list

**Source:**
[Get Transferable Coin](https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Asset
- Transfer
- Get Transferable Coin

On this page

# Get Transferable Coin

Query the transferable coin list between each
[account type](/docs/v5/enum#accounttype)

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/transfer/query-transfer-coin-list`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                    | Required | Type   | Comments          |
| :------------------------------------------- | :------- | :----- | ----------------- |
| [fromAccountType](/docs/v5/enum#accounttype) | **true** | string | From account type |
| [toAccountType](/docs/v5/enum#accounttype)   | **true** | string | To account type   |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type  | Comments                     |
| :-------- | :---- | ---------------------------- |
| list      | array | A list of coins (as strings) |

[RUN >>](/docs/api-explorer/v5/asset/transferable-coin)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/asset/transfer/query-transfer-coin-list?fromAccountType=UNIFIED&toAccountType=CONTRACT HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672144322595X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_transferable_coin(    fromAccountType="UNIFIED",    toAccountType="CONTRACT",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getTransferableCoinList('UNIFIED', 'CONTRACT')  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "success",    "result": {        "list": [            "BTC",            "ETH"        ]    },    "retExtInfo": {},    "time": 1672144322954}
```

[

Previous

Get Withdrawable Amount

](/docs/v5/asset/balance/delay-amount)[

Next

Create Internal Transfer

](/docs/v5/asset/transfer/create-inter-transfer)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
