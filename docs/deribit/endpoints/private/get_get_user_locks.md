# GET /private/get_user_locks

Retrieves information about locks on user account

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name              | Type    | Description                                                    |
| ----------------- | ------- | -------------------------------------------------------------- |
| id                | integer | The id that was sent in the request                            |
| jsonrpc           | string  | The JSON-RPC version (2.0) result array of object              |
| result[].currency | string  | Currency, i.e "BTC", "ETH", "USDC"                             |
| result[].enabled  | boolean | Value is set to 'true' when user account is locked in currency |
| result[].message  | text    | Optional information for user why his account is locked        |
