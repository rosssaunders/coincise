# Batch Place Order

tip

This endpoint allows you to place more than one order in a single request.

- Make sure you have sufficient funds in your account when placing an order.
  Once an order is placed, according to the funds required by the order, the
  funds in your account will be frozen by the corresponding amount during the
  life cycle of the order.
- A maximum of 20 orders (option), 20 orders (inverse), 20 orders (linear), 10
  orders (spot) can be placed per request. The returned data list is divided
  into two lists. The first list indicates whether or not the order creation was
  successful and the second list details the created order information. The
  structure of the two lists are completely consistent.

info

- **Option rate limt** instruction: its rate limit is count based on the actual
  number of request sent, e.g., by default, option trading rate limit is 10 reqs
  per sec, so you can send up to 20 \* 10 = 200 orders in one second.
- **Perpetual, Futures, Spot rate limit instruction**, please check
  [here](/docs/v5/rate-limit#api-rate-limit-rules-for-vips)
- **Risk control limit notice:**  
  Bybit will monitor on your API requests. When the total number of orders of a
  single user (aggregated the number of orders across main account and
  subaccounts) within a day (UTC 0 - UTC 24) exceeds a certain upper limit, the
  platform will reserve the right to remind, warn, and impose necessary
  restrictions. Customers who use API default to acceptance of these terms and
  have the obligation to cooperate with adjustments.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/create-batch`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                                         | Required | Type    | Comments                                                                                                                   |
| :---------------------------------------------------------------- | :------- | :------ | -------------------------------------------------------------------------------------------------------------------------- |
| [category](/docs/v5/enum#category)                                | **true** | string  | Product type- [UTA2.0](/docs/v5/acct-mode#uta-20): `linear`, `option`, `spot`, `inverse`                                   |
| - [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `option`, `spot` |
| request                                                           | **true** | array   | Object                                                                                                                     |
| \> symbol                                                         | **true** | string  | Symbol name, like `BTCUSDT`, uppercase only                                                                                |
| \> isLeverage                                                     | false    | integer | Whether to borrow. Valid for **Unified `spot`** only. `0`(default): false then spot trading, `1`: true then margin trading |
| \> side                                                           | **true** | string  | `Buy`, `Sell`                                                                                                              |
| \> [orderType](/docs/v5/enum#ordertype)                           | **true** | string  | `Market`, `Limit`                                                                                                          |
| \> qty                                                            | **true** | string  | Order quantity                                                                                                             |

    -   Spot: set `marketUnit` for market order qty unit, `quoteCoin` for market buy by default, `baseCoin` for market sell by default
    -   Perps, Futures & Option: always use base coin as unit

- Perps & Futures: if you pass `qty`\="0" and specify
  `reduceOnly`\=true&`closeOnTrigger`\=true, you can close the position up to
  `maxMktOrderQty` or `maxOrderQty` shown on
  [Get Instruments Info](/docs/v5/market/instrument) of current symbol

| | \> marketUnit | false | string | The unit for `qty` when create **Spot
market** orders for **UTA account**, orderFilter=tpslOrder and StopOrder are
supported as well.- `baseCoin`: for example, buy BTCUSDT, then "qty" unit is BTC

- `quoteCoin`: for example, sell BTCUSDT, then "qty" unit is USDT | | \> price |
  false | string | Order price

- Please check the min price and price precision from
  [instrument info](/docs/v5/market/instrument#response-parameters) endpoint
- If you have position, price needs to be better than liquidation price

| | \> triggerDirection | false | integer | Conditional order param. Used to
identify the expected direction of the conditional order.

- `1`: triggered when market price rises to `triggerPrice`
- `2`: triggered when market price falls to `triggerPrice`

Valid for `linear` | | \> orderFilter | false | string | If it is not passed,
`Order` by default.

- `Order`
- `tpslOrder`: Spot TP/SL order, the assets are occupied even before the order
  is triggered
- `StopOrder`: Spot conditional order, the assets will not be occupied until the
  price of the underlying asset reaches the trigger price, and the required
  assets will be occupied after the Conditional order is triggered

Valid for `spot` **only** | | \> triggerPrice | false | string |

- For Perps & Futures, it is the conditional order trigger price. If you expect
  the price to rise to trigger your conditional order, make sure:  
  _triggerPrice > market price_  
  Else, _triggerPrice < market price_
- For spot, it is the orderFilter=tpslOrder, or orderFilter=stopOrder trigger
  price

| | \> [triggerBy](/docs/v5/enum#triggerby) | false | string | Conditional order
param (Perps & Futures). Trigger price type. `LastPrice`, `IndexPrice`,
`MarkPrice` | | \> orderIv | false | string | Implied volatility. `option`
**only**. Pass the real value, e.g for 10%, 0.1 should be passed. `orderIv` has
a higher priority when `price` is passed as well | | \>
[timeInForce](/docs/v5/enum#timeinforce) | false | string |
[Time in force](https://www.bybit.com/en/help-center/article/What-Are-Time-In-Force-TIF-GTC-IOC-FOK)

- Market order will use `IOC` directly
- If not passed, `GTC` is used by default

| | \> [positionIdx](/docs/v5/enum#positionidx) | false | integer | Used to
identify positions in different position modes. Under hedge-mode, this param is
**required**

- `0`: one-way mode
- `1`: hedge-mode Buy side
- `2`: hedge-mode Sell side

| | \> orderLinkId | false | string | User customised order ID. A max of 36
characters. Combinations of numbers, letters (upper and lower cases), dashes,
and underscores are supported.  
_Futures, Perps & Spot: orderLinkId rules_:

_`option` orderLinkId rules_:

- **required** param

| | \> takeProfit | false | string | Take profit price | | \> stopLoss | false |
string | Stop loss price | | \> [tpTriggerBy](/docs/v5/enum#triggerby) | false |
string | The price type to trigger take profit. `MarkPrice`, `IndexPrice`,
default: `LastPrice`.  
Valid for `linear`, `inverse` | | \> [slTriggerBy](/docs/v5/enum#triggerby) |
false | string | The price type to trigger stop loss. `MarkPrice`, `IndexPrice`,
default: `LastPrice`  
Valid for `linear`, `inverse` | | \> reduceOnly | false | boolean |
[What is a reduce-only order?](https://www.bybit.com/en/help-center/article/Reduce-Only-Order)
`true` means your position can only reduce in size if this order is triggered.

- You **must** specify it as `true` when you are about to close/reduce the
  position
- When reduceOnly is true, take profit/stop loss cannot be set

Valid for `linear`, `inverse` & `option` | | \> closeOnTrigger | false | boolean
|
[What is a close on trigger order?](https://www.bybit.com/en/help-center/article/Close-On-Trigger-Order)
For a closing order. It can only reduce your position, not increase it. If the
account has insufficient available balance when the closing order is triggered,
then other active orders of similar contracts will be cancelled or reduced. It
can be used to ensure your stop loss reduces your position regardless of current
available margin.  
Valid for `linear`, `inverse` | | \> [smpType](/docs/v5/enum#smptype) | false |
string | Smp execution type. [What is SMP?](/docs/v5/smp) | | \> mmp | false |
boolean | Market maker protection. `option` **only**. `true` means set the order
as a market maker protection order. [What is mmp?](/docs/v5/account/set-mmp) | |
\> tpslMode | false | string | TP/SL mode

- `Full`: entire position for TP/SL. Then, tpOrderType or slOrderType must be
  `Market`
- `Partial`: partial position tp/sl (as there is no size option, so it will
  create tp/sl orders with the qty you actually fill). Limit TP/SL order are
  supported. Note: When create limit tp/sl, tpslMode is **required** and it must
  be `Partial`

Valid for `linear`, `inverse` | | \> tpLimitPrice | false | string | The limit
order price when take profit price is triggered

- `linear`&`inverse`: only works when tpslMode=Partial and tpOrderType=Limit
- Spot(UTA): it is required when the order has `takeProfit` and
  `tpOrderType=Limit`

| | \> slLimitPrice | false | string | The limit order price when stop loss
price is triggered

- `linear`&`inverse`: only works when tpslMode=Partial and slOrderType=Limit
- Spot(UTA): it is required when the order has `stopLoss` and
  `slOrderType=Limit`

| | \> tpOrderType | false | string | The order type when take profit is
triggered

- `linear`&`inverse`: `Market`(default), `Limit`. For tpslMode=Full, it only
  supports tpOrderType=Market
- Spot(UTA):  
  `Market`: when you set "takeProfit",  
  `Limit`: when you set "takeProfit" and "tpLimitPrice"

| | \> slOrderType | false | string | The order type when stop loss is triggered

- `linear`&`inverse`: `Market`(default), `Limit`. For tpslMode=Full, it only
  supports slOrderType=Market
- Spot(UTA):  
  `Market`: when you set "stopLoss",  
  `Limit`: when you set "stopLoss" and "slLimitPrice"

|

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter       | Type   | Comments                 |
| :-------------- | :----- | ------------------------ |
| result          | Object |                          |
| \> list         | array  | Object                   |
| \>> category    | string | Product type             |
| \>> symbol      | string | Symbol name              |
| \>> orderId     | string | Order ID                 |
| \>> orderLinkId | string | User customised order ID |
| \>> createAt    | string | Order created time (ms)  |
| retExtInfo      | Object |                          |
| \> list         | array  | Object                   |
| \>> code        | number | Success/error code       |
| \>> msg         | string | Success/error message    |

info

The acknowledgement of an place order request indicates that the request was
sucessfully accepted. This request is asynchronous so please use the websocket
to confirm the order status.

[RUN >>](/docs/api-explorer/v5/trade/batch-place)

---

### Request Example[​](#request-example "Direct link to heading")

- .Net
- Node.js

```bash
POST /v5/order/create-batch HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672222064519X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category": "spot",    "request": [        {            "symbol": "BTCUSDT",            "side": "Buy",            "orderType": "Limit",            "isLeverage": 0,            "qty": "0.05",            "price": "30000",            "timeInForce": "GTC",            "orderLinkId": "spot-btc-03"        },        {            "symbol": "ATOMUSDT",            "side": "Sell",            "orderType": "Limit",            "isLeverage": 0,            "qty": "2",            "price": "12",            "timeInForce": "GTC",            "orderLinkId": "spot-atom-03"        }    ]}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.place_batch_order(    category="spot",    request=[        {            "symbol": "BTCUSDT",            "side": "Buy",            "orderType": "Limit",            "isLeverage": 0,            "qty": "0.05",            "price": "30000",            "timeInForce": "GTC",            "orderLinkId": "spot-btc-03"        },        {            "symbol": "ATOMUSDT",            "side": "Sell",            "orderType": "Limit",            "isLeverage": 0,            "qty": "2",            "price": "12",            "timeInForce": "GTC",            "orderLinkId": "spot-atom-03"        }    ]))
```

```python
import (    "context"    "fmt"    bybit "https://github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("YOUR_API_KEY", "YOUR_API_SECRET", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "option",    "request": []map[string]interface{}{        {            "category":    "option",            "symbol":      "BTC-10FEB23-24000-C",            "orderType":   "Limit",            "side":        "Buy",            "qty":         "0.1",            "price":       "5",            "orderIv":     "0.1",            "timeInForce": "GTC",            "orderLinkId": "9b381bb1-401",            "mmp":         false,            "reduceOnly":  false,        },        {            "category":    "option",            "symbol":      "BTC-10FEB23-24000-C",            "orderType":   "Limit",            "side":        "Buy",            "qty":         "0.1",            "price":       "5",            "orderIv":     "0.1",            "timeInForce": "GTC",            "orderLinkId": "82ee86dd-001",            "mmp":         false,            "reduceOnly":  false,        },    },}client.NewUtaBybitServiceWithParams(params).PlaceBatchOrder(context.Background())
```

```python
import com.bybit.api.client.restApi.BybitApiAsyncTradeRestClient;import com.bybit.api.client.domain.ProductType;import com.bybit.api.client.domain.TradeOrderType;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;import java.util.Arrays;BybitApiClientFactory factory = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET");BybitApiAsyncTradeRestClient client = factory.newAsyncTradeRestClient();var orderRequests = Arrays.asList(TradeOrderRequest.builder().category(ProductType.OPTION).symbol("BTC-10FEB23-24000-C").side(Side.BUY).orderType(TradeOrderType.LIMIT).qty("0.1")                        .price("5").orderIv("0.1").timeInForce(TimeInForce.GOOD_TILL_CANCEL).orderLinkId("9b381bb1-401").mmp(false).reduceOnly(false).build(),                TradeOrderRequest.builder().category(ProductType.OPTION).symbol("BTC-10FEB23-24000-C").side(Side.BUY).orderType(TradeOrderType.LIMIT).qty("0.1")                        .price("5").orderIv("0.1").timeInForce(TimeInForce.GOOD_TILL_CANCEL).orderLinkId("82ee86dd-001").mmp(false).reduceOnly(false).build());var createBatchOrders = BatchOrderRequest.builder().category(ProductType.OPTION).request(orderRequests).build();client.createBatchOrder(createBatchOrders, System.out::println);
```

```
using bybit.net.api.ApiServiceImp;using bybit.net.api.Models.Trade;var order1 = new OrderRequest { Symbol = "XRPUSDT", OrderType = "Limit", Side = "Buy", Qty = "10", Price = "0.6080", TimeInForce = "GTC" };var order2 = new OrderRequest { Symbol = "BLZUSDT", OrderType = "Limit", Side = "Buy", Qty = "10", Price = "0.6080", TimeInForce = "GTC" };List<OrderRequest> request = new() { order1, order2 };var orderInfoString = await TradeService.PlaceBatchOrder(category: Category.LINEAR, request: request);Console.WriteLine(orderInfoString);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .batchSubmitOrders("spot", [
    {
      symbol: "BTCUSDT",
      side: "Buy",
      orderType: "Limit",
      isLeverage: 0,
      qty: "0.05",
      price: "30000",
      timeInForce: "GTC",
      orderLinkId: "spot-btc-03"
    },
    {
      symbol: "ATOMUSDT",
      side: "Sell",
      orderType: "Limit",
      isLeverage: 0,
      qty: "2",
      price: "12",
      timeInForce: "GTC",
      orderLinkId: "spot-atom-03"
    }
  ])
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
        "category": "spot",
        "symbol": "BTCUSDT",
        "orderId": "1666800494330512128",
        "orderLinkId": "spot-btc-03",
        "createAt": "1713434102752"
      },
      {
        "category": "spot",
        "symbol": "ATOMUSDT",
        "orderId": "1666800494330512129",
        "orderLinkId": "spot-atom-03",
        "createAt": "1713434102752"
      }
    ]
  },
  "retExtInfo": {
    "list": [
      {
        "code": 0,
        "msg": "OK"
      },
      {
        "code": 0,
        "msg": "OK"
      }
    ]
  },
  "time": 1713434102753
}
```
