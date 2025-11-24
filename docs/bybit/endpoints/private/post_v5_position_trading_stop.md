# Set Trading Stop

Set the take profit, stop loss or trailing stop for the position.

tip

Passing these parameters will create conditional orders by the system internally. The system will cancel these orders if the position is closed, and adjust the qty according to the size of the open position.

info

New version of TP/SL function supports both holding entire position TP/SL orders and holding partial position TP/SL orders.

-   Full position TP/SL orders: This API can be used to modify the parameters of existing TP/SL orders.
-   Partial position TP/SL orders: This API can only add partial position TP/SL orders.

note

Under the new version of TP/SL function, when calling this API to perform one-sided take profit or stop loss modification on existing TP/SL orders on the holding position, it will cause the paired tp/sl orders to lose binding relationship. This means that when calling the cancel API through the tp/sl order ID, it will only cancel the corresponding one-sided take profit or stop loss order ID.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/trading-stop`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `inverse`
-   Classic account: `linear`, `inverse`

 |
| symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| tpslMode | **true** | string | TP/SL mode-   `Full`: entire position TP/SL
-   `Partial`: partial position TP/SL |
| [positionIdx](/docs/v5/enum#positionidx) | true | integer | Used to identify positions in different position modes.

-   `0`: one-way mode
-   `1`: hedge-mode Buy side
-   `2`: hedge-mode Sell side

 |
| takeProfit | false | string | Cannot be less than 0, 0 means cancel TP |
| stopLoss | false | string | Cannot be less than 0, 0 means cancel SL |
| trailingStop | false | string | Trailing stop by price distance. Cannot be less than 0, 0 means cancel TS |
| [tpTriggerBy](/docs/v5/enum#triggerby) | false | string | Take profit trigger price type |
| [slTriggerBy](/docs/v5/enum#triggerby) | false | string | Stop loss trigger price type |
| activePrice | false | string | Trailing stop trigger price. Trailing stop will be triggered when this price is reached **only** |
| tpSize | false | string | Take profit size  
valid for TP/SL partial mode, note: the value of tpSize and slSize must equal |
| slSize | false | string | Stop loss size  
valid for TP/SL partial mode, note: the value of tpSize and slSize must equal |
| tpLimitPrice | false | string | The limit order price when take profit price is triggered. Only works when tpslMode=Partial and tpOrderType=Limit |
| slLimitPrice | false | string | The limit order price when stop loss price is triggered. Only works when tpslMode=Partial and slOrderType=Limit |
| tpOrderType | false | string | The order type when take profit is triggered. `Market`(default), `Limit`  
For tpslMode=Full, it only supports tpOrderType="Market" |
| slOrderType | false | string | The order type when stop loss is triggered. `Market`(default), `Limit`  
For tpslMode=Full, it only supports slOrderType="Market" |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

[RUN >>](/docs/api-explorer/v5/position/trading-stop)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/position/trading-stop HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672283124270X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category":"linear",    "symbol": "XRPUSDT",    "takeProfit": "0.6",    "stopLoss": "0.2",    "tpTriggerBy": "MarkPrice",    "slTriggerBy": "IndexPrice",    "tpslMode": "Partial",    "tpOrderType": "Limit",    "slOrderType": "Limit",    "tpSize": "50",    "slSize": "50",    "tpLimitPrice": "0.57",    "slLimitPrice": "0.21",    "positionIdx": 0}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_trading_stop(    category="linear",    symbol="XRPUSDT",    takeProfit="0.6",    stopLoss="0.2",    tpTriggerBy="MarkPrice",    slTriggerB="IndexPrice",    tpslMode="Partial",    tpOrderType="Limit",    slOrderType="Limit",    tpSize="50",    slSize="50",    tpLimitPrice="0.57",    slLimitPrice="0.21",    positionIdx=0,))
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var setTradingStopRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("XRPUSDT").takeProfit("0.6").stopLoss("0.2").tpTriggerBy(TriggerBy.MARK_PRICE).slTriggerBy(TriggerBy.LAST_PRICE)                .tpslMode(TpslMode.PARTIAL).tpOrderType(TradeOrderType.LIMIT).slOrderType(TradeOrderType.LIMIT).tpSize("50").slSize("50").tpLimitPrice("0.57").slLimitPrice("0.21").build();client.setTradingStop(setTradingStopRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .setTradingStop({        category: 'linear',        symbol: 'XRPUSDT',        takeProfit: '0.6',        stopLoss: '0.2',        tpTriggerBy: 'MarkPrice',        slTriggerBy: 'IndexPrice',        tpslMode: 'Partial',        tpOrderType: 'Limit',        slOrderType: 'Limit',        tpSize: '50',        slSize: '50',        tpLimitPrice: '0.57',        slLimitPrice: '0.21',        positionIdx: 0,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {},
  "retExtInfo": {},
  "time": 1672283125359
}
```