# Response Code

### HTTP Status Codes[​](#http-status-codes "Direct link to HTTP Status Codes")

| httpStatus | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| 200        | The request is successful, please check the `rc` and `mc` sections further                            |
| 404        | Interface does not exist                                                                              |
| 429        | The request is too frequent, please control the request rate according to the speed limit requirement |
| 500        | Service exception                                                                                     |
| 502        | Gateway exception                                                                                     |
| 503        | Service unavailable, please try again later                                                           |

---

### Return Code (rc)[​](#return-code-rc "Direct link to Return Code (rc)")

| rc  | Description      |
| --- | ---------------- |
| 0   | Business success |
| 1   | Business failure |

---

### Message Code (mc)[​](#message-code-mc "Direct link to Message Code (mc)")

| mc           | Message                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| SUCCESS      | success                                                                                               |
| FAILURE      | fail                                                                                                  |
| AUTH_001     | Missing request header `validate-appkey`                                                              |
| AUTH_002     | Missing request header `validate-timestamp`                                                           |
| AUTH_003     | Missing request header `validate-recvwindow`                                                          |
| AUTH_004     | Bad request header `validate-recvwindow`                                                              |
| AUTH_005     | Missing request header `validate-algorithms`                                                          |
| AUTH_006     | Bad request header `validate-algorithms`                                                              |
| AUTH_007     | Missing request header `validate-signature`                                                           |
| AUTH_101     | ApiKey does not exist                                                                                 |
| AUTH_102     | ApiKey is not activated                                                                               |
| AUTH_103     | Signature error                                                                                       |
| AUTH_104     | Unbound IP request                                                                                    |
| AUTH_105     | Outdated message                                                                                      |
| AUTH_106     | Exceeded apikey permission                                                                            |
| SYMBOL_001   | Symbol not exist                                                                                      |
| SYMBOL_002   | Symbol offline                                                                                        |
| SYMBOL_003   | Symbol suspend trading                                                                                |
| SYMBOL_004   | Symbol country disallow trading                                                                       |
| SYMBOL_005   | The symbol does not support trading via API                                                           |
| SYMBOL_007   | The trading pair does not support order modification                                                  |
| SYMBOL_010   | This market does not support your trading                                                             |
| SYMBOL_011   | Due to high risk, this trading pair is temporarily restricted. Contact customer service for approval. |
| ORDER_001    | Platform rejection                                                                                    |
| ORDER_002    | Insufficient funds                                                                                    |
| ORDER_003    | Trading pair suspended                                                                                |
| ORDER_004    | No transaction                                                                                        |
| ORDER_005    | Order not exist                                                                                       |
| ORDER_006    | Too many open orders                                                                                  |
| ORDER_007    | The sub-account has no transaction authority                                                          |
| ORDER_008    | The order price or quantity precision is abnormal                                                     |
| ORDER_F0101  | Trigger Price Filter - Min                                                                            |
| ORDER_F0102  | Trigger Price Filter - Max                                                                            |
| ORDER_F0103  | Trigger Price Filter - Step Value                                                                     |
| ORDER_F0201  | Trigger Quantity Filter - Min                                                                         |
| ORDER_F0202  | Trigger Quantity Filter - Max                                                                         |
| ORDER_F0203  | Trigger Quantity Filter - Step Value                                                                  |
| ORDER_F0301  | Trigger QUOTE_QTY Filter - Min Value                                                                  |
| ORDER_F0401  | Trigger PROTECTION_ONLINE Filter or PROTECTION_LIMIT Filter                                           |
| ORDER_F0501  | Trigger PROTECTION_LIMIT Filter - Buy Max Deviation                                                   |
| ORDER_F0502  | Trigger PROTECTION_LIMIT Filter - Sell Max Deviation                                                  |
| ORDER_F0503  | Trigger PROTECTION_LIMIT Filter - Buy Limit Coefficient                                               |
| ORDER_F0504  | Trigger PROTECTION_LIMIT Filter - Sell Limit Coefficient                                              |
| ORDER_F0601  | Trigger PROTECTION_MARKET Filter                                                                      |
| ORDER_F0704  | Liquidation price limit for leveraged limit orders                                                    |
| COMMON_001   | The user does not exist                                                                               |
| COMMON_002   | System busy, please try it later                                                                      |
| COMMON_003   | Operation failed, please try it later                                                                 |
| CURRENCY_001 | Currency information is abnormal                                                                      |
| DEPOSIT_001  | Deposit is not open                                                                                   |
| DEPOSIT_002  | Security level low, bind 2FA (phone/email/Google) before deposit                                      |
| DEPOSIT_003  | Incorrect address format                                                                              |
| DEPOSIT_004  | Address already exists                                                                                |
| DEPOSIT_005  | Cannot find offline wallet address                                                                    |
| DEPOSIT_006  | No deposit address, try later                                                                         |
| DEPOSIT_007  | Address is being generated                                                                            |
| DEPOSIT_008  | Deposit not available                                                                                 |
| WITHDRAW_001 | Withdraw is not open                                                                                  |
| WITHDRAW_002 | Invalid withdrawal address                                                                            |
| WITHDRAW_003 | Security level low, bind 2FA before withdraw                                                          |
| WITHDRAW_004 | Withdrawal address not added                                                                          |
| WITHDRAW_005 | Withdrawal address cannot be empty                                                                    |
| WITHDRAW_006 | Memo cannot be empty                                                                                  |
| WITHDRAW_008 | Risk control triggered, withdrawal not supported                                                      |
| WITHDRAW_009 | Withdraw failed, restricted by T+1 rule                                                               |
| WITHDRAW_010 | Invalid withdrawal precision                                                                          |
| WITHDRAW_011 | Insufficient free balance                                                                             |
| WITHDRAW_012 | Exceeded daily withdrawal limit                                                                       |
| WITHDRAW_013 | Exceeded daily withdrawal limit, upgrade KYC for more                                                 |
| WITHDRAW_014 | Address cannot be used in internal transfer                                                           |
| WITHDRAW_015 | Amount not enough for fee                                                                             |
| WITHDRAW_016 | Withdrawal address already exists                                                                     |
| WITHDRAW_017 | Withdrawal processed, cannot cancel                                                                   |
| WITHDRAW_018 | Memo must be a number                                                                                 |
| WITHDRAW_019 | Memo incorrect                                                                                        |
| WITHDRAW_020 | Reached daily withdrawal cap                                                                          |
| WITHDRAW_021 | Withdrawal limited, max 0 this time                                                                   |
| WITHDRAW_022 | Must be greater than 0                                                                                |
| WITHDRAW_023 | Must be less than 0                                                                                   |
| WITHDRAW_024 | Withdraw not supported                                                                                |
| WITHDRAW_025 | Please create FIO address on deposit page                                                             |
| FUND_001     | Duplicate request (bizId can only be requested once)                                                  |
| FUND_002     | Insufficient account balance                                                                          |
| FUND_003     | Transfer not supported                                                                                |
| FUND_004     | Unfreeze failed                                                                                       |
| FUND_005     | Transfer prohibited                                                                                   |
| FUND_014     | Transfer-in and transfer-out account IDs cannot be the same                                           |
| FUND_015     | From and to business types cannot be the same                                                         |
| FUND_016     | Leverage transfer requires symbol                                                                     |
| FUND_017     | Parameter error                                                                                       |
| FUND_018     | Invalid freeze record                                                                                 |
| FUND_019     | Freeze users not equal                                                                                |
| FUND_020     | Freeze currency not equal                                                                             |
| FUND_021     | Operation not supported                                                                               |
| FUND_022     | Freeze record not exist                                                                               |
| FUND_044     | Amount length max 113                                                                                 |
| SYMBOL_001   | Symbol not exist                                                                                      |
| TRANSFER_001 | Duplicate request (bizId can only be requested once)                                                  |
| TRANSFER_002 | Insufficient balance                                                                                  |
| TRANSFER_003 | User not registered                                                                                   |
| TRANSFER_004 | Currency not transferable                                                                             |
| TRANSFER_005 | User's currency not transferable                                                                      |
| TRANSFER_006 | Transfer prohibited                                                                                   |
| TRANSFER_007 | Request timed out                                                                                     |
| TRANSFER_008 | Abnormal transfer to leveraged account                                                                |
| TRANSFER_009 | Abnormal transfer from leveraged account                                                              |
| TRANSFER_010 | Leverage cleared, transfer prohibited                                                                 |
| TRANSFER_011 | Leverage with borrowing, transfer prohibited                                                          |
| TRANSFER_012 | Currency transfer prohibited                                                                          |
| GATEWAY_0001 | Trigger risk control                                                                                  |
| GATEWAY_0002 | Trigger risk control                                                                                  |
| GATEWAY_0003 | Trigger risk control                                                                                  |
| GATEWAY_0004 | Trigger risk control                                                                                  |

[Edit this
page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Access
Description/errorCode.mdx)
