# User Settings Write

# User Settings Write

post https://api.bitfinex.com/v2/auth/w/settings/set

Allows you to create custom settings by creating key: value pairs.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

**Body Fields**

| Term     | Type   | Description                                                                             |
| -------- | ------ | --------------------------------------------------------------------------------------- |
| Settings | Object | Object of keys and values to be set. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Response Fields**

| Term               | Type   | Description                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------- |
| TIMESTAMP          | int    | Timestamp in milliseconds                                                        |
| TYPE               | string | Purpose of notification ('acc_ss' (account settings set))                        |
| NUMBER_OF_SETTINGS | string | Number of settings changed or created with this request                          |
| STATUS             | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

**Ratelimit**: 90 req/min

Body Params

RAW_BODY

json

Defaults to {}

{}

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

JavaScriptShell

Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/settings/set \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

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
https://docs.bitfinex.com/reference/rest-auth-settings-set Path:
/v2/auth/w/settings/set Method: POST
