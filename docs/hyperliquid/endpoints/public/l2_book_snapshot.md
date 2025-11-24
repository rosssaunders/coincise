# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Returns at most 20 levels per side

**Headers**

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | "application/json"<br> |

**Body**

| Name         | Type       | Description                                                                                                                                   |
| ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| type\*<br>   | String<br> | "l2Book"<br>                                                                                                                                  |
| coin\*<br>   | String<br> | coin<br>                                                                                                                                      |
| nSigFigs<br> | Number<br> | Optional field to aggregate levels to `nSigFigs` significant figures. Valid values are 2, 3, 4, 5, and `null`, which means full precision<br> |
| mantissa<br> | Number<br> | Optional field to aggregate levels. This field is only allowed if nSigFigs is 5. Accepts values of 1, 2 or 5.<br>                             |

**Response**

200: OK

```json
{
  "coin": "BTC",
  "time": 1754450974231,
  "levels": [
    [
      {
        "px": "113377.0",
        "sz": "7.6699",
        "n": 17 // number of levels
      },
      {
        "px": "113376.0",
        "sz": "4.13714",
        "n": 8
      }
    ],
    [
      {
        "px": "113397.0",
        "sz": "0.11543",
        "n": 3
      }
    ]
  ]
}
```
