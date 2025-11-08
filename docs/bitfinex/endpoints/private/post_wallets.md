# Wallets

# Wallets

post https://api.bitfinex.com/v2/auth/r/wallets

Returns an array of all the current user's wallets.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | WALLET | [Wallet](#wallet-arrays) | Each index contains one of the `n` current user's wallets. |

#### 

Wallet arrays

[](#wallet-arrays)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TYPE | string | Wallet name (exchange, margin, funding) |
| \[1\] | CURRENCY | string | Currency (e.g. USD, BTC, ETH, ...) |
| \[2\] | BALANCE | float | Balance |
| \[3\] | UNSETTLED\_INTEREST | float | Unsettled interest |
| \[4\] | AVAILABLE\_BALANCE | float | Wallet balance available for orders/withdrawal/transfer |
| \[5\] | LAST\_CHANGE | string | Description of the last ledger entry |
| \[6\] | LAST\_CHANGE\_METADATA | JSON | Optional object with details |

* * *

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

Body Params

RAW\_BODY

json

Defaults to {}

{}

Response

# 

200

200

Response body

json

Updated 5 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/wallets \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json' \\

5

     \--data '{}'

RESPONSE

Examples

Choose an example:

application/json

200 - Result

Updated 5 months ago

* * *

---
Section: Wallets
Source: https://docs.bitfinex.com/reference/rest-auth-wallets
Path: /v2/auth/r/wallets
Method: POST
