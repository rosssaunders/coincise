# Thalex Deposit Request

post https://api.bitfinex.com/v2/auth/w/ext/wallets/deposits/request

Deposit to Thalex from Bitfinex

Response data

| Key | Type | Description |
| --- | --- | --- |
| type | String | Specifies the transfer type: "deposit" |
| addressDest | String | Specifies the address for the transaction |
| amount | String | Amount of the deposit |
| ccy | String | Currency deposited |
| createdAt | Integer | Deposit creation timestamp |
| updatedAt | Integer | Deposit update timestamp |
| id | string | Deposit id |
| status | string | Deposit status |
| fee | string | Fee charged for the deposit |

Body Params

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

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/ext/wallets/deposits/request \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json'

---
Section: Thalex Derivatives
Source: https://docs.bitfinex.com/reference/thalex-deposit-request
Path: /v2/auth/w/ext/wallets/deposits/request
Method: POST
