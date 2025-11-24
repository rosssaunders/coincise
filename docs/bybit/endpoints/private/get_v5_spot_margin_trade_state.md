# Get Status And Leverage

Query the Spot margin status and leverage of Unified account

> **Covers: Margin trade (Unified Account)**

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/spot-margin-trade/state`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter         | Type   | Comments                                                                      |
| :---------------- | :----- | ----------------------------------------------------------------------------- |
| spotLeverage      | string | Spot margin leverage. Returns `""` if the margin trade is turned off          |
| spotMarginMode    | string | Spot margin status. `1`: on, `0`: off                                         |
| effectiveLeverage | string | actual leverage ratio. Precision retains 2 decimal places, truncate downwards |

[RUN >>](/docs/api-explorer/v5/spot-margin-uta/status)

---

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/spot-margin-trade/state HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1692696840996X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.spot_margin_trade_get_status_and_leverage())
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .getSpotMarginState()
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
    "spotLeverage": "10",
    "spotMarginMode": "1",
    "effectiveLeverage": "1"
  },
  "retExtInfo": {},
  "time": 1692696841231
}
```
