# Batch Cancel Existing Order and Send New Orders

Rate limit: 5 requests/second/UID  

### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/trade/batch-cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderList": [        {            "orderId":"xxxxxxxxxxxxxxxxx",            "clientOid":"",            "symbol": "BTCUSDT",            "price":"3.17",            "size":"5"        }    ]}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderList | Array | Yes | Collection of placing orders，maximum length: 50 
| &gt; symbol | String | Yes | Trading pair name, e.g. BTCUSDT<br>All symbols can be returned by <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface 
| &gt; price | String | Yes | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface 
| &gt; size | String | Yes | Amount，it represents the number of <strong>base coins</strong>. 
| &gt; clientOid | String | No | Client Order ID<br>Either orderId or clientOid is required 
| &gt; orderId | String | No | Order ID<br>Either orderId or clientOid is required 
| &gt; newClientOid | String | No | New customed order ID.<br>If newClientOid results in idempotency duplication, it may cause the old order to be successfully canceled but the new order placement to fail. 
| &gt; presetTakeProfitPrice | String | No | Take profit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface 
| &gt; executeTakeProfitPrice | String | No | Take profit execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface 
| &gt; presetStopLossPrice | String | No | Stop loss price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface 
| &gt; executeStopLossPrice | String | No | Stop loss execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725341809524,    "data": [        {            "orderId": "xxxxxxxxxxxxxxxxxxxxxx",            "clientOid": null,            "success": "failure",            "msg": "xxxxxx"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID 
| clientOid | String | CLient Order ID 
| success | String | operate success<br><code>success</code>: success<br><code>failure</code>: failure 
| msg | String | Failure reason

> **Source:** https://www.bitget.com/api-doc/spot/trade/Batch-Cancel-Replace-Order
