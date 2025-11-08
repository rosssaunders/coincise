# GET /v5/crypto-loan/adjustment-history

**Source:**
[Get Loan LTV Adjustment History](https://bybit-exchange.github.io/docs/v5/crypto-loan/ltv-adjust-history)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Crypto Loan (legacy)
- Get Loan LTV Adjustment History

On this page

# Get Loan LTV Adjustment History

Query for your LTV adjustment history.

> Permission: "Spot trade"

info

- Support querying last 6 months adjustment transactions
- Only the ltv adjustment transactions launched by the user can be queried

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/crypto-loan/adjustment-history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter          | Required | Type   | Comments                                                                                             |
| :----------------- | :------- | :----- | ---------------------------------------------------------------------------------------------------- |
| orderId            | false    | string | Loan order ID                                                                                        |
| adjustId           | false    | string | Collateral adjustment transaction ID                                                                 |
| collateralCurrency | false    | string | Collateral coin name                                                                                 |
| limit              | false    | string | Limit for data size per page. \[`1`, `100`\]. Default: `10`                                          |
| cursor             | false    | string | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter             | Type    | Comments                                                                 |
| :-------------------- | :------ | ------------------------------------------------------------------------ |
| list                  | array   | Object                                                                   |
| \> collateralCurrency | string  | Collateral coin                                                          |
| \> orderId            | string  | Loan order ID                                                            |
| \> adjustId           | string  | Collateral adjustment transaction ID                                     |
| \> adjustTime         | string  | Adjust timestamp                                                         |
| \> preLTV             | string  | LTV before the adjustment                                                |
| \> afterLTV           | string  | LTV after the adjustment                                                 |
| \> direction          | integer | The direction of adjustment, `0`: add collateral; `1`: reduce collateral |
| nextPageCursor        | string  | Refer to the `cursor` request parameter                                  |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/crypto-loan/adjustment-history?adjustId=1794318409405331968 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728635871668X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_crypto_loan_ltv_adjustment_history(    adjustId="1794318409405331968",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getLoanLTVAdjustmentHistory({ adjustId: '1794271131730737664' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "request.success",    "result": {        "list": [            {                "adjustId": "1794318409405331968",                "adjustTime": "1728635422814",                "afterLTV": "0.7164",                "amount": "0.001",                "collateralCurrency": "BTC",                "direction": 1,                "orderId": "1794267532472646144",                "preLTV": "0.6546"            }        ],        "nextPageCursor": "1844656778923966466"    },    "retExtInfo": {},    "time": 1728635873329}
```

[

Previous

Adjust Collateral Amount

](/docs/v5/crypto-loan/adjust-collateral)[

Next

Get Product Info

](/docs/v5/otc/margin-product-info)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
