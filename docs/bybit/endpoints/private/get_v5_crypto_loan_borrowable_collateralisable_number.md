# GET /v5/crypto-loan/borrowable-collateralisable-number

**Source:**
[Get Account Borrowable/Collateralizable Limit](https://bybit-exchange.github.io/docs/v5/crypto-loan/acct-borrow-collateral)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Crypto Loan (legacy)
- Get Account Borrowable/Collateralizable Limit

On this page

# Get Account Borrowable/Collateralizable Limit

Query for the minimum and maximum amounts your account can borrow and how much
collateral you can put up.

> Permission: "Spot trade"

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/crypto-loan/borrowable-collateralisable-number`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter          | Required | Type   | Comments             |
| :----------------- | :------- | :----- | -------------------- |
| loanCurrency       | **true** | string | Loan coin name       |
| collateralCurrency | **true** | string | Collateral coin name |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter           | Type   | Comments               |
| :------------------ | :----- | ---------------------- |
| collateralCurrency  | string | Collateral coin name   |
| loanCurrency        | string | Loan coin name         |
| maxCollateralAmount | string | Max. limit to mortgage |
| maxLoanAmount       | string | Max. limit to borrow   |
| minCollateralAmount | string | Min. limit to mortgage |
| minLoanAmount       | string | Min. limit to borrow   |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/crypto-loan/borrowable-collateralisable-number?loanCurrency=USDT&collateralCurrency=BTC HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728627083198X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_account_borrowable_or_collateralizable_limit(    loanCurrency="USDT",    collateralCurrency="BTC",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getAccountBorrowCollateralLimit({    loanCurrency: 'USDT',    collateralCurrency: 'BTC',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "request.success",    "result": {        "collateralCurrency": "BTC",        "loanCurrency": "USDT",        "maxCollateralAmount": "164.957732055526752104",        "maxLoanAmount": "8000000",        "minCollateralAmount": "0.000412394330138818",        "minLoanAmount": "20"    },    "retExtInfo": {},    "time": 1728627084863}
```

[

Previous

Get Borrowable Coins

](/docs/v5/crypto-loan/loan-coin)[

Next

Borrow

](/docs/v5/crypto-loan/borrow)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
