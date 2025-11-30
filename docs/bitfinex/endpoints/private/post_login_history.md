# POST /v2/auth/r/logins/hist

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-logins-hist](https://docs.bitfinex.com/reference/rest-auth-logins-hist)

post

https://api.bitfinex.com/v2/auth/r/logins/hist

Retrieve a list of past logins.

Response data

| Index   | Field            | Type                                            | Description                                                           |
| ------- | ---------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| [0...n] | LOGIN_INFO_ARRAY | [Login info array](#login-info-arrays-index-0n) | Each index contains one of the n current user's login history entries |

Login info arrays (index [0...n])

| Index | Field      | Type   | Description                    |
| ----- | ---------- | ------ | ------------------------------ |
| [0]   | ID         | Int    | Login ID                       |
| [2]   | TIME       | Int    | Millisecond timestamp of login |
| [4]   | IP         | String | IP address of login            |
| [7]   | EXTRA_INFO | Object | Object with extra information  |

**Ratelimit**: 90 req/min

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records (Max: 250)
