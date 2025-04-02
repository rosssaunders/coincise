Trading
=======

/private/buy
------------

Places a buy order for an instrument.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| amount | false | number |  | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. The <code>amount</code> is a mandatory parameter if <code>contracts</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| contracts | false | number |  | It represents the requested order size in contract units and can be passed instead of <code>amount</code>. The <code>contracts</code> is a mandatory parameter if <code>amount</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| type | false | string | <code>limit</code><br><code>stop_limit</code><br><code>take_limit</code><br><code>market</code><br><code>stop_market</code><br><code>take_market</code><br><code>market_limit</code><br><code>trailing_stop</code> | The order type, default: <code>"limit"</code> 
| label | false | string |  | user defined label for the order (maximum 64 characters) 
| price | false | number |  | <p>The order price in base currency (Only for limit and stop_limit orders)</p><p>When adding an order with advanced=usd, the field price should be the option price value in USD.</p><p>When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%</p> 
| time_in_force | false | string | <code>good_til_cancelled</code><br><code>good_til_day</code><br><code>fill_or_kill</code><br><code>immediate_or_cancel</code> | <p>Specifies how long the order remains in effect. Default <code>"good_til_cancelled"</code></p><ul><li><code>"good_til_cancelled"</code> - unfilled order remains in order book until cancelled</li><li><code>"good_til_day"</code> - unfilled order remains in order book till the end of the trading session</li><li><code>"fill_or_kill"</code> - execute a transaction immediately and completely or not at all</li><li><code>"immediate_or_cancel"</code> - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled</li></ul> 
| max_show | false | number |  | Maximum amount within an order to be shown to other customers, <code>0</code> for invisible order 
| post_only | false | boolean |  | <p>If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the spread.</p><p>Only valid in combination with time_in_force=<code>"good_til_cancelled"</code></p> 
| reject_post_only | false | boolean |  | <p>If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.</p><p>Only valid in combination with <code>"post_only"</code> set to true</p> 
| reduce_only | false | boolean |  | If <code>true</code>, the order is considered reduce-only which is intended to only reduce a current position 
| trigger_price | false | number |  | Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) 
| trigger_offset | false | number |  | The maximum deviation from the price peak beyond which the order will be triggered 
| trigger | false | string | <code>index_price</code><br><code>mark_price</code><br><code>last_price</code> | Defines the trigger type. Required for <code>"Stop-Loss"</code>, <code>"Take-Profit"</code> and <code>"Trailing"</code> trigger orders 
| advanced | false | string | <code>usd</code><br><code>implv</code> | Advanced option order type. (Only for options. Advanced USD orders are not supported for linear options.) 
| mmp | false | boolean |  | Order MMP flag, only for order_type 'limit' 
| valid_until | false | integer |  | Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases <code>timed_out</code> error will be responded. Remember that the given timestamp should be consistent with the server's time, use <a href="index.html#public-get_time">/public/time</a> method to obtain current server time. 
| linked_order_type | false | string | <code>one_triggers_other</code><br><code>one_cancels_other</code><br><code>one_triggers_one_cancels_other</code> | <p>The type of the linked order.</p><ul><li><code>"one_triggers_other"</code> - Execution of primary order triggers the placement of one or more secondary orders.</li><li><code>"one_cancels_other"</code> - The execution of one order in a pair automatically cancels the other, typically used to set a stop-loss and take-profit simultaneously.</li><li><code>"one_triggers_one_cancels_other"</code> - The execution of a primary order triggers two secondary orders (a stop-loss and take-profit pair), where the execution of one secondary order cancels the other.</li></ul> 
| trigger_fill_condition | false | string | <code>first_hit</code><br><code>complete_fill</code><br><code>incremental</code> | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| otoco_config | false | array of objects |  | <p>List of trades to create or cancel when this order is filled.</p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | false | number |  | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | true | string | <code>buy</code><br><code>sell</code> | Direction of trade from the maker perspective 
| &nbsp;&nbsp;›&nbsp;&nbsp;type | false | string | <code>limit</code><br><code>stop_limit</code><br><code>take_limit</code><br><code>market</code><br><code>stop_market</code><br><code>take_market</code><br><code>market_limit</code><br><code>trailing_stop</code> | The order type, default: <code>"limit"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | false | string |  | user defined label for the order (maximum 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | false | number |  | <p>The order price in base currency (Only for limit and stop_limit orders)</p><p>When adding an order with advanced=usd, the field price should be the option price value in USD.</p><p>When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%</p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | false | boolean |  | If <code>true</code>, the order is considered reduce-only which is intended to only reduce a current position 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | false | string | <code>good_til_cancelled</code><br><code>good_til_day</code><br><code>fill_or_kill</code><br><code>immediate_or_cancel</code> | <p>Specifies how long the order remains in effect. Default <code>"good_til_cancelled"</code></p><ul><li><code>"good_til_cancelled"</code> - unfilled order remains in order book until cancelled</li><li><code>"good_til_day"</code> - unfilled order remains in order book till the end of the trading session</li><li><code>"fill_or_kill"</code> - execute a transaction immediately and completely or not at all</li><li><code>"immediate_or_cancel"</code> - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | false | boolean |  | <p>If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (according to the direction of the order).</p><p>Only valid in combination with time_in_force=<code>"good_til_cancelled"</code></p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | false | boolean |  | <p>If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.</p><p>Only valid in combination with <code>"post_only"</code> set to true</p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | false | number |  | Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | false | number |  | The maximum deviation from the price peak beyond which the order will be triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | false | string | <code>index_price</code><br><code>mark_price</code><br><code>last_price</code> | Defines the trigger type. Required for <code>"Stop-Loss"</code>, <code>"Take-Profit"</code> and <code>"Trailing"</code> trigger orders 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/sell
-------------

Places a sell order for an instrument.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| amount | false | number |  | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. The <code>amount</code> is a mandatory parameter if <code>contracts</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| contracts | false | number |  | It represents the requested order size in contract units and can be passed instead of <code>amount</code>. The <code>contracts</code> is a mandatory parameter if <code>amount</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| type | false | string | <code>limit</code><br><code>stop_limit</code><br><code>take_limit</code><br><code>market</code><br><code>stop_market</code><br><code>take_market</code><br><code>market_limit</code><br><code>trailing_stop</code> | The order type, default: <code>"limit"</code> 
| label | false | string |  | user defined label for the order (maximum 64 characters) 
| price | false | number |  | <p>The order price in base currency (Only for limit and stop_limit orders)</p><p>When adding an order with advanced=usd, the field price should be the option price value in USD.</p><p>When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%</p> 
| time_in_force | false | string | <code>good_til_cancelled</code><br><code>good_til_day</code><br><code>fill_or_kill</code><br><code>immediate_or_cancel</code> | <p>Specifies how long the order remains in effect. Default <code>"good_til_cancelled"</code></p><ul><li><code>"good_til_cancelled"</code> - unfilled order remains in order book until cancelled</li><li><code>"good_til_day"</code> - unfilled order remains in order book till the end of the trading session</li><li><code>"fill_or_kill"</code> - execute a transaction immediately and completely or not at all</li><li><code>"immediate_or_cancel"</code> - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled</li></ul> 
| max_show | false | number |  | Maximum amount within an order to be shown to other customers, <code>0</code> for invisible order 
| post_only | false | boolean |  | <p>If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just above the spread.</p><p>Only valid in combination with time_in_force=<code>"good_til_cancelled"</code></p> 
| reject_post_only | false | boolean |  | <p>If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.</p><p>Only valid in combination with <code>"post_only"</code> set to true</p> 
| reduce_only | false | boolean |  | If <code>true</code>, the order is considered reduce-only which is intended to only reduce a current position 
| trigger_price | false | number |  | Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) 
| trigger_offset | false | number |  | The maximum deviation from the price peak beyond which the order will be triggered 
| trigger | false | string | <code>index_price</code><br><code>mark_price</code><br><code>last_price</code> | Defines the trigger type. Required for <code>"Stop-Loss"</code>, <code>"Take-Profit"</code> and <code>"Trailing"</code> trigger orders 
| advanced | false | string | <code>usd</code><br><code>implv</code> | Advanced option order type. (Only for options. Advanced USD orders are not supported for linear options.) 
| mmp | false | boolean |  | Order MMP flag, only for order_type 'limit' 
| valid_until | false | integer |  | Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases <code>timed_out</code> error will be responded. Remember that the given timestamp should be consistent with the server's time, use <a href="index.html#public-get_time">/public/time</a> method to obtain current server time. 
| linked_order_type | false | string | <code>one_triggers_other</code><br><code>one_cancels_other</code><br><code>one_triggers_one_cancels_other</code> | <p>The type of the linked order.</p><ul><li><code>"one_triggers_other"</code> - Execution of primary order triggers the placement of one or more secondary orders.</li><li><code>"one_cancels_other"</code> - The execution of one order in a pair automatically cancels the other, typically used to set a stop-loss and take-profit simultaneously.</li><li><code>"one_triggers_one_cancels_other"</code> - The execution of a primary order triggers two secondary orders (a stop-loss and take-profit pair), where the execution of one secondary order cancels the other.</li></ul> 
| trigger_fill_condition | false | string | <code>first_hit</code><br><code>complete_fill</code><br><code>incremental</code> | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| otoco_config | false | array of objects |  | <p>List of trades to create or cancel when this order is filled.</p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | false | number |  | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | true | string | <code>buy</code><br><code>sell</code> | Direction of trade from the maker perspective 
| &nbsp;&nbsp;›&nbsp;&nbsp;type | false | string | <code>limit</code><br><code>stop_limit</code><br><code>take_limit</code><br><code>market</code><br><code>stop_market</code><br><code>take_market</code><br><code>market_limit</code><br><code>trailing_stop</code> | The order type, default: <code>"limit"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | false | string |  | user defined label for the order (maximum 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | false | number |  | <p>The order price in base currency (Only for limit and stop_limit orders)</p><p>When adding an order with advanced=usd, the field price should be the option price value in USD.</p><p>When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%</p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | false | boolean |  | If <code>true</code>, the order is considered reduce-only which is intended to only reduce a current position 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | false | string | <code>good_til_cancelled</code><br><code>good_til_day</code><br><code>fill_or_kill</code><br><code>immediate_or_cancel</code> | <p>Specifies how long the order remains in effect. Default <code>"good_til_cancelled"</code></p><ul><li><code>"good_til_cancelled"</code> - unfilled order remains in order book until cancelled</li><li><code>"good_til_day"</code> - unfilled order remains in order book till the end of the trading session</li><li><code>"fill_or_kill"</code> - execute a transaction immediately and completely or not at all</li><li><code>"immediate_or_cancel"</code> - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | false | boolean |  | <p>If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (according to the direction of the order).</p><p>Only valid in combination with time_in_force=<code>"good_til_cancelled"</code></p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | false | boolean |  | <p>If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.</p><p>Only valid in combination with <code>"post_only"</code> set to true</p> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | false | number |  | Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | false | number |  | The maximum deviation from the price peak beyond which the order will be triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | false | string | <code>index_price</code><br><code>mark_price</code><br><code>last_price</code> | Defines the trigger type. Required for <code>"Stop-Loss"</code>, <code>"Take-Profit"</code> and <code>"Trailing"</code> trigger orders 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/edit
-------------

Change price, amount and/or other properties of an order.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| order_id | true | string |  | The order id 
| amount | false | number |  | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. The <code>amount</code> is a mandatory parameter if <code>contracts</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| contracts | false | number |  | It represents the requested order size in contract units and can be passed instead of <code>amount</code>. The <code>contracts</code> is a mandatory parameter if <code>amount</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| price | false | number |  | <p>The order price in base currency.</p><p>When editing an option order with advanced=usd, the field price should be the option price value in USD.</p><p>When editing an option order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%</p> 
| post_only | false | boolean |  | <p>If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (accordingly to the original order type).</p><p>Only valid in combination with time_in_force=<code>"good_til_cancelled"</code></p> 
| reduce_only | false | boolean |  | If <code>true</code>, the order is considered reduce-only which is intended to only reduce a current position 
| reject_post_only | false | boolean |  | <p>If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.</p><p>Only valid in combination with <code>"post_only"</code> set to true</p> 
| advanced | false | string | <code>usd</code><br><code>implv</code> | Advanced option order type. If you have posted an advanced option order, it is necessary to re-supply this parameter when editing it (Only for options) 
| trigger_price | false | number |  | Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) 
| trigger_offset | false | number |  | The maximum deviation from the price peak beyond which the order will be triggered 
| mmp | false | boolean |  | Order MMP flag, only for order_type 'limit' 
| valid_until | false | integer |  | Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases <code>timed_out</code> error will be responded. Remember that the given timestamp should be consistent with the server's time, use <a href="index.html#public-get_time">/public/time</a> method to obtain current server time. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/edit\_by\_label
------------------------

Change price, amount and/or other properties of an order with a given label. It works only when there is one open order with this label

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| label | false | string |  | user defined label for the order (maximum 64 characters) 
| instrument_name | true | string |  | Instrument name 
| amount | false | number |  | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. The <code>amount</code> is a mandatory parameter if <code>contracts</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| contracts | false | number |  | It represents the requested order size in contract units and can be passed instead of <code>amount</code>. The <code>contracts</code> is a mandatory parameter if <code>amount</code> parameter is missing. If both <code>contracts</code> and <code>amount</code> parameter are passed they must match each other otherwise error is returned. 
| price | false | number |  | <p>The order price in base currency.</p><p>When editing an option order with advanced=usd, the field price should be the option price value in USD.</p><p>When editing an option order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%</p> 
| post_only | false | boolean |  | <p>If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (accordingly to the original order type).</p><p>Only valid in combination with time_in_force=<code>"good_til_cancelled"</code></p> 
| reduce_only | false | boolean |  | If <code>true</code>, the order is considered reduce-only which is intended to only reduce a current position 
| reject_post_only | false | boolean |  | <p>If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.</p><p>Only valid in combination with <code>"post_only"</code> set to true</p> 
| advanced | false | string | <code>usd</code><br><code>implv</code> | Advanced option order type. If you have posted an advanced option order, it is necessary to re-supply this parameter when editing it (Only for options) 
| trigger_price | false | number |  | Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) 
| mmp | false | boolean |  | Order MMP flag, only for order_type 'limit' 
| valid_until | false | integer |  | Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases <code>timed_out</code> error will be responded. Remember that the given timestamp should be consistent with the server's time, use <a href="index.html#public-get_time">/public/time</a> method to obtain current server time. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/cancel
---------------

Cancel an order, specified by order id

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| order_id | true | string |  | The order id 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/cancel\_all
--------------------

This method cancels all users orders and trigger orders within all currencies and instrument kinds.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| detailed | false | boolean |  | When detailed is set to <code>true</code> output format is changed. See <a href="index.html#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods">description</a>. Default: <code>false</code> 
| freeze_quotes | false | boolean |  | Whether or not to reject incoming quotes for 1 second after cancelling (<code>false</code> by default). Related to <code>private/mass_quote</code> request. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled orders 

/private/cancel\_all\_by\_currency
----------------------------------

Cancels all orders by currency, optionally filtered by instrument kind and/or order type.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop</code><br><code>take</code><br><code>trailing_stop</code> | Order type - <code>limit</code>, <code>stop</code>, <code>take</code>, <code>trigger_all</code> or <code>all</code>, default - <code>all</code> 
| detailed | false | boolean |  | When detailed is set to <code>true</code> output format is changed. See <a href="index.html#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods">description</a>. Default: <code>false</code> 
| freeze_quotes | false | boolean |  | Whether or not to reject incoming quotes for 1 second after cancelling (<code>false</code> by default). Related to <code>private/mass_quote</code> request. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled orders 

/private/cancel\_all\_by\_currency\_pair
----------------------------------------

Cancels all orders by currency pair, optionally filtered by instrument kind and/or order type.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency_pair | true | string | <code>ada_usd</code><br><code>algo_usd</code><br><code>avax_usd</code><br><code>bch_usd</code><br><code>btc_usd</code><br><code>doge_usd</code><br><code>dot_usd</code><br><code>eth_usd</code><br><code>link_usd</code><br><code>ltc_usd</code><br><code>matic_usd</code><br><code>near_usd</code><br><code>shib_usd</code><br><code>sol_usd</code><br><code>steth_usd</code><br><code>trx_usd</code><br><code>uni_usd</code><br><code>usdc_usd</code><br><code>xrp_usd</code><br><code>paxg_usd</code><br><code>usde_usd</code><br><code>ada_usdc</code><br><code>bch_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>btc_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>bch_usdc</code><br><code>eth_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>matic_usdc</code><br><code>near_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>trx_usdc</code><br><code>usyc_usdc</code><br><code>uni_usdc</code><br><code>xrp_usdc</code><br><code>paxg_usdc</code><br><code>usde_usdc</code><br><code>ada_usdt</code><br><code>algo_usdt</code><br><code>avax_usdt</code><br><code>bch_usdt</code><br><code>bnb_usdt</code><br><code>bnb_usdt</code><br><code>btc_usdt</code><br><code>btc_usdt</code><br><code>doge_usdt</code><br><code>dot_usdt</code><br><code>eth_usdt</code><br><code>link_usdt</code><br><code>ltc_usdt</code><br><code>luna_usdt</code><br><code>matic_usdt</code><br><code>near_usdt</code><br><code>shib_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>trx_usdt</code><br><code>uni_usdt</code><br><code>xrp_usdt</code><br><code>paxg_usdt</code><br><code>usde_usdt</code><br><code>btcdvol_usdc</code><br><code>ethdvol_usdc</code><br><code>steth_eth</code><br><code>paxg_btc</code><br><code>btc_usyc</code><br><code>eth_usyc</code><br><code>btc_usde</code><br><code>eth_usde</code> | The currency pair symbol 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop</code><br><code>take</code><br><code>trailing_stop</code> | Order type - <code>limit</code>, <code>stop</code>, <code>take</code>, <code>trigger_all</code> or <code>all</code>, default - <code>all</code> 
| detailed | false | boolean |  | When detailed is set to <code>true</code> output format is changed. See <a href="index.html#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods">description</a>. Default: <code>false</code> 
| freeze_quotes | false | boolean |  | Whether or not to reject incoming quotes for 1 second after cancelling (<code>false</code> by default). Related to <code>private/mass_quote</code> request. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled orders 

/private/cancel\_all\_by\_instrument
------------------------------------

Cancels all orders by instrument, optionally filtered by order type.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop</code><br><code>take</code><br><code>trailing_stop</code> | Order type - <code>limit</code>, <code>stop</code>, <code>take</code>, <code>trigger_all</code> or <code>all</code>, default - <code>all</code> 
| detailed | false | boolean |  | When detailed is set to <code>true</code> output format is changed. See <a href="index.html#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods">description</a>. Default: <code>false</code> 
| include_combos | false | boolean |  | When set to <code>true</code> orders in combo instruments affecting a given position will also be cancelled. Default: <code>false</code> 
| freeze_quotes | false | boolean |  | Whether or not to reject incoming quotes for 1 second after cancelling (<code>false</code> by default). Related to <code>private/mass_quote</code> request. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled orders 

/private/cancel\_all\_by\_kind\_or\_type
----------------------------------------

Cancels all orders in currency(currencies), optionally filtered by instrument kind and/or order type.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string or array of strings |  | The currency symbol, list of currency symbols or <code>"any"</code> for all 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop</code><br><code>take</code><br><code>trailing_stop</code> | Order type - <code>limit</code>, <code>stop</code>, <code>take</code>, <code>trigger_all</code> or <code>all</code>, default - <code>all</code> 
| detailed | false | boolean |  | When detailed is set to <code>true</code> output format is changed. See <a href="index.html#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods">description</a>. Default: <code>false</code> 
| freeze_quotes | false | boolean |  | Whether or not to reject incoming quotes for 1 second after cancelling (<code>false</code> by default). Related to <code>private/mass_quote</code> request. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled orders 

/private/cancel\_by\_label
--------------------------

Cancels orders by label. All user's orders (trigger orders too), with a given label are cancelled in all currencies or in one given currency (in this case currency queue is used)

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| label | true | string |  | user defined label for the order (maximum 64 characters) 
| currency | false | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled orders 

/private/cancel\_quotes
-----------------------

Cancels quotes based on the provided type. `delta` cancels quotes within a Delta range defined by `min_delta` and `max_delta`. `quote_set_id` cancels quotes by a specific Quote Set identifier. `instrument` cancels all quotes associated with a particular instrument. `kind` cancels all quotes for a certain instrument kind. `currency` cancels all quotes in a specified currency. `currency_pair` cancels all quotes in a specified currency pair. `all` cancels all quotes.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| detailed | false | boolean |  | When detailed is set to <code>true</code> output format is changed. See <a href="index.html#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods">description</a>. Default: <code>false</code> 
| freeze_quotes | false | boolean |  | Whether or not to reject incoming quotes for 1 second after cancelling (<code>false</code> by default). Related to <code>private/mass_quote</code> request. 
| cancel_type | true | string | <code>delta</code><br><code>quote_set_id</code><br><code>instrument</code><br><code>instrument_kind</code><br><code>currency</code><br><code>currency_pair</code><br><code>all</code> | Type of cancel criteria. 
| min_delta | false | number |  | Min delta to cancel by delta (for <code>cancel_type</code>: <code>delta</code>). 
| max_delta | false | number |  | Max delta to cancel by delta (for <code>cancel_type</code>: <code>delta</code>). 
| quote_set_id | false | string |  | Unique identifier for the Quote set. 
| instrument_name | false | string |  | Instrument name. 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| currency_pair | true | string | <code>ada_usd</code><br><code>algo_usd</code><br><code>avax_usd</code><br><code>bch_usd</code><br><code>btc_usd</code><br><code>doge_usd</code><br><code>dot_usd</code><br><code>eth_usd</code><br><code>link_usd</code><br><code>ltc_usd</code><br><code>matic_usd</code><br><code>near_usd</code><br><code>shib_usd</code><br><code>sol_usd</code><br><code>steth_usd</code><br><code>trx_usd</code><br><code>uni_usd</code><br><code>usdc_usd</code><br><code>xrp_usd</code><br><code>paxg_usd</code><br><code>usde_usd</code><br><code>ada_usdc</code><br><code>bch_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>btc_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>bch_usdc</code><br><code>eth_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>matic_usdc</code><br><code>near_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>trx_usdc</code><br><code>usyc_usdc</code><br><code>uni_usdc</code><br><code>xrp_usdc</code><br><code>paxg_usdc</code><br><code>usde_usdc</code><br><code>ada_usdt</code><br><code>algo_usdt</code><br><code>avax_usdt</code><br><code>bch_usdt</code><br><code>bnb_usdt</code><br><code>bnb_usdt</code><br><code>btc_usdt</code><br><code>btc_usdt</code><br><code>doge_usdt</code><br><code>dot_usdt</code><br><code>eth_usdt</code><br><code>link_usdt</code><br><code>ltc_usdt</code><br><code>luna_usdt</code><br><code>matic_usdt</code><br><code>near_usdt</code><br><code>shib_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>trx_usdt</code><br><code>uni_usdt</code><br><code>xrp_usdt</code><br><code>paxg_usdt</code><br><code>usde_usdt</code><br><code>btcdvol_usdc</code><br><code>ethdvol_usdc</code><br><code>steth_eth</code><br><code>paxg_btc</code><br><code>btc_usyc</code><br><code>eth_usyc</code><br><code>btc_usde</code><br><code>eth_usde</code> | The currency pair symbol 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | number | Total number of successfully cancelled quotes 

/private/close\_position
------------------------

Makes closing position reduce only order .

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| type | true | string | <code>limit</code><br><code>market</code> | The order type 
| price | false | number |  | Optional price for limit order. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/get\_margins
---------------------

Get margins for a given instrument, amount and price.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| amount | true | number |  | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| price | true | number |  | Price 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;buy | number | Margin when buying 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_price | number | The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum. 
| &nbsp;&nbsp;›&nbsp;&nbsp;min_price | number | The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum. 
| &nbsp;&nbsp;›&nbsp;&nbsp;sell | number | Margin when selling 

/private/get\_mmp\_config
-------------------------

Get MMP configuration for an index, if the parameter is not provided, a list of all MMP configurations is returned. Empty list means no MMP configuration.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| index_name | false | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>btc_usdc</code><br><code>eth_usdc</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>matic_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>xrp_usdc</code><br><code>usde_usdc</code><br><code>buidl_usdc</code><br><code>ada_usdt</code><br><code>algo_usdt</code><br><code>avax_usdt</code><br><code>bch_usdt</code><br><code>bnb_usdt</code><br><code>btc_usdt</code><br><code>doge_usdt</code><br><code>dot_usdt</code><br><code>eth_usdt</code><br><code>link_usdt</code><br><code>ltc_usdt</code><br><code>luna_usdt</code><br><code>matic_usdt</code><br><code>near_usdt</code><br><code>shib_usdt</code><br><code>sol_usdt</code><br><code>trx_usdt</code><br><code>uni_usdt</code><br><code>xrp_usdt</code><br><code>btcdvol_usdc</code><br><code>ethdvol_usdc</code> | Index identifier of derivative instrument on the platform; skipping this parameter will return all configurations 
| mmp_group | false | string |  | Specifies the MMP group for which the configuration is being retrieved. MMP groups are used for Mass Quotes. If MMP group is not provided, the endpoint returns the configuration for the MMP settings for regular orders. The index_name must be specified before using this parameter 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;delta_limit | number | Delta limit 
| &nbsp;&nbsp;›&nbsp;&nbsp;frozen_time | integer | MMP frozen time in seconds, if set to 0 manual reset is required 
| &nbsp;&nbsp;›&nbsp;&nbsp;index_name | string | Index identifier, matches (base) cryptocurrency with quote currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;interval | integer | MMP Interval in seconds, if set to 0 MMP is disabled 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Specified MMP Group 
| &nbsp;&nbsp;›&nbsp;&nbsp;quantity_limit | number | Quantity limit 
| &nbsp;&nbsp;›&nbsp;&nbsp;vega_limit | number | Vega limit 

/private/get\_open\_orders
--------------------------

Retrieves list of user's open orders across many currencies.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code> | Instrument kind, if not provided instruments of all kinds are considered 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop_all</code><br><code>stop_limit</code><br><code>stop_market</code><br><code>take_all</code><br><code>take_limit</code><br><code>take_market</code><br><code>trailing_all</code><br><code>trailing_stop</code> | Order type, default - <code>all</code> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_open\_orders\_by\_currency
----------------------------------------

Retrieves list of user's open orders.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code> | Instrument kind, if not provided instruments of all kinds are considered 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop_all</code><br><code>stop_limit</code><br><code>stop_market</code><br><code>take_all</code><br><code>take_limit</code><br><code>take_market</code><br><code>trailing_all</code><br><code>trailing_stop</code> | Order type, default - <code>all</code> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_open\_orders\_by\_instrument
------------------------------------------

Retrieves list of user's open orders within a given Instrument.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| type | false | string | <code>all</code><br><code>limit</code><br><code>trigger_all</code><br><code>stop_all</code><br><code>stop_limit</code><br><code>stop_market</code><br><code>take_all</code><br><code>take_limit</code><br><code>take_market</code><br><code>trailing_all</code><br><code>trailing_stop</code> | Order type, default - <code>all</code> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_open\_orders\_by\_label
-------------------------------------

Retrieves list of user's open orders for given currency and label.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| label | false | string |  | user defined label for the order (maximum 64 characters) 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_order\_history\_by\_currency
------------------------------------------

Retrieves history of orders that have been partially or fully filled.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| count | false | integer |  | Number of requested items, default - <code>20</code> 
| offset | false | integer |  | The offset for pagination, default - <code>0</code> 
| include_old | false | boolean |  | Include in result orders older than 2 days, default - <code>false</code> 
| include_unfilled | false | boolean |  | Include in result fully unfilled closed orders, default - <code>false</code> 
| with_continuation | false | boolean |  | When set to true, the API response format changes from a simple list of orders to an object containing the orders and a continuation token. 
| continuation | false | string |  | Continuation token for pagination 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_order\_history\_by\_instrument
--------------------------------------------

Retrieves history of orders that have been partially or fully filled.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| count | false | integer |  | Number of requested items, default - <code>20</code> 
| offset | false | integer |  | The offset for pagination, default - <code>0</code> 
| include_old | false | boolean |  | Include in result orders older than 2 days, default - <code>false</code> 
| include_unfilled | false | boolean |  | Include in result fully unfilled closed orders, default - <code>false</code> 
| with_continuation | false | boolean |  | When set to true, the API response format changes from a simple list of orders to an object containing the orders and a continuation token. 
| continuation | false | string |  | Continuation token for pagination 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_order\_margin\_by\_ids
------------------------------------

Retrieves initial margins of given orders

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| ids | true | array |  | Ids of orders 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;initial_margin | number | Initial margin of order 
| &nbsp;&nbsp;›&nbsp;&nbsp;initial_margin_currency | string | Currency of initial margin 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 

/private/get\_order\_state
--------------------------

Retrieve the current state of an order.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| order_id | true | string |  | The order id 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_order\_state\_by\_label
-------------------------------------

Retrieve the state of recent orders with a given label.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| label | false | string |  | user defined label for the order (maximum 64 characters) 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 

/private/get\_trigger\_order\_history
-------------------------------------

Retrieves detailed log of the user's trigger orders.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| instrument_name | false | string |  | Instrument name 
| count | false | integer |  | Number of requested items, default - <code>20</code> 
| continuation | false | string |  | Continuation token for pagination 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation | string | Continuation token for pagination. 
| &nbsp;&nbsp;›&nbsp;&nbsp;entries | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"triggered"</code>, <code>"cancelled"</code>, or <code>"rejected"</code> with rejection reason (e.g. <code>"rejected:reduce_direction"</code>). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Requested order type: <code>"limit</code> or <code>"market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;request | string | Type of last request performed on the trigger order by user or system. <code>"cancel"</code> - when order was cancelled, <code>"trigger:order"</code> - when trigger order spawned market or limit order after being triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;source | string | Source of the order that is linked to the trigger order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the user order used for the trigger-order reference before triggering 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 

/private/get\_user\_trades\_by\_currency
----------------------------------------

Retrieve the latest user trades that have occurred for instruments in a specific currency symbol. To read subaccount trades, use `subaccount_id` parameter.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| start_id | false | string |  | The ID of the first trade to be returned. Number for BTC trades, or hyphen name in ex. <code>"ETH-15"</code> # <code>"ETH_USDC-16"</code> 
| end_id | false | string |  | The ID of the last trade to be returned. Number for BTC trades, or hyphen name in ex. <code>"ETH-15"</code> # <code>"ETH_USDC-16"</code> 
| count | false | integer |  | Number of requested items, default - <code>10</code> 
| start_timestamp | false | integer |  | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest 
| end_timestamp | false | integer |  | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required 
| sorting | false | string | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database) 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 
| subaccount_id | false | integer |  | The user id for the subaccount 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more | boolean |  
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/get\_user\_trades\_by\_currency\_and\_time
---------------------------------------------------

Retrieve the latest user trades that have occurred for instruments in a specific currency symbol and within a given time range.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| kind | false | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered 
| start_timestamp | true | integer |  | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest 
| end_timestamp | true | integer |  | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required 
| count | false | integer |  | Number of requested items, default - <code>10</code> 
| sorting | false | string | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database) 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more | boolean |  
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/get\_user\_trades\_by\_instrument
------------------------------------------

Retrieve the latest user trades that have occurred for a specific instrument.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| start_seq | false | integer |  | The sequence number of the first trade to be returned 
| end_seq | false | integer |  | The sequence number of the last trade to be returned 
| count | false | integer |  | Number of requested items, default - <code>10</code> 
| start_timestamp | false | integer |  | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest 
| end_timestamp | false | integer |  | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 
| sorting | false | string | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database) 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more | boolean |  
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/get\_user\_trades\_by\_instrument\_and\_time
-----------------------------------------------------

Retrieve the latest user trades that have occurred for a specific instrument and within a given time range.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| start_timestamp | true | integer |  | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest 
| end_timestamp | true | integer |  | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required 
| count | false | integer |  | Number of requested items, default - <code>10</code> 
| sorting | false | string | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database) 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more | boolean |  
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/get\_user\_trades\_by\_order
-------------------------------------

Retrieve the list of user trades that was created for given order

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| order_id | true | string |  | The order id 
| sorting | false | string | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database) 
| historical | false | boolean |  | <p>Determines whether historical trade and order records should be retrieved.</p><ul><li><code>false</code> (default): Returns recent records: orders for 30 min, trades for 24h.</li><li><code>true</code>: Fetches historical records, available after a short delay due to indexing. Recent data is not included.</li></ul> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| array of | trade_id | string 
| tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| api | boolean | <code>true</code> if user order was created with API 
| advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| post_only | string | <code>true</code> if user order is post-only 
| direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| mmp | boolean | <code>true</code> if user order is MMP 
| fee | number | User's fee in units of the specified <code>fee_currency</code> 
| quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| index_price | number | Index Price at the moment of trade 
| label | string | User defined label (presented only when previously set for order by user) 
| block_trade_id | string | Block trade id - when trade was part of a block trade 
| price | number | Price in base currency 
| combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| matching_id | string | Always <code>null</code> 
| order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| profit_loss | number | Profit and loss in base currency. 
| timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| iv | number | Option implied volatility for the price (Option only) 
| state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| mark_price | number | Mark Price at the moment of trade 
| block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| reduce_only | string | <code>true</code> if user order is reduce-only 
| amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| trade_seq | integer | The sequence number of the trade within instrument 
| risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| instrument_name | string | Unique instrument identifier 
| legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/mass\_quote
--------------------

Place buy and/or sell orders on one or more instruments. This endpoint can only be used after approval from the administrators.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| wait_for_response | false | boolean |  | If false, the response is sent immediately after the risk check. If true, the response is sent after the orders all go through the matching engine. Default - <code>true</code>. 
| detailed | false | boolean |  | Flag to receive a list of all order changes and a list of errors, or to only receive a list of errors. Default - <code>false</code>. 
| quote_id | true | string |  | Identifier of a mass quote message. Can be used to match trades to requests. We recommend using an incrementing counter. 
| mmp_group | true | string |  | Name of the MMP group. An MMP group has to be used and only one quote can exist per instrument per side per MMP group. 
| valid_until | false | integer |  | Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases <code>timed_out</code> error will be responded. Remember that the given timestamp should be consistent with the server's time, use <a href="index.html#public-get_time">/public/time</a> method to obtain current server time. 
| quotes | true | array of objects |  | List of quotes. 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | true | string |  | The name of the instrument. 
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | true | string |  | User-defined label that can be used for targeted cancels using private/cancel_quotes. 
| &nbsp;&nbsp;›&nbsp;&nbsp;ask | false | object |  | Order details for the ask. If not provided, <code>bid</code> must be present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | false | number |  | The price of this side of the quote. If no price is supplied, only the amount is amended. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | false | number |  | The amount of this side of the quote. If no quantity is supplied, only the price is amended. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | false | boolean |  | If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the spread. Default - <code>false</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | false | boolean |  | If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected. Only valid in combination with "post_only" set to <code>true</code>. Default value - <code>false</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;bid | false | object |  | Order details for the bid. If not provided, <code>ask</code> must be present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | false | number |  | The price of this side of the quote. If no price is supplied, only the amount is amended. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | false | number |  | The amount of this side of the quote. If no quantity is supplied, only the price is amended. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | false | boolean |  | If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the spread. Default - <code>false</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | false | boolean |  | If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected. Only valid in combination with "post_only" set to <code>true</code>. Default value - <code>false</code> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;errors | array of <em>object</em> | List of errors (present when <code>detailed</code> : <code>true</code>). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;code | int | Error code 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;error | object | Error data. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Instrument name. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;message | string | Error message. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;side | string | Quote side - <code>bid</code> or <code>ask</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;errors_count | int | Number of errors (present when <code>detailed</code> : <code>false</code>). 
| &nbsp;&nbsp;›&nbsp;&nbsp;orders | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote | boolean | If order is a quote. Present only if true. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;triggered | boolean | Whether the trigger order has been triggered 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mobile | boolean | optional field with value <code>true</code> added only when created with Mobile Application 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;app_name | string | The name of the application that placed the order on behalf of the user (optional). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;implv | number | Implied volatility in percent. (Only if <code>advanced="implv"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;usd | number | Option price in USD (Only if <code>advanced="usd"</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oto_order_ids | array of string | The Ids of the orders that will be triggered if the order is filled 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;average_price | number | Average fill price of the order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | advanced type: <code>"usd"</code> or <code>"implv"</code> (Only for options; field is omitted if not applicable). 
|  |  |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | boolean | <code>true</code> for post-only orders only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;filled_amount | number | Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger | string | Trigger type (only for trigger orders). Allowed values: <code>"index_price"</code>, <code>"mark_price"</code>, <code>"last_price"</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_order_id | string | Id of the trigger order that created the order (Only for orders that were created by triggered orders). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | It represents the order size in contract units. (Optional, may be absent in historical data). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_secondary_oto | boolean | <code>true</code> if the order is an order that can be triggered by another order, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;replaced | boolean | <code>true</code> if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Name of the MMP group supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if the order is a MMP order, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_update_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;cancel_reason | string | Enumerated reason behind cancel <code>"user_request"</code>, <code>"autoliquidation"</code>, <code>"cancel_on_disconnect"</code>, <code>"risk_mitigation"</code>, <code>"pme_risk_reduction"</code> (portfolio margining risk reduction), <code>"pme_account_locked"</code> (portfolio margining account locked per currency), <code>"position_locked"</code>, <code>"mmp_trigger"</code> (market maker protection), <code>"mmp_config_curtailment"</code> (market maker configured quantity decreased), <code>"edit_post_only_reject"</code> (cancelled on edit because of <code>reject_post_only</code> setting), <code>"oco_other_closed"</code> (the oco order linked to this order was closed), <code>"oto_primary_closed"</code> (the oto primary order that was going to trigger this order was cancelled), <code>"settlement"</code> (closed because of a settlement) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp_cancelled | boolean | <code>true</code> if order was cancelled by mmp trigger (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | The same QuoteID as supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_rebalance | boolean | Optional (only for spot). <code>true</code> if order was automatically created during cross-collateral balance restoration 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reject_post_only | boolean | <code>true</code> if order has <code>reject_post_only</code> flag (field is present only when <code>post_only</code> is <code>true</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (up to 64 characters) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_liquidation | boolean | Optional (not added for spot). <code>true</code> if order was automatically created during liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number or string | Price in base currency or "market_price" in case of open trigger market orders 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;web | boolean | <code>true</code> if created via Deribit frontend (optional) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;time_in_force | string | Order time in force: <code>"good_til_cancelled"</code>, <code>"good_til_day"</code>, <code>"fill_or_kill"</code> or <code>"immediate_or_cancel"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_reference_price | number | The price of the given trigger at the time when the order was placed (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit"</code>, <code>"market"</code>, <code>"stop_limit"</code>, <code>"stop_market"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_primary_otoco | boolean | <code>true</code> if the order is an order that can trigger an OCO pair, otherwise not present. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;original_order_type | string | Original order type. Optional field 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade | boolean | <code>true</code> if order made from block_trade trade, added only in that case. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_price | number | Trigger price (Only for future trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;oco_ref | string | Unique reference that identifies a one_cancels_others (OCO) pair. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_offset | number | The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | Identifier of the QuoteSet supplied in the <code>private/mass_quote</code> request. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;auto_replaced | boolean | Options, advanced orders only - <code>true</code> if last modification of the order was performed by the pricing engine, otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | boolean | Optional (not added for spot). '<code>true</code> for reduce-only orders only' 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;max_show | number | Maximum amount within an order to be shown to other traders, 0 for invisible order. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise <code>false</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trigger_fill_condition | string | <p>The fill condition of the linked order (Only for linked order types), default: <code>first_hit</code>.</p><ul><li><code>"first_hit"</code> - any execution of the primary order will fully cancel/place all secondary orders.</li><li><code>"complete_fill"</code> - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.</li><li><code>"incremental"</code> - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.</li></ul> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;primary_order_id | string | Unique order identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;pending_requests | array of <em>object</em> | List of pending quotes (present when <code>wait_for_response</code>: <code>false</code> and <code>detailed</code> : <code>true</code>). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Instrument name. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;side | string | Quote side - <code>bid</code> or <code>ask</code>. 
| &nbsp;&nbsp;›&nbsp;&nbsp;pending_requests_count | int | Number of pending quotes (present when <code>wait_for_response</code>: <code>false</code> and <code>detailed</code> : <code>false</code>). 
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id | string | Unique (per currency) trade identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction | integer | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick). 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee_currency | string | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;api | boolean | <code>true</code> if user order was created with API 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;advanced | string | Advanced type of user order: <code>"usd"</code> or <code>"implv"</code> (only for options; omitted if not applicable) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_id | string | Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidity | string | Describes what was role of users order: <code>"M"</code> when it was maker order, <code>"T"</code> when it was taker order 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;post_only | string | <code>true</code> if user order is post-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts | number | Trade size in contract units (optional, may be absent in historical trades) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mmp | boolean | <code>true</code> if user order is MMP 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee | number | User's fee in units of the specified <code>fee_currency</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_id | string | QuoteID of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | Index Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;label | string | User defined label (presented only when previously set for order by user) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id | string | Block trade id - when trade was part of a block trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id | string | Optional field containing combo instrument name if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;matching_id | string | Always <code>null</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;order_type | string | Order type: <code>"limit</code>, <code>"market"</code>, or <code>"liquidation"</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | Profit and loss in base currency. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp of the trade (milliseconds since the UNIX epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv | number | Option implied volatility for the price (Option only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state | string | Order state: <code>"open"</code>, <code>"filled"</code>, <code>"rejected"</code>, <code>"cancelled"</code>, <code>"untriggered"</code> or <code>"archive"</code> (if order was archived) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;underlying_price | number | Underlying price for implied volatility calculations (Options only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_quote_id | integer | ID of the Block RFQ quote - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;quote_set_id | string | QuoteSet of the user order (optional, present only for orders placed with <code>private/mass_quote</code>) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | Mark Price at the moment of trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id | integer | ID of the Block RFQ - when trade was part of the Block RFQ 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id | number | Optional field containing combo trade identifier if the trade is a combo trade 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;reduce_only | string | <code>true</code> if user order is reduce-only 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation | string | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq | integer | The sequence number of the trade within instrument 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;risk_reducing | boolean | <code>true</code> if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;legs | array | Optional field containing leg trades if trade is a combo trade (present when querying for <strong>only</strong> combo trades and in <code>combo_trades</code> events) 

/private/move\_positions
------------------------

Moves positions from source subaccount to target subaccount

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | false | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| source_uid | true | integer |  | Id of source subaccount. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab 
| target_uid | true | integer |  | Id of target subaccount. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab 
| trades | true | array of objects |  | List of trades for position move 
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | true | string |  | Instrument name 
| &nbsp;&nbsp;›&nbsp;&nbsp;price | false | number |  | Price for trade - if not provided average price of the position is used 
| &nbsp;&nbsp;›&nbsp;&nbsp;amount | true | number |  | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. Amount can't exceed position size. 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;trades | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction | string | Direction: <code>buy</code>, or <code>sell</code> 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | Unique instrument identifier 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price | number | Price in base currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;source_uid | integer | Trade source uid 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;target_uid | integer | Trade target uid 

/private/reset\_mmp
-------------------

Reset MMP

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| index_name | true | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>btc_usdc</code><br><code>eth_usdc</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>matic_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>xrp_usdc</code><br><code>usde_usdc</code><br><code>buidl_usdc</code><br><code>ada_usdt</code><br><code>algo_usdt</code><br><code>avax_usdt</code><br><code>bch_usdt</code><br><code>bnb_usdt</code><br><code>btc_usdt</code><br><code>doge_usdt</code><br><code>dot_usdt</code><br><code>eth_usdt</code><br><code>link_usdt</code><br><code>ltc_usdt</code><br><code>luna_usdt</code><br><code>matic_usdt</code><br><code>near_usdt</code><br><code>shib_usdt</code><br><code>sol_usdt</code><br><code>trx_usdt</code><br><code>uni_usdt</code><br><code>xrp_usdt</code><br><code>btcdvol_usdc</code><br><code>ethdvol_usdc</code> | Index identifier of derivative instrument on the platform 
| mmp_group | false | string |  | Specifies the MMP group for which limits are being reset. If this parameter is omitted, the endpoint resets the traditional (no group) MMP limits 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | string | Result of method execution. <code>ok</code> in case of success 

/private/send\_rfq
------------------

Sends RFQ on a given instrument.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| amount | false | number |  | Amount 
| side | false | string | <code>buy</code><br><code>sell</code> | Side - <code>buy</code> or <code>sell</code> 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | string | Result of method execution. <code>ok</code> in case of success 

/private/set\_mmp\_config
-------------------------

Set config for MMP - triggers MMP reset

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| index_name | true | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>btc_usdc</code><br><code>eth_usdc</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>matic_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>xrp_usdc</code><br><code>usde_usdc</code><br><code>buidl_usdc</code><br><code>ada_usdt</code><br><code>algo_usdt</code><br><code>avax_usdt</code><br><code>bch_usdt</code><br><code>bnb_usdt</code><br><code>btc_usdt</code><br><code>doge_usdt</code><br><code>dot_usdt</code><br><code>eth_usdt</code><br><code>link_usdt</code><br><code>ltc_usdt</code><br><code>luna_usdt</code><br><code>matic_usdt</code><br><code>near_usdt</code><br><code>shib_usdt</code><br><code>sol_usdt</code><br><code>trx_usdt</code><br><code>uni_usdt</code><br><code>xrp_usdt</code><br><code>btcdvol_usdc</code><br><code>ethdvol_usdc</code> | Index identifier of derivative instrument on the platform 
| interval | true | integer |  | MMP Interval in seconds, if set to 0 MMP is removed 
| frozen_time | true | integer |  | MMP frozen time in seconds, if set to 0 manual reset is required 
| mmp_group | false | string |  | Designates the MMP group for which the configuration is being set. If the specified group is already associated with a different index_name, an error is returned. This parameter enables distinct configurations for each MMP group, linked to particular index_name 
| quantity_limit | false | number |  | Quantity limit, positive value 
| delta_limit | false | number |  | Delta limit, positive value 
| vega_limit | false | number |  | Vega limit, positive value 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;delta_limit | number | Delta limit 
| &nbsp;&nbsp;›&nbsp;&nbsp;frozen_time | integer | MMP frozen time in seconds, if set to 0 manual reset is required 
| &nbsp;&nbsp;›&nbsp;&nbsp;index_name | string | Index identifier, matches (base) cryptocurrency with quote currency 
| &nbsp;&nbsp;›&nbsp;&nbsp;interval | integer | MMP Interval in seconds, if set to 0 MMP is disabled 
| &nbsp;&nbsp;›&nbsp;&nbsp;mmp_group | string | Specified MMP Group 
| &nbsp;&nbsp;›&nbsp;&nbsp;quantity_limit | number | Quantity limit 
| &nbsp;&nbsp;›&nbsp;&nbsp;vega_limit | number | Vega limit 

/private/get\_settlement\_history\_by\_instrument
-------------------------------------------------

Retrieves public settlement, delivery and bankruptcy events filtered by instrument name

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string |  | Instrument name 
| type | false | string | <code>settlement</code><br><code>delivery</code><br><code>bankruptcy</code> | Settlement type 
| count | false | integer |  | Number of requested items, default - <code>20</code> 
| continuation | false | string |  | Continuation token for pagination 
| search_start_timestamp | false | integer |  | The latest timestamp to return result from (milliseconds since the UNIX epoch) 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation | string | Continuation token for pagination. 
| &nbsp;&nbsp;›&nbsp;&nbsp;settlements | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funded | number | funded amount (bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funding | number | funding (in base currency ; settlement for perpetual product only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | underlying index price at time of event (in quote currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | instrument name (settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | mark price for at the settlement time (in quote currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;position | number | position size (in quote currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | profit and loss (in base currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_bankruptcy | number | value of session bankruptcy (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_profit_loss | number | total value of session profit and losses (in base currency) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax | number | total amount of paid taxes/fees (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax_rate | number | rate of paid taxes/fees (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;socialized | number | the amount of the socialized losses (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;type | string | The type of settlement. <code>settlement</code>, <code>delivery</code> or <code>bankruptcy</code>. 

/private/get\_settlement\_history\_by\_currency
-----------------------------------------------

Retrieves settlement, delivery and bankruptcy events that have affected your account.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol 
| type | false | string | <code>settlement</code><br><code>delivery</code><br><code>bankruptcy</code> | Settlement type 
| count | false | integer |  | Number of requested items, default - <code>20</code> 
| continuation | false | string |  | Continuation token for pagination 
| search_start_timestamp | false | integer |  | The latest timestamp to return result from (milliseconds since the UNIX epoch) 

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request 
| jsonrpc | string | The JSON-RPC version (2.0) 
| result | <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation | string | Continuation token for pagination. 
| &nbsp;&nbsp;›&nbsp;&nbsp;settlements | array of <em>object</em> |  
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funded | number | funded amount (bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funding | number | funding (in base currency ; settlement for perpetual product only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number | underlying index price at time of event (in quote currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string | instrument name (settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price | number | mark price for at the settlement time (in quote currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;position | number | position size (in quote currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss | number | profit and loss (in base currency; settlement and delivery only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_bankruptcy | number | value of session bankruptcy (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_profit_loss | number | total value of session profit and losses (in base currency) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax | number | total amount of paid taxes/fees (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax_rate | number | rate of paid taxes/fees (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;socialized | number | the amount of the socialized losses (in base currency; bankruptcy only) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp | integer | The timestamp (milliseconds since the Unix epoch) 
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;type | string | The type of settlement. <code>settlement</code>, <code>delivery</code> or <code>bankruptcy</code>.