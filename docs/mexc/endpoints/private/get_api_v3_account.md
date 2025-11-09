# Account Information

> Response

```
{
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true,
    "updateTime": null,
    "accountType": "SPOT",
    "balances": [{
        "asset": "NBNTEST",
        "free": "1111078",
        "locked": "33"
    }, {
        "asset": "MAIN",
        "free": "1020000",
        "locked": "0"
    }],
    "permissions": ["SPOT"]
}
```

-   **GET** `/api/v3/account`  
    

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 10

Get current account information,rate limit:2 times/s.

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| recvWindow | long | NO |  |
| timestamp | long | YES |  |

Response:

| Name | Description |
| --- | --- |
| canTrade | Can Trade |
| canWithdraw | Can Withdraw |
| canDeposit | Can Deposit |
| updateTime | Update Time |
| accountType | Account type |
| balances | Balance |
| asset | Asset coin |
| free | Available coin |
| locked | Forzen coin |
| permissions | Permission |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#account-information
