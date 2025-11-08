# POST /v5/order/amend-batch

**Source:**
[Batch Amend Order](https://bybit-exchange.github.io/docs/v5/order/batch-amend)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Trade
- Batch Amend Order

On this page

# Batch Amend Order

tip

This endpoint allows you to amend more than one open order in a single request.

- You can modify **unfilled** or **partially filled** orders. Conditional orders
  are not supported.
- A maximum of 20 orders (option), 20 orders (inverse), 20 orders (linear), 10
  orders (spot) can be amended per request.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/amend-batch`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                                         | Required | Type   | Comments                                                                                      |
| :---------------------------------------------------------------- | :------- | :----- | --------------------------------------------------------------------------------------------- |
| [category](/docs/v5/enum#category)                                | **true** | string | Product type- [UTA2.0](/docs/v5/acct-mode#uta-20): `linear`, `option`, `spot`, `inverse`      |
| - [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `option`, `spot` |
| request                                                           | **true** | array  | Object                                                                                        |
| \> symbol                                                         | **true** | string | Symbol name, like `BTCUSDT`, uppercase only                                                   |
| \> orderId                                                        | false    | string | Order ID. Either `orderId` or `orderLinkId` is required                                       |
| \> orderLinkId                                                    | false    | string | User customised order ID. Either `orderId` or `orderLinkId` is required                       |
| \> orderIv                                                        | false    | string | Implied volatility. `option` **only**. Pass the real value, e.g for 10%, 0.1 should be passed |
| \> triggerPrice                                                   | false    | string |

- For Perps & Futures, it is the conditional order trigger price. If you expect
  the price to rise to trigger your conditional order, make sure:  
  _triggerPrice > market price_  
  Else, _triggerPrice < market price_
- For spot, it is for tpslOrder or stopOrder trigger price

| | \> qty | false | string | Order quantity after modification. Do not pass it
if not modify the qty | | \> price | false | string | Order price after
modification. Do not pass it if not modify the price | | \> tpslMode | false |
string | TP/SL mode

- `Full`: entire position for TP/SL. Then, tpOrderType or slOrderType must be
  `Market`
- `Partial`: partial position tp/sl. Limit TP/SL order are supported. Note: When
  create limit tp/sl, tpslMode is **required** and it must be `Partial`

| | \> takeProfit | false | string | Take profit price after modification. If
pass "0", it means cancel the existing take profit of the order. Do not pass it
if you do not want to modify the take profit | | \> stopLoss | false | string |
Stop loss price after modification. If pass "0", it means cancel the existing
stop loss of the order. Do not pass it if you do not want to modify the stop
loss | | \> [tpTriggerBy](/docs/v5/enum#triggerby) | false | string | The price
type to trigger take profit. When set a take profit, this param is **required**
if no initial value for the order | | \> [slTriggerBy](/docs/v5/enum#triggerby)
| false | string | The price type to trigger stop loss. When set a take profit,
this param is **required** if no initial value for the order | | \>
[triggerBy](/docs/v5/enum#triggerby) | false | string | Trigger price type | |
\> tpLimitPrice | false | string | Limit order price when take profit is
triggered. Only working when original order sets partial limit tp/sl | | \>
slLimitPrice | false | string | Limit order price when stop loss is triggered.
Only working when original order sets partial limit tp/sl |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter       | Type   | Comments                 |
| :-------------- | :----- | ------------------------ |
| result          | Object |                          |
| \> list         | array  | Object                   |
| \>> category    | string | Product type             |
| \>> symbol      | string | Symbol name              |
| \>> orderId     | string | Order ID                 |
| \>> orderLinkId | string | User customised order ID |
| retExtInfo      | Object |                          |
| \> list         | array  | Object                   |
| \>> code        | number | Success/error code       |
| \>> msg         | string | Success/error message    |

info

The acknowledgement of an amend order request indicates that the request was
sucessfully accepted. This request is asynchronous so please use the websocket
to confirm the order status.

[RUN >>](/docs/api-explorer/v5/trade/batch-amend)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- .Net
- Node.js

```
POST /v5/order/amend-batch HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672222935987X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category": "option",    "request": [        {            "symbol": "ETH-30DEC22-500-C",            "qty": null,            "price": null,            "orderIv": "6.8",            "orderId": "b551f227-7059-4fb5-a6a6-699c04dbd2f2"        },        {            "symbol": "ETH-30DEC22-700-C",            "qty": null,            "price": "650",            "orderIv": null,            "orderId": "fa6a595f-1a57-483f-b9d3-30e9c8235a52"        }    ]}
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.amend_batch_order(    category="option",    request=[        {            "category": "option",            "symbol": "ETH-30DEC22-500-C",            "orderIv": "6.8",            "orderId": "b551f227-7059-4fb5-a6a6-699c04dbd2f2"        },        {            "category": "option",            "symbol": "ETH-30DEC22-700-C",            "price": "650",            "orderId": "fa6a595f-1a57-483f-b9d3-30e9c8235a52"        }    ]))
```

```
import com.bybit.api.client.restApi.BybitApiAsyncTradeRestClient;import com.bybit.api.client.domain.ProductType;import com.bybit.api.client.domain.TradeOrderType;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;import java.util.Arrays;BybitApiClientFactory factory = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET");BybitApiAsyncTradeRestClient client = factory.newAsyncTradeRestClient();var amendOrderRequests = Arrays.asList(TradeOrderRequest.builder().symbol("BTC-10FEB23-24000-C").qty("0.1").price("5").orderLinkId("9b381bb1-401").build(),                TradeOrderRequest.builder().symbol("BTC-10FEB23-24000-C").qty("0.1").price("5").orderLinkId("82ee86dd-001").build());var amendBatchOrders = BatchOrderRequest.builder().category(ProductType.OPTION).request(amendOrderRequests).build();client.createBatchOrder(amendBatchOrders, System.out::println);
```

```
using bybit.net.api.ApiServiceImp;using bybit.net.api.Models.Trade;var order1 = new OrderRequest { Symbol = "XRPUSDT", OrderId = "xxxxxxxxxx", Qty = "10", Price = "0.6080" };var order2 = new OrderRequest { Symbol = "BLZUSDT", OrderId = "xxxxxxxxxx", Qty = "15", Price = "0.6090" };var orderInfoString = await TradeService.AmendBatchOrder(category:Category.LINEAR, request: new List<OrderRequest> { order1, order2 });Console.WriteLine(orderInfoString);
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .batchAmendOrders('option', [        {            symbol: 'ETH-30DEC22-500-C',            orderIv: '6.8',            orderId: 'b551f227-7059-4fb5-a6a6-699c04dbd2f2',        },        {            symbol: 'ETH-30DEC22-700-C',            price: '650',            orderId: 'fa6a595f-1a57-483f-b9d3-30e9c8235a52',        },    ])    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "list": [            {                "category": "option",                "symbol": "ETH-30DEC22-500-C",                "orderId": "b551f227-7059-4fb5-a6a6-699c04dbd2f2",                "orderLinkId": ""            },            {                "category": "option",                "symbol": "ETH-30DEC22-700-C",                "orderId": "fa6a595f-1a57-483f-b9d3-30e9c8235a52",                "orderLinkId": ""            }        ]    },    "retExtInfo": {        "list": [            {                "code": 0,                "msg": "OK"            },            {                "code": 0,                "msg": "OK"            }        ]    },    "time": 1672222808060}
```

[

Previous

Batch Place Order

](/docs/v5/order/batch-place)[

Next

Batch Cancel Order

](/docs/v5/order/batch-cancel)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
