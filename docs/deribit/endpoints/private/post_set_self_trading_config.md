# POST /private/set\_self\_trading\_config

Configure self trading behavior

**📖 Related Support Article:** [Account settings page](https://support.deribit.com/hc/en-us/articles/25944634289693-Account-settings-page#heading-4)

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| mode | true | string | reject_taker cancel_maker | Self trading prevention behavior: reject_taker (reject the incoming order), cancel_maker (cancel the matched order in the book) |
| extended_to_subaccounts | true | boolean | If value is true trading is prevented between subaccounts of given account, otherwise they are treated separately |  |
| block_rfq_self_match_prevention | false | boolean | When Block RFQ Self Match Prevention is enabled, it ensures that RFQs cannot be executed between accounts that belong to the same legal entity. This setting is independent of the general self-match prevention settings and must be configured separately. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |