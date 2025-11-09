# POST /v5/user/del-submember

**Source:**
[Delete Sub UID](https://bybit-exchange.github.io/docs/v5/user/rm-subuid)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- User
- Delete Sub UID

On this page

# Delete Sub UID

Delete a sub UID. Before deleting the UID, please make sure there is no asset.  
Use **master** user's api key\*\*.

tip

The API key must have one of the below permissions in order to call this
endpoint

- master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/del-submember`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter   | Required | Type   | Comments |
| :---------- | :------- | :----- | -------- |
| subMemberId | **true** | string | Sub UID  |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/user/del-submember HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1698907012755X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/jsonContent-Length: 34{    "subMemberId": "112725187"}
```

```

```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .deleteSubMember({    subMemberId: 'subUID',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {},    "retExtInfo": {},    "time": 1698907012962}
```

[

Previous

Modify Sub API Key

](/docs/v5/user/modify-sub-apikey)[

Next

Delete Master API Key

](/docs/v5/user/rm-master-apikey)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
