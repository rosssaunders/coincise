# Get Account Info

Query the account information, like margin mode, account mode, etc.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/info`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                                | Type    | Comments                                                                                     |
| :------------------------------------------------------- | :------ | -------------------------------------------------------------------------------------------- |
| [unifiedMarginStatus](/docs/v5/enum#unifiedmarginstatus) | integer | Account status                                                                               |
| marginMode                                               | string  | `ISOLATED_MARGIN`, `REGULAR_MARGIN`, `PORTFOLIO_MARGIN`                                      |
| isMasterTrader                                           | boolean | Whether this account is a leader (copytrading). `true`, `false`                              |
| spotHedgingStatus                                        | string  | Whether the unified account enables Spot hedging. `ON`, `OFF`                                |
| updatedTime                                              | string  | Account data updated timestamp (ms)                                                          |
| dcpStatus                                                | string  | deprecated, always `OFF`. Please use [Get DCP Info](/docs/v5/account/dcp-info)               |
| timeWindow                                               | integer | deprecated, always `0`. Please use [Get DCP Info](/docs/v5/account/dcp-info)                 |
| smpGroup                                                 | integer | deprecated, always `0`. Please query [Get SMP Group ID](/docs/v5/account/smp-group) endpoint |

[RUN >>](/docs/api-explorer/v5/account/account-info)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/account/info HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672129307221X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_account_info())
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getAccountInfo()
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
  "result": {
    "marginMode": "REGULAR_MARGIN",
    "updatedTime": "1697078946000",
    "unifiedMarginStatus": 4,
    "dcpStatus": "OFF",
    "timeWindow": 10,
    "smpGroup": 0,
    "isMasterTrader": false,
    "spotHedgingStatus": "OFF"
  }
}
```
