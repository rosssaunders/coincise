# P2P Transaction Records

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

p2p transaction records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/tax/p2p-record

Request Example

```
curl "https://api.bitget.com/api/v2/tax/p2p-record?startTime=1686128558000&endTime=1686214958000&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                 |
| :--------- | :----- | :------- | :------------------------------------------------------------------------------------------ |
| coin       | String | No       | Default all coin type                                                                       |
| startTime  | String | Yes      | Start time (time stamp in milliseconds)                                                     |
| endTime    | String | Yes      | The maximum interval between startTime and endTime (time stamp in milliseconds) is 30 days. |
| limit      | String | No       | Default: 500, maximum: 500                                                                  |
| idLessThan | String | No       | The last recorded ID                                                                        |

Response example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1687260620793,
  "data": [
    {
      "id": "152526631",
      "coin": "USDT",
      "p2pTaxType": "transfer-in",
      "balance": "1",
      "ts": "1755846320684"
    }
  ]
}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter  | Type   | Description         |
| :--------- | :----- | :------------------ |
| id         | String | Record id lastEndId |
| coin       | String | Coin                |
| p2pTaxType | String | p2p taxation types  |

transfer_in Inbound transfer  
transfer_out Outbound transfer  
sell Sell  
buy Buy | | balance | String | Quantity |

> **Source:** https://www.bitget.com/api-doc/common/tax/Get-P2P-Account-Record
