# POST /v5/order/create

**Source:**
[Place Order](https://bybit-exchange.github.io/docs/v5/order/create-order)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Trade
- Place Order

On this page

# Place Order

This endpoint supports to create the order for Spot, Margin trading, USDT
perpetual, USDT futures, USDC perpetual, USDC futures, Inverse Futures and
Options.

info

- **Supported order type (`orderType`):**  
  Limit order: `orderType`\=_Limit_, it is necessary to specify order qty and
  price.

  [Market order](https://www.bybit.com/en/help-center/article/Types-of-Orders-Available-on-Bybit):
  `orderType`\=_Market_, execute at the best price in the Bybit market until the
  transaction is completed. When selecting a market order, the "price" can be
  empty. In the futures trading system, in order to protect traders against the
  serious slippage of the Market order, Bybit trading engine will convert the
  market order into an IOC limit order for matching. If there are no orderbook
  entries within price slippage limit, the order will not be executed. If there
  is insufficient liquidity, the order will be cancelled. The slippage threshold
  refers to the percentage that the order price deviates from the mark price.
  You can learn more here:
  [Adjustments to Bybit's Derivative Trading Price Limit Mechanism](https://announcements.bybit.com/en/article/adjustments-to-bybit-s-derivative-trading-limit-order-mechanism-blt469228de1902fff6/)

- **Supported timeInForce strategy:**  
  `GTC`  
  `IOC`  
  `FOK`  
  `PostOnly`: If the order would be filled immediately when submitted, it will
  be **cancelled**. The purpose of this is to protect your order during the
  submission process. If the matching system cannot entrust the order to the
  order book due to price changes on the market, it will be cancelled.  
  `RPI`: Retail Price Improvement order. Assigned market maker can place this
  kind of order, and it is a post only order, only match with the order from Web
  or APP.
- **How to create a conditional order:**  
  When submitting an order, if `triggerPrice` is set, the order will be
  automatically converted into a conditional order. In addition, the conditional
  order does not occupy the margin. If the margin is insufficient after the
  conditional order is triggered, the order will be cancelled.
- **[Take profit / Stop loss](https://www.bybit.com/en/help-center/article/Introduction-to-Take-Profit-Stop-Loss-Perpetual-Futures-Contracts)**:
  You can set TP/SL while placing orders. Besides, you could modify the
  position's TP/SL.
- **Order quantity**: The quantity of perpetual contracts you are going to
  buy/sell. For the order quantity, Bybit only supports positive number at
  present.
- **Order price**: Place a limit order, this parameter is **required**. If you
  have position, the price should be higher than the _liquidation price_. For
  the minimum unit of the price change, please refer to the `priceFilter` >
  `tickSize` field in the [instruments-info](/docs/v5/market/instrument)
  endpoint.
- **orderLinkId**: You can customize the active order ID. We can link this ID to
  the order ID in the system. Once the active order is successfully created, we
  will send the unique order ID in the system to you. Then, you can use this
  order ID to cancel active orders, and if both orderId and orderLinkId are
  entered in the parameter input, Bybit will prioritize the orderId to process
  the corresponding order. Meanwhile, your customized order ID should be no
  longer than 36 characters and should be **unique**.
- **Open orders up limit:**  
  **Perps & Futures:**  
  a) Each account can hold a maximum of _500_ **active** orders simultaneously
  **per symbol.**  
  b) **conditional** orders: each account can hold a maximum of **10 active
  orders** simultaneously **per symbol**.  
  **Spot:** 500 orders in total, including a maximum of 30 open TP/SL orders, a
  maximum of 30 open conditional orders for each symbol per account  
  **Option:** a maximum of 50 open orders per account
- **Rate limit:**  
  Please refer to [rate limit table](/docs/v5/rate-limit#trade). If you need to
  raise the rate limit, please contact your client manager or submit an
  application via
  [here](https://www.bybit.com/future-activity/en-US/institutional-services)
- **Risk control limit notice:**  
  Bybit will monitor on your API requests. When the total number of orders of a
  single user (aggregated the number of orders across main account and
  subaccounts) within a day (UTC 0 - UTC 24) exceeds a certain upper limit, the
  platform will reserve the right to remind, warn, and impose necessary
  restrictions. Customers who use API default to acceptance of these terms and
  have the obligation to cooperate with adjustments.
- **Reduce only orders:**  
  If reduceOnly=true and order qty > max order qty, the order will automatically
  be split up into multiple orders.

Spot Stop Order

Spot supports TP/SL order, Conditional order, however, the system logic is
different between classic account and Unified account  
**classic account:** When the stop order is created, you will get an order ID.
After it is triggered, you will get a new order ID  
**Unified account:** When the stop order is created, you will get an order ID.
After it is triggered, the order ID will not be changed

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/create`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments     |
| :-------- | :------- | :----- | ------------ |
| category  | **true** | string | Product type |

- [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10):
  `linear`, `inverse`, `spot`, `option`
- classic account: `linear`, `inverse`, `spot`

| | symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only | |
isLeverage | false | integer | Whether to borrow. **Unified account Spot
trading** only.- `0`(default): false, spot trading

- `1`: true, margin trading, _make sure you turn on margin trading, and set the
  relevant currency as collateral_ | | side | **true** | string | `Buy`, `Sell`
  | | [orderType](/docs/v5/enum#ordertype) | **true** | string | `Market`,
  `Limit` | | qty | **true** | string | Order quantity

- UTA account
  - Spot: Market Buy order by value by default, you can set `marketUnit` field
    to choose order by value or qty for market orders
  - Perps, Futures & Option: always order by qty
- classic account
  - Spot: Market Buy order by value by default
  - Perps, Futures: always order by qty
- Perps & Futures: if you pass `qty`\="0" and specify
  `reduceOnly`\=true&`closeOnTrigger`\=true, you can close the position up to
  `maxMktOrderQty` or `maxOrderQty` shown on
  [Get Instruments Info](/docs/v5/market/instrument) of current symbol

| | marketUnit | false | string | Select the unit for `qty` when create **Spot
market** orders for **UTA account**- `baseCoin`: for example, buy BTCUSDT, then
"qty" unit is BTC

- `quoteCoin`: for example, sell BTCUSDT, then "qty" unit is USDT | |
  slippageToleranceType | false | string | Slippage tolerance Type for **market
  order**, `TickSize`, `Percent`

- take profit, stoploss, conditional orders are not supported
- **TickSize**:  
  the highest price of Buy order = ask1 + `slippageTolerance` x tickSize;  
  the lowest price of Sell order = bid1 - `slippageTolerance` x tickSize
- **Percent**:  
  the highest price of Buy order = ask1 x (1 + `slippageTolerance` x 0.01);  
  the lowest price of Sell order = bid1 x (1 - `slippageTolerance` x 0.01)

| | slippageTolerance | false | string | Slippage tolerance value- `TickSize`:
range is \[1, 10000\], integer only

- `Percent`: range is \[0.01, 10\], up to 2 decimals | | price | false | string
  | Order price

- Market order will ignore this field
- Please check the min price and price precision from
  [instrument info](/docs/v5/market/instrument#response-parameters) endpoint
- If you have position, price needs to be better than liquidation price

| | triggerDirection | false | integer | Conditional order param. Used to
identify the expected direction of the conditional order.

- `1`: triggered when market price rises to `triggerPrice`
- `2`: triggered when market price falls to `triggerPrice`

Valid for `linear` & `inverse` | | orderFilter | false | string | If it is not
passed, `Order` by default.

- `Order`
- `tpslOrder`: Spot TP/SL order, the assets are occupied even before the order
  is triggered
- `StopOrder`: Spot conditional order, the assets will not be occupied until the
  price of the underlying asset reaches the trigger price, and the required
  assets will be occupied after the Conditional order is triggered

Valid for `spot` **only** | | triggerPrice | false | string |

- For Perps & Futures, it is the conditional order trigger price. If you expect
  the price to rise to trigger your conditional order, make sure:  
  _triggerPrice > market price_  
  Else, _triggerPrice < market price_
- For spot, it is the TP/SL and Conditional order trigger price

| | [triggerBy](/docs/v5/enum#triggerby) | false | string | Trigger price type,
Conditional order param for Perps & Futures.- `LastPrice`

- `IndexPrice`
- `MarkPrice` Valid for `linear` & `inverse` | | orderIv | false | string |
  Implied volatility. `option` **only**. Pass the real value, e.g for 10%, 0.1
  should be passed. `orderIv` has a higher priority when `price` is passed as
  well | | [timeInForce](/docs/v5/enum#timeinforce) | false | string |
  [Time in force](https://www.bybit.com/en/help-center/article/What-Are-Time-In-Force-TIF-GTC-IOC-FOK)

- Market order will always use `IOC`
- If not passed, `GTC` is used by default

| | [positionIdx](/docs/v5/enum#positionidx) | false | integer | Used to
identify positions in different position modes. Under hedge-mode, this param is
**required**

- `0`: one-way mode
- `1`: hedge-mode Buy side
- `2`: hedge-mode Sell side

| | orderLinkId | false | string | User customised order ID. A max of 36
characters. Combinations of numbers, letters (upper and lower cases), dashes,
and underscores are supported.  
_Futures & Perps: orderLinkId rules_:

- optional param
- always unique _`option` orderLinkId rules_:
- **required** param
- always unique

| | takeProfit | false | string | Take profit price- UTA: Spot Limit order
supports take profit, stop loss or limit take profit, limit stop loss when
creating an order | | stopLoss | false | string | Stop loss price- UTA: Spot
Limit order supports take profit, stop loss or limit take profit, limit stop
loss when creating an order | | [tpTriggerBy](/docs/v5/enum#triggerby) | false |
string | The price type to trigger take profit. `MarkPrice`, `IndexPrice`,
default: `LastPrice`. Valid for `linear` & `inverse` | |
[slTriggerBy](/docs/v5/enum#triggerby) | false | string | The price type to
trigger stop loss. `MarkPrice`, `IndexPrice`, default: `LastPrice`. Valid for
`linear` & `inverse` | | reduceOnly | false | boolean |
[What is a reduce-only order?](https://www.bybit.com/en/help-center/article/Reduce-Only-Order)
`true` means your position can only reduce in size if this order is triggered.

- You **must** specify it as `true` when you are about to close/reduce the
  position
- When reduceOnly is true, take profit/stop loss cannot be set

Valid for `linear`, `inverse` & `option` | | closeOnTrigger | false | boolean |
[What is a close on trigger order?](https://www.bybit.com/en/help-center/article/Close-On-Trigger-Order)
For a closing order. It can only reduce your position, not increase it. If the
account has insufficient available balance when the closing order is triggered,
then other active orders of similar contracts will be cancelled or reduced. It
can be used to ensure your stop loss reduces your position regardless of current
available margin.  
Valid for `linear` & `inverse` | | [smpType](/docs/v5/enum#smptype) | false |
string | Smp execution type. [What is SMP?](/docs/v5/smp) | | mmp | false |
boolean | Market maker protection. `option` **only**. `true` means set the order
as a market maker protection order. [What is mmp?](/docs/v5/account/set-mmp) | |
tpslMode | false | string | TP/SL mode

- `Full`: entire position for TP/SL. Then, tpOrderType or slOrderType must be
  `Market`
- `Partial`: partial position tp/sl (as there is no size option, so it will
  create tp/sl orders with the qty you actually fill). Limit TP/SL order are
  supported. Note: When create limit tp/sl, tpslMode is **required** and it must
  be `Partial`

Valid for `linear` & `inverse` | | tpLimitPrice | false | string | The limit
order price when take profit price is triggered

- `linear` & `inverse`: only works when tpslMode=Partial and tpOrderType=Limit
- Spot(UTA): it is required when the order has `takeProfit` and
  "tpOrderType"=`Limit`

| | slLimitPrice | false | string | The limit order price when stop loss price
is triggered

- `linear` & `inverse`: only works when tpslMode=Partial and slOrderType=Limit
- Spot(UTA): it is required when the order has `stopLoss` and
  "slOrderType"=`Limit`

| | tpOrderType | false | string | The order type when take profit is triggered

- `linear` & `inverse`: `Market`(default), `Limit`. For tpslMode=Full, it only
  supports tpOrderType=Market
- Spot(UTA):  
  `Market`: when you set "takeProfit",  
  `Limit`: when you set "takeProfit" and "tpLimitPrice"

| | slOrderType | false | string | The order type when stop loss is triggered

- `linear` & `inverse`: `Market`(default), `Limit`. For tpslMode=Full, it only
  supports slOrderType=Market
- Spot(UTA):  
  `Market`: when you set "stopLoss",  
  `Limit`: when you set "stopLoss" and "slLimitPrice"

| | bboSideType | false | string |

- `Queue`: use the order price on the orderbook in the same direction as the
  `side`
- `Counterparty`: use the order price on the orderbook in the opposite direction
  as the `side`

Valid for `linear` & `inverse` | | bboLevel | false | string |
`1`,`2`,`3`,`4`,`5` Valid for `linear` & `inverse` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter   | Type   | Comments                 |
| :---------- | :----- | ------------------------ |
| orderId     | string | Order ID                 |
| orderLinkId | string | User customised order ID |

info

The acknowledgement of an place order request indicates that the request was
sucessfully accepted. This request is asynchronous so please use the websocket
to confirm the order status.

[RUN >>](/docs/api-explorer/v5/trade/create-order)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Go
- Java
- .Net
- Node.js

```
POST /v5/order/create HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672211928338X-BAPI-RECV-WINDOW: 5000Content-Type: application/json// Spot Limit order with market tp sl{"category": "spot","symbol": "BTCUSDT","side": "Buy","orderType": "Limit","qty": "0.01","price": "28000","timeInForce": "PostOnly","takeProfit": "35000","stopLoss": "27000","tpOrderType": "Market","slOrderType": "Market"}// Spot Limit order with limit tp sl{"category": "spot","symbol": "BTCUSDT","side": "Buy","orderType": "Limit","qty": "0.01","price": "28000","timeInForce": "PostOnly","takeProfit": "35000","stopLoss": "27000","tpLimitPrice": "36000","slLimitPrice": "27500","tpOrderType": "Limit","slOrderType": "Limit"}// Spot PostOnly normal order{"category":"spot","symbol":"BTCUSDT","side":"Buy","orderType":"Limit","qty":"0.1","price":"15600","timeInForce":"PostOnly","orderLinkId":"spot-test-01","isLeverage":0,"orderFilter":"Order"}// Spot TP/SL order{"category":"spot","symbol":"BTCUSDT","side":"Buy","orderType":"Limit","qty":"0.1","price":"15600","triggerPrice": "15000", "timeInForce":"Limit","orderLinkId":"spot-test-02","isLeverage":0,"orderFilter":"tpslOrder"}// Spot margin normal order (UTA){"category":"spot","symbol":"BTCUSDT","side":"Buy","orderType":"Limit","qty":"0.1","price":"15600","timeInForce":"GTC","orderLinkId":"spot-test-limit","isLeverage":1,"orderFilter":"Order"}// Spot Market Buy order, qty is quote currency{"category":"spot","symbol":"BTCUSDT","side":"Buy","orderType":"Market","qty":"200","timeInForce":"IOC","orderLinkId":"spot-test-04","isLeverage":0,"orderFilter":"Order"}// USDT Perp open long position (one-way mode){"category":"linear","symbol":"BTCUSDT","side":"Buy","orderType":"Limit","qty":"1","price":"25000","timeInForce":"GTC","positionIdx":0,"orderLinkId":"usdt-test-01","reduceOnly":false,"takeProfit":"28000","stopLoss":"20000","tpslMode":"Partial","tpOrderType":"Limit","slOrderType":"Limit","tpLimitPrice":"27500","slLimitPrice":"20500"}// USDT Perp close long position (one-way mode){"category": "linear", "symbol": "BTCUSDT", "side": "Sell", "orderType": "Limit", "qty": "1", "price": "30000", "timeInForce": "GTC", "positionIdx": 0, "orderLinkId": "usdt-test-02", "reduceOnly": true}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.place_order(    category="spot",    symbol="BTCUSDT",    side="Buy",    orderType="Limit",    qty="0.1",    price="15600",    timeInForce="PostOnly",    orderLinkId="spot-test-postonly",    isLeverage=0,    orderFilter="Order",))
```

```
import (    "context"    "fmt"    bybit "https://github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("YOUR_API_KEY", "YOUR_API_SECRET", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{        "category":    "linear",        "symbol":      "BTCUSDT",        "side":        "Buy",        "positionIdx": 0,        "orderType":   "Limit",        "qty":         "0.001",        "price":       "10000",        "timeInForce": "GTC",    }client.NewUtaBybitServiceWithParams(params).PlaceOrder(context.Background())
```

```
import com.bybit.api.client.restApi.BybitApiAsyncTradeRestClient;import com.bybit.api.client.domain.ProductType;import com.bybit.api.client.domain.TradeOrderType;import com.bybit.api.client.domain.trade.PositionIdx;import com.bybit.api.client.domain.trade.Side;import com.bybit.api.client.domain.trade.TimeInForce;import com.bybit.api.client.domain.trade.TradeOrderRequest;import com.bybit.api.client.service.BybitApiClientFactory;import java.util.Map;BybitApiClientFactory factory = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET");BybitApiAsyncTradeRestClient client = factory.newAsyncTradeRestClient();Map<String, Object> order =Map.of(                  "category", "option",                  "symbol", "BTC-29DEC23-10000-P",                  "side", "Buy",                  "orderType", "Limit",                  "orderIv", "0.1",                  "qty", "0.1",                  "price", "5",                  "orderLinkId", "test_orderLinkId_1"                );client.createOrder(order, System.out::println);
```

```
using bybit.net.api.ApiServiceImp;using bybit.net.api.Models.Trade;BybitTradeService tradeService = new(apiKey: "xxxxxxxxxxxxxx", apiSecret: "xxxxxxxxxxxxxxxxxxxxx");var orderInfo = await tradeService.PlaceOrder(category: Category.LINEAR, symbol: "BLZUSDT", side: Side.BUY, orderType: OrderType.MARKET, qty: "15", timeInForce: TimeInForce.GTC);Console.WriteLine(orderInfo);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});// Submit a market orderclient  .submitOrder({    category: 'spot',    symbol: 'BTCUSDT',    side: 'Buy',    orderType: 'Market',    qty: '1',  })  .then((response) => {    console.log('Market order result', response);  })  .catch((error) => {    console.error('Market order error', error);  });// Submit a limit orderclient  .submitOrder({    category: 'spot',    symbol: 'BTCUSDT',    side: 'Buy',    orderType: 'Limit',    qty: '1',    price: '55000',  })  .then((response) => {    console.log('Limit order result', response);  })  .catch((error) => {    console.error('Limit order error', error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "orderId": "1321003749386327552",        "orderLinkId": "spot-test-postonly"    },    "retExtInfo": {},    "time": 1672211918471}
```

[

Previous

Get Fee Group Structure

](/docs/v5/market/fee-group-info)[

Next

Amend Order

](/docs/v5/order/amend-order)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
