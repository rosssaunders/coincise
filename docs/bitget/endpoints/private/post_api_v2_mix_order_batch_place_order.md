# Batch Order

- Rate limit: 5 requests/second/UID
- Rate limit: 1 request/second/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

- Supports TP/SL feature. If the current underlying asset does not exist in the
  position, it is intended to preset the TP/SL. If the current underlying exists
  in the position, it is intended to modify the TP/SL
- Ignore the `tradeSide` parameter when position mode is in `one-way-mode`
- **API Broker rebate identifier**:  
  The following code block needs to be added to the HTTP Header of the request.

  > "X-CHANNEL-API-CODE":"your-channel-api-code"

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/batch-place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/batch-place-order" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{     "symbol": "BTCUSDT",     "productType": "usdt-futures",     "marginMode": "crossed",     "marginCoin": "USDT",     "orderList": [{             "size": "1",             "side": "buy",             "tradeSide": "open",             "orderType": "market",             "force": "gtc",             "clientOid": "123456",             "reduceOnly": "NO",             "presetStopSurplusPrice": "20000",             "presetStopLossPrice": "10000"         }     ] }'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description  |
| :---------- | :----- | :------- | :----------- |
| symbol      | String | Yes      | Trading pair |
| productType | String | Yes      | Product type |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | marginCoin | String | Yes | Margin coin, must
be capitalized | | marginMode | String | Yes | Position mode  
`isolated`: isolated margin  
`crossed`: crossed margin | | orderList | List<String\> | Yes | Order list,
maximum length: 50 | | \>size | String | Yes | Amount | | \>price | String | No
| Price of the order.  
Required if the order type is `limit` | | \>side | String | Yes | Order
direction  
`buy`: Buy  
`sell`: Sell | | \>tradeSide | String | No | Direction  
**Only required in hedge-mode**  
Open and Close Notes:  
For open long, `side` fill in"buy"; `tradeSide` should be "Open"  
For open short, `side` fill in "sell"; `tradeSide` should be "open"  
For close long, `side` fill in "buy"; `tradeSide` should be "close"  
For close short, `side` fill in "sell";`tradeSide` should be "close" | |
\>orderType | String | Yes | Order type  
`limit`: limit orders  
`market`: market orders | | \>force | String | No | Order expiration date.  
Required if the orderType is `limit`, default value is `gtc`  
`ioc`: Immediate or cancel  
`fok`: Fill or kill  
`gtc`: Good till canceled  
`post_only`: Post only | | \>clientOid | String | No | Custom order ID | |
\>reduceOnly | String | No | Whether or not to just reduce the position: `YES`,
`NO`  
Default: `NO`  
Applicable only in **one-way-position** mode | | \>presetStopSurplusPrice |
String | No | Take-profit value  
No take-profit is set if the field is empty. | | \>presetStopLossPrice | String
| No | Stop-loss value  
No stop-loss is set if the field is empty. | | \>stpMode | String | No | STP
Mode, default `none`  
`none` not setting STP  
`cancel_taker` cancel taker order  
`cancel_maker` cancel maker order  
`cancel_both` cancel both of taker and maker orders |

Response Example

```
{    "code": "00000",    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "BITGET#121211212122"            }        ],        "failureList": []    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter   | Type          | Description           |
| :---------- | :------------ | :-------------------- |
| successList | List<Object\> | Successful order list |
| \>orderId   | String        | Order ID              |
| \>clientOid | String        | Customize order ID    |
| failureList | List<Object\> | Failed order list     |
| \>orderId   | String        | Order ID              |
| \>clientOid | String        | Customize order ID    |
| \>errorMsg  | String        | Failure reason        |
| \>errorCode | String        | Failure code          |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Batch-Order
