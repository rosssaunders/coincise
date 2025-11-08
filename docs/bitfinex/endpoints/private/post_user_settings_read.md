# User Settings Read

# User Settings Read

post https://api.bitfinex.com/v2/auth/r/settings

Allows you to read custom settings by providing a key. You can set or adjust these settings using the [User Settings Write](/reference#user-settings-set) endpoint.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

**Body Fields**

| Term | Type | Description |
| --- | --- | --- |
| Keys | Array | Array of keys requested. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Returned Fields**

| Term | Type | Description |
| --- | --- | --- |
| KEY | String | Requested Key |
| VALUE | Self defined | Returned setting |

**Ratelimit**: 90 req/min

Body Params

keys

array of strings

required

The keys for which you wish to retrieve the values.

keys\*

ADD string

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

* * *

Language

JavaScriptShell

Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/settings \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-settings
Path: /v2/auth/r/settings
Method: POST
