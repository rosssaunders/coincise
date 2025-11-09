# GET /v5/crypto-loan/ongoing-orders

**Source:**
[Get Unpaid Loans](https://bybit-exchange.github.io/docs/v5/crypto-loan/unpaid-loan-order)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Crypto Loan (legacy)
- Get Unpaid Loans

On this page

# Get Unpaid Loans

Query for your ongoing loans.

> Permission: "Spot trade"

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/crypto-loan/ongoing-orders`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter          | Required | Type   | Comments                                                           |
| :----------------- | :------- | :----- | ------------------------------------------------------------------ |
| orderId            | false    | string | Loan order ID                                                      |
| loanCurrency       | false    | string | Loan coin name                                                     |
| collateralCurrency | false    | string | Collateral coin name                                               |
| loanTermType       | false    | string | - `1`: fixed term, when query this type, `loanTerm` must be filled |

- `2`: flexible term By default, query all types | | loanTerm | false | string |
  `7`, `14`, `30`, `90`, `180` days, working when `loanTermType`\=1 | | limit |
  false | string | Limit for data size per page. \[`1`, `100`\]. Default: `10` |
  | cursor | false | string | Cursor. Use the `nextPageCursor` token from the
  response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                         | Type   | Comments                                                                  |
| :------------------------------------------------ | :----- | ------------------------------------------------------------------------- |
| list                                              | array  | Object                                                                    |
| \> collateralAmount                               | string | Collateral amount                                                         |
| \> collateralCurrency                             | string | Collateral coin                                                           |
| \> currentLTV                                     | string | Current LTV                                                               |
| \> expirationTime                                 | string | Loan maturity time, keeps `""` for flexible loan                          |
| \> hourlyInterestRate                             | string | Hourly interest rate- Flexible loan, it is real-time interest rate        |
| - Fixed term loan: it is fixed term interest rate |
| \> loanCurrency                                   | string | Loan coin                                                                 |
| \> loanTerm                                       | string | Loan term, `7`, `14`, `30`, `90`, `180` days, keep `""` for flexible loan |
| \> orderId                                        | string | Loan order ID                                                             |
| \> residualInterest                               | string | Unpaid interest                                                           |
| \> residualPenaltyInterest                        | string | Unpaid penalty interest                                                   |
| \> totalDebt                                      | string | Unpaid principal                                                          |
| nextPageCursor                                    | string | Refer to the `cursor` request parameter                                   |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/crypto-loan/ongoing-orders?orderId=1793683005081680384 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728630979731X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.repay_crypto_loan(        orderId="1794267532472646144",        amount="100",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getUnpaidLoanOrders({ orderId: '1793683005081680384' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "request.success",    "result": {        "list": [            {                "collateralAmount": "0.0964687",                "collateralCurrency": "BTC",                "currentLTV": "0.4161",                "expirationTime": "1731149999000",                "hourlyInterestRate": "0.0000010633",                "loanCurrency": "USDT",                "loanTerm": "30",                "orderId": "1793683005081680384",                "residualInterest": "0.04016",                "residualPenaltyInterest": "0",                "totalDebt": "1888.005198"            }        ],        "nextPageCursor": ""    },    "retExtInfo": {},    "time": 1728630980861}
```

[

Previous

Repay

](/docs/v5/crypto-loan/repay)[

Next

Get Loan Repayment History

](/docs/v5/crypto-loan/repay-transaction)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
