# User Settings Delete

# User Settings Delete

post https://api.bitfinex.com/v2/auth/w/settings/del

Allows you to delete custom settings.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

**Body Fields**

| Term | Type | Description |
| --- | --- | --- |
| Settings | Array | Array of keys to be deleted. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| TIMESTAMP | int | Timestamp in milliseconds |
| TYPE | string | Purpose of notification ('acc\_sd' (account settings del)) |
| STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

**Ratelimit**: 90 req/min

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

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/settings/del \\

3

     \--header 'accept: application/json'

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
Source: https://docs.bitfinex.com/reference/rest-auth-settings-del
Path: /v2/auth/w/settings/del
Method: POST
