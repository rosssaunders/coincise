# GET /private/create\_subaccount

Create a new subaccount

**📖 Related Support Article:** [Subaccounts](https://support.deribit.com/hc/en-us/articles/25944616386973-Subaccounts)

**Scope:** `account:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.email | string | User email |
| result.id | integer | Subaccount identifier |
| result.is_password | boolean | true when password for the subaccount has been configured |
| result.login_enabled | boolean | Informs whether login to the subaccount is enabled result.portfolio object result.portfolio.btc object |
| result.portfolio.btc.additional_reserve | number | The account's balance reserved in other orders result.portfolio.btc.available_funds number result.portfolio.btc.available_withdrawal_funds number result.portfolio.btc.balance number result.portfolio.btc.currency string result.portfolio.btc.equity number result.portfolio.btc.initial_margin number result.portfolio.btc.maintenance_margin number result.portfolio.btc.margin_balance number result.portfolio.btc.spot_reserve number result.portfolio.eth object |
| result.portfolio.eth.additional_reserve | number | The account's balance reserved in other orders result.portfolio.eth.available_funds number result.portfolio.eth.available_withdrawal_funds number result.portfolio.eth.balance number result.portfolio.eth.currency string result.portfolio.eth.equity number result.portfolio.eth.initial_margin number result.portfolio.eth.maintenance_margin number result.portfolio.eth.margin_balance number result.portfolio.eth.spot_reserve number |
| result.receive_notifications | boolean | When true - receive all notification emails on the main email |
| result.security_keys_enabled | boolean | Whether the Security Keys authentication is enabled |
| result.system_name | string | System generated user nickname |
| result.type | string | Account type |
| result.username | string | Account name (given by user) |