# POST /v2/auth/r/info/user

**Source:** [https://docs.bitfinex.com/reference/rest-auth-info-user](https://docs.bitfinex.com/reference/rest-auth-info-user)

post

https://api.bitfinex.com/v2/auth/r/info/user

Retrieve an array of important account data.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | int | Account ID |
| [1] | EMAIL | string | Account Email |
| [2] | USERNAME | string | Account username |
| [3] | MTS\_ACCOUNT\_CREATE | int | Millisecond timestamp of account creation |
| [4] | VERIFIED | int | Indicates if the user has a verified status (KYC) 1 = true, 0 = false |
| [5] | VERIFICATION\_LEVEL | int | Account verification level |
| [7] | TIMEZONE | string | Account timezone setting |
| [8] | LOCALE | string | Account locale setting |
| [9] | COMPANY | string | Shows where the account is registered. Accounts registered at Bitfinex will show 'bitfinex' and accounts registered at eosfinex will show 'eosfinex' |
| [10] | EMAIL\_VERIFIED | int | 1 if true |
| [12] | SUBACCOUNT\_TYPE | TBD | TBD |
| [14] | MTS\_MASTER\_ACCOUNT\_CREATE | int | Millisecond timestamp of master account creation |
| [15] | GROUP\_ID | int | Account group ID |
| [16] | MASTER\_ACCOUNT\_ID | int | The ID of the master account, If the account is a sub-account. |
| [17] | INHERIT\_MASTER\_ACCOUNT\_VERIFICATION | int | 1 if account inherits verification from master account |
| [18] | IS\_GROUP\_MASTER | int | 1 if account is a master account |
| [19] | GROUP\_WITHDRAW\_ENABLED | int | 1 if enabled |
| [21] | PPT\_ENABLED | int | 1 if true (for paper trading accounts) |
| [22] | MERCHANT\_ENABLED | int | 1 if true (for merchant accounts) |
| [23] | COMPETITION\_ENABLED | int | 1 if true (for competition accounts) |
| [26] | 2FA\_MODES | array of strings | Array of enabled 2FA modes ('u2f', 'otp') |
| [28] | IS\_SECURITIES\_MASTER | int | 1 if true (when the account has a securities sub-account) |
| [29] | SECURITIES\_ENABLED | int | 1 if true (for securities accounts) |
| [30] | IS\_SECURITIES\_INVESTOR\_ACCREDITED | int | 1 if true (when an account is accredited investor verified) |
| [31] | IS\_SECURITIES\_EL\_SALVADOR | int | 1 if true (if an account is verified for El Salvador securities) |
| [38] | ALLOW\_DISABLE\_CTXSWITCH | int | Account can disable context switching by master account into this account (1 if true) |
| [39] | CTXSWITCH\_DISABLED | int | Master account cannot context switch into this account (1 if true) |
| [44] | TIME\_LAST\_LOGIN | string | Date and time of last login |
| [47] | VERIFICATION\_LEVEL\_SUBMITTED | int | Level of highest verification application submitted from the account |
| [49] | COMP\_COUNTRIES | array | Array of country codes based on your verification data (residence and nationality) |
| [50] | COMP\_COUNTRIES\_RESID | array | Array of country codes based on your verification data (residence only) |
| [51] | COMPL\_ACCOUNT\_TYPE | string | Type of verification ("individual" or "corporate") |
| [54] | IS\_MERCHANT\_ENTERPRISE | int | 1 if true (when account is enterprise merchant) |

**Ratelimit**: 90 req/min

Body Params

RAW\_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/info/user \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
