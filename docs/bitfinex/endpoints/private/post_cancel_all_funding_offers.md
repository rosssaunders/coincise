# POST /v2/auth/w/funding/offer/cancel/all

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-cancel-all-funding-offers](https://docs.bitfinex.com/reference/rest-auth-cancel-all-funding-offers)

post

https://api.bitfinex.com/v2/auth/w/funding/offer/cancel/all

Cancel all of your current funding offers. Can also be used to only cancel
offers in the specified currency.

> 📘
>
> ###
>
> Currency
>
> Specifying a currency is optional. If the currency param is omitted, all open
> offers will be cancelled.

**Response data**

| Index | Field  | Type   | Description                                                                      |
| ----- | ------ | ------ | -------------------------------------------------------------------------------- |
| [0]   | MTS    | Int    | Millisecond Time Stamp of the update                                             |
| [1]   | TYPE   | String | Purpose of notification ('foc_all-req' (funding offer cancel all request))       |
| [6]   | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7]   | TEXT   | String | Text of the notification                                                         |

**Ratelimit**: 90 req/min

currency

string

Currency for which to cancel all offers (USD, BTC, UST ...)
