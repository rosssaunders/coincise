# POST /v2/auth/r/positions/hist

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-positions-hist](https://docs.bitfinex.com/reference/rest-auth-positions-hist)

post

https://api.bitfinex.com/v2/auth/r/positions/hist

Returns data on past positions. Timestamps can be used to retrieve results for a
specific time period.

Response data

| Index   | Field                  | Type                                                              | Description                                                                |
| ------- | ---------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [0...n] | POSITION_HISTORY_ARRAY | [Position history array](#position-history-entry-arrays-index-0n) | Each index contains one of the n\` current user's position history entries |

Position history entry arrays (Index [0...n])

| Index | Field        | Type   | Description                                                                                                    |
| ----- | ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| [0]   | SYMBOL       | string | Pair (tBTCUSD, …).                                                                                             |
| [1]   | STATUS       | string | Status (CLOSED).                                                                                               |
| [2]   | AMOUNT       | float  | Size of the position. A positive value indicates a long position; a negative value indicates a short position. |
| [3]   | BASE_PRICE   | float  | Base price of the position. (Average traded price of the previous orders of the position)                      |
| [4]   | FUNDING      | float  | Funding amount                                                                                                 |
| [5]   | FUNDING_TYPE | int    | 0 for daily, 1 for term.                                                                                       |
| [11]  | POSITION_ID  | int    | Position identifier                                                                                            |
| [12]  | MTS_CREATE   | int    | Timestamp of creation (millis)                                                                                 |
| [13]  | MTS_UPDATE   | int    | Timestamp of last update (millis)                                                                              |

**Ratelimit**: 90 req/min

start

integer

Millisecond start time

end

integer

Millisecond end time

limit

integer

Number of records (Max 50)

id

integer

Position id (can be passed to retrieve a specific position)
