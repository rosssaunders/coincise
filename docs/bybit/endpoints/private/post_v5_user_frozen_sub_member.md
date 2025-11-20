# Freeze Sub UID

Freeze Sub UID. Use **master user's api key** **only**.

tip

The API key must have one of the below permissions in order to call this endpoint..

-   master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/frozen-sub-member`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| subuid | **true** | integer | Sub user Id |
| frozen | **true** | integer | `0`：unfreeze, `1`：freeze |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
POST /v5/user/frozen-sub-member HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676430842094X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "subuid": 53888001,    "frozen": 1}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.freeze_sub_uid(    subuid=53888001,    frozen=1,))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .setSubUIDFrozenState(53888001, 1)  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {},
  "retExtInfo": {},
  "time": 1676430697553
}
```