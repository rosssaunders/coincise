# Generate deposit address (supporting network)

> Request

```
post /api/v3/capital/deposit/address?coin=EOS&network=EOS&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
[
  {
      "coin": "USDT",
      "network": "TRC20",
      "address": "TXobiKkdciupZrhdvZyTSSLjE8CmZAufS",
      "tag": null
  },
  {
     "coin": "EOS",
     "network": "EOS",
     "address": "zzqqqqqqqqqq",
     "memo": "MX10068"
  }
]
```

-   **POST** `/api/v3/capital/deposit/address`  
    

**Permission:** SPOT\_WITHDRAW\_WRITE

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| coin | string | YES | coin |
| network | string | YES | deposit network |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Response:

| Name | Description |
| --- | --- |
| address | deposit address |
| coin | coin |
| memo | memo |
| network | network |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#generate-deposit-address-supporting-network
