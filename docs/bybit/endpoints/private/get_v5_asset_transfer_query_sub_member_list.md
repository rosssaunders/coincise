# Get Sub UID

Query the sub UIDs under a main UID. It returns up to 2000 sub accounts, if you need more, please call this [endpoint](/docs/v5/user/page-subuid).

info

Query by the master UID's api key **only**

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/transfer/query-sub-member-list`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| subMemberIds | array<string\> | All sub UIDs under the main UID |
| transferableSubMemberIds | array<string\> | All sub UIDs that have universal transfer enabled |

[RUN >>](/docs/api-explorer/v5/asset/sub-uid-list)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/transfer/query-sub-member-list HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672147239931X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_sub_uid())
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getSubUID()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "subMemberIds": [
      "554117",
      "592324",
      "592334",
      "1055262",
      "1072055",
      "1119352"
    ],
    "transferableSubMemberIds": [
      "554117",
      "592324"
    ]
  },
  "retExtInfo": {},
  "time": 1672147241320
}
```