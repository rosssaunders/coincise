# GET /private/get\_affiliate\_program\_info

Retrieves user\`s affiliates count, payouts and link.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.is_enabled | boolean | Status of affiliate program |
| result.link | string | Affiliate link |
| result.number_of_affiliates | number | Number of affiliates result.received object |
| result.received.btc | number | Total payout received in BTC |
| result.received.eth | number | Total payout received in ETH |