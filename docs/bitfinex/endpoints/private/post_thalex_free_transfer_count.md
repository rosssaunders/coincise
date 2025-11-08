# Thalex Free Transfer Count

# Thalex Free Transfer Count

post https://api.bitfinex.com/v2/auth/r/ext/wallets/transfers/free/count

Get information about free transfers and their renewal. Users are eligible for two free deposits every 24 hours.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Key | Type | Description |
| --- | --- | --- |
| deposits.available | Integer | Number of free deposits available |
| deposits.resetsAt | Integer || null | Timestamp at which the number of free deposits resets (defaults to null if not available) |
| withdrawals.available | Integer | Number of free withdrawals available |
| withdrawals.resetsAt | Integer || null | Timestamp at which the number of free withdrawals resets (defaults to null if not available) |

Body Params

Provider

string

required

Defaults to thalex

Specify the provider ('thalex')

Responses

# 

200

200

Response body

object

deposits

object

available

integer

Defaults to 0

resetsAt

integer

Defaults to 0

withdrawals

object

available

integer

Defaults to 0

resetsAt

string

# 

500

500

Response body

array

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

     \--url https://api.bitfinex.com/v2/auth/r/ext/wallets/transfers/free/count \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json' \\

5

     \--data '

6

{

7

  "Provider": "thalex"

8

}

9

'

RESPONSE

Examples

Choose an example:

application/json

200 - Result500 - Result

Updated 5 months ago

* * *

---
Section: Thalex Derivatives
Source: https://docs.bitfinex.com/reference/thalex-free-transfer-count
Path: /v2/auth/r/ext/wallets/transfers/free/count
Method: POST
