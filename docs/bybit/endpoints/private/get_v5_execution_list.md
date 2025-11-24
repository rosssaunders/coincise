# Get Trade History

Query users' execution records, sorted by `execTime` in descending order. However, for Classic `spot`, they are sorted by `execId` in descending order.

tip

-   Response items will have sorting issues When 'execTime' is the same, it is recommended to sort according to `execId+OrderId+leavesQty`. This issue is currently being optimized and will be released. If you want to receive real-time execution information, Use the [websocket stream](/docs/v5/websocket/private/execution) (recommended).
-   You may have multiple executions in a single order.
-   You can query by symbol, baseCoin, orderId and orderLinkId, and if you pass multiple params, the system will process them according to this priority: orderId > orderLinkId > symbol > baseCoin. orderId and orderLinkId have a higher priority and as long as these two parameters are in the input parameters, other input parameters will be ignored.

info

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/execution/list`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type
-   [UTA2.0](/docs/v5/acct-mode#uta-20), [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `inverse`, `spot`, `option`
-   classic account: `linear`, `inverse`, `spot`

 |
| symbol | false | string | Symbol name, like `BTCUSDT`, uppercase only |
| orderId | false | string | Order ID |
| orderLinkId | false | string | User customised order ID. *Classic account does not support this param* |
| baseCoin | false | string | Base coin, uppercase only-   [UTA1.0](/docs/v5/acct-mode#uta-10)(category=inverse) and classic account are not supported |
| startTime | false | integer | The start timestamp (ms)

-   startTime and endTime are not passed, return 7 days by default;  
    
-   Only startTime is passed, return range between startTime and startTime+7 days
-   Only endTime is passed, return range between endTime-7 days and endTime
If both are passed, the rule is endTime - startTime <= 7 days

 |
| endTime | false | integer | The end timestamp (ms) |
| [execType](/docs/v5/enum#exectype) | false | string | Execution type. *Classic `spot` is not supported* |
| limit | false | integer | Limit for data size per page. \[`1`, `100`\]. Default: `50` |
| cursor | false | string | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| [category](/docs/v5/enum#category) | string | Product type |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> orderId | string | Order ID |
| \> orderLinkId | string | User customized order ID. *Classic `spot` is not supported* |
| \> side | string | Side. `Buy`,`Sell` |
| \> orderPrice | string | Order price |
| \> orderQty | string | Order qty |
| \> leavesQty | string | The remaining qty not executed. *Classic `spot` is not supported* |
| \> [createType](/docs/v5/enum#createtype) | string | Order create type-   classic account & [UTA1.0](/docs/v5/acct-mode#uta-10)(category=inverse): always `""`
-   Spot, Option do not have this key |
| \> [orderType](/docs/v5/enum#ordertype) | string | Order type. `Market`,`Limit` |
| \> [stopOrderType](/docs/v5/enum#stopordertype) | string | Stop order type. If the order is not stop order, it either returns `UNKNOWN` or `""`. *Classic `spot` is not supported* |
| \> execFee | string | Executed trading fee. You can get spot fee currency instruction [here](/docs/v5/enum#spot-fee-currency-instruction) |
| \> execFeeV2 | string | Spot leg transaction fee, only works for execType=`FutureSpread` |
| \> execId | string | Execution ID |
| \> execPrice | string | Execution price |
| \> execQty | string | Execution qty |
| \> [execType](/docs/v5/enum#exectype) | string | Executed type. *Classic `spot` is not supported* |
| \> execValue | string | Executed order value. *Classic `spot` is not supported* |
| \> execTime | string | Executed timestamp (ms) |
| \> feeCurrency | string | Trading fee currency |
| \> isMaker | boolean | Is maker order. `true`: maker, `false`: taker |
| \> feeRate | string | Trading fee rate. *Classic `spot` is not supported* |
| \> tradeIv | string | Implied volatility. Valid for `option` |
| \> markIv | string | Implied volatility of mark price. Valid for `option` |
| \> markPrice | string | The mark price of the symbol when executing. *Classic `spot` is not supported* |
| \> indexPrice | string | The index price of the symbol when executing. *Valid for `option` only* |
| \> underlyingPrice | string | The underlying price of the symbol when executing. *Valid for `option`* |
| \> blockTradeId | string | Paradigm block trade ID |
| \> closedSize | string | Closed position size |
| \> seq | long | Cross sequence, used to associate each fill and each position update

-   Different symbols may have the same seq, please use seq + symbol to check unique

 |
| \> extraFees | string | Trading fee rate information. Currently, this data is returned only for kyc=Indian user or spot orders placed on the Indonesian site or spot fiat currency orders placed on the EU site. In other cases, an empty string is returned. Enum: [feeType](/docs/v5/enum#extrafeesfeetype), [subFeeType](/docs/v5/enum#extrafeessubfeetype) |
| nextPageCursor | string | Refer to the `cursor` request parameter |

[RUN >>](/docs/api-explorer/v5/position/execution)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/execution/list?category=linear&limit=1 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672283754132X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_executions(    category="linear",    limit=1,))
```

```python
import com.bybit.api.client.config.BybitApiConfig;import com.bybit.api.client.domain.trade.request.TradeOrderRequest;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET", BybitApiConfig.TESTNET_DOMAIN).newTradeRestClient();var tradeHistoryRequest = TradeOrderRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").execType(ExecType.Trade).limit(100).build();System.out.println(client.getTradeHistory(tradeHistoryRequest));
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .getExecutionList({        category: 'linear',        symbol: 'BTCUSDT',        margin: '10',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "nextPageCursor": "132766%3A2%2C132766%3A2",
    "category": "linear",
    "list": [
      {
        "symbol": "ETHPERP",
        "orderType": "Market",
        "underlyingPrice": "",
        "orderLinkId": "",
        "side": "Buy",
        "indexPrice": "",
        "orderId": "8c065341-7b52-4ca9-ac2c-37e31ac55c94",
        "stopOrderType": "UNKNOWN",
        "leavesQty": "0",
        "execTime": "1672282722429",
        "feeCurrency": "",
        "isMaker": false,
        "execFee": "0.071409",
        "feeRate": "0.0006",
        "execId": "e0cbe81d-0f18-5866-9415-cf319b5dab3b",
        "tradeIv": "",
        "blockTradeId": "",
        "markPrice": "1183.54",
        "execPrice": "1190.15",
        "markIv": "",
        "orderQty": "0.1",
        "orderPrice": "1236.9",
        "execValue": "119.015",
        "execType": "Trade",
        "execQty": "0.1",
        "closedSize": "",
        "extraFees": "",
        "seq": 4688002127
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672283754510
}
```