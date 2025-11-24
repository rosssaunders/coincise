# GET /api/v3/account

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#account-information

> Response

```json
{    "makerCommission": null,    "takerCommission": null,    "buyerCommission": null,    "sellerCommission": null,    "canTrade": true,    "canWithdraw": true,    "canDeposit": true,    "updateTime": null,    "accountType": "SPOT",    "balances": [{        "asset": "NBNTEST",        "free": "1111078",        "locked": "33",        "available": "1"    }, {        "asset": "MAIN",        "free": "1020000",        "locked": "0",        "available": "102000"    }],    "permissions": ["SPOT"]}
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
| free | Free coin |
| locked | Forzen coin |
| available | Available coin |
| permissions | Permission |
