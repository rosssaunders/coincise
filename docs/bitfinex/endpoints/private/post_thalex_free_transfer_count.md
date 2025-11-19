# Thalex Free Transfer Count

post https://api.bitfinex.com/v2/auth/r/ext/wallets/transfers/free/count

Get information about free transfers and their renewal. Users are eligible for two free deposits every 24 hours.

Response data

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

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/ext/wallets/transfers/free/count \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json' \\

     \--data '

{

  "Provider": "thalex"

}

'

---
Section: Thalex Derivatives
Source: https://docs.bitfinex.com/reference/thalex-free-transfer-count
Path: /v2/auth/r/ext/wallets/transfers/free/count
Method: POST
