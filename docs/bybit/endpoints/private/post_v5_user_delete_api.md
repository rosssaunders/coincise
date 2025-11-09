# POST /v5/user/delete-api

**Source:**
[Delete Master API Key](https://bybit-exchange.github.io/docs/v5/user/rm-master-apikey)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- User
- Delete Master API Key

On this page

# Delete Master API Key

Delete the api key of master account. Use the api key pending to be delete to
call the endpoint. Use **master user's api key** **only**.

tip

The API key must have one of the below permissions in order to call this
endpoint..

- master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

danger

BE CAREFUL! The API key used to call this interface will be invalid immediately.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/delete-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/user/delete-api HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676431576621X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/json{}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.delete_master_api_key())
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .deleteMasterApiKey()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {},    "retExtInfo": {},    "time": 1676431577675}
```

[

Previous

Delete Sub UID

](/docs/v5/user/rm-subuid)[

Next

Delete Sub API Key

](/docs/v5/user/rm-sub-apikey)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
