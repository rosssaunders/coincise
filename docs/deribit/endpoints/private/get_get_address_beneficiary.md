# GET /private/get\_address\_beneficiary

Retrieves address beneficiary information

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH STETH ETHW USDC USDT EURR MATIC SOL XRP USYC PAXG BNB USDE | The currency symbol |
| address | true | string | Address in currency format |  |
| tag | false | string | Tag for XRP addresses |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.address | string | Address in proper format for currency |
| result.agreed | boolean | Indicates that the user agreed to shared provided information with 3rd parties |
| result.beneficiary_address | string | Geographical address of the beneficiary |
| result.beneficiary_company_name | string | Company name of the beneficiary (if beneficiary is a company) |
| result.beneficiary_first_name | string | First name of the beneficiary (if beneficiary is a person) |
| result.beneficiary_last_name | string | Last name of the beneficiary (if beneficiary is a person) |
| result.beneficiary_vasp_did | string | DID of beneficiary VASP |
| result.beneficiary_vasp_name | string | Name of beneficiary VASP |
| result.beneficiary_vasp_website | string | Website of the beneficiary VASP |
| result.creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result.currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| result.personal | boolean | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
| result.tag | string | Tag for XRP addresses (optional) |
| result.unhosted | boolean | Indicates if the address belongs to an unhosted wallet |
| result.update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |