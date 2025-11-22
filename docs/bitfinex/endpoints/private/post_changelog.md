# POST /v2/auth/r/audit/hist

**Source:** [https://docs.bitfinex.com/reference/rest-auth-audit-hist](https://docs.bitfinex.com/reference/rest-auth-audit-hist)

post

https://api.bitfinex.com/v2/auth/r/audit/hist

Retrieve account changelog.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | CHANGELOG\_ARRAY | [Changelog array](#changelog-array-index-0n) | Each index contains one of the n current user's changelog entries |

Changelog array (Index [0...n])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS\_CREATE | Int | Millisecond timestamp of change |
| [2] | LOG | String | Log entry |
| [5] | IP | String | IP address for logged change |
| [6] | USER\_AGENT | Object | Browser info |

**Ratelimit**: 90 req/min

Body Params

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records (Max: 500)

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/audit/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'
