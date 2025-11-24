# Get Order History

Query order history. As order creation/cancellation is **asynchronous**, the data returned from this endpoint may delay. If you want to get real-time order information, you could query this [endpoint](/docs/v5/order/open-order) or rely on the [websocket stream](/docs/v5/websocket/private/order) (recommended).

rule

-   The orders in the **last 7 days**:  
    [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10)(except inverse) support querying all [closed status](/docs/v5/enum#orderstatus) except "Cancelled", "Rejected", "Deactivated" status.  
    [UTA1.0](/docs/v5/acct-mode#uta-10)(inverse) and classic account support querying all status (open and close status)
-   The orders in the **last 24 hours**:  
    [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10)(except inverse) for the orders with "Cancelled" (fully cancelled order), "Rejected", "Deactivated" can be query
-   The orders **beyond 7 days**:  
    All account supports querying orders which have fills only, i.e., fully filled, partial filled but cancelled orders
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10)(except inverse) support querying the past 2 years data.

info

-   Classic Spot can get closed order status only, and Cancelled, Rejected, Deactivated orders save up to 7 days

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/order/history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `inverse`, `spot`, `option`
-   classic account: `linear`, `inverse`, `spot`

 |
| symbol | false | string | Symbol name, like `BTCUSDT`, uppercase only |
| baseCoin | false | string | Base coin, uppercase only-   [UTA1.0](/docs/v5/acct-mode#uta-10)(inverse), classic account do **not** support this param |
| settleCoin | false | string | Settle coin, uppercase only-   [UTA1.0](/docs/v5/acct-mode#uta-10)(inverse), classic account do **not** support this param |
| orderId | false | string | Order ID |
| orderLinkId | false | string | User customised order ID |
| orderFilter | false | string | `Order`: active order  
`StopOrder`: conditional order for Futures and Spot  
`tpslOrder`: spot TP/SL order  
`OcoOrder`: spot OCO orders  
`BidirectionalTpslOrder`: Spot bidirectional TPSL order

-   classic account `spot`: return `Order` active order by default
-   Others: all kinds of orders by default

 |
| [orderStatus](/docs/v5/enum#orderstatus) | false | string | 

-   Classic `spot`: not supported
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10)(except inverse): return all **closed** status orders if not passed
-   [UTA1.0](/docs/v5/acct-mode#uta-10)(inverse), classic account(linear, inverse): return all status orders if not passed

 |
| startTime | false | integer | The start timestamp (ms)

-   startTime and endTime are not passed, return 7 days by default
-   Only startTime is passed, return range between startTime and startTime+7 days
-   Only endTime is passed, return range between endTime-7 days and endTime
-   If both are passed, the rule is endTime - startTime <= 7 days

 |
| endTime | false | integer | The end timestamp (ms) |
| limit | false | integer | Limit for data size per page. \[`1`, `50`\]. Default: `20` |
| cursor | false | string | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| category | string | Product type |
| list | array | Object |
| \> orderId | string | Order ID |
| \> orderLinkId | string | User customised order ID |
| \> blockTradeId | string | Block trade ID |
| \> symbol | string | Symbol name |
| \> price | string | Order price |
| \> qty | string | Order qty |
| \> side | string | Side. `Buy`,`Sell` |
| \> isLeverage | string | Whether to borrow. **Unified `spot`** only. `0`: false, `1`: true. . *Classic `spot` is not supported, always `0`* |
| \> [positionIdx](/docs/v5/enum#positionidx) | integer | Position index. Used to identify positions in different position modes |
| \> [orderStatus](/docs/v5/enum#orderstatus) | string | Order status |
| \> [createType](/docs/v5/enum#createtype) | string | Order create type-   Only for category=linear or inverse
-   Spot, Option do not have this key |
| \> [cancelType](/docs/v5/enum#canceltype) | string | Cancel type |
| \> [rejectReason](/docs/v5/enum#rejectreason) | string | Reject reason. *Classic `spot` is not supported* |
| \> avgPrice | string | Average filled price-   UTA: returns `""` for those orders without avg price
-   classic account: returns `"0"` for those orders without avg price, and also for those orders have partilly filled but cancelled at the end |
| \> leavesQty | string | The remaining qty not executed. *Classic `spot` is not supported* |
| \> leavesValue | string | The estimated value not executed. *Classic `spot` is not supported* |
| \> cumExecQty | string | Cumulative executed order qty |
| \> cumExecValue | string | Cumulative executed order value. *Classic `spot` is not supported* |
| \> cumExecFee | string | -   `inverse`, `option`: Cumulative executed trading fee.
-   `linear`, `spot`: Deprecated. Use `cumFeeDetail` instead.
*Classic `spot` is not supported* |
| \> [timeInForce](/docs/v5/enum#timeinforce) | string | Time in force |
| \> [orderType](/docs/v5/enum#ordertype) | string | Order type. `Market`,`Limit`. For TP/SL orders, is the order type after the order was triggered-   `Block trade Roll Back`, `Block trade-Limit`: Unique enum values for Unified account block trades |
| \> [stopOrderType](/docs/v5/enum#stopordertype) | string | Stop order type |
| \> orderIv | string | Implied volatility |
| \> marketUnit | string | The unit for `qty` when create **Spot market** orders for **UTA account**. `baseCoin`, `quoteCoin` |
| \> slippageToleranceType | string | Spot and Futures market order slippage tolerance type `TickSize`, `Percent`, `UNKNOWN`(default) |
| \> slippageTolerance | string | Slippage tolerance value |
| \> triggerPrice | string | Trigger price. If `stopOrderType`\=*TrailingStop*, it is activate price. Otherwise, it is trigger price |
| \> takeProfit | string | Take profit price |
| \> stopLoss | string | Stop loss price |
| \> tpslMode | string | TP/SL mode, `Full`: entire position for TP/SL. `Partial`: partial position tp/sl. Spot does not have this field, and Option returns always "" |
| \> ocoTriggerBy | string | The trigger type of Spot OCO order.`OcoTriggerByUnknown`, `OcoTriggerByTp`, `OcoTriggerBySl`. *Classic `spot` is not supported* |
| \> tpLimitPrice | string | The limit order price when take profit price is triggered |
| \> slLimitPrice | string | The limit order price when stop loss price is triggered |
| \> [tpTriggerBy](/docs/v5/enum#triggerby) | string | The price type to trigger take profit |
| \> [slTriggerBy](/docs/v5/enum#triggerby) | string | The price type to trigger stop loss |
| \> triggerDirection | integer | Trigger direction. `1`: rise, `2`: fall |
| \> [triggerBy](/docs/v5/enum#triggerby) | string | The price type of trigger price |
| \> lastPriceOnCreated | string | Last price when place the order, Spot is not applicable |
| \> basePrice | string | Last price when place the order, Spot has this field only |
| \> reduceOnly | boolean | Reduce only. `true` means reduce position size |
| \> closeOnTrigger | boolean | Close on trigger. [What is a close on trigger order?](https://www.bybit.com/en/help-center/article/Close-On-Trigger-Order) |
| \> placeType | string | Place type, `option` used. `iv`, `price` |
| \> [smpType](/docs/v5/enum#smptype) | string | SMP execution type |
| \> smpGroup | integer | Smp group ID. If the UID has no group, it is `0` by default |
| \> smpOrderId | string | The counterparty's orderID which triggers this SMP execution |
| \> createdTime | string | Order created timestamp (ms) |
| \> updatedTime | string | Order updated timestamp (ms) |
| \> extraFees | string | Trading fee rate information. Currently, this data is returned only for spot orders placed on the Indonesian site or spot fiat currency orders placed on the EU site. In other cases, an empty string is returned. Enum: [feeType](/docs/v5/enum#extrafeesfeetype), [subFeeType](/docs/v5/enum#extrafeessubfeetype) |
| \> cumFeeDetail | json | -   `linear`, `spot`: Cumulative trading fee details instead of `cumExecFee` |
| nextPageCursor | string | Refer to the `cursor` request parameter |

[RUN >>](/docs/api-explorer/v5/trade/order-list)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/order/history?category=linear&limit=1 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672221263407X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_order_history(    category="linear",    limit=1,))
```

```python
import com.bybit.api.client.config.BybitApiConfig;import com.bybit.api.client.domain.trade.request.TradeOrderRequest;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET", BybitApiConfig.TESTNET_DOMAIN).newTradeRestClient();var orderHistory = TradeOrderRequest.builder().category(CategoryType.LINEAR).limit(10).build();System.out.println(client.getOrderHistory(orderHistory));
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .getHistoricOrders({        category: 'linear',        limit: 1,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "list": [
      {
        "orderId": "14bad3a1-6454-43d8-bcf2-5345896cf74d",
        "orderLinkId": "YLxaWKMiHU",
        "blockTradeId": "",
        "symbol": "BTCUSDT",
        "price": "26864.40",
        "qty": "0.003",
        "side": "Buy",
        "isLeverage": "",
        "positionIdx": 1,
        "orderStatus": "Cancelled",
        "cancelType": "UNKNOWN",
        "rejectReason": "EC_PostOnlyWillTakeLiquidity",
        "avgPrice": "0",
        "leavesQty": "0.000",
        "leavesValue": "0",
        "cumExecQty": "0.000",
        "cumExecValue": "0",
        "cumExecFee": "0",
        "timeInForce": "PostOnly",
        "orderType": "Limit",
        "stopOrderType": "UNKNOWN",
        "orderIv": "",
        "triggerPrice": "0.00",
        "takeProfit": "0.00",
        "stopLoss": "0.00",
        "tpTriggerBy": "UNKNOWN",
        "slTriggerBy": "UNKNOWN",
        "triggerDirection": 0,
        "triggerBy": "UNKNOWN",
        "lastPriceOnCreated": "0.00",
        "reduceOnly": false,
        "closeOnTrigger": false,
        "smpType": "None",
        "smpGroup": 0,
        "smpOrderId": "",
        "tpslMode": "",
        "tpLimitPrice": "",
        "slLimitPrice": "",
        "placeType": "",
        "slippageToleranceType": "UNKNOWN",
        "slippageTolerance": "",
        "createdTime": "1684476068369",
        "updatedTime": "1684476068372",
        "extraFees": "",
        "cumFeeDetail": {
          "MNT": "0.00242968"
        }
      }
    ],
    "nextPageCursor": "page_token%3D39380%26",
    "category": "linear"
  },
  "retExtInfo": {},
  "time": 1684766282976
}
```