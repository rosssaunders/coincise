# POST /v2/auth/r/positions/audit

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-positions-audit](https://docs.bitfinex.com/reference/rest-auth-positions-audit)

post

https://api.bitfinex.com/v2/auth/r/positions/audit

Return an audit of your positions. You latest positions will be retrieved by
default, but ID's can be specified to retrieve an audit for specific positions.

Response data

| Index   | Field                | Type                                                          | Description                                                            |
| ------- | -------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [0...n] | POSITION_AUDIT_ARRAY | [Position audit array](#position-audit-entry-arrays-index-0n) | Each index contains one of the n current user's position audit entries |

Position audit entry arrays (index [0...n])

| Index | Field          | Type        | Description                                                                                                    |
| ----- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| [0]   | SYMBOL         | String      | Pair (tETHUSD, …).                                                                                             |
| [1]   | STATUS         | String      | Status (ACTIVE, CLOSED).                                                                                       |
| [2]   | AMOUNT         | Float       | Size of the position. A positive value indicates a long position; a negative value indicates a short position. |
| [3]   | BASE_PRICE     | Float       | Base price of the position. (Average traded price of the previous orders of the position)                      |
| [4]   | FUNDING        | Float       | Funding amount                                                                                                 |
| [5]   | FUNDING_TYPE   | Int         | 0 for daily, 1 for term.                                                                                       |
| [11]  | POSITION_ID    | Int64       | Position ID                                                                                                    |
| [12]  | MTS_CREATE     | Int         | Millisecond timestamp of creation                                                                              |
| [13]  | MTS_UPDATE     | Int         | Millisecond timestamp of update                                                                                |
| [15]  | TYPE           | Int         | Identifies the type of position: 'null' = Margin position, 1 = Derivatives position                            |
| [17]  | COLLATERAL     | Float       | The amount of collateral applied to the open position                                                          |
| [18]  | COLLATERAL_MIN | Float       | The minimum amount of collateral required for the position                                                     |
| [19]  | META           | JSON String | Additional meta information about the position                                                                 |

**Ratelimit**: 90 req/min

Body Params

id

array of int64s

required

Defaults to ,,,

Array of id's to audit

id\*

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records (Max 250)

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/positions/audit \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

"id": [

    null,

    null,

    null,

    null

]

}

'
