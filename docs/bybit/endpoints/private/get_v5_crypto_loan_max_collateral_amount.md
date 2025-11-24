# GET /v5/crypto-loan/max-collateral-amount

**Source:** [Get Max. Allowed Collateral Reduction Amount](https://bybit-exchange.github.io/docs/v5/crypto-loan/reduce-max-collateral-amt)

## Authentication

Required (Private Endpoint)

-   Get Max. Allowed Collateral Reduction Amount

# Get Max. Allowed Collateral Reduction Amount

Query for the maximum amount by which collateral may be reduced by.

> Permission: "Spot trade"

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/crypto-loan/max-collateral-amount`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| orderId | **true** | string | Loan coin ID |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| maxCollateralAmount | string | Max. reduction collateral amount |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/crypto-loan/max-collateral-amount?orderId=1794267532472646144 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728634289933X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_max_allowed_collateral_reduction_amount(        orderId="1794267532472646144",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getMaxAllowedReductionCollateralAmount({ orderId: '1794267532472646144' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "request.success",
  "result": {
    "maxCollateralAmount": "0.00210611"
  },
  "retExtInfo": {},
  "time": 1728634291554
}
```