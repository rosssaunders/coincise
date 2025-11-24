# Toggle Margin Trade

Turn on / off spot margin trade

> **Covers: Margin trade (Unified Account)**

caution

Your account needs to activate spot margin first; i.e., you must have finished the quiz on web / app.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/spot-margin-trade/switch-mode`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| spotMarginMode | **true** | string | `1`: on, `0`: off |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| spotMarginMode | string | Spot margin status. `1`: on, `0`: off |

[RUN >>](/docs/api-explorer/v5/spot-margin-uta/switch-mode)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/spot-margin-trade/switch-mode HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672297794480X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "spotMarginMode": "0"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.spot_margin_trade_toggle_margin_trade(    spotMarginMode="0",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .toggleSpotMarginTrade('0')  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "spotMarginMode": "0"
  },
  "retExtInfo": {},
  "time": 1672297795542
}
```