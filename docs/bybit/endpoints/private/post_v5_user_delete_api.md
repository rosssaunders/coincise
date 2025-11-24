# Delete Master API Key

Delete the api key of master account. Use the api key pending to be delete to call the endpoint. Use **master user's api key** **only**.

tip

The API key must have one of the below permissions in order to call this endpoint..

-   master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

danger

BE CAREFUL! The API key used to call this interface will be invalid immediately.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/delete-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/user/delete-api HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676431576621X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/json{}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.delete_master_api_key())
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .deleteMasterApiKey()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {},
  "retExtInfo": {},
  "time": 1676431577675
}
```