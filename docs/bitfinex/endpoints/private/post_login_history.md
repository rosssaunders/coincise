# Login History

post https://api.bitfinex.com/v2/auth/r/logins/hist

Retrieve a list of past logins.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | LOGIN\_INFO\_ARRAY | [Login info array](#login-info-arrays-index-0n) | Each index contains one of the n current user's login history entries |

Login info arrays (index [0...n])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | Int | Login ID |
[ . . . ]

| [2] | TIME | Int | Millisecond timestamp of login |

[ . . . ]

| [4] | IP | String | IP address of login |

[ . . . ]

| [7] | EXTRA\_INFO | Object | Object with extra information |

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

Number of records (Max: 250)

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/logins/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-logins-hist
Path: /v2/auth/r/logins/hist
Method: POST
