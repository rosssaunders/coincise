# Get Borrow Quota (Spot)

Query the available balance for Spot trading and Margin trading

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/order/spot-borrow-check`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10): `spot` |
| symbol | **true** | string | Symbol name |
| side | **true** | string | Transaction side. `Buy`,`Sell` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| symbol | string | Symbol name, like `BTCUSDT`, uppercase only |
| side | string | Side |
| maxTradeQty | string | The maximum base coin qty can be traded
-   If spot margin trade on and symbol is margin trading pair, it returns available balance + max.borrowable quantity = min(The maximum quantity that a single user can borrow on the platform, The maximum quantity that can be borrowed calculated by IMR MMR of UTA account, The available quantity of the platform's capital pool)
-   Otherwise, it returns actual available balance

 |
| maxTradeAmount | string | The maximum quote coin amount can be traded

-   If spot margin trade on and symbol is margin trading pair, it returns available balance + max.borrowable amount = min(The maximum amount that a single user can borrow on the platform, The maximum amount that can be borrowed calculated by IMR MMR of UTA account, The available amount of the platform's capital pool)
-   Otherwise, it returns actual available balance

 |
| spotMaxTradeQty | string | No matter your Spot margin switch on or not, it always returns actual qty of base coin you can trade or you have (borrowable qty is not included), up to 4 decimals |
| spotMaxTradeAmount | string | No matter your Spot margin switch on or not, it always returns actual amount of quote coin you can trade or you have (borrowable amount is not included), up to 8 decimals |
| borrowCoin | string | Borrow coin |

[RUN >>](/docs/api-explorer/v5/trade/query-spot-quota)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/order/spot-borrow-check?category=spot&symbol=BTCUSDT&side=Buy HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672228522214X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_borrow_quota(    category="spot",    symbol="BTCUSDT",    side="Buy",))
```

```python
import com.bybit.api.client.config.BybitApiConfig;import com.bybit.api.client.domain.trade.request.TradeOrderRequest;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET", BybitApiConfig.TESTNET_DOMAIN).newTradeRestClient();var getBorrowQuotaRequest = TradeOrderRequest.builder().category(CategoryType.SPOT).symbol("BTCUSDT").side(Side.BUY).build();System.out.println(client.getBorrowQuota(getBorrowQuotaRequest));
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .getSpotBorrowCheck('BTCUSDT', 'Buy')    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "symbol": "BTCUSDT",
    "maxTradeQty": "6.6065",
    "side": "Buy",
    "spotMaxTradeAmount": "9004.75628594",
    "maxTradeAmount": "218014.01330797",
    "borrowCoin": "USDT",
    "spotMaxTradeQty": "0.2728"
  },
  "retExtInfo": {},
  "time": 1698895841534
}
```