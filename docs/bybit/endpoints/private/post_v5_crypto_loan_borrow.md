# POST /v5/crypto-loan/borrow

**Source:**
[Borrow](https://bybit-exchange.github.io/docs/v5/crypto-loan/borrow)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Crypto Loan (legacy)
- Borrow

On this page

# Borrow

> Permission: "Spot trade"

info

- The loan funds are released to the Funding wallet.
- The collateral funds are deducted from the Funding wallet, so make sure you
  have enough collateral amount in the Funding wallet.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/crypto-loan/borrow`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                       | Required | Type   | Comments                                                            |
| :---------------------------------------------- | :------- | :----- | ------------------------------------------------------------------- |
| loanCurrency                                    | **true** | string | Loan coin name                                                      |
| loanAmount                                      | false    | string | Amount to borrow- **Required** when collateral amount is not filled |
| loanTerm                                        | false    | string | Loan term- flexible term: `null` or not passed                      |
| - fixed term: `7`, `14`, `30`, `90`, `180` days |
| collateralCurrency                              | **true** | string | Currency used to mortgage                                           |
| collateralAmount                                | false    | string | Amount to mortgage- **Required** when loan amount is not filled     |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments      |
| :-------- | :----- | ------------- |
| orderId   | string | Loan order ID |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/crypto-loan/borrow HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728629356551X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 140{    "loanCurrency": "USDT",    "loanAmount": "550",    "collateralCurrency": "BTC",    "loanTerm": null,    "collateralAmount": null}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.borrow_crypto_loan(        loanCurrency="USDT",        loanAmount="550",        collateralCurrency="BTC",        loanTerm=None,        collateralAmount=None,))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .borrowCryptoLoan({    loanCurrency: 'USDT',    loanAmount: '550',    collateralCurrency: 'BTC',    loanTerm: null,    collateralAmount: null,  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "request.success",    "result": {        "orderId": "1794267532472646144"    },    "retExtInfo": {},    "time": 1728629357820}
```

[

Previous

Get Account Borrowable/Collateralizable Limit

](/docs/v5/crypto-loan/acct-borrow-collateral)[

Next

Repay

](/docs/v5/crypto-loan/repay)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
