# POST /v2/auth/r/ext/wallets/transfers/free/count

**Source:**
[https://docs.bitfinex.com/reference/thalex-free-transfer-count](https://docs.bitfinex.com/reference/thalex-free-transfer-count)

post

https://api.bitfinex.com/v2/auth/r/ext/wallets/transfers/free/count

Get information about free transfers and their renewal. Users are eligible for
two free deposits every 24 hours.

Response data

| Key                   | Type    | Description                          |
| --------------------- | ------- | ------------------------------------ | ---- | -------------------------------------------------------------------------------------------- |
| deposits.available    | Integer | Number of free deposits available    |
| deposits.resetsAt     | Integer |                                      | null | Timestamp at which the number of free deposits resets (defaults to null if not available)    |
| withdrawals.available | Integer | Number of free withdrawals available |
| withdrawals.resetsAt  | Integer |                                      | null | Timestamp at which the number of free withdrawals resets (defaults to null if not available) |

Provider

string

required

Specify the provider ('thalex')

{

"Provider": "thalex"

}

'
