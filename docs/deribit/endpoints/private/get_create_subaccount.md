## /private/create_subaccount

Create a new subaccount

**📖 Related Support Article:**
[Subaccounts](https://support.deribit.com/hc/en-us/articles/25944616386973-Subaccounts)

**Scope:** `account:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                                      | Type     | Description                                                     |
| ----------------------------------------- | -------- | --------------------------------------------------------------- |
| id                                        | integer  | The id that was sent in the request                             |
| jsonrpc                                   | string   | The JSON-RPC version (2.0)                                      |
| result                                    | _object_ |                                                                 |
|   ›  email                                | string   | User email                                                      |
|   ›  id                                   | integer  | Subaccount identifier                                           |
|   ›  is_password                          | boolean  | `true` when password for the subaccount has been configured     |
|   ›  login_enabled                        | boolean  | Informs whether login to the subaccount is enabled              |
|   ›  portfolio                            | _object_ |                                                                 |
|   ›    ›  btc                             | _object_ |                                                                 |
|   ›    ›    ›  additional_reserve         | number   | The account's balance reserved in other orders                  |
|   ›    ›    ›  available_funds            | number   |                                                                 |
|   ›    ›    ›  available_withdrawal_funds | number   |                                                                 |
|   ›    ›    ›  balance                    | number   |                                                                 |
|   ›    ›    ›  currency                   | string   |                                                                 |
|   ›    ›    ›  equity                     | number   |                                                                 |
|   ›    ›    ›  initial_margin             | number   |                                                                 |
|   ›    ›    ›  maintenance_margin         | number   |                                                                 |
|   ›    ›    ›  margin_balance             | number   |                                                                 |
|   ›    ›    ›  spot_reserve               | number   |                                                                 |
|   ›    ›  eth                             | _object_ |                                                                 |
|   ›    ›    ›  additional_reserve         | number   | The account's balance reserved in other orders                  |
|   ›    ›    ›  available_funds            | number   |                                                                 |
|   ›    ›    ›  available_withdrawal_funds | number   |                                                                 |
|   ›    ›    ›  balance                    | number   |                                                                 |
|   ›    ›    ›  currency                   | string   |                                                                 |
|   ›    ›    ›  equity                     | number   |                                                                 |
|   ›    ›    ›  initial_margin             | number   |                                                                 |
|   ›    ›    ›  maintenance_margin         | number   |                                                                 |
|   ›    ›    ›  margin_balance             | number   |                                                                 |
|   ›    ›    ›  spot_reserve               | number   |                                                                 |
|   ›  receive_notifications                | boolean  | When `true` - receive all notification emails on the main email |
|   ›  security_keys_enabled                | boolean  | Whether the Security Keys authentication is enabled             |
|   ›  system_name                          | string   | System generated user nickname                                  |
|   ›  type                                 | string   | Account type                                                    |
|   ›  username                             | string   | Account name (given by user)                                    |
