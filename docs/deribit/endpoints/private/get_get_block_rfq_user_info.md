# GET /private/get_block_rfq_user_info

Returns identity and rating information for the requesting account and its
subaccounts. Includes both group-level and individual user-level alias data, if
available.

**Scope:** `block_rfq:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                        | Type    | Description                                                                                 |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| id                          | integer | The id that was sent in the request                                                         |
| jsonrpc                     | string  | The JSON-RPC version (2.0) result object                                                    |
| result.parent               | object  | Parent Identity (group alias), representing the overall account group (main + subaccounts). |
| result.parent.identity      | string  | Group-level alias identifying the account group as a whole.                                 |
| result.parent.is_maker      | boolean | Indicates whether the Parent Identity has maker scope. result.users array of object         |
| result.users[].identity     | string  | Specific alias identifying this account individually.                                       |
| result.users[].is_maker     | boolean | Indicates whether this account has maker scope.                                             |
| result.users[].taker_rating | number  | Taker rating associated with this account, if available.                                    |
| result.users[].user_id      | integer | Unique user identifier                                                                      |
