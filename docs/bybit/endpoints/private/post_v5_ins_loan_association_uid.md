# POST /v5/ins-loan/association-uid

**Source:**
[Bind Or Unbind UID](https://bybit-exchange.github.io/docs/v5/otc/bind-uid)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Institutional Loan
- Bind Or Unbind UID

On this page

# Bind Or Unbind UID

For the institutional loan product, you can bind new UIDs to the risk unit or
unbind UID from the risk unit.

info

- The risk unit designated UID cannot be unbound.
- The UID you want to bind must be upgraded to UTA Pro.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/ins-loan/association-uid`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments      |
| :-------- | :------- | :----- | ------------- |
| uid       | **true** | string | UID- **Bind** |

    a) the key used must be from one of UIDs in the risk unit;
    b) input UID must not have an INS loan

- **Unbind**  
   a) the key used must be from one of UIDs in the risk unit;  
   b) input UID cannot be the same as the UID used to access the API | | operate
  | **true** | string | `0`: bind, `1`: unbind |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments               |
| :-------- | :----- | ---------------------- |
| uid       | string | UID                    |
| operate   | string | `0`: bind, `1`: unbind |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/ins-loan/association-uid HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1699257853101X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXContent-Type: application/jsonContent-Length: 43{    "uid": "592324",    "operate": "0"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.bind_or_unbind_uid(uid="592324", operate="0"))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .bindOrUnbindUID({    uid: 'yourUID',    operate: '0', // 0 for bind, 1 for unbind  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "uid": "592324",        "operate": "0"    },    "retExtInfo": {},    "time": 1699257746135}
```

[

Previous

Get LTV

](/docs/v5/otc/ltv-convert)[

Next

Get Earning

](/docs/v5/broker/exchange-earning)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
