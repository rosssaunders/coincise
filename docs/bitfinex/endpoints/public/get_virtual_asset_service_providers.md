# Virtual Asset Service Providers

# Virtual Asset Service Providers

get https://api.bitfinex.com/v2/ext/vasps

Returns a list of VASP names along with their respective ID

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> 📘
>
> ###
>
> Travel Rule
>
> [](#travel-rule)
>
> The endpoint can be used to lookup the ID of a VASP.
>
> This ID is the VASP "Decentralised ID" and can be applied to the
> `vasp_did`field to identify the recipient VASP for Travel Rule purposes when
> making a withdrawal request.
>
> For details, see the documentation for the
> [Withdrawal](/reference/rest-auth-withdraw) endpoint.

####

Response data

[](#response-data)

| Index     | Field       | Type   | Description                  |
| --------- | ----------- | ------ | ---------------------------- |
| \[0...n\] | VASP_OBJECT | Object | Object with VASP name and ID |

####

VASP objects (index \[0...n\])

[](#vasp-objects-index-0n)

| Key  | Type   | Description |
| ---- | ------ | ----------- |
| id   | String | VASP ID     |
| name | String | VASP name   |

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

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://api.bitfinex.com/v2/ext/vasps \\

3

     \--header 'accept: application/json'

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

Section: General Source:
https://docs.bitfinex.com/reference/virtual-asset-service-providers Path:
/v2/ext/vasps Method: GET
