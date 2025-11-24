# Get SMP Group ID

Query the SMP group ID of self match prevention

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/smp-group`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| smpGroup | integer | Smp group ID. If the UID has no group, it is `0` by default |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/account/smp-group HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1702363848192X-BAPI-RECV-WINDOW: 5000
```

```

```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getSMPGroup()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "smpGroup": 0
  },
  "retExtInfo": {},
  "time": 1702363848539
}
```