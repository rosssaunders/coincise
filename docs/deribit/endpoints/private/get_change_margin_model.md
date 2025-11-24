# GET /private/change\_margin\_model

Change margin model

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| user_id | false | integer | Id of a (sub)account - by default current user id is used |  |
| margin_model | true | string | cross_pm cross_sm segregated_pm segregated_sm | Margin model |
| dry_run | false | boolean | If true request returns the result without switching the margining model. Default: false |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object |
| result[].currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| result[].new_state | object | Represents portfolio state after change |
| result[].new_state.available_balance | number | Available balance after change |
| result[].new_state.initial_margin_rate | number | Initial margin rate after change |
| result[].new_state.maintenance_margin_rate | number | Maintenance margin rate after change |
| result[].old_state | object | Represents portfolio state before change |
| result[].old_state.available_balance | number | Available balance before change |
| result[].old_state.initial_margin_rate | number | Initial margin rate before change |
| result[].old_state.maintenance_margin_rate | number | Maintenance margin rate before change |