# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

See Python SDK for full featured examples on the fields of the order request.

For limit orders, TIF (time-in-force) sets the behavior of the order upon first
hitting the book.

ALO (add liquidity only, i.e. "post only") will be canceled instead of
immediately matching.

IOC (immediate or cancel) will have the unfilled part canceled instead of
resting.

GTC (good til canceled) orders have no special behavior.

Client Order ID (cloid) is an optional 128 bit hex string, e.g.
`0x1234567890abcdef1234567890abcdef`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                                                                                                                   |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "order", "orders": \[{<br>"a": Number,<br>"b": Boolean,<br>"p": String,<br>"s": String,<br>"r": Boolean,<br>"t": {<br>"limit": {<br>"tif": "Alo" | "Ioc" | "Gtc"<br>} or<br>"trigger": {<br>"isMarket": Boolean,<br>"triggerPx": String,<br>"tpsl": "tp" | "sl"<br>}<br>},<br>"c": Cloid (optional)<br>}\],<br>"grouping": "na" | "normalTpsl" | "positionTpsl",<br>"builder": Optional({"b": "address", "f": Number})<br>} Meaning of keys: a is asset b is isBuy p is price s is size r is reduceOnly t is type c is cloid (client order id) Meaning of keys in optional builder argument: b is the address the should receive the additional fee f is the size of the fee in tenths of a basis point e.g. if f is 10, 1bp of the order notional will be charged to the user and sent to the builder<br> |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                  |
| signature\*<br>  | Object<br> | <br>                                                                                                                                                          |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its Onchain address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br>    |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                                 |

200: OK Successful Response (resting)

200: OK Error Response

```json
{
  "status": "ok",
  "response": {
    "type": "order",
    "data": {
      "statuses": [
        {
          "resting": {
            "oid": 77738308
          }
        }
      ]
    }
  }
}
```

```json
{
  "status": "ok",
  "response": {
    "type": "order",
    "data": {
      "statuses": [
        {
          "error": "Order must have minimum value of $10."
        }
      ]
    }
  }
}
```

```json
{
  "status": "ok",
  "response": {
    "type": "order",
    "data": {
      "statuses": [
        {
          "filled": {
            "totalSz": "0.02",
            "avgPx": "1891.4",
            "oid": 77747314
          }
        }
      ]
    }
  }
}
```
