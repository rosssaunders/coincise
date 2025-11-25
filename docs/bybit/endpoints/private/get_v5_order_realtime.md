# GET /v5/order/realtime

**Source:**
[Get Open & Closed Orders](https://bybit-exchange.github.io/docs/v5/order/open-order)

## Authentication

Required (Private Endpoint)

- Get Open & Closed Orders

# Get Open & Closed Orders

Primarily query unfilled or partially filled orders in **real-time**, but also
supports querying recent 500 closed status (Cancelled, Filled) orders. Please
see the usage of request param `openOnly`.  
And to query older order records, please use the
[order history](/docs/v5/order/order-list) interface.

tip

- [UTA2.0](/docs/v5/acct-mode#uta-20) can query filled, cancelled, and rejected
  orders to the most recent 500 orders for spot, linear, inverse and option
  categories
- [UTA1.0](/docs/v5/acct-mode#uta-10) can query filled, cancelled, and rejected
  orders to the most recent 500 orders for spot, linear, and option categories.
  The inverse category is not subject to this limitation.
- You can query by symbol, baseCoin, orderId and orderLinkId, and if you pass
  multiple params, the system will process them according to this priority:
  orderId > orderLinkId > symbol > baseCoin.
- The records are sorted by the `createdTime` from newest to oldest.

info

- After a server release or restart, filled, cancelled, and rejected orders of
  Unified account should only be queried through
  [order history](/docs/v5/order/order-list).

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/order/realtime`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments     |
| :-------- | :------- | :----- | ------------ |
| category  | **true** | string | Product type |

- [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10):
  `linear`, `inverse`, `spot`, `option`
- classic account: `linear`, `inverse`, `spot`

| | symbol | false | string | Symbol name, like `BTCUSDT`, uppercase only. For
**linear**, either `symbol`, `baseCoin`, `settleCoin` is **required** | |
baseCoin | false | string | Base coin, uppercase only- Supports `linear`,
`inverse` & `option`

- `option`: it returns all option open orders by default | | settleCoin | false
  | string | Settle coin, uppercase only

- **linear**: either `symbol`, `baseCoin` or `settleCoin` is **required**
- `spot`: not supported
- `option`: USDT or USDC

| | orderId | false | string | Order ID | | orderLinkId | false | string | User
customised order ID | | openOnly | false | integer |

- `0`(default): [UTA2.0](/docs/v5/acct-mode#uta-20),
  [UTA1.0](/docs/v5/acct-mode#uta-10), classic account query open status orders
  (e.g., New, PartiallyFilled) **only**
- `1`: [UTA2.0](/docs/v5/acct-mode#uta-20),
  [UTA1.0](/docs/v5/acct-mode#uta-10)(except inverse)  
  `2`: [UTA1.0](/docs/v5/acct-mode#uta-10)(inverse), classic account  
  Query a maximum of recent 500 closed status records are kept under each
  account each category (e.g., Cancelled, Rejected, Filled orders).  
  _If the Bybit service is restarted due to an update, this part of the data
  will be cleared and accumulated again, but the order records will still be
  queried in [order history](/docs/v5/order/order-list)_
- `openOnly` param will be ignored when query by _orderId_ or _orderLinkId_
- Classic `spot`: not supported

| | orderFilter | false | string | `Order`: active order, `StopOrder`:
conditional order for Futures and Spot, `tpslOrder`: spot TP/SL order,
`OcoOrder`: Spot oco order, `BidirectionalTpslOrder`: Spot bidirectional TPSL
order

- classic account `spot`: return `Order` active order by default
- Others: all kinds of orders by default

| | limit | false | integer | Limit for data size per page. \[`1`, `50`\].
Default: `20` | | cursor | false | string | Cursor. Use the `nextPageCursor`
token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                                                                                                                    | Type    | Comments                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :------ | ---------------------------------------------------------------------------------------------------------------- |
| category                                                                                                                                     | string  | Product type                                                                                                     |
| nextPageCursor                                                                                                                               | string  | Refer to the `cursor` request parameter                                                                          |
| list                                                                                                                                         | array   | Object                                                                                                           |
| \> orderId                                                                                                                                   | string  | Order ID                                                                                                         |
| \> orderLinkId                                                                                                                               | string  | User customised order ID                                                                                         |
| \> blockTradeId                                                                                                                              | string  | Paradigm block trade ID                                                                                          |
| \> symbol                                                                                                                                    | string  | Symbol name                                                                                                      |
| \> price                                                                                                                                     | string  | Order price                                                                                                      |
| \> qty                                                                                                                                       | string  | Order qty                                                                                                        |
| \> side                                                                                                                                      | string  | Side. `Buy`,`Sell`                                                                                               |
| \> isLeverage                                                                                                                                | string  | Whether to borrow. **Unified `spot`** only. `0`: false, `1`: true. _Classic `spot` is not supported, always `0`_ |
| \> [positionIdx](/docs/v5/enum#positionidx)                                                                                                  | integer | Position index. Used to identify positions in different position modes.                                          |
| \> [orderStatus](/docs/v5/enum#orderstatus)                                                                                                  | string  | Order status                                                                                                     |
| \> [createType](/docs/v5/enum#createtype)                                                                                                    | string  | Order create type- Spot does not have this key                                                                   |
| \> [cancelType](/docs/v5/enum#canceltype)                                                                                                    | string  | Cancel type                                                                                                      |
| \> [rejectReason](/docs/v5/enum#rejectreason)                                                                                                | string  | Reject reason. _Classic `spot` is not supported_                                                                 |
| \> avgPrice                                                                                                                                  | string  | Average filled price- UTA: returns `""` for those orders without avg price                                       |
| - classic account: returns `"0"` for those orders without avg price, and also for those orders have partilly filled but cancelled at the end |
| \> leavesQty                                                                                                                                 | string  | The remaining qty not executed. _Classic `spot` is not supported_                                                |
| \> leavesValue                                                                                                                               | string  | The estimated value not executed. _Classic `spot` is not supported_                                              |
| \> cumExecQty                                                                                                                                | string  | Cumulative executed order qty                                                                                    |
| \> cumExecValue                                                                                                                              | string  | Cumulative executed order value. _Classic `spot` is not supported_                                               |
| \> cumExecFee                                                                                                                                | string  | - `inverse`, `option`: Cumulative executed trading fee.                                                          |

- `linear`, `spot`: Deprecated. Use `cumFeeDetail` instead. _Classic `spot` is
  not supported_ | | \> [timeInForce](/docs/v5/enum#timeinforce) | string | Time
  in force | | \> [orderType](/docs/v5/enum#ordertype) | string | Order type.
  `Market`,`Limit`. For TP/SL orders, is the order type after the order was
  triggered | | \> [stopOrderType](/docs/v5/enum#stopordertype) | string | Stop
  order type | | \> orderIv | string | Implied volatility | | \> marketUnit |
  string | The unit for `qty` when create **Spot market** orders for **UTA
  account**. `baseCoin`, `quoteCoin` | | \> triggerPrice | string | Trigger
  price. If `stopOrderType`\=_TrailingStop_, it is activate price. Otherwise, it
  is trigger price | | \> takeProfit | string | Take profit price | | \>
  stopLoss | string | Stop loss price | | \> tpslMode | string | TP/SL mode,
  `Full`: entire position for TP/SL. `Partial`: partial position tp/sl. Spot
  does not have this field, and Option returns always "" | | \> ocoTriggerBy |
  string | The trigger type of Spot OCO order.`OcoTriggerByUnknown`,
  `OcoTriggerByTp`, `OcoTriggerByBySl`. _Classic `spot` is not supported_ | | \>
  tpLimitPrice | string | The limit order price when take profit price is
  triggered | | \> slLimitPrice | string | The limit order price when stop loss
  price is triggered | | \> [tpTriggerBy](/docs/v5/enum#triggerby) | string |
  The price type to trigger take profit | | \>
  [slTriggerBy](/docs/v5/enum#triggerby) | string | The price type to trigger
  stop loss | | \> triggerDirection | integer | Trigger direction. `1`: rise,
  `2`: fall | | \> [triggerBy](/docs/v5/enum#triggerby) | string | The price
  type of trigger price | | \> lastPriceOnCreated | string | Last price when
  place the order, Spot is not applicable | | \> basePrice | string | Last price
  when place the order, Spot has this field only | | \> reduceOnly | boolean |
  Reduce only. `true` means reduce position size | | \> closeOnTrigger | boolean
  | Close on trigger.
  [What is a close on trigger order?](https://www.bybit.com/en/help-center/article/Close-On-Trigger-Order)
  | | \> placeType | string | Place type, `option` used. `iv`, `price` | | \>
  [smpType](/docs/v5/enum#smptype) | string | SMP execution type | | \> smpGroup
  | integer | Smp group ID. If the UID has no group, it is `0` by default | | \>
  smpOrderId | string | The counterparty's orderID which triggers this SMP
  execution | | \> createdTime | string | Order created timestamp (ms) | | \>
  updatedTime | string | Order updated timestamp (ms) | | \> cumFeeDetail | json
  | - `linear`, `spot`: Cumulative trading fee details instead of `cumExecFee` |

[RUN >>](/docs/api-explorer/v5/trade/open-order)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/order/realtime?symbol=ETHUSDT&category=linear&openOnly=0&limit=1  HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672219525810X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_open_orders(    category="linear",    symbol="ETHUSDT",    openOnly=0,    limit=1,))
```

```python
import com.bybit.api.client.config.BybitApiConfig;import com.bybit.api.client.domain.trade.request.TradeOrderRequest;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET", BybitApiConfig.TESTNET_DOMAIN).newTradeRestClient();var openLinearOrdersResult = client.getOpenOrders(openOrderRequest.category(CategoryType.LINEAR).openOnly(1).build());System.out.println(openLinearOrdersResult);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getActiveOrders({
    category: "linear",
    symbol: "ETHUSDT",
    openOnly: 0,
    limit: 1
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
  "result": {
    "list": [
      {
        "orderId": "fd4300ae-7847-404e-b947-b46980a4d140",
        "orderLinkId": "test-000005",
        "blockTradeId": "",
        "symbol": "ETHUSDT",
        "price": "1600.00",
        "qty": "0.10",
        "side": "Buy",
        "isLeverage": "",
        "positionIdx": 1,
        "orderStatus": "New",
        "cancelType": "UNKNOWN",
        "rejectReason": "EC_NoError",
        "avgPrice": "0",
        "leavesQty": "0.10",
        "leavesValue": "160",
        "cumExecQty": "0.00",
        "cumExecValue": "0",
        "cumExecFee": "0",
        "timeInForce": "GTC",
        "orderType": "Limit",
        "stopOrderType": "UNKNOWN",
        "orderIv": "",
        "triggerPrice": "0.00",
        "takeProfit": "2500.00",
        "stopLoss": "1500.00",
        "tpTriggerBy": "LastPrice",
        "slTriggerBy": "LastPrice",
        "triggerDirection": 0,
        "triggerBy": "UNKNOWN",
        "lastPriceOnCreated": "",
        "reduceOnly": false,
        "closeOnTrigger": false,
        "smpType": "None",
        "smpGroup": 0,
        "smpOrderId": "",
        "tpslMode": "Full",
        "tpLimitPrice": "",
        "slLimitPrice": "",
        "placeType": "",
        "createdTime": "1684738540559",
        "updatedTime": "1684738540561",
        "cumFeeDetail": {
          "MNT": "0.00242968"
        }
      }
    ],
    "nextPageCursor": "page_args%3Dfd4300ae-7847-404e-b947-b46980a4d140%26symbol%3D6%26",
    "category": "linear"
  },
  "retExtInfo": {},
  "time": 1684765770483
}
```
