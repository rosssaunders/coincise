# Virtual Asset Service Providers

get https://api.bitfinex.com/v2/ext/vasps

Returns a list of VASP names along with their respective ID

> 📘
> 
> ### 
> 
> Travel Rule
> 
> 
> 
> The endpoint can be used to lookup the ID of a VASP.
> 
> This ID is the VASP "Decentralised ID" and can be applied to the `vasp_did`field to identify the recipient VASP for Travel Rule purposes when making a withdrawal request.
> 
> For details, see the documentation for the [Withdrawal](/reference/rest-auth-withdraw) endpoint.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | VASP\_OBJECT | Object | Object with VASP name and ID |

VASP objects (index [0...n])

| Key | Type | Description |
| --- | --- | --- |
| id | String | VASP ID |
| name | String | VASP name |

Responses

curl \--request GET \\

     \--url https://api.bitfinex.com/v2/ext/vasps \\

     \--header 'accept: application/json'

---
Section: General
Source: https://docs.bitfinex.com/reference/virtual-asset-service-providers
Path: /v2/ext/vasps
Method: GET
