# Place Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Place plan order

- **API Broker rebate identifier**:  
  The following code block needs to be added to the HTTP Header of the request.

  > "X-CHANNEL-API-CODE":"your-channel-api-code"

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/place-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "TRXUSDT", "side": "buy", "triggerPrice": 0.041572, "executePrice": "0.041572", "size": 151, "triggerType": "market_price", "orderType": "limit","clientOid": "12345"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                     |
| :-------- | :----- | :------- | :------------------------------ |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT |
| side      | String | Yes      | Direction                       |

`buy`: Buy  
`sell`: Sell | | triggerPrice | String | Yes | Trigger price | | orderType |
String | Yes | Order type  
`limit`: Limit orders  
`market`: Market orders | | executePrice | String | No | Execution price  
it's required when `orderType`\=`limit` | | planType | String | No | Order
type  
`amount`: By amount of the order(base coin)  
`total`: By trading volume of the order(quote coin)  
The default value is `amount` | | size | String | Yes | Quantity to buy  
If `planType`\=`amount`, it is the base coin.  
If `planType`\=`total`, it is the quote coin. | | triggerType | String | Yes |
Trigger type  
`fill_price`: filled price  
`mark_price`: mark price | | clientOid | String | No | Client customized ID | |
stpMode | String | No | STP Mode, default `none`  
`none` not setting STP  
`cancel_taker` cancel taker order  
`cancel_maker` cancel maker order  
`cancel_both` cancel both of taker and maker orders |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134576535,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description          |
| :-------- | :----- | :------------------- |
| orderId   | String | Order ID             |
| clientOid | String | Client customized ID |

> **Source:** https://www.bitget.com/api-doc/spot/plan/Place-Plan-Order
