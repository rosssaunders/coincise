## /private/get_affiliate_program_info

Retrieves user\`s affiliates count, payouts and link.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                      | Type     | Description                         |
| ------------------------- | -------- | ----------------------------------- |
| id                        | integer  | The id that was sent in the request |
| jsonrpc                   | string   | The JSON-RPC version (2.0)          |
| result                    | _object_ |                                     |
|   ›  is_enabled           | boolean  | Status of affiliate program         |
|   ›  link                 | string   | Affiliate link                      |
|   ›  number_of_affiliates | number   | Number of affiliates                |
|   ›  received             | _object_ |                                     |
|   ›    ›  btc             | number   | Total payout received in BTC        |
|   ›    ›  eth             | number   | Total payout received in ETH        |
