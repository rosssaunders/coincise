# Delete the APIKey of a sub-account (For Master Account)

> Response

```
  {
           "subAccount":"mexc1"
}
```

-   DELETE /api/v3/sub-account/apiKey  
    

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| subAccount | STRING | YES | Sub-account Name |
| apiKey | STRING | YES | API public key |
| recvWindow | LONG | NO |  |
| timestamp | LONG | YES |  |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#delete-the-apikey-of-a-sub-account-for-master-account
