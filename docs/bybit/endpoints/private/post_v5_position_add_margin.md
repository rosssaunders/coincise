# Add Or Reduce Margin

Manually add or reduce margin for **isolated** margin position

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/add-margin`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `inverse`
-   Classic account: `linear`, `inverse`

 |
| symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| margin | **true** | string | Add or reduce. To add, then `10`; To reduce, then `-10`. Support up to 4 decimal |
| [positionIdx](/docs/v5/enum#positionidx) | false | integer | Used to identify positions in different position modes. For hedge mode position, this param is **required**

-   `0`: one-way mode
-   `1`: hedge-mode Buy side
-   `2`: hedge-mode Sell side

 |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| [category](/docs/v5/enum#category) | string | Product type |
| symbol | string | Symbol name |
| [positionIdx](/docs/v5/enum#positionidx) | integer | Position idx, used to identify positions in different position modes
-   `0`: One-Way Mode
-   `1`: Buy side of both side mode
-   `2`: Sell side of both side mode

 |
| riskId | integer | Risk limit ID |
| riskLimitValue | string | Risk limit value |
| size | string | Position size |
| avgPrice | string | Average entry price |
| liqPrice | string | Liquidation price |
| bustPrice | string | Bankruptcy price |
| markPrice | string | Last mark price |
| positionValue | string | Position value |
| leverage | string | Position leverage |
| autoAddMargin | integer | Whether to add margin automatically. `0`: false, `1`: true |
| [positionStatus](/docs/v5/enum#positionstatus) | String | Position status. `Normal`, `Liq`, `Adl` |
| positionIM | string | Initial margin |
| positionMM | string | Maintenance margin |
| takeProfit | string | Take profit price |
| stopLoss | string | Stop loss price |
| trailingStop | string | Trailing stop (The distance from market price) |
| unrealisedPnl | string | Unrealised PnL |
| cumRealisedPnl | string | Cumulative realised pnl |
| createdTime | string | Timestamp of the first time a position was created on this symbol (ms) |
| updatedTime | string | Position updated timestamp (ms) |

[RUN >>](/docs/api-explorer/v5/position/manual-add-margin)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/position/add-margin HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1684234363665X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 97{    "category": "inverse",    "symbol": "ETHUSD",    "margin": "0.01",    "positionIdx": 0}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.add_or_reduce_margin(    category="linear",    symbol="BTCUSDT",    margin="10"))
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var updateMarginRequest = PositionDataRequest.builder().category(CategoryType.INVERSE).symbol("ETHUSDT").margin("0.0001").build();client.modifyPositionMargin(updateMarginRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .addOrReduceMargin({        category: 'linear',        symbol: 'BTCUSDT',        margin: '10',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "inverse",
    "symbol": "ETHUSD",
    "positionIdx": 0,
    "riskId": 11,
    "riskLimitValue": "500",
    "size": "200",
    "positionValue": "0.11033265",
    "avgPrice": "1812.70004844",
    "liqPrice": "1550.80",
    "bustPrice": "1544.20",
    "markPrice": "1812.90",
    "leverage": "12",
    "autoAddMargin": 0,
    "positionStatus": "Normal",
    "positionIM": "0.01926611",
    "positionMM": "0",
    "unrealisedPnl": "0.00001217",
    "cumRealisedPnl": "-0.04618929",
    "stopLoss": "0.00",
    "takeProfit": "0.00",
    "trailingStop": "0.00",
    "createdTime": "1672737740039",
    "updatedTime": "1684234363788"
  },
  "retExtInfo": {},
  "time": 1684234363789
}
```