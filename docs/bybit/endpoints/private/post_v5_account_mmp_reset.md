# Get MMP State

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/mmp-state`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| baseCoin | **true** | string | Base coin, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| result | array | Object |
| \> baseCoin | string | Base coin |
| \> mmpEnabled | boolean | Whether the account is enabled mmp |
| \> window | string | Time window (ms) |
| \> frozenPeriod | string | Frozen period (ms) |
| \> qtyLimit | string | Trade qty limit |
| \> deltaLimit | string | Delta limit |
| \> mmpFrozenUntil | string | Unfreeze timestamp (ms) |
| \> mmpFrozen | boolean | Whether the mmp is triggered.
-   `true`: mmpFrozenUntil is meaningful
-   `false`: please ignore the value of mmpFrozenUntil

 |

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
POST /v5/account/mmp-reset HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1675842997277X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "baseCoin": "ETH"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_mmp_state(    baseCoin="ETH",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .getMMPState('ETH')    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "result": [
      {
        "baseCoin": "BTC",
        "mmpEnabled": true,
        "window": "5000",
        "frozenPeriod": "100000",
        "qtyLimit": "0.01",
        "deltaLimit": "0.01",
        "mmpFrozenUntil": "1675760625519",
        "mmpFrozen": false
      }
    ]
  },
  "retExtInfo": {},
  "time": 1675843188984
}
```