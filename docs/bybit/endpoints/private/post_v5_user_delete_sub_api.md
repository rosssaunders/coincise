# POST /v5/user/delete-sub-api

**Source:**
[Delete Sub API Key](https://bybit-exchange.github.io/docs/v5/user/rm-sub-apikey)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- User
- Delete Sub API Key

On this page

# Delete Sub API Key

Delete the api key of sub account. Use the sub api key pending to be delete to
call the endpoint or use the master api key to delete corresponding sub account
api key

tip

The API key must have one of the below permissions in order to call this
endpoint.

- sub API key: "Account Transfer", "Sub Member Transfer"
- master API Key: "Account Transfer", "Sub Member Transfer", "Withdrawal"

danger

BE CAREFUL! The Sub account API key will be invalid immediately after calling
the endpoint.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/delete-sub-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments            |
| :-------- | :------- | :----- | ------------------- |
| apikey    | false    | string | Sub account api key |

- You must pass this param when you use master account manage sub account api
  key settings
- If you use corresponding sub uid api key call this endpoint, `apikey` param
  cannot be passed, otherwise throwing an error

|

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/user/delete-sub-api HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676431922953X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/json{}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.delete_sub_api_key())
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .deleteSubApiKey()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {},    "retExtInfo": {},    "time": 1676431924719}
```

[

Previous

Delete Master API Key

](/docs/v5/user/rm-master-apikey)[

Next

Get Instruments Info

](/docs/v5/spread/market/instrument)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
