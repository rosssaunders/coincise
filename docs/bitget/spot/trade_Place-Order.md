# Place Order

Rate limit: 10 requests/second/UID  
Rate limit: 1 request/second/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

- Place Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "BTCUSDT","side": "buy","orderType": "limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter              | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                 | String | Yes      | Trading pair name, e.g. BTCUSDT<br>All symbols can be returned by <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                                            |
| side                   | String | Yes      | Order Direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell                                                                                                                                                                                                                                                                                                                                                   |
| orderType              | String | Yes      | Order type<br><code>limit</code>: Limit order<br><code>market</code>: Market order                                                                                                                                                                                                                                                                                                                                    |
| force                  | String | Yes      | Execution strategy(It is invalid when <code>orderType</code> is <code>market</code>)<br><code>gtc</code>: Normal limit order, good till cancelled<br><code>post_only</code>: Post only<br><code>fok</code>: Fill or kill<br><code>ioc</code>: Immediate or cancel                                                                                                                                                     |
| price                  | String | No       | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                         |
| size                   | String | Yes      | Amount<br>For <strong>Limit and Market-Sell</strong> orders, it represents the number of <strong>base coins</strong>.<br>For <strong>Market-Buy</strong> orders, it represents the number of <strong>quote coins</strong>.<br>The decimal places of amount can be got trough <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| clientOid              | String | No       | Customed order ID<br>It's invalid when <code>tpslType</code> is <code>tpsl</code>                                                                                                                                                                                                                                                                                                                                     |
| triggerPrice           | String | No       | SPOT TP/SL trigger price, only requried in SPOT TP/SL order                                                                                                                                                                                                                                                                                                                                                           |
| tpslType               | String | No       | Order type<br><code>normal</code>:SPOT order(default)<br><code>tpsl</code>:SPOT TP/SL order                                                                                                                                                                                                                                                                                                                           |
| requestTime            | String | No       | Request Time, Unix millisecond timestamp                                                                                                                                                                                                                                                                                                                                                                              |
| receiveWindow          | String | No       | Valid time window, Unix millisecond timestamp<br>If it's set, the request is valid only when the time range between the timestamp in the request and the time that server received the request is within <code>receiveWindow</code>                                                                                                                                                                                   |
| stpMode                | String | No       | STP Mode(Self Trade Prevention)<br><code>none</code>: not setting STP(default)<br><code>cancel_taker</code>: cancel taker order<br><code>cancel_maker</code>: cancel maker order<br><code>cancel_both</code>: cancel both of taker and maker orders                                                                                                                                                                   |
| presetTakeProfitPrice  | String | No       | Take profit price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                   |
| executeTakeProfitPrice | String | No       | Take profit execute price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                           |
| presetStopLossPrice    | String | No       | Stop loss price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                     |
| executeStopLossPrice   | String | No       | Stop loss execute price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "orderId": "1001",        "clientOid": "121211212122"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Custom order ID |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Place-Order
