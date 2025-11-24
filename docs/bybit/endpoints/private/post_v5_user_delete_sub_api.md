# Delete Sub API Key

Delete the api key of sub account. Use the sub api key pending to be delete to call the endpoint or use the master api key to delete corresponding sub account api key

tip

The API key must have one of the below permissions in order to call this endpoint.

-   sub API key: "Account Transfer", "Sub Member Transfer"
-   master API Key: "Account Transfer", "Sub Member Transfer", "Withdrawal"

danger

BE CAREFUL! The Sub account API key will be invalid immediately after calling the endpoint.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/delete-sub-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| apikey | false | string | Sub account api key

-   If you use corresponding sub uid api key call this endpoint, `apikey` param cannot be passed, otherwise throwing an error

 |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/user/delete-sub-api HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676431922953X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/json{}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.delete_sub_api_key())
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .deleteSubApiKey()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {},
  "retExtInfo": {},
  "time": 1676431924719
}
```