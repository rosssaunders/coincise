# Get Account Info

info

> API rate limit: 10 req / sec

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/broker/account-info`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter           | Type   | Comments                                                           |
| :------------------ | :----- | ------------------------------------------------------------------ |
| subAcctQty          | string | The qty of sub account has been created                            |
| maxSubAcctQty       | string | The max limit of sub account can be created                        |
| baseFeeRebateRate   | Object | Rebate percentage of the base fee                                  |
| \> spot             | string | Rebate percentage of the base fee for spot, e.g., 10.00%           |
| \> derivatives      | string | Rebate percentage of the base fee for derivatives, e.g., 10.00%    |
| markupFeeRebateRate | Object | Rebate percentage of the mark up fee                               |
| \> spot             | string | Rebate percentage of the mark up fee for spot, e.g., 10.00%        |
| \> derivatives      | string | Rebate percentage of the mark up fee for derivatives, e.g., 10.00% |
| \> convert          | string | Rebate percentage of the mark up fee for convert, e.g., 10.00%     |
| ts                  | string | System timestamp (ms)                                              |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/broker/account-info HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1701399431920X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```

```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getExchangeBrokerAccountInfo()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "success",    "result": {        "subAcctQty": "2",        "maxSubAcctQty": "20",        "baseFeeRebateRate": {            "spot": "10.0%",            "derivatives": "10.0%"        },        "markupFeeRebateRate": {            "spot": "6.00%",            "derivatives": "9.00%",            "convert": "3.00%",        },        "ts": "1701395633402"    },    "retExtInfo": {},    "time": 1701395633403}
```
