# Futures Account Balance (USER_DATA)

### API Description

Check futures account balance

### HTTP Request

GET `/dapi/v1/balance`

### Request Weight

**1**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
[
  {
    "accountAlias": "SgsR", // unique account code
    "asset": "BTC",
    "balance": "0.00250000",
    "withdrawAvailable": "0.00250000",
    "crossWalletBalance": "0.00241969",
    "crossUnPnl": "0.00000000",
    "availableBalance": "0.00241969",
    "updateTime": 1592468353979
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/Futures-Account-Balance](https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/Futures-Account-Balance)
