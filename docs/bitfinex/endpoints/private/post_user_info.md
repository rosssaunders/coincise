# User Info

# User Info

post https://api.bitfinex.com/v2/auth/r/info/user

Retrieve an array of important account data.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index | Field              | Type   | Description                                                           |
| ----- | ------------------ | ------ | --------------------------------------------------------------------- |
| \[0\] | ID                 | int    | Account ID                                                            |
| \[1\] | EMAIL              | string | Account Email                                                         |
| \[2\] | USERNAME           | string | Account username                                                      |
| \[3\] | MTS_ACCOUNT_CREATE | int    | Millisecond timestamp of account creation                             |
| \[4\] | VERIFIED           | int    | Indicates if the user has a verified status (KYC) 1 = true, 0 = false |
| \[5\] | VERIFICATION_LEVEL | int    | Account verification level                                            |

| \[ . . . \]

| | \[7\] | TIMEZONE | string | Account timezone setting | | \[8\] | LOCALE |
string | Account locale setting | | \[9\] | COMPANY | string | Shows where the
account is registered. Accounts registered at Bitfinex will show 'bitfinex' and
accounts registered at eosfinex will show 'eosfinex' | | \[10\] | EMAIL_VERIFIED
| int | 1 if true | |

\[ . . . \]

| | \[12\] | SUBACCOUNT_TYPE | TBD | TBD | |

\[ . . . \]

| | \[14\] | MTS_MASTER_ACCOUNT_CREATE | int | Millisecond timestamp of master
account creation | | \[15\] | GROUP_ID | int | Account group ID | | \[16\] |
MASTER_ACCOUNT_ID | int | The ID of the master account, If the account is a
sub-account. | | \[17\] | INHERIT_MASTER_ACCOUNT_VERIFICATION | int | 1 if
account inherits verification from master account | | \[18\] | IS_GROUP_MASTER |
int | 1 if account is a master account | | \[19\] | GROUP_WITHDRAW_ENABLED | int
| 1 if enabled | |

\[ . . . \]

| | \[21\] | PPT_ENABLED | int | 1 if true (for paper trading accounts) | |
\[22\] | MERCHANT_ENABLED | int | 1 if true (for merchant accounts) | | \[23\] |
COMPETITION_ENABLED | int | 1 if true (for competition accounts) | |

\[ . . . \]

| | \[26\] | 2FA_MODES | array of strings | Array of enabled 2FA modes ('u2f',
'otp') | |

\[ . . . \]

| | \[28\] | IS_SECURITIES_MASTER | int | 1 if true (when the account has a
securities sub-account) | | \[29\] | SECURITIES_ENABLED | int | 1 if true (for
securities accounts) | | \[30\] | IS_SECURITIES_INVESTOR_ACCREDITED | int | 1 if
true (when an account is accredited investor verified) | | \[31\] |
IS_SECURITIES_EL_SALVADOR | int | 1 if true (if an account is verified for El
Salvador securities) | |

\[ . . . \]

| | \[38\] | ALLOW_DISABLE_CTXSWITCH | int | Account can disable context
switching by master account into this account (1 if true) | | \[39\] |
CTXSWITCH_DISABLED | int | Master account cannot context switch into this
account (1 if true) | |

\[ . . . \]

| | \[44\] | TIME_LAST_LOGIN | string | Date and time of last login | |

\[ . . . \]

| | \[47\] | VERIFICATION_LEVEL_SUBMITTED | int | Level of highest verification
application submitted from the account | |

\[ . . . \]

| | \[49\] | COMP_COUNTRIES | array | Array of country codes based on your
verification data (residence and nationality) | | \[50\] | COMP_COUNTRIES_RESID
| array | Array of country codes based on your verification data (residence
only) | | \[51\] | COMPL_ACCOUNT_TYPE | string | Type of verification
("individual" or "corporate") | |

\[ . . . \]

| | \[54\] | IS_MERCHANT_ENTERPRISE | int | 1 if true (when account is
enterprise merchant) |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

[](#body-params)Body Params

RAW_BODY

json

Defaults to {}

{}

[](#response-schemas)Responses

#

200

200

[](#restauthinfouser-array-response-body)Response body

array

#

400

400

[](#restauthinfouser-object-response-body)Response body

object

Updated 2 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/info/user \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 2 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-info-user Path:
/v2/auth/r/info/user Method: POST
