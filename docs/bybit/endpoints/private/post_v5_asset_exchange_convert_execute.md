# POST /v5/asset/exchange/convert-execute

**Source:**
[Confirm a Quote](https://bybit-exchange.github.io/docs/v5/asset/convert/confirm-quote)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Asset
- Convert
- Confirm a Quote

On this page

# Confirm a Quote

info

1.  The exchange is async; please check the final status by calling the query
    result API.
2.  Make sure you confirm the quote before it expires.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/exchange/convert-execute`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                                                                       |
| :-------- | :------- | :----- | ---------------------------------------------------------------------------------------------- |
| quoteTxId | **true** | string | The quote tx ID from [Request a Quote](/docs/v5/asset/convert/apply-quote#response-parameters) |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter      | Type   | Comments              |
| :------------- | :----- | --------------------- |
| quoteTxId      | string | Quote transaction ID  |
| exchangeStatus | string | Exchange status- init |

- processing
- success
- failure |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/asset/exchange/convert-execute HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1720071899789X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 52{    "quoteTxId": "10100108106409343501030232064"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.confirm_a_quote(    quoteTxId="10100108106409343501030232064",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .confirmConvertQuote({    quoteTxId: '10100108106409343501030232064',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "ok",    "result": {        "exchangeStatus": "processing",        "quoteTxId": "10100108106409343501030232064"    },    "retExtInfo": {},    "time": 1720071900529}
```

[

Previous

Request a Quote

](/docs/v5/asset/convert/apply-quote)[

Next

Get Convert Status

](/docs/v5/asset/convert/get-convert-result)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
