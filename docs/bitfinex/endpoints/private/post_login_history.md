# Login History

# Login History

post https://api.bitfinex.com/v2/auth/r/logins/hist

Retrieve a list of past logins.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field            | Type                                            | Description                                                           |
| --------- | ---------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| \[0...n\] | LOGIN_INFO_ARRAY | [Login info array](#login-info-arrays-index-0n) | Each index contains one of the n current user's login history entries |

####

Login info arrays (index \[0...n\])

[](#login-info-arrays-index-0n)

| Index | Field | Type | Description |
| ----- | ----- | ---- | ----------- |
| \[0\] | ID    | Int  | Login ID    |

| \[ . . . \]

| | \[2\] | TIME | Int | Millisecond timestamp of login | |

\[ . . . \]

| | \[4\] | IP | String | IP address of login | |

\[ . . . \]

| | \[7\] | EXTRA_INFO | Object | Object with extra information |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

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

#

200

200

Response body

json

#

400

400

Response body

object

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/logins/hist \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-logins-hist Path:
/v2/auth/r/logins/hist Method: POST
