## /private/save_address_beneficiary

Saves address beneficiary information

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`STETH`  
`ETHW`  
`USDC`  
`USDT`  
`EURR`  
`MATIC`  
`SOL`  
`XRP`  
`USYC`  
`PAXG`  
`BNB`  
`USDE` | The currency symbol | | address | true | string | | Address in currency
format | | tag | false | string | | Tag for XRP addresses | | agreed | true |
boolean | | Indicates that the user agreed to shared provided information with
3rd parties | | personal | true | boolean | | The user confirms that he provided
address belongs to him and he has access to it via an un-hosted wallet software
| | unhosted | true | boolean | | Indicates if the address belongs to an
unhosted wallet | | beneficiary_vasp_name | true | string | | Name of
beneficiary VASP | | beneficiary_vasp_did | true | string | | DID of beneficiary
VASP | | beneficiary_vasp_website | false | string | | Website of the
beneficiary VASP. Required if the address book entry is associated with a VASP
that is not included in the list of known VASPs | | beneficiary_first_name |
false | string | | First name of beneficiary (if beneficiary is a person) | |
beneficiary_last_name | false | string | | First name of beneficiary (if
beneficiary is a person) | | beneficiary_company_name | false | string | |
Beneficiary company name (if beneficiary is a company) | | beneficiary_address |
true | string | | Geographical address of the beneficiary |

### Response

| Name                          | Type     | Description                                                                                                        |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| id                            | integer  | The id that was sent in the request                                                                                |
| jsonrpc                       | string   | The JSON-RPC version (2.0)                                                                                         |
| result                        | _object_ |                                                                                                                    |
|   ›  address                  | string   | Address in proper format for currency                                                                              |
|   ›  agreed                   | boolean  | Indicates that the user agreed to shared provided information with 3rd parties                                     |
|   ›  beneficiary_address      | string   | Geographical address of the beneficiary                                                                            |
|   ›  beneficiary_company_name | string   | Company name of the beneficiary (if beneficiary is a company)                                                      |
|   ›  beneficiary_first_name   | string   | First name of the beneficiary (if beneficiary is a person)                                                         |
|   ›  beneficiary_last_name    | string   | Last name of the beneficiary (if beneficiary is a person)                                                          |
|   ›  beneficiary_vasp_did     | string   | DID of beneficiary VASP                                                                                            |
|   ›  beneficiary_vasp_name    | string   | Name of beneficiary VASP                                                                                           |
|   ›  beneficiary_vasp_website | string   | Website of the beneficiary VASP                                                                                    |
|   ›  creation_timestamp       | integer  | The timestamp (milliseconds since the Unix epoch)                                                                  |
|   ›  currency                 | string   | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"`                                                                           |
|   ›  personal                 | boolean  | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
|   ›  tag                      | string   | Tag for XRP addresses (optional)                                                                                   |
|   ›  unhosted                 | boolean  | Indicates if the address belongs to an unhosted wallet                                                             |
|   ›  update_timestamp         | integer  | The timestamp (milliseconds since the Unix epoch)                                                                  |
