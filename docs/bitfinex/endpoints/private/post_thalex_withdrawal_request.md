# Thalex Withdrawal Request

# Thalex Withdrawal Request

post https://api.bitfinex.com/v2/auth/w/ext/wallets/withdrawals/request

Withdraw from Thalex to Bitfinex

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Key         | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| type        | String  | Specifies the transfer type: "withdrawal" |
| addressDest | String  | Specifies the address for the transaction |
| amount      | String  | Amount of the withdrawal                  |
| ccy         | String  | Currency withdrawn                        |
| createdAt   | Integer | Withdrawal creation timestamp             |
| updatedAt   | Integer | Withdrawal update timestamp               |
| id          | string  | Withdrawal id                             |
| status      | string  | Withdrawal status                         |
| fee         | string  | Fee charged for the withdrawal            |

[](#body-params)Body Params

provider

string

required

Defaults to thalex

Specify the provider ('thalex')

amount

string

required

Amount to withdraw from Thalex to Bitfinex

ccy

string

required

Currency to withdraw from Thalex (allowed values: 'USE', 'ETH', 'BTC')

tfaToken

object

required

Provide a tfaToken object to validate the request with U2F 2FA

tfaToken object

[](#response-schemas)Responses

#

200

200

[](#thalexwithdrawalrequest-object-response-body)Response body

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

[](#thalexwithdrawalrequest-array-response-body)Response body

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

     \--url https://api.bitfinex.com/v2/auth/w/ext/wallets/withdrawals/request \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json' \\

5

     \--data '

6

{

7

"provider": "thalex"

8

}

9

'

Response

Examples

Choose an example:

application/json

200 - Result500 - Result

Updated 5 months ago

---

---

Section: Thalex Derivatives Source:
https://docs.bitfinex.com/reference/thalex-withdrawal-request Path:
/v2/auth/w/ext/wallets/withdrawals/request Method: POST
