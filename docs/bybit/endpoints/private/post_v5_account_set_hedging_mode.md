# POST /v5/account/set-hedging-mode

**Source:**
[Set Spot Hedging](https://bybit-exchange.github.io/docs/v5/account/set-spot-hedge)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Set Spot Hedging

On this page

# Set Spot Hedging

You can turn on/off Spot hedging feature in Portfolio margin for Unified account

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/account/set-hedging-mode`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter      | Required | Type   | Comments    |
| :------------- | :------- | :----- | ----------- |
| setHedgingMode | **true** | string | `ON`, `OFF` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type    | Comments       |
| :-------- | :------ | -------------- |
| retCode   | integer | Result code    |
| retMsg    | string  | Result message |

[RUN >>](/docs/api-explorer/v5/account/set-spot-hedge)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/account/set-hedging-mode HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1700117968580X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 31{    "setHedgingMode": "OFF"}
```

```

```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .setSpotHedging({    setHedgingMode: 'ON' | 'OFF',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "SUCCESS"}
```

[

Previous

Set Margin Mode

](/docs/v5/account/set-margin-mode)[

Next

Set Limit Price Behaviour

](/docs/v5/account/set-price-limit)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
