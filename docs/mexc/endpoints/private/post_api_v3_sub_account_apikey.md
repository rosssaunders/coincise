# POST /api/v3/sub-account/apiKey

**Source:** https://www.mexc.com/api-docs/spot-v3/subaccount-endpoints#create-an-apikey-for-a-sub-account-for-master-account

> Response

```json
    {        "subAccount": "mexc1",        "note": "1",        "apiKey": "arg13sdfgs",        "secretKey": "nkjwn21973ihi",        "permissions": "SPOT_ACCOUNT_READ",        "ip": "135.181.193",        "creatTime": 1597026383085    }
```

-   POST /api/v3/sub-account/apiKey

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| subAccount | STRING | YES | Sub-account Name |
| note | STRING | YES | APIKey note |
| permissions | STRING | YES | Permission of APIKey:  
SPOT\_ACCOUNT\_READ,  
SPOT\_ACCOUNT\_WRITE,  
SPOT\_DEAL\_READ,  
SPOT\_DEAL\_WRITE,  
CONTRACT\_ACCOUNT\_READ,  
CONTRACT\_ACCOUNT\_WRITE,  
CONTRACT\_DEAL\_READ,  
CONTRACT\_DEAL\_WRITE,  
SPOT\_TRANSFER\_READ,  
SPOT\_TRANSFER\_WRITE |
| ip | STRING | NO | Link IP addresses, separate with commas if more than one. Support up to 20 addresses. |
| recvWindow | LONG | NO |  |
| timestamp | LONG | YES |  |
