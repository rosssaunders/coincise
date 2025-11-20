# Set Leverage

Set the user's maximum leverage in spot cross margin

> **Covers: Margin trade (Unified Account)**

caution

Your account needs to activate spot margin first; i.e., you must have finished the quiz on web / app.  
The updated leverage must be less than or equal to the maximum leverage of the currency

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/spot-margin-trade/set-leverage`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| leverage | **true** | string | Leverage. \[`2`, `10`\]. |
| currency | false | string | Coin name, uppercase only |

[RUN >>](/docs/api-explorer/v5/spot-margin-uta/set-leverage)

* * *

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
POST /v5/spot-margin-trade/set-leverage HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672299806626X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "leverage": "4"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.spot_margin_trade_set_leverage(    leverage="4",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .setSpotMarginLeverage('4')  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {},
  "retExtInfo": {},
  "time": 1672710944282
}
```