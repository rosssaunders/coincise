# Get Repayment Orders

Get a list of your loan repayment orders (orders which repaid the loan).

tip

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/ins-loan/repaid-history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| startTime | false | integer | The start timestamp (ms) |
| endTime | false | integer | The end timestamp (ms) |
| limit | false | integer | Limit for data size. \[`1`, `100`\]. Default: `100` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| repayInfo | array | Object |
| \> repayOrderId | string | Repaid order ID |
| \> repaidTime | string | Repaid timestamp (ms) |
| \> token | string | Repaid coin |
| \> quantity | string | Repaid principle |
| \> interest | string | Repaid interest |
| \> businessType | string | Repaid type. `1`：normal repayment; `2`：repaid by liquidation |
| \> status | string | `1`：success; `2`：fail |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/ins-loan/repaid-history HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN-TYPE: 2X-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1678687944725X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXX
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_repayment_info())
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getInstitutionalLendingRepayOrders({    limit: 100,  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {
    "repayInfo": [
      {
        "repayOrderId": "8189",
        "repaidTime": "1663126393000",
        "token": "USDT",
        "quantity": "30000",
        "interest": "0",
        "businessType": "1",
        "status": "1"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1669366648366
}
```