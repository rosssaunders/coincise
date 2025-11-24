# DELETE /api/v3/sub-account/apiKey

**Source:** https://www.mexc.com/api-docs/spot-v3/subaccount-endpoints#delete-the-apikey-of-a-sub-account-for-master-account

> Response

```json
  {           "subAccount":"mexc1"}
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
