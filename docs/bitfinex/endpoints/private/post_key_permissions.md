# Key Permissions

# Key Permissions

post https://api.bitfinex.com/v2/auth/r/permissions

Retrieve current api key/token permissions

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field                | Type                                                    | Description                                              |
| --------- | -------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| \[0...n\] | KEY_PERMISSION_ARRAY | [Key permission array](#key-permission-arrays-index-0n) | Each index contains one of the current key's permissions |

####

Key permission arrays (index \[0...n\]

[](#key-permission-arrays-index-0n)

| Index | Term  | Type   | Description                                                                                                                     |
| ----- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| \[0\] | SCOPE | string | Api scope, ('account', 'history', 'orders', 'positions', 'funding', 'settings', 'wallets', 'withdraw', 'ui_withdraw', 'bfxpay') |
| \[1\] | READ  | int    | Read permission (0 - false, 1 - true)                                                                                           |
| \[2\] | WRITE | int    | Write permission (0 - false, 1 - true)                                                                                          |

**Ratelimit**: 90 req/min

[](#body-params)Body Params

RAW_BODY

json

Defaults to {}

{}

[](#response-schemas)Responses

#

200

200

[](#keypermissions-string-response-body)Response body

json

#

400

400

[](#keypermissions-object-response-body)Response body

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

     \--url https://api.bitfinex.com/v2/auth/r/permissions \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/key-permissions Path: /v2/auth/r/permissions
Method: POST
