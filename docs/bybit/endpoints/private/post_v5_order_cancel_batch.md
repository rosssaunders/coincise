# Batch Cancel Order

This endpoint allows you to cancel more than one open order in a single request.

important

-   You must specify `orderId` or `orderLinkId`.
-   If `orderId` and `orderLinkId` is not matched, the system will process `orderId` first.
-   You can cancel **unfilled** or **partially filled** orders.
-   A maximum of 20 orders (option), 20 orders (inverse), 20 orders (linear), 10 orders (spot) can be cancelled per request.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/cancel-batch`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type-   [UTA2.0](/docs/v5/acct-mode#uta-20): `linear`, `option`, `spot`, `inverse`
-   [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `option`, `spot` |
| request | **true** | array | Object |
| \> symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| \> orderId | false | string | Order ID. Either `orderId` or `orderLinkId` is required |
| \> orderLinkId | false | string | User customised order ID. Either `orderId` or `orderLinkId` is required |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| result | Object |  |
| \> list | array | Object |
| \>> category | string | Product type |
| \>> symbol | string | Symbol name |
| \>> orderId | string | Order ID |
| \>> orderLinkId | string | User customised order ID |
| retExtInfo | Object |  |
| \> list | array | Object |
| \>> code | number | Success/error code |
| \>> msg | string | Success/error message |

info

The acknowledgement of an cancel order request indicates that the request was sucessfully accepted. This request is asynchronous so please use the websocket to confirm the order status.

[RUN >>](/docs/api-explorer/v5/trade/batch-cancel)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   .Net
-   Node.js

```bash
POST /v5/order/cancel-batch HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672223356634X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "category": "spot",    "request": [        {            "symbol": "BTCUSDT",            "orderId": "1666800494330512128"        },        {            "symbol": "ATOMUSDT",            "orderLinkId": "1666800494330512129"        }    ]}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.cancel_batch_order(    category="spot",    request=[        {            "symbol": "BTCUSDT",            "orderId": "1666800494330512128"        },        {            "symbol": "ATOMUSDT",            "orderLinkId": "1666800494330512129"        }    ]))
```

```python
import com.bybit.api.client.restApi.BybitApiTradeRestClient;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;BybitApiClientFactory factory = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET");BybitApiAsyncTradeRestClient client = factory.newAsyncTradeRestClient();var cancelOrderRequests = Arrays.asList(TradeOrderRequest.builder().symbol("BTC-10FEB23-24000-C").orderLinkId("9b381bb1-401").build(),                TradeOrderRequest.builder().symbol("BTC-10FEB23-24000-C").orderLinkId("82ee86dd-001").build());var cancelBatchOrders = BatchOrderRequest.builder().category(ProductType.OPTION).request(cancelOrderRequests).build();client.createBatchOrder(cancelBatchOrders, System.out::println);
```

```
using bybit.net.api.ApiServiceImp;using bybit.net.api.Models.Trade;var order1 = new OrderRequest { Symbol = "BTC-10FEB23-24000-C", OrderLinkId = "9b381bb1-401" };var order2 = new OrderRequest { Symbol = "BTC-10FEB23-24000-C", OrderLinkId = "82ee86dd-001" };var orderInfoString = await TradeService.CancelBatchOrder(category: Category.LINEAR, request: new List<OrderRequest> { order1, order2 });Console.WriteLine(orderInfoString);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: 'xxxxxxxxxxxxxxxxxx',    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client    .batchCancelOrders('spot', [        {            "symbol": "BTCUSDT",            "orderId": "1666800494330512128"        },        {            "symbol": "ATOMUSDT",            "orderLinkId": "1666800494330512129"        },    ])    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
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
        "orderLinkId": "spot-btc-03"
      },
      {
        "category": "spot",
        "symbol": "ATOMUSDT",
        "orderId": "",
        "orderLinkId": "1666800494330512129"
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
        "code": 170213,
        "msg": "Order does not exist."
      }
    ]
  },
  "time": 1713434299047
}
```