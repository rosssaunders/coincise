# GET /v5/ins-loan/repaid-history

**Source:**
[Get Repayment Orders](https://bybit-exchange.github.io/docs/v5/otc/repay-info)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Institutional Loan
- Get Repayment Orders

On this page

# Get Repayment Orders

Get a list of your loan repayment orders (orders which repaid the loan).

tip

- Get the past 2 years data by default
- Get up to the past 2 years of data

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/ins-loan/repaid-history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type    | Comments                                            |
| :-------- | :------- | :------ | --------------------------------------------------- |
| startTime | false    | integer | The start timestamp (ms)                            |
| endTime   | false    | integer | The end timestamp (ms)                              |
| limit     | false    | integer | Limit for data size. \[`1`, `100`\]. Default: `100` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter       | Type   | Comments                                                       |
| :-------------- | :----- | -------------------------------------------------------------- |
| repayInfo       | array  | Object                                                         |
| \> repayOrderId | string | Repaid order ID                                                |
| \> repaidTime   | string | Repaid timestamp (ms)                                          |
| \> token        | string | Repaid coin                                                    |
| \> quantity     | string | Repaid principle                                               |
| \> interest     | string | Repaid interest                                                |
| \> businessType | string | Repaid type. `1`：normal repayment; `2`：repaid by liquidation |
| \> status       | string | `1`：success; `2`：fail                                        |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/ins-loan/repaid-history HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN-TYPE: 2X-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1678687944725X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXX
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_repayment_info())
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getInstitutionalLendingRepayOrders({    limit: 100,  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "repayInfo": [            {                "repayOrderId": "8189",                "repaidTime": "1663126393000",                "token": "USDT",                "quantity": "30000",                "interest": "0",                "businessType": "1",                "status": "1"            }        ]    },    "retExtInfo": {},    "time": 1669366648366}
```

[

Previous

Get Loan Orders

](/docs/v5/otc/loan-info)[

Next

Get LTV

](/docs/v5/otc/ltv-convert)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
