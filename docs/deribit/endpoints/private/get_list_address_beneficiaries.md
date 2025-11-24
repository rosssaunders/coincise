# GET /private/list_address_beneficiaries

Lists address beneficiaries with optional filtering and pagination

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                          | Description         |
| ------------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| currency                 | false    | string  | BTC ETH STETH ETHW USDC USDT EURR MATIC SOL XRP USYC PAXG BNB USDE                                                                            | The currency symbol |
| address                  | false    | string  | Address in currency format                                                                                                                    |                     |
| tag                      | false    | string  | Tag for XRP addresses                                                                                                                         |                     |
| created_before           | false    | integer | Filter by creation timestamp (before)                                                                                                         |                     |
| created_after            | false    | integer | Filter by creation timestamp (after)                                                                                                          |                     |
| updated_before           | false    | integer | Filter by update timestamp (before)                                                                                                           |                     |
| updated_after            | false    | integer | Filter by update timestamp (after)                                                                                                            |                     |
| personal                 | false    | boolean | Filter by personal wallet flag                                                                                                                |                     |
| unhosted                 | false    | boolean | Filter by unhosted wallet flag                                                                                                                |                     |
| beneficiary_vasp_name    | false    | string  | Filter by beneficiary VASP name                                                                                                               |                     |
| beneficiary_vasp_did     | false    | string  | Filter by beneficiary VASP DID                                                                                                                |                     |
| beneficiary_vasp_website | false    | string  | Website of the beneficiary VASP. Required if the address book entry is associated with a VASP that is not included in the list of known VASPs |                     |
| limit                    | false    | integer | Maximum number of results to return                                                                                                           |                     |
| continuation             | false    | string  | Continuation token for pagination                                                                                                             |                     |

### Response

| Name                                   | Type    | Description                                                                                                        |
| -------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| id                                     | integer | The id that was sent in the request                                                                                |
| jsonrpc                                | string  | The JSON-RPC version (2.0) result object                                                                           |
| result.continuation                    | string  | Continuation token for pagination.                                                                                 |
| result.count                           | integer | Total number of results available result.data array of object                                                      |
| result.data[].address                  | string  | Address in proper format for currency                                                                              |
| result.data[].agreed                   | boolean | Indicates that the user agreed to shared provided information with 3rd parties                                     |
| result.data[].beneficiary_address      | string  | Geographical address of the beneficiary                                                                            |
| result.data[].beneficiary_company_name | string  | Company name of the beneficiary (if beneficiary is a company)                                                      |
| result.data[].beneficiary_first_name   | string  | First name of the beneficiary (if beneficiary is a person)                                                         |
| result.data[].beneficiary_last_name    | string  | Last name of the beneficiary (if beneficiary is a person)                                                          |
| result.data[].beneficiary_vasp_did     | string  | DID of beneficiary VASP                                                                                            |
| result.data[].beneficiary_vasp_name    | string  | Name of beneficiary VASP                                                                                           |
| result.data[].beneficiary_vasp_website | string  | Website of the beneficiary VASP                                                                                    |
| result.data[].creation_timestamp       | integer | The timestamp (milliseconds since the Unix epoch)                                                                  |
| result.data[].currency                 | string  | Currency, i.e "BTC", "ETH", "USDC"                                                                                 |
| result.data[].personal                 | boolean | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
| result.data[].tag                      | string  | Tag for XRP addresses (optional)                                                                                   |
| result.data[].unhosted                 | boolean | Indicates if the address belongs to an unhosted wallet                                                             |
| result.data[].update_timestamp         | integer | The timestamp (milliseconds since the Unix epoch)                                                                  |
