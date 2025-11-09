# Cancel an Existing Order and Send a New Order

Rate limit: 5 requests/second/UID

### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderId":"xxxxxxxxxxxxxxx",    "clientOid":"",    "symbol": "BTCUSDT",    "price":"3.24",    "size":"4"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter              | Type   | Required | Description                                                                                                                                                                                                                                 |
| :--------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol                 | String | Yes      | Trading pair name, e.g. BTCUSDT<br>All symbols can be returned by <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                  |
| price                  | String | Yes      | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface               |
| size                   | String | Yes      | Amount，it represents the number of <strong>base coins</strong>.                                                                                                                                                                            |
| clientOid              | String | No       | Client Order ID<br>Either orderId or clientOid is required                                                                                                                                                                                  |
| orderId                | String | No       | Order ID<br>Either orderId or clientOid is required                                                                                                                                                                                         |
| newClientOid           | String | No       | New customed order ID.<br>If newClientOid results in idempotency duplication, it may cause the old order to be successfully canceled but the new order placement to fail.                                                                   |
| presetTakeProfitPrice  | String | No       | Take profit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface         |
| executeTakeProfitPrice | String | No       | Take profit execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| presetStopLossPrice    | String | No       | Stop loss price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface           |
| executeStopLossPrice   | String | No       | Stop loss execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface   |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725345009763,    "data": {        "orderId": "xxxxxxxxxxxxxxx",        "clientOid": null,        "success": "success",        "msg": null    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                       |
| :-------- | :----- | :-------------------------------------------------------------------------------- |
| orderId   | String | Order ID                                                                          |
| clientOid | String | CLient Order ID                                                                   |
| success   | String | operate success<br><code>success</code>: success<br><code>failure</code>: failure |
| msg       | String | Failure reason                                                                    |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Cancel-Replace-Order
