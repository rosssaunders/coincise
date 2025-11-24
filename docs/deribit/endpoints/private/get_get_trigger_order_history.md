# GET /private/get\_trigger\_order\_history

Retrieves detailed log of the user's trigger orders.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR | The currency symbol |
| instrument_name | false | string | Instrument name |  |
| count | false | integer | Number of requested items, default - 20, maximum - 1000 |  |
| continuation | false | string | Continuation token for pagination |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.continuation | string | Continuation token for pagination. result.entries array of object |
| result.entries[].amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.entries[].direction | string | Direction: buy, or sell |
| result.entries[].instrument_name | string | Unique instrument identifier |
| result.entries[].is_secondary_oto | boolean | true if the order is an order that can be triggered by another order, otherwise not present. |
| result.entries[].label | string | User defined label (presented only when previously set for order by user) |
| result.entries[].last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result.entries[].oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. |
| result.entries[].order_id | string | Unique order identifier |
| result.entries[].order_state | string | Order state: "triggered", "cancelled", or "rejected" with rejection reason (e.g. "rejected:reduce_direction"). |
| result.entries[].order_type | string | Requested order type: "limit or "market" |
| result.entries[].post_only | boolean | true for post-only orders only |
| result.entries[].price | number | Price in base currency |
| result.entries[].reduce_only | boolean | Optional (not added for spot). 'true for reduce-only orders only' |
| result.entries[].request | string | Type of last request performed on the trigger order by user or system. "cancel" - when order was cancelled, "trigger:order" - when trigger order spawned market or limit order after being triggered |
| result.entries[].source | string | Source of the order that is linked to the trigger order. |
| result.entries[].timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result.entries[].trigger | string | Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price". |
| result.entries[].trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) |
| result.entries[].trigger_order_id | string | Id of the user order used for the trigger-order reference before triggering |
| result.entries[].trigger_price | number | Trigger price (Only for future trigger orders) |