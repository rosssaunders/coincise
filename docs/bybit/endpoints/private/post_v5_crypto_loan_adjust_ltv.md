# Adjust Collateral Amount

You can increase or reduce your collateral amount. When you reduce, please obey the [max. allowed reduction amount](https://bybit-exchange.github.io/docs/v5/crypto-loan/reduce-max-collateral-amt).

> Permission: "Spot trade"

info

-   The adjusted collateral amount will be returned to or deducted from the Funding wallet.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/crypto-loan/adjust-ltv`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| orderId | **true** | string | Loan order ID |
| amount | **true** | string | Adjustment amount |
| direction | **true** | string | `0`: add collateral; `1`: reduce collateral |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| adjustId | string | Collateral adjustment transaction ID |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/crypto-loan/adjust-ltv HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728635421137X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 85{    "orderId": "1794267532472646144",    "amount": "0.001",    "direction": "1"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.adjust_collateral_amount(    orderId="1794267532472646144",    amount="0.001",    direction="1",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .adjustCollateralAmount({    orderId: '1794267532472646144',    amount: '0.001',    direction: '1',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "request.success",
  "result": {
    "adjustId": "1794318409405331968"
  },
  "retExtInfo": {},
  "time": 1728635422833
}
```