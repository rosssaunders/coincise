# Place Order

Rate limit: 10 requests/second/UID  
Rate limit: 1 request/second/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

-   Place Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/spot/trade/place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "BTCUSDT","side": "buy","orderType": "limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair name, e.g. BTCUSDT  
All symbols can be returned by [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| side | String | Yes | Order Direction  
`buy`: Buy  
`sell`: Sell |
| orderType | String | Yes | Order type  
`limit`: Limit order  
`market`: Market order |
| force | String | Yes | Execution strategy(It is invalid when `orderType` is `market`)  
`gtc`: Normal limit order, good till cancelled  
`post_only`: Post only  
`fok`: Fill or kill  
`ioc`: Immediate or cancel |
| price | String | No | Limit price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| size | String | Yes | Amount  
For **Limit and Market-Sell** orders, it represents the number of **base coins**.  
For **Market-Buy** orders, it represents the number of **quote coins**.  
The decimal places of amount can be got trough [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| clientOid | String | No | Customed order ID  
It's invalid when `tpslType` is `tpsl` |
| triggerPrice | String | No | SPOT TP/SL trigger price, only requried in SPOT TP/SL order |
| tpslType | String | No | Order type  
`normal`:SPOT order(default)  
`tpsl`:SPOT TP/SL order |
| requestTime | String | No | Request Time, Unix millisecond timestamp |
| receiveWindow | String | No | Valid time window, Unix millisecond timestamp  
If it's set, the request is valid only when the time range between the timestamp in the request and the time that server received the request is within `receiveWindow` |
| stpMode | String | No | STP Mode(Self Trade Prevention)  
`none`: not setting STP(default)  
`cancel_taker`: cancel taker order  
`cancel_maker`: cancel maker order  
`cancel_both`: cancel both of taker and maker orders |
| presetTakeProfitPrice | String | No | Take profit price  
It's invalid when `tpslType` is `tpsl`  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| executeTakeProfitPrice | String | No | Take profit execute price  
It's invalid when `tpslType` is `tpsl`  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| presetStopLossPrice | String | No | Stop loss price  
It's invalid when `tpslType` is `tpsl`  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| executeStopLossPrice | String | No | Stop loss execute price  
It's invalid when `tpslType` is `tpsl`  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "orderId": "1001",        "clientOid": "121211212122"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID |
| clientOid | String | Custom order ID |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Place-Order
