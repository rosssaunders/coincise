# Batch Cancel Existing Order and Send New Orders

Rate limit: 5 requests/second/UID  

### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/spot/trade/batch-cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderList": [        {            "orderId":"xxxxxxxxxxxxxxxxx",            "clientOid":"",            "symbol": "BTCUSDT",            "price":"3.17",            "size":"5"        }    ]}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderList | Array | Yes | Collection of placing orders，maximum length: 50 |
| \> symbol | String | Yes | Trading pair name, e.g. BTCUSDT  
All symbols can be returned by [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> price | String | Yes | Limit price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> size | String | Yes | Amount，it represents the number of **base coins**. |
| \> clientOid | String | No | Client Order ID  
Either orderId or clientOid is required |
| \> orderId | String | No | Order ID  
Either orderId or clientOid is required |
| \> newClientOid | String | No | New customed order ID.  
If newClientOid results in idempotency duplication, it may cause the old order to be successfully canceled but the new order placement to fail. |
| \> presetTakeProfitPrice | String | No | Take profit price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> executeTakeProfitPrice | String | No | Take profit execute price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> presetStopLossPrice | String | No | Stop loss price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |
| \> executeStopLossPrice | String | No | Stop loss execute price  
The decimal places of price and the price step can be returned by the [Get Symbol Info](https://www.bitget.com/api-doc/spot/market/Get-Symbols) interface |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725341809524,    "data": [        {            "orderId": "xxxxxxxxxxxxxxxxxxxxxx",            "clientOid": null,            "success": "failure",            "msg": "xxxxxx"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID |
| clientOid | String | CLient Order ID |
| success | String | operate success  
`success`: success  
`failure`: failure |
| msg | String | Failure reason |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Batch-Cancel-Replace-Order
