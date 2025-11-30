# POST /v2/auth/w/funding/auto

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-funding-auto-renew](https://docs.bitfinex.com/reference/rest-auth-funding-auto-renew)

post

https://api.bitfinex.com/v2/auth/w/funding/auto

Activate or deactivate auto-renew. Allows you to specify the currency, amount,
rate, and period.

Response array

| Index | Field               | Type                                                | Description                                                                      |
| ----- | ------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| [0]   | MTS                 | int                                                 | Seconds epoch timestamp of notification                                          |
| [1]   | TYPE                | string                                              | Notification's type ("fa-req")                                                   |
| [2]   | MESSAGE_ID          | int                                                 | Unique notification's ID                                                         |
| [4]   | FUNDING_OFFER_ARRAY | [FUNDING_OFFER_ARRAY](#funding-offer-array-index-4) | An array containing data for the funding offer                                   |
| [5]   | CODE                | int                                                 | W.I.P. (work in progress)                                                        |
| [6]   | STATUS              | string                                              | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7]   | TEXT                | string                                              | Additional notification description                                              |

Funding offer array (index 4)

| Index | Field     | Type   | Description                                                               |
| ----- | --------- | ------ | ------------------------------------------------------------------------- |
| [0]   | CURRENCY  | String | Currency (USD, …)                                                         |
| [1]   | PERIOD    | Int    | Period in days                                                            |
| [2]   | RATE      | Float  | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| [3]   | THRESHOLD | Float  | Max amount to be auto-renewed                                             |

**Ratelimit**: 90 req/min

status

int32

required

1 to activate, 0 to deactivate

currency

string

required

Currency for which to enable auto-renew

amount

string

Amount to be auto-renewed (Minimum 50 USD equivalent). Defaultst to the amount
currently provided if omitted.

rate

string

Percentage rate at which to auto-renew. (rate == 0 to renew at FRR). Defaults to
FRR if omitted

period

int32

Period in days. Defaults to 2 if omitted.

{

"status": 1,

"currency": "USD",

"amount": "123.45",

"period": 2

}

'
