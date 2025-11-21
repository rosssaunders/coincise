# Thalex Withdrawal Request

post

https://api.bitfinex.com/v2/auth/w/ext/wallets/withdrawals/request

Withdraw from Thalex to Bitfinex

Response data

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

Body Params

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

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/ext/wallets/withdrawals/request \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json' \\

     \--data '

{

"provider": "thalex"

}

'

---

Section: Thalex Derivatives Source:
https://docs.bitfinex.com/reference/thalex-withdrawal-request Path:
/v2/auth/w/ext/wallets/withdrawals/request Method: POST
