# Set Collateral Coin

You can decide whether the assets in the Unified account needs to be collateral coins.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/account/set-collateral-switch`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| coin | **true** | string | Coin name, uppercase only
-   You can get collateral coin from [here](/docs/v5/account/collateral-info)
-   USDT, USDC cannot be set

 |
| collateralSwitch | **true** | string | `ON`: switch on collateral, `OFF`: switch off collateral |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

[RUN >>](/docs/api-explorer/v5/account/set-collateral)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
POST /v5/account/set-collateral-switch HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1690513916181X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 55{    "coin": "BTC",    "collateralSwitch": "ON"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_collateral_coin(    coin="BTC",    collateralSwitch="ON"))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .setCollateralCoin({    coin: 'BTC',    collateralSwitch: 'ON',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "SUCCESS",
  "result": {},
  "retExtInfo": {},
  "time": 1690515818656
}
```