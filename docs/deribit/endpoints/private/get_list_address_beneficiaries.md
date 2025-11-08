## /private/list_address_beneficiaries

Lists address beneficiaries with optional filtering and pagination

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | false    | string | `BTC` |

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
`USDE` | The currency symbol | | address | false | string | | Address in
currency format | | tag | false | string | | Tag for XRP addresses | |
created_before | false | integer | | Filter by creation timestamp (before) | |
created_after | false | integer | | Filter by creation timestamp (after) | |
updated_before | false | integer | | Filter by update timestamp (before) | |
updated_after | false | integer | | Filter by update timestamp (after) | |
personal | false | boolean | | Filter by personal wallet flag | | unhosted |
false | boolean | | Filter by unhosted wallet flag | | beneficiary_vasp_name |
false | string | | Filter by beneficiary VASP name | | beneficiary_vasp_did |
false | string | | Filter by beneficiary VASP DID | | beneficiary_vasp_website |
false | string | | Website of the beneficiary VASP. Required if the address book
entry is associated with a VASP that is not included in the list of known VASPs
| | limit | false | integer | | Maximum number of results to return | |
continuation | false | string | | Continuation token for pagination |

### Response

| Name                               | Type              | Description                                                                                                        |
| ---------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| id                                 | integer           | The id that was sent in the request                                                                                |
| jsonrpc                            | string            | The JSON-RPC version (2.0)                                                                                         |
| result                             | _object_          |                                                                                                                    |
|   ›  continuation                  | string            | Continuation token for pagination.                                                                                 |
|   ›  count                         | integer           | Total number of results available                                                                                  |
|   ›  data                          | array of _object_ |                                                                                                                    |
|   ›    ›  address                  | string            | Address in proper format for currency                                                                              |
|   ›    ›  agreed                   | boolean           | Indicates that the user agreed to shared provided information with 3rd parties                                     |
|   ›    ›  beneficiary_address      | string            | Geographical address of the beneficiary                                                                            |
|   ›    ›  beneficiary_company_name | string            | Company name of the beneficiary (if beneficiary is a company)                                                      |
|   ›    ›  beneficiary_first_name   | string            | First name of the beneficiary (if beneficiary is a person)                                                         |
|   ›    ›  beneficiary_last_name    | string            | Last name of the beneficiary (if beneficiary is a person)                                                          |
|   ›    ›  beneficiary_vasp_did     | string            | DID of beneficiary VASP                                                                                            |
|   ›    ›  beneficiary_vasp_name    | string            | Name of beneficiary VASP                                                                                           |
|   ›    ›  beneficiary_vasp_website | string            | Website of the beneficiary VASP                                                                                    |
|   ›    ›  creation_timestamp       | integer           | The timestamp (milliseconds since the Unix epoch)                                                                  |
|   ›    ›  currency                 | string            | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"`                                                                           |
|   ›    ›  personal                 | boolean           | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
|   ›    ›  tag                      | string            | Tag for XRP addresses (optional)                                                                                   |
|   ›    ›  unhosted                 | boolean           | Indicates if the address belongs to an unhosted wallet                                                             |
|   ›    ›  update_timestamp         | integer           | The timestamp (milliseconds since the Unix epoch)                                                                  |
