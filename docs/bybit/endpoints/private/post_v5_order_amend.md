# POST /v5/order/amend

**Source:**
[Amend Order](https://bybit-exchange.github.io/docs/v5/order/amend-order)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Trade
- Amend Order

On this page

# Amend Order

info

You can only modify **unfilled** or **partially filled** orders.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/amend`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments     |
| :--------------------------------- | :------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | **true** | string | Product type |

- [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10):
  `linear`, `inverse`, `spot`, `option`
- classic account: `linear`, `inverse`, `spot`

| | symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only | |
orderId | false | string | Order ID. Either `orderId` or `orderLinkId` is
required | | orderLinkId | false | string | User customised order ID. Either
`orderId` or `orderLinkId` is required | | orderIv | false | string | Implied
volatility. `option` **only**. Pass the real value, e.g for 10%, 0.1 should be
passed | | triggerPrice | false | string |

- For Perps & Futures, it is the conditional order trigger price. If you expect
  the price to rise to trigger your conditional order, make sure:  
  _triggerPrice > market price_  
  Else, _triggerPrice < market price_
- For spot, it is the TP/SL and Conditional order trigger price

| | qty | false | string | Order quantity after modification. Do not pass it if
not modify the qty | | price | false | string | Order price after modification.
Do not pass it if not modify the price | | tpslMode | false | string | TP/SL
mode

- `Full`: entire position for TP/SL. Then, tpOrderType or slOrderType must be
  `Market`
- `Partial`: partial position tp/sl. Limit TP/SL order are supported. Note: When
  create limit tp/sl, tpslMode is **required** and it must be `Partial`

Valid for `linear` & `inverse` | | takeProfit | false | string | Take profit
price after modification. If pass "0", it means cancel the existing take profit
of the order. Do not pass it if you do not want to modify the take profit.
_valid for `spot`(UTA), `linear`, `inverse`_ | | stopLoss | false | string |
Stop loss price after modification. If pass "0", it means cancel the existing
stop loss of the order. Do not pass it if you do not want to modify the stop
loss. _valid for `spot`(UTA), `linear`, `inverse`_ | |
[tpTriggerBy](/docs/v5/enum#triggerby) | false | string | The price type to
trigger take profit. When set a take profit, this param is **required** if no
initial value for the order | | [slTriggerBy](/docs/v5/enum#triggerby) | false |
string | The price type to trigger stop loss. When set a take profit, this param
is **required** if no initial value for the order | |
[triggerBy](/docs/v5/enum#triggerby) | false | string | Trigger price type | |
tpLimitPrice | false | string | Limit order price when take profit is triggered.
Only working when original order sets partial limit tp/sl. _valid for
`spot`(UTA), `linear`, `inverse`_ | | slLimitPrice | false | string | Limit
order price when stop loss is triggered. Only working when original order sets
partial limit tp/sl. _valid for `spot`(UTA), `linear`, `inverse`_ |

info

The acknowledgement of an amend order request indicates that the request was
sucessfully accepted. This request is asynchronous so please use the websocket
to confirm the order status.

[RUN >>](/docs/api-explorer/v5/trade/amend-order)

---

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter   | Type   | Comments                 |
| :---------- | :----- | ------------------------ |
| orderId     | string | Order ID                 |
| orderLinkId | string | User customised order ID |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- .Net
- Node.js

```
POST /v5/order/amend HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672217108106X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category": "linear",    "symbol": "ETHPERP",    "orderLinkId": "linear-004",    "triggerPrice": "1145",    "qty": "0.15",    "price": "1050",    "takeProfit": "0",    "stopLoss": "0"}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.amend_order(    category="linear",    symbol="ETHPERP",    orderLinkId="linear-004",    triggerPrice="1145",    qty="0.15",    price="1050",    takeProfit="0",    stopLoss="0",))
```

```
import com.bybit.api.client.restApi.BybitApiTradeRestClient;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;BybitApiClientFactory factory = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET");BybitApiAsyncTradeRestClient client = factory.newAsyncTradeRestClient();var amendOrderRequest = TradeOrderRequest.builder().orderId("1523347543495541248").category(ProductType.LINEAR).symbol("XRPUSDT")                        .price("0.5")  // setting a new price, for example                        .qty("15")  // and a new quantity                        .build();var amendedOrder = client.amendOrder(amendOrderRequest);System.out.println(amendedOrder);
```

```
using bybit.net.api.ApiServiceImp;using bybit.net.api.Models.Trade;BybitTradeService tradeService = new(apiKey: "xxxxxxxxxxxxxx", apiSecret: "xxxxxxxxxxxxxxxxxxxxx");var orderInfoString = await TradeService.AmendOrder(orderId: "1523347543495541248", category:Category.LINEAR, symbol: "XRPUSDT", price:"0.5", qty:"15");Console.WriteLine(orderInfoString);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .amendOrder({        category: 'linear',        symbol: 'ETHPERP',        orderLinkId: 'linear-004',        triggerPrice: '1145',        qty: '0.15',        price: '1050',        takeProfit: '0',        stopLoss: '0',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "orderId": "c6f055d9-7f21-4079-913d-e6523a9cfffa",        "orderLinkId": "linear-004"    },    "retExtInfo": {},    "time": 1672217093461}
```

[

Previous

Place Order

](/docs/v5/order/create-order)[

Next

Cancel Order

](/docs/v5/order/cancel-order)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
