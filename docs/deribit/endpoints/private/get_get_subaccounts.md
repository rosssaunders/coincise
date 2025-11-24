# GET /private/get\_subaccounts

Get information about subaccounts. When called from subaccount, the response will include limited details for the main account and details for the subaccount initiating the request. The portfolio information will be included in the response only if the `with_portfolio` parameter is set to `true`.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| with_portfolio | false | boolean | Portfolio flag: true for portfolio information, false for subaccount information only. false by default |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object |
| result[].email | string | User email |
| result[].id | integer | Account/Subaccount identifier |
| result[].is_password | boolean | true when password for the subaccount has been configured |
| result[].login_enabled | boolean | Informs whether login to the subaccount is enabled |
| result[].margin_model | string | Margin model |
| result[].not_confirmed_email | string | New email address that has not yet been confirmed. This field is only included if with_portfolio == true. result[].portfolio object result[].portfolio.btc object |
| result[].portfolio.btc.additional_reserve | number | The account's balance reserved in other orders result[].portfolio.btc.available_funds number result[].portfolio.btc.available_withdrawal_funds number result[].portfolio.btc.balance number result[].portfolio.btc.currency string result[].portfolio.btc.equity number result[].portfolio.btc.initial_margin number result[].portfolio.btc.maintenance_margin number result[].portfolio.btc.margin_balance number result[].portfolio.btc.spot_reserve number result[].portfolio.eth object |
| result[].portfolio.eth.additional_reserve | number | The account's balance reserved in other orders result[].portfolio.eth.available_funds number result[].portfolio.eth.available_withdrawal_funds number result[].portfolio.eth.balance number result[].portfolio.eth.currency string result[].portfolio.eth.equity number result[].portfolio.eth.initial_margin number result[].portfolio.eth.maintenance_margin number result[].portfolio.eth.margin_balance number result[].portfolio.eth.spot_reserve number |
| result[].proof_id | string | hashed identifier used in the Proof Of Liability for the subaccount. This identifier allows you to find your entries in the Deribit Proof-Of-Reserves files. IMPORTANT: Keep it secret to not disclose your entries in the Proof-Of-Reserves. |
| result[].proof_id_signature | string | signature used as a base string for proof_id hash. IMPORTANT: Keep it secret to not disclose your entries in the Proof-Of-Reserves. |
| result[].receive_notifications | boolean | When true - receive all notification emails on the main email |
| result[].security_keys_assignments | array | Names of assignments with Security Keys assigned |
| result[].security_keys_enabled | boolean | Whether the Security Keys authentication is enabled |
| result[].system_name | string | System generated user nickname result[].type string result[].username string |