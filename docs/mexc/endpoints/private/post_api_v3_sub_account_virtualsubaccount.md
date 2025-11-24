# POST / api/v3/sub-account/virtualSubAccount

**Source:** https://www.mexc.com/api-docs/spot-v3/subaccount-endpoints#create-a-sub-accountfor-master-account

Create a sub-account from the master account.

> Response

```json
{    "subAccount":"mexc1",    "note":"1"}
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
