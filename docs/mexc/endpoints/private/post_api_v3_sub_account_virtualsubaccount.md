# Create a Sub-account(For Master Account)

Create a sub-account from the master account.

> Response

```
{
    "subAccount":"mexc1",
    "note":"1"
}
```

-   POST / api/v3/sub-account/virtualSubAccount  
    

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| subAccount | STRING | YES | Sub-account Name |
| note | STRING | YES | Sub-account notes |
| recvWindow | LONG | NO |  |
| timestamp | LONG | YES |  |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#create-a-sub-account-for-master-account
