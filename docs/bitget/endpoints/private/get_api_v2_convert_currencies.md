# Get Convert Coins

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get a list of Flash Currencies

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/convert/currencies

Request Example

```
curl "https://api.bitget.com/api/v2/convert/currencies" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```json
{
  "code": "00000",
  "data": [
    {
      "coin": "ETH",
      "available": "0.9994",
      "maxAmount": "5",
      "minAmount": "0.0005"
    }
  ],
  "msg": "success",
  "requestTime": 1627293612502
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                                                                                           |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------ |
| coin      | String | Token name                                                                                                                            |
| available | String | Currency accounts available                                                                                                           |
| maxAmount | String | Maximum available quantity as fromCoin means maximum consumable quantity, as toCoin means maximum redeemable quantity.                |
| minAmount | String | Minimum usable quantity as fromCoin represents the minimum consumable quantity, as toCoin represents the minimum redeemable quantity. |

> **Source:**
> https://www.bitget.com/api-doc/common/convert/Get-Convert-Currencies
