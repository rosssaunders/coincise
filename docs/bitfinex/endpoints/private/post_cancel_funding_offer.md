# POST /v2/auth/w/funding/offer/cancel

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-cancel-funding-offer](https://docs.bitfinex.com/reference/rest-auth-cancel-funding-offer)

post

https://api.bitfinex.com/v2/auth/w/funding/offer/cancel

Cancels an existing Funding Offer based on the offer ID entered.

> 📘
>
> ###
>
> Offer ID
>
> The offer ID can be retrieved by calling the
> [Funding Offers](/reference#rest-auth-funding-offers) endpoint.

Response data

| Index | Field               | Type                                                | Description                                                                      |
| ----- | ------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| [0]   | MTS                 | int                                                 | Seconds epoch timestamp of notification                                          |
| [1]   | TYPE                | string                                              | Notification's type ("on-req")                                                   |
| [2]   | MESSAGE_ID          | int                                                 | Unique notification's ID                                                         |
| [4]   | FUNDING_OFFER_ARRAY | [FUNDING_OFFER_ARRAY](#funding-offer-array-index-4) | An array containing only the new offer                                           |
| [5]   | CODE                | int                                                 | W.I.P. (work in progress)                                                        |
| [6]   | STATUS              | string                                              | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7]   | TEXT                | string                                              | Additional notification description                                              |

Funding offer array (Index [4])

| Index | Field           | Type    | Description                                                                  |
| ----- | --------------- | ------- | ---------------------------------------------------------------------------- |
| [0]   | ID              | Integer | Offer ID                                                                     |
| [1]   | SYMBOL          | String  | The currency of the offer (fUSD, etc)                                        |
| [2]   | MTS_CREATED     | Int     | Millisecond Time Stamp when the offer was created                            |
| [3]   | MTS_UPDATED     | Int     | Millisecond Time Stamp when the offer was updated                            |
| [4]   | AMOUNT          | Float   | Current amount of the offer                                                  |
| [5]   | AMOUNT_ORIGINAL | Float   | Amount of the initial offer                                                  |
| [6]   | OFFER_TYPE      | String  | Offer Type                                                                   |
| [9]   | FLAGS           | Int     | Flags active on the offer; see https://docs.bitfinex.com/v2/docs/flag-values |
| [10]  | OFFER_STATUS    | String  | Offer Status: ACTIVE, EXECUTED, PARTIALLY FILLED, CANCELED                   |
| [14]  | RATE            | Float   | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01)    |
| [15]  | PERIOD          | Int     | Period of the offer                                                          |
| [16]  | NOTIFY          | Boolean | True / false                                                                 |
| [17]  | HIDDEN          | Int     | 0 if false, 1 if true                                                        |
| [19]  | RENEW           | Boolean | True / false                                                                 |

**Ratelimit**: 90 req/min

id

int64

required

Offer ID
