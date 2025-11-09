# GET /v5/crypto-loan/loanable-data

**Source:**
[Get Borrowable Coins](https://bybit-exchange.github.io/docs/v5/crypto-loan/loan-coin)

## Authentication

Not Required (Public Endpoint)

- [](/docs/)
- Crypto Loan (legacy)
- Get Borrowable Coins

On this page

# Get Borrowable Coins

info

Does not need authentication.

danger

Borrowed coins can be returned at any time before the due date. You'll be
charged 3 times the hourly interest during the overdue period. Your collateral
will be liquidated to repay a loan and the interest if you fail to make the
repayment 48 hours after the due time.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/crypto-loan/loanable-data`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                        | Required | Type   | Comments                                                                        |
| :----------------------------------------------- | :------- | :----- | ------------------------------------------------------------------------------- |
| vipLevel                                         | false    | string | Vip level- `VIP0`, `VIP1`, `VIP2`, `VIP3`, `VIP4`, `VIP5`, `VIP99`(supreme VIP) |
| - `PRO1`, `PRO2`, `PRO3`, `PRO4`, `PRO5`, `PRO6` |
| currency                                         | false    | string | Coin name, uppercase only                                                       |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                      | Type    | Comments                                              |
| :----------------------------- | :------ | ----------------------------------------------------- |
| vipCoinList                    | array   | Object                                                |
| \> list                        | array   | Object                                                |
| \>> borrowingAccuracy          | integer | The number of decimal places (precision) of this coin |
| \>> currency                   | string  | Coin name                                             |
| \>> flexibleHourlyInterestRate | string  | Flexible hourly floating interest rate                |

- Flexible Crypto Loans offer an hourly floating interest rate, calculated based
  on the actual borrowing time per hour, with the option for early repayment
- Is `""` if the coin does not support flexible loan

| | \>> hourlyInterestRate7D | string | Hourly interest rate for 7 days loan. Is
`""` if the coin does not support 7 days loan | | \>> hourlyInterestRate14D |
string | Hourly interest rate for 14 days loan. Is `""` if the coin does not
support 14 days loan | | \>> hourlyInterestRate30D | string | Hourly interest
rate for 30 days loan. Is `""` if the coin does not support 30 days loan | | \>>
hourlyInterestRate90D | string | Hourly interest rate for 90 days loan. Is `""`
if the coin does not support 90 days loan | | \>> hourlyInterestRate180D |
string | Hourly interest rate for 180 days loan. Is `""` if the coin does not
support 180 days loan | | \>> maxBorrowingAmount | string | Max. amount to
borrow | | \>> minBorrowingAmount | string | Min. amount to borrow | | \>
vipLevel | string | Vip level |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/crypto-loan/loanable-data?currency=USDT&vipLevel=VIP0 HTTP/1.1Host: api.bybit.com
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,)print(session.get_borrowable_coins(    currency="USDT",    vipLevel="VIP0",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getBorrowableCoins({    currency: 'USDT',    vipLevel: 'VIP0',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "request.success",    "result": {        "vipCoinList": [            {                "list": [                    {                        "borrowingAccuracy": 4,                        "currency": "USDT",                        "flexibleHourlyInterestRate": "0.0000090346",                        "hourlyInterestRate14D": "0.0000207796",                        "hourlyInterestRate180D": "",                        "hourlyInterestRate30D": "0.00002349",                        "hourlyInterestRate7D": "0.0000180692",                        "hourlyInterestRate90D": "",                        "maxBorrowingAmount": "8000000",                        "minBorrowingAmount": "20"                    }                ],                "vipLevel": "VIP0"            }        ]    },    "retExtInfo": {},    "time": 1728619315868}
```

[

Previous

Get Collateral Coins

](/docs/v5/crypto-loan/collateral-coin)[

Next

Get Account Borrowable/Collateralizable Limit

](/docs/v5/crypto-loan/acct-borrow-collateral)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
