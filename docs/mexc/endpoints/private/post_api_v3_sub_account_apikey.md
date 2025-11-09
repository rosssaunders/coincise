# Create an APIKey for a sub-account (For Master Account)

> Response

```
    {
        "subAccount": "mexc1",
        "note": "1",
        "apiKey": "arg13sdfgs",
        "secretKey": "nkjwn21973ihi",
        "permissions": "SPOT_ACCOUNT_READ",
        "ip": "135.181.193",
        "creatTime": 1597026383085
    }
```

- POST /api/v3/sub-account/apiKey

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

Parameters:

| Name        | Type   | Mandatory | Description           |
| ----------- | ------ | --------- | --------------------- |
| subAccount  | STRING | YES       | Sub-account Name      |
| note        | STRING | YES       | APIKey note           |
| permissions | STRING | YES       | Permission of APIKey: |

SPOT_ACCOUNT_READ,  
SPOT_ACCOUNT_WRITE,  
SPOT_DEAL_READ,  
SPOT_DEAL_WRITE,  
CONTRACT_ACCOUNT_READ,  
CONTRACT_ACCOUNT_WRITE,  
CONTRACT_DEAL_READ,  
CONTRACT_DEAL_WRITE,  
SPOT_TRANSFER_READ,  
SPOT_TRANSFER_WRITE | | ip | STRING | NO | Link IP addresses, separate with
commas if more than one. Support up to 20 addresses. | | recvWindow | LONG | NO
| | | timestamp | LONG | YES | |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#create-an-apikey-for-a-sub-account-for-master-account
