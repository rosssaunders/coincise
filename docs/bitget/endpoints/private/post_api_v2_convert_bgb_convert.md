# Convert BGB

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Convert BGB

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/convert/bgb-convert

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/convert/bgb-convert" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \  -d \'{"coinList": ["EOS","GROK"]}'
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| coinList  | String | Yes      | swap coins  |

Response Example

```json
{  "code": "00000",  "data": {    "orderList": [   {        "coin": "EOS",        "orderId": "1233431213"   },   {        "coin": "GROK",        "orderId": "1233431213"   }          ],   }  "msg": "success",  "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description   |
| :--------- | :----- | :------------ |
| orderList  | String |               |
| \> coin    | String | Coin swap     |
| \> orderId | String | swap order Id |

> **Source:** https://www.bitget.com/api-doc/common/bgb-convert/
