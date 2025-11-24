# Cancel Withdrawal

Cancel the withdrawal

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/withdraw/cancel`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments      |
| :-------- | :------- | :----- | ------------- |
| id        | **true** | string | Withdrawal ID |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type    | Comments                |
| :-------- | :------ | ----------------------- |
| status    | integer | `0`: fail. `1`: success |

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
POST /v5/asset/withdraw/cancel HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672197227732X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXContent-Type: application/json{    "id": "10197"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.cancel_withdrawal(    id="10197",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .cancelWithdrawal("10197")
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "status": 1
  },
  "retExtInfo": {},
  "time": 1672197228408
}
```
