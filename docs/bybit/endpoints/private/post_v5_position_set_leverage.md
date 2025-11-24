# Set Leverage

info

According to the risk limit, leverage affects the maximum position value that
can be opened, that is, the greater the leverage, the smaller the maximum
position value that can be opened, and vice versa.
[Learn more](https://www.bybit.com/en/help-center/article/Risk-Limit-Perpetual-and-FuturesBybit_Perpetual_Contract_mechanism)

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/set-leverage`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments     |
| :--------------------------------- | :------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | **true** | string | Product type |

- [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10):
  `linear`, `inverse`
- Classic account: `linear`, `inverse`

| | symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only | |
buyLeverage | **true** | string | \[`1`, max leverage\]

- one-way mode: `buyLeverage` must be the same as `sellLeverage`
- Hedge mode:  
  Classic account & UTA (isolated margin): `buyLeverage` and `sellLeverage` can
  be different;  
  UTA (cross margin): `buyLeverage` must be the same as `sellLeverage`

| | sellLeverage | **true** | string | \[`1`, max leverage\] |

[RUN >>](/docs/api-explorer/v5/position/leverage)

---

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/position/set-leverage HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672281605082X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category": "linear",    "symbol": "BTCUSDT",    "buyLeverage": "6",    "sellLeverage": "6"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_leverage(    category="linear",    symbol="BTCUSDT",    buyLeverage="6",    sellLeverage="6",))
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var setLeverageRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").buyLeverage("5").sellLeverage("5").build();client.setPositionLeverage(setLeverageRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .setLeverage({
    category: "linear",
    symbol: "BTCUSDT",
    buyLeverage: "6",
    sellLeverage: "6"
  })
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
  "result": {},
  "retExtInfo": {},
  "time": 1672281607343
}
```
