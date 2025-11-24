# POST /private/cancel\_block\_rfq\_trigger

**Taker method**

This method allows Block RFQ taker to cancel an active trigger for a Block RFQ. The response includes the full Block RFQ object with the trade trigger state set to cancelled.

**Scope:** `block_rfq:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| block_rfq_id | true | integer | ID of the Block RFQ |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| amount | number | This value multiplied by the ratio of a leg gives trade size on that leg. |
| app_name | string | The name of the application that created the Block RFQ on behalf of the user (optional, visible only to taker). asks array of object |
| asks[].amount | number | This value multiplied by the ratio of a leg gives trade size on that leg. |
| asks[].execution_instruction | string | Execution instruction of the quote. Default - any_part_of"all_or_none (AON)" - The quote can only be filled entirely or not at all, ensuring that its amount matches the amount specified in the Block RFQ. Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at the same price level."any_part_of (APO)" - The quote can be filled either partially or fully, with the filled amount potentially being less than the Block RFQ amount. |
| asks[].expires_at | integer | The timestamp when the quote expires (milliseconds since the Unix epoch), equal to the earliest expiry of placed quotes |
| asks[].last_update_timestamp | integer | Timestamp of the last update of the quote (milliseconds since the UNIX epoch) |
| asks[].makers | array of string | Maker of the quote |
| asks[].price | number | Price of a quote bids array of object |
| bids[].amount | number | This value multiplied by the ratio of a leg gives trade size on that leg. |
| bids[].execution_instruction | string | Execution instruction of the quote. Default - any_part_of"all_or_none (AON)" - The quote can only be filled entirely or not at all, ensuring that its amount matches the amount specified in the Block RFQ. Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at the same price level."any_part_of (APO)" - The quote can be filled either partially or fully, with the filled amount potentially being less than the Block RFQ amount. |
| bids[].expires_at | integer | The timestamp when the quote expires (milliseconds since the Unix epoch), equal to the earliest expiry of placed quotes |
| bids[].last_update_timestamp | integer | Timestamp of the last update of the quote (milliseconds since the UNIX epoch) |
| bids[].makers | array of string | Maker of the quote |
| bids[].price | number | Price of a quote |
| block_rfq_id | integer | ID of the Block RFQ |
| combo_id | string | Unique combo identifier |
| creation_timestamp | integer | The timestamp when Block RFQ was created (milliseconds since the Unix epoch) |
| disclosed | boolean | Indicates whether the RFQ was created as non-anonymous, meaning taker and maker aliases are visible to counterparties. |
| expiration_timestamp | integer | The timestamp when the Block RFQ will expire (milliseconds since the UNIX epoch) hedge object |
| hedge.amount | integer | It represents the requested hedge leg size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| hedge.direction | string | Direction: buy, or sell |
| hedge.instrument_name | string | Unique instrument identifier |
| hedge.price | number | Price for a hedge leg |
| included_in_taker_rating | boolean | Indicates whether the RFQ is included in the taker's rating calculation. Present only for closed RFQs created by the requesting taker. |
| index_prices | array of number | A list of index prices for the underlying instrument(s) at the time of trade execution. |
| label | string | User defined label for the Block RFQ (maximum 64 characters) legs array of object |
| legs[].direction | string | Direction: buy, or sell |
| legs[].instrument_name | string | Unique instrument identifier |
| legs[].ratio | integer | Ratio of amount between legs |
| makers | array of string | List of targeted Block RFQ makers |
| mark_price | number | The mark price for the instrument |
| min_trade_amount | number | Minimum amount for trading |
| role | string | Role of the user in Block RFQ |
| state | string | State of the Block RFQ |
| taker | string | Taker alias. Present only when disclosed is true. |
| taker_rating | string | Rating of the taker |
| trade_allocations | array of object | List of allocations for Block RFQ pre-allocation. Allows to split amount between different (sub)accounts or broker clients. Each allocation must specify either user_id (for direct allocation) or client_info object (for broker allocation), and amount. Visible only to the taker. |
| trade_allocations[].amount | number | Amount allocated to this user or client. |
| trade_allocations[].client_info | object | Client allocation info for brokers. |
| trade_allocations[].client_info.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| trade_allocations[].client_info.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| trade_allocations[].client_info.name | string | Name of the linked user within the client; available to broker. |
| trade_allocations[].user_id | integer | User ID to allocate part of the RFQ amount. For brokers the User ID is obstructed. |
| trade_trigger | object | Contains information about the trade trigger state |
| trade_trigger.cancel_reason | string | Reason for cancellation, present only when state is cancelled |
| trade_trigger.direction | string | Direction of the trade trigger |
| trade_trigger.price | number | Price of the trade trigger |
| trade_trigger.state | string | Trade trigger state: "untriggered" or "cancelled" trades array of object |
| trades[].amount | number | Trade amount. For options, linear futures, linear perpetuals and spots the amount is denominated in the underlying base currency coin. The inverse perpetuals and inverse futures are denominated in USD units. |
| trades[].direction | string | Direction: buy, or sell |
| trades[].hedge_amount | number | Amount of the hedge leg. For linear futures, linear perpetuals and spots the amount is denominated in the underlying base currency coin. The inverse perpetuals and inverse futures are denominated in USD units. |
| trades[].maker | string | Alias of the maker (optional) |
| trades[].price | number | Price in base currency |