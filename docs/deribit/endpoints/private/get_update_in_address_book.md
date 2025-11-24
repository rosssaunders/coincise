# GET /private/update_in_address_book

Allows to provide beneficiary information for the address

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                          | Description         |
| ------------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| currency                 | true     | string  | BTC ETH STETH ETHW USDC USDT EURR MATIC SOL XRP USYC PAXG BNB USDE                                                                            | The currency symbol |
| type                     | true     | string  | transfer withdrawal deposit_source                                                                                                            | Address book type   |
| address                  | true     | string  | Address in currency format, it must be in address book                                                                                        |                     |
| beneficiary_vasp_name    | true     | string  | Name of beneficiary VASP                                                                                                                      |                     |
| beneficiary_vasp_did     | true     | string  | DID of beneficiary VASP                                                                                                                       |                     |
| beneficiary_vasp_website | false    | string  | Website of the beneficiary VASP. Required if the address book entry is associated with a VASP that is not included in the list of known VASPs |                     |
| beneficiary_first_name   | false    | string  | First name of beneficiary (if beneficiary is a person)                                                                                        |                     |
| beneficiary_last_name    | false    | string  | First name of beneficiary (if beneficiary is a person)                                                                                        |                     |
| beneficiary_company_name | false    | string  | Beneficiary company name (if beneficiary is a company)                                                                                        |                     |
| beneficiary_address      | true     | string  | Geographical address of the beneficiary                                                                                                       |                     |
| agreed                   | true     | boolean | Indicates that the user agreed to shared provided information with 3rd parties                                                                |                     |
| personal                 | true     | boolean | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software                            |                     |
| label                    | true     | string  | Label of the address book entry                                                                                                               |                     |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |
