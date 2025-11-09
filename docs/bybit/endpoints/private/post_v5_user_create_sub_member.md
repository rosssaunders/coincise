# POST /v5/user/create-sub-member

**Source:**
[Create Sub UID](https://bybit-exchange.github.io/docs/v5/user/create-subuid)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- User
- Create Sub UID

On this page

# Create Sub UID

Create a new sub user id. Use **master** account's api key.

tip

The API key must have one of the below permissions in order to call this
endpoint

- master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/create-sub-member`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                      |
| :-------- | :------- | :----- | ----------------------------- |
| username  | **true** | string | Username of the new sub user. |

- 6-16 characters, must include both numbers and letters.
- Cannot be the same as the existing or deleted usernames.

| | password | false | string | Password for the new sub user.

- 8-30 characters, must include numbers, upper and lowercase letters.

| | memberType | **true** | integer | `1`: normal sub account, `6`: custodial
sub account | | switch | false | integer |

- `0`: turn off quick login (default)
- `1`: turn on quick login.

| | isUta | false | boolean | deprecated param, always UTA account | | note |
false | string | Set a remark |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments                      |
| :-------- | :----- | ----------------------------- |
| uid       | string | Sub user Id                   |
| username  | string | Username of the new sub user. |

- 6-16 characters, must include both numbers and letters.
- Cannot be the same as the existing or deleted usernames.

| | memberType | integer | `1`: normal sub account, `6`: custodial sub account |
| status | integer | The status of the user account

- `1`: normal
- `2`: login banned
- `4`: frozen

| | remark | string | The remark |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/user/create-sub-member HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676429344202X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "username": "xxxxx",    "memberType": 1,    "switch": 1,    "note": "test"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.create_sub_uid(    username="xxxxx",    memberType=1,    switch=1,    note="test",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .createSubMember({    username: 'xxxxx',    memberType: 1,    switch: 1,    note: 'test',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "uid": "53888000",        "username": "xxxxx",        "memberType": 1,        "status": 1,        "remark": "test"    },    "retExtInfo": {},    "time": 1676429344734}
```

[

Previous

Get Convert History

](/docs/v5/asset/convert/get-convert-history)[

Next

Create Sub UID API Key

](/docs/v5/user/create-subuid-apikey)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
