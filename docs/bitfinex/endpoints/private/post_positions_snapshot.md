# POST /v2/auth/r/positions/snap

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-positions-snap](https://docs.bitfinex.com/reference/rest-auth-positions-snap)

post

https://api.bitfinex.com/v2/auth/r/positions/snap

Returns position snapshots of user positions between the specified start and end
perimiters. Snapshots are taken daily.

Response data

| Index   | Field                   | Type                                                                | Description                                                                 |
| ------- | ----------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [0...n] | POSITION_SNAPSHOT_ARRAY | [Position snapshot array](#position-snapshot-entry-arrays-index-0n) | Each index contains one of the n\` current user's position snapshot entries |

Position snapshot entry arrays (index [0...n])

| Index | Field        | Type   | Description                                                                                                    |
| ----- | ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| [0]   | SYMBOL       | string | Pair (tBTCUSD, …).                                                                                             |
| [1]   | STATUS       | string | Status (ACTIVE).                                                                                               |
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

Number of records (Max 500)

id

integer

Position id (can be passed to retrieve a specific position)
