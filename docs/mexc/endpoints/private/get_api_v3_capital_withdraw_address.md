# Withdraw Address (supporting network)

> Request

```
get /api/v3/capital/withdraw/address?coin=USDT&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
{
    "data": [
        {
            "coin": "USDT",
            "network": "TRC20",
            "address": "TArGWdTApuuZtiWMjupXqbZqQYsBTy126o",
            "addressTag": "test",
            "memo": null
        },
        {
            "coin": "USDT",
            "network": "BEP20(BSC)",
            "address": "0xa82898C70BeB5E1b1621fdA62fD17Ba27227BBC5",
            "addressTag": "usdt",
            "memo": null
        }
    ],
    "totalRecords": 2,
    "page": 1,
    "totalPageNum": 1
}
```

-   **GET** `/api/v3/capital/withdraw/address`  
    

**Permission:** SPOT\_WITHDRAW\_R

**Weight(IP):** 10

**Request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| coin | string | No | coin |
| page | number | No | page,default 1 |
| limit | number | No | limit for per page |
| timestamp | string | Yes | timestamp |
| signature | string | Yes | signature |

**Response**

| Name | Description |
| --- | --- |
| coin | coin |
| network | network |
| address | address |
| addressTag | addressTag |
| memo | memo |
| totalRecords | totalRecords |
| totalPageNum | totalPageNum |
| page | page |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#withdraw-address-supporting-network
