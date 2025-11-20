# Set Deposit Account

Set auto transfer account after deposit. The same function as the setting for Deposit on [web GUI](https://www.bybit.com/app/user/settings)

info

-   Your funds will be deposited into `FUND` wallet by default. You can set the wallet for auto-transfer after deposit by this API.
-   Only **main** UID can access.

tip

-   [UTA2.0](/docs/v5/acct-mode#uta-20) has `FUND`, `UNIFIED`
-   [UTA1.0](/docs/v5/acct-mode#uta-10) has `FUND`, `UNIFIED`, `CONTRACT`(for inverse derivatives)
-   Classic account has `FUND`, `CONTRACT`(for inverse derivatives and derivatives), `SPOT`

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/deposit/deposit-to-account`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [accountType](/docs/v5/enum#accounttype) | **true** | string | Account type
-   `UNIFIED`
-   `SPOT`
-   `CONTRACT`
-   `FUND`

 |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| status | integer | Request result:
-   `1`: SUCCESS
-   `0`: FAIL

 |

[RUN >>](/docs/api-explorer/v5/asset/set-deposit-acct)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
POST /v5/asset/deposit/deposit-to-account HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676887913670X-BAPI-RECV-WINDOW: 50000Content-Type: application/json{    "accountType": "CONTRACT"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_deposit_account(    accountType="CONTRACT",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .setDepositAccount({    accountType: 'CONTRACT'  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
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
  "time": 1676887914363
}
```