# GET /v5/account/smp-group

**Source:**
[Get SMP Group ID](https://bybit-exchange.github.io/docs/v5/account/smp-group)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Get SMP Group ID

On this page

# Get SMP Group ID

Query the SMP group ID of self match prevention

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/smp-group`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type    | Comments                                                    |
| :-------- | :------ | ----------------------------------------------------------- |
| smpGroup  | integer | Smp group ID. If the UID has no group, it is `0` by default |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/account/smp-group HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1702363848192X-BAPI-RECV-WINDOW: 5000
```

```

```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getSMPGroup()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "success",    "result": {        "smpGroup": 0    },    "retExtInfo": {},    "time": 1702363848539}
```

[

Previous

Get Transaction Log (Classic)

](/docs/v5/account/contract-transaction-log)[

Next

Set Margin Mode

](/docs/v5/account/set-margin-mode)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
