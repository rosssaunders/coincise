# Cancel Order

important

-   You must specify `orderId` or `orderLinkId` to cancel the order.
-   If `orderId` and `orderLinkId` do not match, the system will process `orderId` first.
-   You can only cancel **unfilled** or **partially filled** orders.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/cancel`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `inverse`, `spot`, `option`
-   classic account: `linear`, `inverse`, `spot`

 |
| symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| orderId | false | string | Order ID. Either `orderId` or `orderLinkId` is **required** |
| orderLinkId | false | string | User customised order ID. Either `orderId` or `orderLinkId` is **required** |
| orderFilter | false | string | Spot trading **only**-   `Order`
-   `tpslOrder`
-   `StopOrder`
If not passed, `Order` by default |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| orderId | string | Order ID |
| orderLinkId | string | User customised order ID |

info

The acknowledgement of an cancel order request indicates that the request was sucessfully accepted. This request is asynchronous so please use the websocket to confirm the order status.

[RUN >>](/docs/api-explorer/v5/trade/cancel-order)

* * *

### Request Example[​](#request-example "Direct link to heading")

-   .Net

```bash
POST /v5/order/cancel HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672217376681X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{  "category": "linear",  "symbol": "BTCPERP",  "orderLinkId": null,  "orderId":"c6f055d9-7f21-4079-913d-e6523a9cfffa"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.cancel_order(    category="linear",    symbol="BTCPERP",    orderId="c6f055d9-7f21-4079-913d-e6523a9cfffa",))
```

```python
import com.bybit.api.client.restApi.BybitApiTradeRestClient;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;BybitApiClientFactory factory = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET");BybitApiAsyncTradeRestClient client = factory.newAsyncTradeRestClient();var cancelOrderRequest = TradeOrderRequest.builder().category(ProductType.SPOT).symbol("XRPUSDT").orderId("1523347543495541248").build();var canceledOrder = client.cancelOrder(cancelOrderRequest);System.out.println(canceledOrder);
```

```
using bybit.net.api.ApiServiceImp;using bybit.net.api.Models.Trade;BybitTradeService tradeService = new(apikey: "YOUR_API_KEY", apisecret: "YOUR_API_SECRET");var orderInfoString = await TradeService.CancelOrder(orderId: "1523347543495541248", category: Category.SPOT, symbol: "XRPUSDT");Console.WriteLine(orderInfoString);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .cancelOrder({        category: 'linear',        symbol: 'BTCPERP',        orderId: 'c6f055d9-7f21-4079-913d-e6523a9cfffa',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "orderId": "c6f055d9-7f21-4079-913d-e6523a9cfffa",
    "orderLinkId": "linear-004"
  },
  "retExtInfo": {},
  "time": 1672217377164
}
```