# POST /private/enable\_affiliate\_program

Enables affiliate program for user

**📖 Related Support Article:** [Affiliate Program](https://support.deribit.com/hc/en-us/articles/25944777728797-Affiliate-Program)

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |