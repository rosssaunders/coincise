# Batch Place Orders

Frequency limit: 5 times/1s (UID)Trader frequency limit: 1 times/1s (UID)

### Description[​](#description "Direct link to Description")

Place Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-orders" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol":"BTCUSDT","orderList":[{"side":"buy","orderType":"limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}] }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                     | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                                                                                       |
| batchMode                  | String | No       | Batch order mode<br><code>single</code> single currency mode, default single currency mode<br><code>multiple</code> cross-currency mode.<br>If single mode , the symbol in orderlist will be ingor<br>If multiple mode , the symbol in orderlist is not allow be null, and the symbol in orderlist is required. symbol outside orderlist will be ingor                                                                |
| orderList                  | Array  | Yes      | Collection of placing orders，maximum length: 50                                                                                                                                                                                                                                                                                                                                                                      |
| symbol                     | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; side                  | String | Yes      | Order Direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell                                                                                                                                                                                                                                                                                                                                                   |
| &gt; orderType             | String | Yes      | Order type<br><code>limit</code>: Limit order<br><code>market</code>: Market order                                                                                                                                                                                                                                                                                                                                    |
| &gt; force                 | String | Yes      | Execution strategy(It will be invalid when <code>orderType</code> is <code>market</code>)<br><code>gtc</code>: Normal limit order, good till cancelled<br><code>post_only</code>: Post only<br><code>fok</code>: Fill or kill<br><code>ioc</code>: Immediate or cancel                                                                                                                                                |
| &gt; price                 | String | No       | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                         |
| &gt; size                  | String | Yes      | Amount<br>For <strong>Limit and Market-Sell</strong> orders, it represents the number of <strong>base coins</strong>.<br>For <strong>Market-Buy</strong> orders, it represents the number of <strong>quote coins</strong>.<br>The decimal places of amount can be got trough <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| &gt; clientOid             | String | No       | Customed order ID                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; stpMode               | String | No       | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders                                                                                                                                                                            |
| &gt;presetTakeProfitPrice  | String | No       | Take profit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                   |
| &gt;executeTakeProfitPrice | String | No       | Take profit execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                           |
| &gt;presetStopLossPrice    | String | No       | Stop loss price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                     |
| &gt;executeStopLossPrice   | String | No       | Stop loss execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1666336231317,    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "1"            }        ],        "failureList": [            {                "orderId": "121211212122",                "clientOid": "1",                "errorMsg": "clientOrderId duplicate"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter     | Type   | Description             |
| :------------ | :----- | :---------------------- |
| successList   | Array  | Successful order number |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| failureList   | Array  | Failed order number     |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| &gt;errorMsg  | String | Error information       |
| &gt;errorCode | String | Error code              |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Batch-Place-Orders
