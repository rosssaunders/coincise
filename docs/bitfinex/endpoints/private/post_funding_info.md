# Funding Info

# Funding Info

post https://api.bitfinex.com/v2/auth/r/info/funding/{key}

Get account funding info

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | "sym" | string | "sym" |
| \[1\] | SYMBOL | string | The symbol the information pertains to (funding currencies) |
| \[2\] | FUNDING\_INFO\_ARRAY | [Funding info array](#funding-info-array-index-3) | Contains info on the yield and duration of the user's taken and provided funding |

#### 

Funding info array (Index \[3\])

[](#funding-info-array-index-3)

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| \[0\] | YIELD\_LOAN | float | Weighted average rate for taken funding |
| \[1\] | YIELD\_LEND | float | Weighted average rate for provided funding |
| \[2\] | DURATION\_LOAN | float | Weighted average duration for taken funding |
| \[3\] | DURATION\_LEND | float | Weighted average duration for provided funding |

**Ratelimit**: 90 req/min

Path Params

key

string

required

SYMBOL

Body Params

RAW\_BODY

json

Defaults to {}

{}

Responses

# 

200

200

Response body

array

# 

400

400

Response body

object

Updated 5 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/info/funding/key \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: Margin Funding
Source: https://docs.bitfinex.com/reference/rest-auth-info-funding
Path: /v2/auth/r/info/funding/key
Method: POST
