# GET /private/get\_subaccounts\_details

Get subaccounts positions

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR | The currency symbol |
| with_open_orders | false | boolean | Optional parameter to ask for open orders list, default: false |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object result[].open_orders array of object |
| result[].open_orders[].quote | boolean | If order is a quote. Present only if true. |
| result[].open_orders[].triggered | boolean | Whether the trigger order has been triggered |
| result[].open_orders[].mobile | boolean | optional field with value true added only when created with Mobile Application |
| result[].open_orders[].app_name | string | The name of the application that placed the order on behalf of the user (optional). |
| result[].open_orders[].implv | number | Implied volatility in percent. (Only if advanced="implv") |
| result[].open_orders[].refresh_amount | number | The initial display amount of iceberg order. Iceberg order display amount will be refreshed to that value after match consuming actual display amount. Absent for other types of orders |
| result[].open_orders[].usd | number | Option price in USD (Only if advanced="usd") |
| result[].open_orders[].oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled |
| result[].open_orders[].api | boolean | true if created with API |
| result[].open_orders[].average_price | number | Average fill price of the order |
| result[].open_orders[].advanced | string | advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable). |
| result[].open_orders[].order_id | string | Unique order identifier |
| result[].open_orders[].post_only | boolean | true for post-only orders only |
| result[].open_orders[].filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. |
| result[].open_orders[].trigger | string | Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price". |
| result[].open_orders[].trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). |
| result[].open_orders[].direction | string | Direction: buy, or sell |
| result[].open_orders[].contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). |
| result[].open_orders[].is_secondary_oto | boolean | true if the order is an order that can be triggered by another order, otherwise not present. |
| result[].open_orders[].replaced | boolean | true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false. |
| result[].open_orders[].mmp_group | string | Name of the MMP group supplied in the private/mass_quote request. Only present for quote orders. |
| result[].open_orders[].mmp | boolean | true if the order is a MMP order, otherwise false. |
| result[].open_orders[].last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result[].open_orders[].creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result[].open_orders[].cancel_reason | string | Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement) |
| result[].open_orders[].mmp_cancelled | boolean | true if order was cancelled by mmp trigger (optional) |
| result[].open_orders[].quote_id | string | The same QuoteID as supplied in the private/mass_quote request. Only present for quote orders. |
| result[].open_orders[].order_state | string | Order state: "open", "filled", "rejected", "cancelled", "untriggered" |
| result[].open_orders[].is_rebalance | boolean | Optional (only for spot). true if order was automatically created during cross-collateral balance restoration |
| result[].open_orders[].reject_post_only | boolean | true if order has reject_post_only flag (field is present only when post_only is true) |
| result[].open_orders[].label | string | User defined label (up to 64 characters) |
| result[].open_orders[].is_liquidation | boolean | Optional (not added for spot). true if order was automatically created during liquidation |
| result[].open_orders[].price | number or string | Price in base currency or "market_price" in case of open trigger market orders |
| result[].open_orders[].web | boolean | true if created via Deribit frontend (optional) |
| result[].open_orders[].time_in_force | string | Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel" |
| result[].open_orders[].trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) |
| result[].open_orders[].display_amount | number | The actual display amount of iceberg order. Absent for other types of orders. |
| result[].open_orders[].order_type | string | Order type: "limit", "market", "stop_limit", "stop_market" |
| result[].open_orders[].is_primary_otoco | boolean | true if the order is an order that can trigger an OCO pair, otherwise not present. |
| result[].open_orders[].original_order_type | string | Original order type. Optional field |
| result[].open_orders[].block_trade | boolean | true if order made from block_trade trade, added only in that case. |
| result[].open_orders[].trigger_price | number | Trigger price (Only for future trigger orders) |
| result[].open_orders[].oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. |
| result[].open_orders[].trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) |
| result[].open_orders[].quote_set_id | string | Identifier of the QuoteSet supplied in the private/mass_quote request. Only present for quote orders. |
| result[].open_orders[].auto_replaced | boolean | Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false. |
| result[].open_orders[].reduce_only | boolean | Optional (not added for spot). 'true for reduce-only orders only' |
| result[].open_orders[].amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result[].open_orders[].risk_reducing | boolean | true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false. |
| result[].open_orders[].instrument_name | string | Unique instrument identifier |
| result[].open_orders[].trigger_fill_condition | string | The fill condition of the linked order (Only for linked order types), default: first_hit."first_hit" - any execution of the primary order will fully cancel/place all secondary orders."complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders."incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size. |
| result[].open_orders[].primary_order_id | string | Unique order identifier result[].positions array of object |
| result[].positions[].average_price | number | Average price of trades that built this position |
| result[].positions[].average_price_usd | number | Only for options, average price in USD |
| result[].positions[].delta | number | Delta parameter |
| result[].positions[].direction | string | Direction: buy, sell or zero |
| result[].positions[].floating_profit_loss | number | Floating profit or loss |
| result[].positions[].floating_profit_loss_usd | number | Only for options, floating profit or loss in USD |
| result[].positions[].gamma | number | Only for options, Gamma parameter |
| result[].positions[].index_price | number | Current index price |
| result[].positions[].initial_margin | number | Initial margin |
| result[].positions[].instrument_name | string | Unique instrument identifier |
| result[].positions[].interest_value | number | Value used to calculate realized_funding (perpetual only) |
| result[].positions[].kind | string | Instrument kind: "future", "option", "spot", "future_combo", "option_combo" |
| result[].positions[].leverage | integer | Current available leverage for future position |
| result[].positions[].maintenance_margin | number | Maintenance margin |
| result[].positions[].mark_price | number | Current mark price for position's instrument |
| result[].positions[].realized_funding | number | Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments |
| result[].positions[].realized_profit_loss | number | Realized profit or loss |
| result[].positions[].settlement_price | number | Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet |
| result[].positions[].size | number | Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC) |
| result[].positions[].size_currency | number | Only for futures, position size in base currency |
| result[].positions[].theta | number | Only for options, Theta parameter |
| result[].positions[].total_profit_loss | number | Profit or loss from position |
| result[].positions[].vega | number | Only for options, Vega parameter |
| result[].uid | integer | Account/Subaccount identifier |