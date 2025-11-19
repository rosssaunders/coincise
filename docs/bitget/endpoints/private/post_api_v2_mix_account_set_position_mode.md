# Change Position Mode

Frequency limit: 5 times/1s (uid)

### Description[​](#description "Direct link to Description")

Adjust the position mode between 'one way mode' and 'hedge mode'

  
If you want to change the user's position mode on all symbol contracts, you need to specify hedge mode positions or one-way positions.  
Note: The position mode can't be adjusted when there is an open position order under the product type. Changes the user's position mode for all symbol futures: hedging mode or one-way mode.When users hold positions or orders on any side of any trading pair in the specific product type, the request may fail.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/mix/account/set-position-mode

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/account/set-position-mode" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"productType": "USDT-FUTURES","posMode": "one_way_mode"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| posMode | String | Yes | Position mode  
one\_way\_mode: one-way mode  
hedge\_mode: hedge mode |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "data": {
    "posMode": "one_way_mode"
  },
  "requestTime": 1627293445916
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| posMode | String | Position mode  
one\_way\_mode: one-way mode  
hedge\_mode: hedge mode |

> **Source:** https://www.bitget.com/api-doc/contract/account/Change-Hold-Mode
