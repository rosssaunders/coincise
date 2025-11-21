# Wallets

post

https://api.bitfinex.com/v2/auth/r/wallets

Returns an array of all the current user's wallets.

Response data

| Index   | Field  | Type                     | Description                                                |
| ------- | ------ | ------------------------ | ---------------------------------------------------------- |
| [0...n] | WALLET | [Wallet](#wallet-arrays) | Each index contains one of the `n` current user's wallets. |

Wallet arrays

| Index | Field                | Type   | Description                                             |
| ----- | -------------------- | ------ | ------------------------------------------------------- |
| [0]   | TYPE                 | string | Wallet name (exchange, margin, funding)                 |
| [1]   | CURRENCY             | string | Currency (e.g. USD, BTC, ETH, ...)                      |
| [2]   | BALANCE              | float  | Balance                                                 |
| [3]   | UNSETTLED_INTEREST   | float  | Unsettled interest                                      |
| [4]   | AVAILABLE_BALANCE    | float  | Wallet balance available for orders/withdrawal/transfer |
| [5]   | LAST_CHANGE          | string | Description of the last ledger entry                    |
| [6]   | LAST_CHANGE_METADATA | JSON   | Optional object with details                            |

---

<table><tbody><tr><td>Rate Limit:</td><td>90 reqs/min (requests per minute)</td></tr></tbody></table>

Body Params

RAW_BODY

json

Defaults to {}

{}

Response

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/wallets \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json' \\

     \--data '{}'

---

Section: Wallets Source: https://docs.bitfinex.com/reference/rest-auth-wallets
Path: /v2/auth/r/wallets Method: POST
