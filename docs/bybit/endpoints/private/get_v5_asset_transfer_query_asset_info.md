# Get Asset Info

Query Spot asset information

> Apply to: classic account

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/transfer/query-asset-info`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [accountType](/docs/v5/enum#accounttype) | **true** | string | Account type. `SPOT` |
| coin | false | string | Coin name, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| spot | Object |  |
| \> status | string | account status. `ACCOUNT_STATUS_NORMAL`: normal, `ACCOUNT_STATUS_UNSPECIFIED`: banned |
| \> assets | array | Object |
| \>> coin | string | Coin |
| \>> frozen | string | Freeze amount |
| \>> free | string | Free balance |
| \>> withdraw | string | Amount in withdrawing |

[RUN >>](/docs/api-explorer/v5/asset/asset-info)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
GET /v5/asset/transfer/query-asset-info?accountType=SPOT&coin=ETH HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672136538042X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_spot_asset_info(    accountType="FUND",    coin="USDC",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getAssetInfo({ accountType: 'FUND', coin: 'USDC' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "spot": {
      "status": "ACCOUNT_STATUS_NORMAL",
      "assets": [
        {
          "coin": "ETH",
          "frozen": "0",
          "free": "11.53485",
          "withdraw": ""
        }
      ]
    }
  },
  "retExtInfo": {},
  "time": 1672136539127
}
```