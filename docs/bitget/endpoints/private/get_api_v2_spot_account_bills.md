# Get Account Bills

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Account Bills

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/bills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/bills" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description           |
| :-------- | :----- | :------- | :-------------------- |
| coin      | String | No       | Token name, e.g. USDT |
| groupType | String | No       | Billing type          |

deposit Deposit  
withdraw Withdraw  
transaction Transaction  
transfer Transfer  
loan Pledge loan  
financial Wealth managemen  
fait Fiat currency  
convert Instant swap  
c2c C2C token trading  
pre_c2c Pre-market trading  
on_chain On-chain transaction  
strategy Trading strategy  
other Other | | businessType | String | No | Business type  
DEPOSIT: Deposit  
WITHDRAW: Withdraw  
BUY: Buy  
SELL: Sell  
DEDUCTION_HANDLING_FEE: Deduction of spot trading transaction fee  
TRANSFER_IN: Transfer-in  
TRANSFER_OUT: Transfer-out  
REBATE_REWARDS: Rebate  
AIRDROP_REWARDS: Airdrop rewards  
USDT_CONTRACT_REWARDS: USDT futures promotion rewards  
MIX_CONTRACT_REWARDS: Mix contract promotion rewards  
SYSTEM_LOCK: System lock-up  
USER_LOCK: User lock-up  
STRATEGY_TRANSFER_IN: Strategy Trading Close Position | | startTime | String |
No | The start time of the billing history, i.e., getting the billing history
after that timestamp  
Unix millisecond timestamp, e.g. 1690196141868 | | endTime | String | No | The
end time of the billing history, i.e., getting the billing history before that
timestamp  
Unix millisecond timestamp, e.g. 1690196141868  
The interval between startTime and endTime must not exceed 90 days. | | limit |
String | No | Number of results returned. Default: 100, maximum 500. | |
idLessThan | String | No | Requests the content on the page before this ID
(older data), the value input should be the billId of the corresponding
interface. |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "cTime": "1622697148",            "coin": "usdt",            "groupType": "deposit",            "businessType": "transfer-in",            "size": "1",            "balance": "1",            "fees": "0",            "billId": "1291"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description   |
| :-------- | :----- | :------------ |
| cTime     | String | Creation time |
| coin      | String | Token name    |
| groupType | String | Billing type  |

deposit Deposit  
withdraw Withdraw  
transaction Transaction  
transfer Transfer  
loan Pledge loan  
financial Wealth managemen  
fait Fiat currency  
convert Instant swap  
c2c C2C token trading  
pre_c2c Pre-market trading  
on_chain On-chain transaction  
strategy Trading strategy  
other Other | | businessType | String | Business type of billing | | size |
String | Quantity | | balance | String | The assets after transfer | | fees |
String | Transaction fees | | billId | String | Billing ID |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Account-Bills
