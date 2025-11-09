# GET /v5/crypto-loan/max-collateral-amount

**Source:**
[Get Max. Allowed Collateral Reduction Amount](https://bybit-exchange.github.io/docs/v5/crypto-loan/reduce-max-collateral-amt)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Crypto Loan (legacy)
- Get Max. Allowed Collateral Reduction Amount

On this page

# Get Max. Allowed Collateral Reduction Amount

Query for the maximum amount by which collateral may be reduced by.

> Permission: "Spot trade"

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/crypto-loan/max-collateral-amount`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments     |
| :-------- | :------- | :----- | ------------ |
| orderId   | **true** | string | Loan coin ID |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter           | Type   | Comments                         |
| :------------------ | :----- | -------------------------------- |
| maxCollateralAmount | string | Max. reduction collateral amount |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/crypto-loan/max-collateral-amount?orderId=1794267532472646144 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728634289933X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_max_allowed_collateral_reduction_amount(        orderId="1794267532472646144",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getMaxAllowedReductionCollateralAmount({ orderId: '1794267532472646144' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "request.success",    "result": {        "maxCollateralAmount": "0.00210611"    },    "retExtInfo": {},    "time": 1728634291554}
```

[

Previous

Get Completed Loan History

](/docs/v5/crypto-loan/completed-loan-order)[

Next

Adjust Collateral Amount

](/docs/v5/crypto-loan/adjust-collateral)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
