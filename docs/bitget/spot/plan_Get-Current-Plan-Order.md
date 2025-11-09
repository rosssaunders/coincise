# Get Current Plan Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Current Plan Orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/current-plan-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/current-plan-order?symbol=BTCUSDT&limit=10" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                                                                 |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | String | No       | Trading pair, e.g. BTCUSDT                                                                                                                                                  |
| limit      | String | No       | Default is 20 Max is 100                                                                                                                                                    |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface.                                         |
| startTime  | String | No       | The start time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868<br>The <code>startTime</code> and <code>endTime</code> should be within 90 days. |
| endTime    | String | No       | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868<br>The <code>startTime</code> and <code>endTime</code> should be within 90 days.   |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134581005,    "data": {        "nextFlag": false,        "idLessThan": "1",        "orderList": [            {                "orderId": "121211212122",                "clientOid": "121211212122",                "symbol": "TRXUSDT",                "size": "151",                "executePrice": "0.041572",                "triggerPrice": "0.041572",                "status": "not_trigger",                "orderType": "limit",                "side": "buy",                "planType":"amount",                "triggerType": "fill_price",                "enterPointSource": "API",                "uTime": "1668134576563",                "cTime": "1668134576563"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter        | Type   | Description                                                                                                                                                                                                                                                                                                        |
| :--------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId          | String | Order ID                                                                                                                                                                                                                                                                                                           |
| clientOid        | String | Client customized ID                                                                                                                                                                                                                                                                                               |
| symbol           | String | Trading pair                                                                                                                                                                                                                                                                                                       |
| triggerPrice     | String | Trigger price                                                                                                                                                                                                                                                                                                      |
| orderType        | String | Order type<br><code>limit</code>: limit order<br><code>market</code>: market order                                                                                                                                                                                                                                 |
| executePrice     | String | Execution price                                                                                                                                                                                                                                                                                                    |
| planType         | String | Order type<br><code>amount</code>: By amount of the order<br><code>total</code>: By trading volume of the order                                                                                                                                                                                                    |
| size             | String | Quantity to buy<br>If <code>placeType</code>=<code>amount</code>, the quote currency is the base coin.<br>If <code>placeType</code>=<code>total</code>, the quote currency is the quote coin.                                                                                                                      |
| status           | String | Order status<br><code>live</code>: not triggered<br><code>executing</code>: order placing                                                                                                                                                                                                                          |
| side             | String | Direction <code>buy</code> or <code>sell</code>                                                                                                                                                                                                                                                                    |
| triggerType      | String | Trigger type<br><code>fill_price</code>: filled price<br><code>mark_price</code>: mark price                                                                                                                                                                                                                       |
| enterPointSource | String | Order source<br><code>WEB</code>: Orders created on the website<br><code>API</code>: Orders created on API<br><code>SYS</code>: System managed orders, usually generated by forced liquidation logic<br><code>ANDROID</code>: Orders created on the Android app<br><code>IOS</code>: Orders created on the iOS app |
| cTime            | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                      |
| uTime            | String | Update time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                        |

> **Source:** https://www.bitget.com/api-doc/spot/plan/Get-Current-Plan-Order
