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

- Node.js

```bash
POST /v5/user/del-submember HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1698907012755X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/jsonContent-Length: 34{    "subMemberId": "112725187"}
```

```

```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .deleteSubMember({ subMemberId: "subUID" })
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
  "retMsg": "OK",
  "result": {},
  "retExtInfo": {},
  "time": 1698907012962
}
```
