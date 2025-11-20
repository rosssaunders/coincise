# Thalex Deposit Request

# Thalex Deposit Request

post https://api.bitfinex.com/v2/auth/w/ext/wallets/deposits/request

Deposit to Thalex from Bitfinex

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Key         | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| type        | String  | Specifies the transfer type: "deposit"    |
| addressDest | String  | Specifies the address for the transaction |
| amount      | String  | Amount of the deposit                     |
| ccy         | String  | Currency deposited                        |
| createdAt   | Integer | Deposit creation timestamp                |
| updatedAt   | Integer | Deposit update timestamp                  |
| id          | string  | Deposit id                                |
| status      | string  | Deposit status                            |
| fee         | string  | Fee charged for the deposit               |

[](#body-params)Body Params

provider

string

required

Specify the destination (Possible value: 'thalex')

amount

string

required

Amount to deposit from Bitfinex to Thalex

ccy

string

required

Currency to deposit to Thalex (allowed values: 'USE', 'ETH', 'BTC')

tfaToken

object

required

Provide a tfaToken object to validate the request with U2F 2FA

tfaToken object

[](#response-schemas)Responses

#

200

200

[](#thalexdepositrequest-object-response-body)Response body

object

type

string

addressDest

string

amount

string

ccy

string

createdAt

integer

Defaults to 0

updatedAt

integer

Defaults to 0

id

string

status

string

fee

string

#

500

500

[](#thalexdepositrequest-array-response-body)Response body

array

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/ext/wallets/deposits/request \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json'

Response

Examples

Choose an example:

application/json

200 - Result500 - Result

Updated 5 months ago

---

---

Section: Thalex Derivatives Source:
https://docs.bitfinex.com/reference/thalex-deposit-request Path:
/v2/auth/w/ext/wallets/deposits/request Method: POST
