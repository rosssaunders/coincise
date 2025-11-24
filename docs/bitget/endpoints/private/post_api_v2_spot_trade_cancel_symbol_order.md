# Cancel Order by Symbol

Frequency limit: 5 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel order by symbol

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-symbol-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-symbol-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "BTCUSDT"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                     |
| :-------- | :----- | :------- | :------------------------------ |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1698313139948,
  "data": {
    "symbol": "BGBUSDT"
  }
}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                                                                               |
| :-------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Cancelled symbol (This request is executed asynchronously. If you need to know the result, please query the Get History Orders endpoint.) |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Cancel-Symbol-Orders
