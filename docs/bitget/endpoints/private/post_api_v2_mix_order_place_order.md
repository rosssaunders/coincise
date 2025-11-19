# Place Order

-   Rate limit: 10 requests/second/UID
-   Rate limit: 1 request/second/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

-   Ignore the `tradeSide` parameter when position mode is in `one-way-mode`
-   In “hedge-mode”, when there is limit close order occupying the position, if the size of next market close order and limit close orders exceeds the position size, it will return an “insufficient position error” instead of cancelling the current limit order and executing the market order
-   **hedge position mode**: **Open long**: "side"=`buy`, "tradeSide"=`open`; **Close long**: "side"=`buy`, "tradeSide"=`close`; **Open short**: "side"=`sell`, "tradeSide"=`open`; **Close short**: "side"=`sell`, "tradeSide"=`close`; **one-way position mode**: "side"=`buy` and `sell`, tradeSide: ignore
-   In `one-way-mode` position mode, if the total size of the new reduce-only order and the existing reduce-only orders exceeds the position size, the system will cancel the existing reduce-only orders sequentially based on their creation order until the total size of the new and existing reduce-only orders is less than or equal to the position size. Additionally, the response for the latest reduce-only order request will not include an `orderId`. You can use the `clientOid` set in the request to query order details or retrieve the orderId from the current pending orders.
-   When in `hedge Mode`, if a limit close order is occupying a position, and a subsequent market close order (its quantity plus the limit order's quantity) exceeds the total position size, it will not report an insufficient position error. It also won't cancel the limit order that's occupying the position. Instead, the quantity of the limit close order will be preserved, and the market order will close only the quantity remaining after subtracting the limit order's quantity from the total position size. For example: If you have a position of 100, a limit order occupies 70, and you then place a market close order for 50, it will not report an insufficient position error, nor will it cancel the occupying limit order to execute the market order. Instead, it will directly close a quantity of 30.
-   When in `hedge Mode`,if the existing quantity is equal to the limit close position order of the held position, a newly added close position order will automatically cancel the limit order that has occupied the position.
-   For elite traders, please strictly adhere to the list of trading pairs specified in the [Available trading pairs and parameters for elite traders](https://www.bitget.com/zh-CN/support/articles/12560603808895) when placing orders using the Copy Trading API Key. Trading pairs outside the announced list are not available for copy trading.
-   **API Broker rebate identifier**:  
    The following code block needs to be added to the HTTP Header of the request.
    
    > "X-CHANNEL-API-CODE":"your-channel-api-code"
    

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/mix/order/place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-order" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{ "symbol": "ETHUSDT", "productType": "USDT-FUTURES", "marginMode": "isolated", "marginCoin": "USDT", "size": "0.1", "price": "2000", "side": "sell", "tradeSide": "open", "orderType": "limit", "force": "gtc", "clientOid": "121211212122" }'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair, e.g. ETHUSDT |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| marginMode | String | Yes | Position mode  
`isolated`: isolated margin  
`crossed`: crossed margin |
| marginCoin | String | Yes | Margin coin(capitalized) |
| size | String | Yes | Amount (base coin)  
To get the decimal places of size:[Get Contract Config](https://www.bitget.com/api-doc/contract/market/Get-All-Symbols-Contracts) |
| price | String | No | Price of the order.  
Required if the "orderType" is `limit`  
To get the decimal places of size:[Get Contract Config](https://www.bitget.com/api-doc/contract/market/Get-All-Symbols-Contracts) |
| side | String | Yes | Trade side  
`buy`: Buy(**one-way-mode**); Long position direction(**hedge-mode**)  
`sell`: Sell(**one-way-mode**); Short position direction(**hedge-mode**) |
| tradeSide | String | No | Trade type  
**Only required in hedge-mode**  
`open`: Open position  
`close`: Close position |
| orderType | String | Yes | Order type  
`limit`: limit orders  
`market`: market orders |
| force | String | No | Order expiration date.  
Required if the orderType is `limit`  
`ioc`: Immediate or cancel  
`fok`: Fill or kill  
`gtc`: Good till canceled(**default value**)  
`post_only`: Post only |
| clientOid | String | No | Customize order ID |
| reduceOnly | String | No | Whether or not to just reduce the position: `YES`, `NO`  
Default: `NO`.  
Applicable only in **one-way-position** mode |
| presetStopSurplusPrice | String | No | Take-profit value  
No take-profit is set if the field is empty. |
| presetStopLossPrice | String | No | Stop-loss value  
No stop-loss is set if the field is empty. |
| presetStopSurplusExecutePrice | String | No | Preset stop - profit execution price. |
| presetStopLossExecutePrice | String | No | Preset stop-loss execution price. |
| stpMode | String | No | STP Mode(Self Trade Prevention)  
`none`: not setting STP(default value)  
`cancel_taker`: cancel taker order  
`cancel_maker`: cancel maker order  
`cancel_both`: cancel both of taker and maker orders |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695806875837,
  "data": {
    "clientOid": "121211212122",
    "orderId": "121211212122"
  }
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID |
| clientOid | String | Customize order ID |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Place-Order
