# GET /api/v3/capital/deposit/address

**Source:** https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#deposit-address-supporting-network

> Request

```bash
get /api/v3/capital/deposit/address?coin=USDT&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
[  {      "coin": "USDT",      "network": "TRC20",      "address": "TXobiKkdciupZrhdvZyTSSLjE8CmZAufS",      "memo": null  },  {      "coin": "USDT",      "network": "BEP20(BSC)",      "address": "0xebe4804f7ecc22d5011c42e6ea1f2e6c891d89b",      "memo": null  },  {      "coin": "USDT",      "network": "ERC20",      "address": "0x3f4d1f43761b52fd594e5a77cd83cab6955e85b",      "memo": null  }]
```

-   **GET** `/api/v3/capital/deposit/address`

**Permission:** SPOT\_WITHDRAW\_READ

**Weight(IP):** 10

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| coin | string | YES | coin |
| network | string | NO | deposit network |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Response:

| Name | Description |
| --- | --- |
| address | deposit address |
| coin | coin |
| memo | memo |
| network | network |
