# Response Code

### HTTP Status Codes[​](#http-status-codes "Direct link to HTTP Status Codes")

| httpStatus | Description |
| --- | --- |
| 200 | The request is successful, please check the `rc` and `mc` sections further |
| 404 | Interface does not exist |
| 429 | The request is too frequent, please control the request rate according to the speed limit requirement |
| 500 | Service exception |
| 502 | Gateway exception |
| 503 | Service unavailable, please try again later |

* * *

### Return Code (rc)[​](#return-code-rc "Direct link to Return Code (rc)")

| rc | Description |
| --- | --- |
| 0 | Business success |
| 1 | Business failure |

* * *

### Message Code (mc)[​](#message-code-mc "Direct link to Message Code (mc)")

| mc | Message |
| --- | --- |
| SUCCESS | success |
| FAILURE | fail |
| AUTH\_001 | Missing request header `validate-appkey` |
| AUTH\_002 | Missing request header `validate-timestamp` |
| AUTH\_003 | Missing request header `validate-recvwindow` |
| AUTH\_004 | Bad request header `validate-recvwindow` |
| AUTH\_005 | Missing request header `validate-algorithms` |
| AUTH\_006 | Bad request header `validate-algorithms` |
| AUTH\_007 | Missing request header `validate-signature` |
| AUTH\_101 | ApiKey does not exist |
| AUTH\_102 | ApiKey is not activated |
| AUTH\_103 | Signature error |
| AUTH\_104 | Unbound IP request |
| AUTH\_105 | Outdated message |
| AUTH\_106 | Exceeded apikey permission |
| SYMBOL\_001 | Symbol not exist |
| SYMBOL\_002 | Symbol offline |
| SYMBOL\_003 | Symbol suspend trading |
| SYMBOL\_004 | Symbol country disallow trading |
| SYMBOL\_005 | The symbol does not support trading via API |
| SYMBOL\_007 | The trading pair does not support order modification |
| SYMBOL\_010 | This market does not support your trading |
| SYMBOL\_011 | Due to high risk, this trading pair is temporarily restricted. Contact customer service for approval. |
| ORDER\_001 | Platform rejection |
| ORDER\_002 | Insufficient funds |
| ORDER\_003 | Trading pair suspended |
| ORDER\_004 | No transaction |
| ORDER\_005 | Order not exist |
| ORDER\_006 | Too many open orders |
| ORDER\_007 | The sub-account has no transaction authority |
| ORDER\_008 | The order price or quantity precision is abnormal |
| ORDER\_F0101 | Trigger Price Filter - Min |
| ORDER\_F0102 | Trigger Price Filter - Max |
| ORDER\_F0103 | Trigger Price Filter - Step Value |
| ORDER\_F0201 | Trigger Quantity Filter - Min |
| ORDER\_F0202 | Trigger Quantity Filter - Max |
| ORDER\_F0203 | Trigger Quantity Filter - Step Value |
| ORDER\_F0301 | Trigger QUOTE\_QTY Filter - Min Value |
| ORDER\_F0401 | Trigger PROTECTION\_ONLINE Filter or PROTECTION\_LIMIT Filter |
| ORDER\_F0501 | Trigger PROTECTION\_LIMIT Filter - Buy Max Deviation |
| ORDER\_F0502 | Trigger PROTECTION\_LIMIT Filter - Sell Max Deviation |
| ORDER\_F0503 | Trigger PROTECTION\_LIMIT Filter - Buy Limit Coefficient |
| ORDER\_F0504 | Trigger PROTECTION\_LIMIT Filter - Sell Limit Coefficient |
| ORDER\_F0601 | Trigger PROTECTION\_MARKET Filter |
| ORDER\_F0704 | Liquidation price limit for leveraged limit orders |
| COMMON\_001 | The user does not exist |
| COMMON\_002 | System busy, please try it later |
| COMMON\_003 | Operation failed, please try it later |
| CURRENCY\_001 | Currency information is abnormal |
| DEPOSIT\_001 | Deposit is not open |
| DEPOSIT\_002 | Security level low, bind 2FA (phone/email/Google) before deposit |
| DEPOSIT\_003 | Incorrect address format |
| DEPOSIT\_004 | Address already exists |
| DEPOSIT\_005 | Cannot find offline wallet address |
| DEPOSIT\_006 | No deposit address, try later |
| DEPOSIT\_007 | Address is being generated |
| DEPOSIT\_008 | Deposit not available |
| WITHDRAW\_001 | Withdraw is not open |
| WITHDRAW\_002 | Invalid withdrawal address |
| WITHDRAW\_003 | Security level low, bind 2FA before withdraw |
| WITHDRAW\_004 | Withdrawal address not added |
| WITHDRAW\_005 | Withdrawal address cannot be empty |
| WITHDRAW\_006 | Memo cannot be empty |
| WITHDRAW\_008 | Risk control triggered, withdrawal not supported |
| WITHDRAW\_009 | Withdraw failed, restricted by T+1 rule |
| WITHDRAW\_010 | Invalid withdrawal precision |
| WITHDRAW\_011 | Insufficient free balance |
| WITHDRAW\_012 | Exceeded daily withdrawal limit |
| WITHDRAW\_013 | Exceeded daily withdrawal limit, upgrade KYC for more |
| WITHDRAW\_014 | Address cannot be used in internal transfer |
| WITHDRAW\_015 | Amount not enough for fee |
| WITHDRAW\_016 | Withdrawal address already exists |
| WITHDRAW\_017 | Withdrawal processed, cannot cancel |
| WITHDRAW\_018 | Memo must be a number |
| WITHDRAW\_019 | Memo incorrect |
| WITHDRAW\_020 | Reached daily withdrawal cap |
| WITHDRAW\_021 | Withdrawal limited, max 0 this time |
| WITHDRAW\_022 | Must be greater than 0 |
| WITHDRAW\_023 | Must be less than 0 |
| WITHDRAW\_024 | Withdraw not supported |
| WITHDRAW\_025 | Please create FIO address on deposit page |
| FUND\_001 | Duplicate request (bizId can only be requested once) |
| FUND\_002 | Insufficient account balance |
| FUND\_003 | Transfer not supported |
| FUND\_004 | Unfreeze failed |
| FUND\_005 | Transfer prohibited |
| FUND\_014 | Transfer-in and transfer-out account IDs cannot be the same |
| FUND\_015 | From and to business types cannot be the same |
| FUND\_016 | Leverage transfer requires symbol |
| FUND\_017 | Parameter error |
| FUND\_018 | Invalid freeze record |
| FUND\_019 | Freeze users not equal |
| FUND\_020 | Freeze currency not equal |
| FUND\_021 | Operation not supported |
| FUND\_022 | Freeze record not exist |
| FUND\_044 | Amount length max 113 |
| SYMBOL\_001 | Symbol not exist |
| TRANSFER\_001 | Duplicate request (bizId can only be requested once) |
| TRANSFER\_002 | Insufficient balance |
| TRANSFER\_003 | User not registered |
| TRANSFER\_004 | Currency not transferable |
| TRANSFER\_005 | User's currency not transferable |
| TRANSFER\_006 | Transfer prohibited |
| TRANSFER\_007 | Request timed out |
| TRANSFER\_008 | Abnormal transfer to leveraged account |
| TRANSFER\_009 | Abnormal transfer from leveraged account |
| TRANSFER\_010 | Leverage cleared, transfer prohibited |
| TRANSFER\_011 | Leverage with borrowing, transfer prohibited |
| TRANSFER\_012 | Currency transfer prohibited |
| GATEWAY\_0001 | Trigger risk control |
| GATEWAY\_0002 | Trigger risk control |
| GATEWAY\_0003 | Trigger risk control |
| GATEWAY\_0004 | Trigger risk control |

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Access Description/errorCode.mdx)