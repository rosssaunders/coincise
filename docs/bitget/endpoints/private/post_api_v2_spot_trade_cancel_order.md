# Cancel Order

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "BTCUSDT","orderId": "121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                                  | Type   | Required | Description                     |
| :----------------------------------------- | :----- | :------- | :------------------------------ |
| symbol                                     | String | Yes      | Trading pair name, e.g. BTCUSDT |
| it is not required when tpslType is `tpsl` |
| tpslType                                   | String | No       | order type, deafult:`normal`    |

`normal` spot order  
`tpsl` spot tpsl order | | orderId | String | No | Order ID  
Either orderId or clientOid is required  
it's required when tpslType is `tpsl` | | clientOid | String | No | Client Order
ID  
Either orderId or clientOid is required |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1234567891234,
  "data": {
    "orderId": "121211212122",
    "clientOid": "xx001"
  }
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Client Order ID |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Cancel-Order
