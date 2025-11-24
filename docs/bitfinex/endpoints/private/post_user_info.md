# POST /v2/auth/r/info/user

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-info-user](https://docs.bitfinex.com/reference/rest-auth-info-user)

post

https://api.bitfinex.com/v2/auth/r/info/user

Retrieve an array of important account data.

Response data

| Index | Field                               | Type             | Description                                                                                                                                          |
| ----- | ----------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [0]   | ID                                  | int              | Account ID                                                                                                                                           |
| [1]   | EMAIL                               | string           | Account Email                                                                                                                                        |
| [2]   | USERNAME                            | string           | Account username                                                                                                                                     |
| [3]   | MTS_ACCOUNT_CREATE                  | int              | Millisecond timestamp of account creation                                                                                                            |
| [4]   | VERIFIED                            | int              | Indicates if the user has a verified status (KYC) 1 = true, 0 = false                                                                                |
| [5]   | VERIFICATION_LEVEL                  | int              | Account verification level                                                                                                                           |
| [7]   | TIMEZONE                            | string           | Account timezone setting                                                                                                                             |
| [8]   | LOCALE                              | string           | Account locale setting                                                                                                                               |
| [9]   | COMPANY                             | string           | Shows where the account is registered. Accounts registered at Bitfinex will show 'bitfinex' and accounts registered at eosfinex will show 'eosfinex' |
| [10]  | EMAIL_VERIFIED                      | int              | 1 if true                                                                                                                                            |
| [12]  | SUBACCOUNT_TYPE                     | TBD              | TBD                                                                                                                                                  |
| [14]  | MTS_MASTER_ACCOUNT_CREATE           | int              | Millisecond timestamp of master account creation                                                                                                     |
| [15]  | GROUP_ID                            | int              | Account group ID                                                                                                                                     |
| [16]  | MASTER_ACCOUNT_ID                   | int              | The ID of the master account, If the account is a sub-account.                                                                                       |
| [17]  | INHERIT_MASTER_ACCOUNT_VERIFICATION | int              | 1 if account inherits verification from master account                                                                                               |
| [18]  | IS_GROUP_MASTER                     | int              | 1 if account is a master account                                                                                                                     |
| [19]  | GROUP_WITHDRAW_ENABLED              | int              | 1 if enabled                                                                                                                                         |
| [21]  | PPT_ENABLED                         | int              | 1 if true (for paper trading accounts)                                                                                                               |
| [22]  | MERCHANT_ENABLED                    | int              | 1 if true (for merchant accounts)                                                                                                                    |
| [23]  | COMPETITION_ENABLED                 | int              | 1 if true (for competition accounts)                                                                                                                 |
| [26]  | 2FA_MODES                           | array of strings | Array of enabled 2FA modes ('u2f', 'otp')                                                                                                            |
| [28]  | IS_SECURITIES_MASTER                | int              | 1 if true (when the account has a securities sub-account)                                                                                            |
| [29]  | SECURITIES_ENABLED                  | int              | 1 if true (for securities accounts)                                                                                                                  |
| [30]  | IS_SECURITIES_INVESTOR_ACCREDITED   | int              | 1 if true (when an account is accredited investor verified)                                                                                          |
| [31]  | IS_SECURITIES_EL_SALVADOR           | int              | 1 if true (if an account is verified for El Salvador securities)                                                                                     |
| [38]  | ALLOW_DISABLE_CTXSWITCH             | int              | Account can disable context switching by master account into this account (1 if true)                                                                |
| [39]  | CTXSWITCH_DISABLED                  | int              | Master account cannot context switch into this account (1 if true)                                                                                   |
| [44]  | TIME_LAST_LOGIN                     | string           | Date and time of last login                                                                                                                          |
| [47]  | VERIFICATION_LEVEL_SUBMITTED        | int              | Level of highest verification application submitted from the account                                                                                 |
| [49]  | COMP_COUNTRIES                      | array            | Array of country codes based on your verification data (residence and nationality)                                                                   |
| [50]  | COMP_COUNTRIES_RESID                | array            | Array of country codes based on your verification data (residence only)                                                                              |
| [51]  | COMPL_ACCOUNT_TYPE                  | string           | Type of verification ("individual" or "corporate")                                                                                                   |
| [54]  | IS_MERCHANT_ENTERPRISE              | int              | 1 if true (when account is enterprise merchant)                                                                                                      |

**Ratelimit**: 90 req/min

Body Params

RAW_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/info/user \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
