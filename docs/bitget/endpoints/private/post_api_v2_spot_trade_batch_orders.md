# Batch Place Orders

Frequency limit: 5 times/1s (UID)Trader frequency limit: 1 times/1s (UID)

### Description[​](#description "Direct link to Description")

Place Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/spot/trade/batch-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-orders" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol":"BTCUSDT","orderList":[{"side":"buy","orderType":"limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}] }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | No | Trading pair name, e.g. BTCUSDT |
| batchMode | String | No | Batch order mode  
`single` single currency mode, default single currency mode  
`multiple` cross-currency mode.  
If single mode , the symbol in orderlist will be ingor  
If multiple mode , the symbol in orderlist is not allow be null, and the symbol in orderlist is required. symbol outside orderlist will be ingor |
| orderList | Array | Yes | Collection of placing orders，maximum length: 50 |
| symbol | String | No | Trading pair name, e.g. BTCUSDT |
| \> side | String | Yes | Order Direction  
`buy`: Buy  
`sell`: Sell |
| \> orderType | String | Yes | Order type  
`limit`: Limit order  
`market`: Market order |
| \> force | String | Yes | Execution strategy(It will be invalid when `orderType` is `market`)  
`gtc`: Normal limit order, good till cancelled  
`post_only`: Post only  
`fok`: Fill or kill  
`ioc`: Immediate or cancel |
| \> price | String | No | Limit price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> size | String | Yes | Amount  
For **Limit and Market-Sell** orders, it represents the number of **base coins**.  
For **Market-Buy** orders, it represents the number of **quote coins**.  
The decimal places of amount can be got trough [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> clientOid | String | No | Customed order ID |
| \> stpMode | String | No | STP Mode, default `none`  
`none` not setting STP  
`cancel_taker` cancel taker order  
`cancel_maker` cancel maker order  
`cancel_both` cancel both of taker and maker orders |
| \>presetTakeProfitPrice | String | No | Take profit price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \>executeTakeProfitPrice | String | No | Take profit execute price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \>presetStopLossPrice | String | No | Stop loss price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \>executeStopLossPrice | String | No | Stop loss execute price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1666336231317,    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "1"            }        ],        "failureList": [            {                "orderId": "121211212122",                "clientOid": "1",                "errorMsg": "clientOrderId duplicate"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| successList | Array | Successful order number |
| \>orderId | String | Order ID |
| \>clientOid | String | Client Order ID |
| failureList | Array | Failed order number |
| \>orderId | String | Order ID |
| \>clientOid | String | Client Order ID |
| \>errorMsg | String | Error information |
| \>errorCode | String | Error code |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Batch-Place-Orders
