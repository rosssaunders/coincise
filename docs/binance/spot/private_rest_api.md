# Binance Spot Private REST API Documentation

Filters
=======

Filters define trading rules on a symbol or an exchange. Filters come in two forms: `symbol filters` and `exchange filters`.

Symbol filters[​](/docs/binance-spot-api-docs/filters#symbol-filters "Direct link to Symbol filters")
-----------------------------------------------------------------------------------------------------

### PRICE\_FILTER[​](/docs/binance-spot-api-docs/filters#price_filter "Direct link to PRICE_FILTER")

The `PRICE_FILTER` defines the `price` rules for a symbol. There are 3 parts:

*   `minPrice` defines the minimum `price`/`stopPrice` allowed; disabled on `minPrice` == 0.
*   `maxPrice` defines the maximum `price`/`stopPrice` allowed; disabled on `maxPrice` == 0.
*   `tickSize` defines the intervals that a `price`/`stopPrice` can be increased/decreased by; disabled on `tickSize` == 0.

Any of the above variables can be set to 0, which disables that rule in the `price filter`. In order to pass the `price filter`, the following must be true for `price`/`stopPrice` of the enabled rules:

*   `price` >= `minPrice`
*   `price` <= `maxPrice`
*   `price` % `tickSize` == 0

**/exchangeInfo format:**

```
{  "filterType": "PRICE_FILTER",  "minPrice": "0.00000100",  "maxPrice": "100000.00000000",  "tickSize": "0.00000100"}
```

### PERCENT\_PRICE[​](/docs/binance-spot-api-docs/filters#percent_price "Direct link to PERCENT_PRICE")

The `PERCENT_PRICE` filter defines the valid range for the price based on the average of the previous trades. `avgPriceMins` is the number of minutes the average price is calculated over. 0 means the last price is used.

In order to pass the `percent price`, the following must be true for `price`:

*   `price` <= `weightedAveragePrice` \* `multiplierUp`
*   `price` >= `weightedAveragePrice` \* `multiplierDown`

**/exchangeInfo format:**

```
{  "filterType": "PERCENT_PRICE",  "multiplierUp": "1.3000",  "multiplierDown": "0.7000",  "avgPriceMins": 5}
```

### PERCENT\_PRICE\_BY\_SIDE[​](/docs/binance-spot-api-docs/filters#percent_price_by_side "Direct link to PERCENT_PRICE_BY_SIDE")

The `PERCENT_PRICE_BY_SIDE` filter defines the valid range for the price based on the average of the previous trades.  
`avgPriceMins` is the number of minutes the average price is calculated over. 0 means the last price is used.  
There is a different range depending on whether the order is placed on the `BUY` side or the `SELL` side.

Buy orders will succeed on this filter if:

*   `Order price` <= `weightedAveragePrice` \* `bidMultiplierUp`
*   `Order price` >= `weightedAveragePrice` \* `bidMultiplierDown`

Sell orders will succeed on this filter if:

*   `Order Price` <= `weightedAveragePrice` \* `askMultiplierUp`
*   `Order Price` >= `weightedAveragePrice` \* `askMultiplierDown`

**/exchangeInfo format:**

```
  {    "filterType": "PERCENT_PRICE_BY_SIDE",    "bidMultiplierUp": "1.2",    "bidMultiplierDown": "0.2",    "askMultiplierUp": "5",    "askMultiplierDown": "0.8",    "avgPriceMins": 1  }
```

### LOT\_SIZE[​](/docs/binance-spot-api-docs/filters#lot_size "Direct link to LOT_SIZE")

The `LOT_SIZE` filter defines the `quantity` (aka "lots" in auction terms) rules for a symbol. There are 3 parts:

*   `minQty` defines the minimum `quantity`/`icebergQty` allowed.
*   `maxQty` defines the maximum `quantity`/`icebergQty` allowed.
*   `stepSize` defines the intervals that a `quantity`/`icebergQty` can be increased/decreased by.

In order to pass the `lot size`, the following must be true for `quantity`/`icebergQty`:

*   `quantity` >= `minQty`
*   `quantity` <= `maxQty`
*   `quantity` % `stepSize` == 0

**/exchangeInfo format:**

```
{  "filterType": "LOT_SIZE",  "minQty": "0.00100000",  "maxQty": "100000.00000000",  "stepSize": "0.00100000"}
```

### MIN\_NOTIONAL[​](/docs/binance-spot-api-docs/filters#min_notional "Direct link to MIN_NOTIONAL")

The `MIN_NOTIONAL` filter defines the minimum notional value allowed for an order on a symbol. An order's notional value is the `price` \* `quantity`. `applyToMarket` determines whether or not the `MIN_NOTIONAL` filter will also be applied to `MARKET` orders. Since `MARKET` orders have no price, the average price is used over the last `avgPriceMins` minutes. `avgPriceMins` is the number of minutes the average price is calculated over. 0 means the last price is used.

**/exchangeInfo format:**

```
{  "filterType": "MIN_NOTIONAL",  "minNotional": "0.00100000",  "applyToMarket": true,  "avgPriceMins": 5}
```

### NOTIONAL[​](/docs/binance-spot-api-docs/filters#notional "Direct link to NOTIONAL")

The `NOTIONAL` filter defines the acceptable notional range allowed for an order on a symbol.  
  
`applyMinToMarket` determines whether the `minNotional` will be applied to `MARKET` orders.  
`applyMaxToMarket` determines whether the `maxNotional` will be applied to `MARKET` orders.

In order to pass this filter, the notional (`price * quantity`) has to pass the following conditions:

*   `price * quantity` <= `maxNotional`
*   `price * quantity` >= `minNotional`

For `MARKET` orders, the average price used over the last `avgPriceMins` minutes will be used for calculation.  
If the `avgPriceMins` is 0, then the last price will be used.

**/exchangeInfo format:**

```
{   "filterType": "NOTIONAL",   "minNotional": "10.00000000",   "applyMinToMarket": false,   "maxNotional": "10000.00000000",   "applyMaxToMarket": false,   "avgPriceMins": 5}
```

### ICEBERG\_PARTS[​](/docs/binance-spot-api-docs/filters#iceberg_parts "Direct link to ICEBERG_PARTS")

The `ICEBERG_PARTS` filter defines the maximum parts an iceberg order can have. The number of `ICEBERG_PARTS` is defined as `CEIL(qty / icebergQty)`.

**/exchangeInfo format:**

```
{  "filterType": "ICEBERG_PARTS",  "limit": 10}
```

### MARKET\_LOT\_SIZE[​](/docs/binance-spot-api-docs/filters#market_lot_size "Direct link to MARKET_LOT_SIZE")

The `MARKET_LOT_SIZE` filter defines the `quantity` (aka "lots" in auction terms) rules for `MARKET` orders on a symbol. There are 3 parts:

*   `minQty` defines the minimum `quantity` allowed.
*   `maxQty` defines the maximum `quantity` allowed.
*   `stepSize` defines the intervals that a `quantity` can be increased/decreased by.

In order to pass the `market lot size`, the following must be true for `quantity`:

*   `quantity` >= `minQty`
*   `quantity` <= `maxQty`
*   `quantity` % `stepSize` == 0

**/exchangeInfo format:**

```
{  "filterType": "MARKET_LOT_SIZE",  "minQty": "0.00100000",  "maxQty": "100000.00000000",  "stepSize": "0.00100000"}
```

### MAX\_NUM\_ORDERS[​](/docs/binance-spot-api-docs/filters#max_num_orders "Direct link to MAX_NUM_ORDERS")

The `MAX_NUM_ORDERS` filter defines the maximum number of orders an account is allowed to have open on a symbol. Note that both "algo" orders and normal orders are counted for this filter.

**/exchangeInfo format:**

```
{  "filterType": "MAX_NUM_ORDERS",  "maxNumOrders": 25}
```

### MAX\_NUM\_ALGO\_ORDERS[​](/docs/binance-spot-api-docs/filters#max_num_algo_orders "Direct link to MAX_NUM_ALGO_ORDERS")

The `MAX_NUM_ALGO_ORDERS` filter defines the maximum number of "algo" orders an account is allowed to have open on a symbol. "Algo" orders are `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders.

**/exchangeInfo format:**

```
{  "filterType": "MAX_NUM_ALGO_ORDERS",  "maxNumAlgoOrders": 5}
```

### MAX\_NUM\_ICEBERG\_ORDERS[​](/docs/binance-spot-api-docs/filters#max_num_iceberg_orders "Direct link to MAX_NUM_ICEBERG_ORDERS")

The `MAX_NUM_ICEBERG_ORDERS` filter defines the maximum number of `ICEBERG` orders an account is allowed to have open on a symbol. An `ICEBERG` order is any order where the `icebergQty` is > 0.

**/exchangeInfo format:**

```
{  "filterType": "MAX_NUM_ICEBERG_ORDERS",  "maxNumIcebergOrders": 5}
```

### MAX\_POSITION[​](/docs/binance-spot-api-docs/filters#max_position "Direct link to MAX_POSITION")

The `MAX_POSITION` filter defines the allowed maximum position an account can have on the base asset of a symbol. An account's position defined as the sum of the account's:

1.  free balance of the base asset
2.  locked balance of the base asset
3.  sum of the qty of all open BUY orders

`BUY` orders will be rejected if the account's position is greater than the maximum position allowed.

If an order's `quantity` can cause the position to overflow, this will also fail the `MAX_POSITION` filter.

**/exchangeInfo format:**

```
{  "filterType":"MAX_POSITION",  "maxPosition":"10.00000000"}
```

### TRAILING\_DELTA[​](/docs/binance-spot-api-docs/filters#trailing_delta "Direct link to TRAILING_DELTA")

The `TRAILING_DELTA` filter defines the minimum and maximum value for the parameter `trailingDelta`.

In order for a trailing stop order to pass this filter, the following must be true:

For `STOP_LOSS BUY`, `STOP_LOSS_LIMIT_BUY`,`TAKE_PROFIT SELL` and `TAKE_PROFIT_LIMIT SELL` orders:

*   `trailingDelta` >= `minTrailingAboveDelta`
*   `trailingDelta` <= `maxTrailingAboveDelta`

For `STOP_LOSS SELL`, `STOP_LOSS_LIMIT SELL`, `TAKE_PROFIT BUY`, and `TAKE_PROFIT_LIMIT BUY` orders:

*   `trailingDelta` >= `minTrailingBelowDelta`
*   `trailingDelta` <= `maxTrailingBelowDelta`

**/exchangeInfo format:**

```
    {          "filterType": "TRAILING_DELTA",          "minTrailingAboveDelta": 10,          "maxTrailingAboveDelta": 2000,          "minTrailingBelowDelta": 10,          "maxTrailingBelowDelta": 2000   }
```

Exchange Filters[​](/docs/binance-spot-api-docs/filters#exchange-filters "Direct link to Exchange Filters")
-----------------------------------------------------------------------------------------------------------

### EXCHANGE\_MAX\_NUM\_ORDERS[​](/docs/binance-spot-api-docs/filters#exchange_max_num_orders "Direct link to EXCHANGE_MAX_NUM_ORDERS")

The `EXCHANGE_MAX_NUM_ORDERS` filter defines the maximum number of orders an account is allowed to have open on the exchange. Note that both "algo" orders and normal orders are counted for this filter.

**/exchangeInfo format:**

```
{  "filterType": "EXCHANGE_MAX_NUM_ORDERS",  "maxNumOrders": 1000}
```

### EXCHANGE\_MAX\_NUM\_ALGO\_ORDERS[​](/docs/binance-spot-api-docs/filters#exchange_max_num_algo_orders "Direct link to EXCHANGE_MAX_NUM_ALGO_ORDERS")

The `EXCHANGE_MAX_NUM_ALGO_ORDERS` filter defines the maximum number of "algo" orders an account is allowed to have open on the exchange. "Algo" orders are `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders.

**/exchangeInfo format:**

```
{  "filterType": "EXCHANGE_MAX_NUM_ALGO_ORDERS",  "maxNumAlgoOrders": 200}
```

### EXCHANGE\_MAX\_NUM\_ICEBERG\_ORDERS[​](/docs/binance-spot-api-docs/filters#exchange_max_num_iceberg_orders "Direct link to EXCHANGE_MAX_NUM_ICEBERG_ORDERS")

The `EXCHANGE_MAX_NUM_ICEBERG_ORDERS` filter defines the maximum number of iceberg orders an account is allowed to have open on the exchange.

**/exchangeInfo format:**

```
{  "filterType": "EXCHANGE_MAX_NUM_ICEBERG_ORDERS",  "maxNumIcebergOrders": 10000}
```

ENUM Definitions
================

This will apply for both REST API and WebSocket API.

Symbol status (status)[​](/docs/binance-spot-api-docs/enums#symbol-status-status "Direct link to Symbol status (status)")
-------------------------------------------------------------------------------------------------------------------------

*   `TRADING`
*   `END_OF_DAY`
*   `HALT`
*   `BREAK`

Account and Symbol Permissions (permissions)[​](/docs/binance-spot-api-docs/enums#account-and-symbol-permissions-permissions "Direct link to Account and Symbol Permissions (permissions)")
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*   `SPOT`
*   `MARGIN`
*   `LEVERAGED`
*   `TRD_GRP_002`
*   `TRD_GRP_003`
*   `TRD_GRP_004`
*   `TRD_GRP_005`
*   `TRD_GRP_006`
*   `TRD_GRP_007`
*   `TRD_GRP_008`
*   `TRD_GRP_009`
*   `TRD_GRP_010`
*   `TRD_GRP_011`
*   `TRD_GRP_012`
*   `TRD_GRP_013`
*   `TRD_GRP_014`
*   `TRD_GRP_015`
*   `TRD_GRP_016`
*   `TRD_GRP_017`
*   `TRD_GRP_018`
*   `TRD_GRP_019`
*   `TRD_GRP_020`
*   `TRD_GRP_021`
*   `TRD_GRP_022`
*   `TRD_GRP_023`
*   `TRD_GRP_024`
*   `TRD_GRP_025`

Order status (status)[​](/docs/binance-spot-api-docs/enums#order-status-status "Direct link to Order status (status)")
----------------------------------------------------------------------------------------------------------------------

| Status | Description |
| --- | --- |
| `NEW` | The order has been accepted by the engine. 
| `PENDING_NEW` | The order is in a pending phase until the working order of an order list has been fully filled. 
| `PARTIALLY_FILLED` | A part of the order has been filled. 
| `FILLED` | The order has been completed. 
| `CANCELED` | The order has been canceled by the user. 
| `PENDING_CANCEL` | Currently unused 
| `REJECTED` | The order was not accepted by the engine and not processed. 
| `EXPIRED` | The order was canceled according to the order type's rules (e.g. LIMIT FOK orders with no fill, LIMIT IOC or MARKET orders that partially fill)  
or by the exchange, (e.g. orders canceled during liquidation, orders canceled during maintenance) 
| `EXPIRED_IN_MATCH` | The order was expired by the exchange due to STP. (e.g. an order with `EXPIRE_TAKER` will match with existing orders on the book with the same account or same `tradeGroupId`) 

Order List Status (listStatusType)[​](/docs/binance-spot-api-docs/enums#order-list-status-liststatustype "Direct link to Order List Status (listStatusType)")
-------------------------------------------------------------------------------------------------------------------------------------------------------------

| Status | Description |
| --- | --- |
| `RESPONSE` | This is used when the ListStatus is responding to a failed action. (E.g. order list placement or cancellation) 
| `EXEC_STARTED` | The order list has been placed or there is an update to the order list status. 
| `UPDATED` | The clientOrderId of an order in the order list has been changed. 
| `ALL_DONE` | The order list has finished executing and thus is no longer active. 

Order List Order Status (listOrderStatus)[​](/docs/binance-spot-api-docs/enums#order-list-order-status-listorderstatus "Direct link to Order List Order Status (listOrderStatus)")
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

| Status | Description |
| --- | --- |
| `EXECUTING` | Either an order list has been placed or there is an update to the status of the list. 
| `ALL_DONE` | An order list has completed execution and thus no longer active. 
| `REJECT` | The List Status is responding to a failed action either during order placement or order canceled. 

ContingencyType[​](/docs/binance-spot-api-docs/enums#contingencytype "Direct link to ContingencyType")
------------------------------------------------------------------------------------------------------

*   `OCO`
*   `OTO`

AllocationType[​](/docs/binance-spot-api-docs/enums#allocationtype "Direct link to AllocationType")
---------------------------------------------------------------------------------------------------

*   `SOR`

Order types (orderTypes, type)[​](/docs/binance-spot-api-docs/enums#order-types-ordertypes-type "Direct link to Order types (orderTypes, type)")
------------------------------------------------------------------------------------------------------------------------------------------------

*   `LIMIT`
*   `MARKET`
*   `STOP_LOSS`
*   `STOP_LOSS_LIMIT`
*   `TAKE_PROFIT`
*   `TAKE_PROFIT_LIMIT`
*   `LIMIT_MAKER`

Order Response Type (newOrderRespType)[​](/docs/binance-spot-api-docs/enums#order-response-type-neworderresptype "Direct link to Order Response Type (newOrderRespType)")
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*   `ACK`
*   `RESULT`
*   `FULL`

Working Floor[​](/docs/binance-spot-api-docs/enums#working-floor "Direct link to Working Floor")
------------------------------------------------------------------------------------------------

*   `EXCHANGE`
*   `SOR`

Order side (side)[​](/docs/binance-spot-api-docs/enums#order-side-side "Direct link to Order side (side)")
----------------------------------------------------------------------------------------------------------

*   `BUY`
*   `SELL`

Time in force (timeInForce)[​](/docs/binance-spot-api-docs/enums#time-in-force-timeinforce "Direct link to Time in force (timeInForce)")
----------------------------------------------------------------------------------------------------------------------------------------

This sets how long an order will be active before expiration.

| Status | Description |
| --- | --- |
| `GTC` | Good Til Canceled  
An order will be on the book unless the order is canceled. 
| `IOC` | Immediate Or Cancel  
An order will try to fill the order as much as it can before the order expires. 
| `FOK` | Fill or Kill  
An order will expire if the full order cannot be filled upon execution. 

Rate limiters (rateLimitType)[​](/docs/binance-spot-api-docs/enums#rate-limiters-ratelimittype "Direct link to Rate limiters (rateLimitType)")
----------------------------------------------------------------------------------------------------------------------------------------------

*   REQUEST\_WEIGHT

```
    {      "rateLimitType": "REQUEST_WEIGHT",      "interval": "MINUTE",      "intervalNum": 1,      "limit": 6000    }
```

*   ORDERS

```
    {      "rateLimitType": "ORDERS",      "interval": "SECOND",      "intervalNum": 1,      "limit": 10    }
```

*   RAW\_REQUESTS

```
    {      "rateLimitType": "RAW_REQUESTS",      "interval": "MINUTE",      "intervalNum": 5,      "limit": 61000    }
```

Rate limit intervals (interval)[​](/docs/binance-spot-api-docs/enums#rate-limit-intervals-interval "Direct link to Rate limit intervals (interval)")
----------------------------------------------------------------------------------------------------------------------------------------------------

*   SECOND
*   MINUTE
*   DAY

STP Modes[​](/docs/binance-spot-api-docs/enums#stp-modes "Direct link to STP Modes")
------------------------------------------------------------------------------------

Read [Self Trade Prevention (STP) FAQ](/docs/binance-spot-api-docs/faqs/stp_faq) to learn more.

*   `NONE`
*   `EXPIRE_MAKER`
*   `EXPIRE_TAKER`
*   `EXPIRE_BOTH`
*   `DECREMENT`

Error codes for Binance
=======================

**Last Updated: 2025-04-08**

Errors consist of two parts: an error code and a message. Codes are universal, but messages can vary. Here is the error JSON payload:

```
{  "code":-1121,  "msg":"Invalid symbol."}
```

10xx - General Server or Network issues[​](/docs/binance-spot-api-docs/errors#10xx---general-server-or-network-issues "Direct link to 10xx - General Server or Network issues")
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### \-1000 UNKNOWN[​](/docs/binance-spot-api-docs/errors#-1000-unknown "Direct link to -1000 UNKNOWN")

*   An unknown error occurred while processing the request.

### \-1001 DISCONNECTED[​](/docs/binance-spot-api-docs/errors#-1001-disconnected "Direct link to -1001 DISCONNECTED")

*   Internal error; unable to process your request. Please try again.

### \-1002 UNAUTHORIZED[​](/docs/binance-spot-api-docs/errors#-1002-unauthorized "Direct link to -1002 UNAUTHORIZED")

*   You are not authorized to execute this request.

### \-1003 TOO\_MANY\_REQUESTS[​](/docs/binance-spot-api-docs/errors#-1003-too_many_requests "Direct link to -1003 TOO_MANY_REQUESTS")

*   Too many requests queued.
*   Too much request weight used; current limit is %s request weight per %s. Please use WebSocket Streams for live updates to avoid polling the API.
*   Way too much request weight used; IP banned until %s. Please use WebSocket Streams for live updates to avoid bans.

### \-1006 UNEXPECTED\_RESP[​](/docs/binance-spot-api-docs/errors#-1006-unexpected_resp "Direct link to -1006 UNEXPECTED_RESP")

*   An unexpected response was received from the message bus. Execution status unknown.

### \-1007 TIMEOUT[​](/docs/binance-spot-api-docs/errors#-1007-timeout "Direct link to -1007 TIMEOUT")

*   Timeout waiting for response from backend server. Send status unknown; execution status unknown.

### \-1008 SERVER\_BUSY[​](/docs/binance-spot-api-docs/errors#-1008-server_busy "Direct link to -1008 SERVER_BUSY")

*   Server is currently overloaded with other requests. Please try again in a few minutes.

### \-1013 INVALID\_MESSAGE[​](/docs/binance-spot-api-docs/errors#-1013-invalid_message "Direct link to -1013 INVALID_MESSAGE")

*   The request is rejected by the API. (i.e. The request didn't reach the Matching Engine.)
*   Potential error messages can be found in [Filter Failures](/docs/binance-spot-api-docs/errors#filter-failures) or [Failures during order placement](/docs/binance-spot-api-docs/errors#other-errors).

### \-1014 UNKNOWN\_ORDER\_COMPOSITION[​](/docs/binance-spot-api-docs/errors#-1014-unknown_order_composition "Direct link to -1014 UNKNOWN_ORDER_COMPOSITION")

*   Unsupported order combination.

### \-1015 TOO\_MANY\_ORDERS[​](/docs/binance-spot-api-docs/errors#-1015-too_many_orders "Direct link to -1015 TOO_MANY_ORDERS")

*   Too many new orders.
*   Too many new orders; current limit is %s orders per %s.

### \-1016 SERVICE\_SHUTTING\_DOWN[​](/docs/binance-spot-api-docs/errors#-1016-service_shutting_down "Direct link to -1016 SERVICE_SHUTTING_DOWN")

*   This service is no longer available.

### \-1020 UNSUPPORTED\_OPERATION[​](/docs/binance-spot-api-docs/errors#-1020-unsupported_operation "Direct link to -1020 UNSUPPORTED_OPERATION")

*   This operation is not supported.

### \-1021 INVALID\_TIMESTAMP[​](/docs/binance-spot-api-docs/errors#-1021-invalid_timestamp "Direct link to -1021 INVALID_TIMESTAMP")

*   Timestamp for this request is outside of the recvWindow.
*   Timestamp for this request was 1000ms ahead of the server's time.

### \-1022 INVALID\_SIGNATURE[​](/docs/binance-spot-api-docs/errors#-1022-invalid_signature "Direct link to -1022 INVALID_SIGNATURE")

*   Signature for this request is not valid.

### \-1033 COMP\_ID\_IN\_USE[​](/docs/binance-spot-api-docs/errors#-1033-comp_id_in_use "Direct link to -1033 COMP_ID_IN_USE")

*   `SenderCompId(49)` is currently in use. Concurrent use of the same SenderCompId within one account is not allowed.

### \-1034 TOO\_MANY\_CONNECTIONS[​](/docs/binance-spot-api-docs/errors#-1034-too_many_connections "Direct link to -1034 TOO_MANY_CONNECTIONS")

*   Too many concurrent connections; current limit is '%s'.
*   Too many connection attempts for account; current limit is %s per '%s'.
*   Too many connection attempts from IP; current limit is %s per '%s'.

### \-1035 LOGGED\_OUT[​](/docs/binance-spot-api-docs/errors#-1035-logged_out "Direct link to -1035 LOGGED_OUT")

*   Please send [Logout`<5>`](/docs/binance-spot-api-docs/fix-api#logout) message to close the session.

11xx - Request issues[​](/docs/binance-spot-api-docs/errors#11xx---request-issues "Direct link to 11xx - Request issues")
-------------------------------------------------------------------------------------------------------------------------

### \-1100 ILLEGAL\_CHARS[​](/docs/binance-spot-api-docs/errors#-1100-illegal_chars "Direct link to -1100 ILLEGAL_CHARS")

*   Illegal characters found in a parameter.
*   Illegal characters found in parameter '%s'; legal range is '%s'.

### \-1101 TOO\_MANY\_PARAMETERS[​](/docs/binance-spot-api-docs/errors#-1101-too_many_parameters "Direct link to -1101 TOO_MANY_PARAMETERS")

*   Too many parameters sent for this endpoint.
*   Too many parameters; expected '%s' and received '%s'.
*   Duplicate values for a parameter detected.

### \-1102 MANDATORY\_PARAM\_EMPTY\_OR\_MALFORMED[​](/docs/binance-spot-api-docs/errors#-1102-mandatory_param_empty_or_malformed "Direct link to -1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED")

*   A mandatory parameter was not sent, was empty/null, or malformed.
*   Mandatory parameter '%s' was not sent, was empty/null, or malformed.
*   Param '%s' or '%s' must be sent, but both were empty/null!
*   Required tag '%s' missing.
*   Field value was empty or malformed.
*   '%s' contains unexpected value. Cannot be greater than %s.

### \-1103 UNKNOWN\_PARAM[​](/docs/binance-spot-api-docs/errors#-1103-unknown_param "Direct link to -1103 UNKNOWN_PARAM")

*   An unknown parameter was sent.
*   Undefined Tag.

### \-1104 UNREAD\_PARAMETERS[​](/docs/binance-spot-api-docs/errors#-1104-unread_parameters "Direct link to -1104 UNREAD_PARAMETERS")

*   Not all sent parameters were read.
*   Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.

### \-1105 PARAM\_EMPTY[​](/docs/binance-spot-api-docs/errors#-1105-param_empty "Direct link to -1105 PARAM_EMPTY")

*   A parameter was empty.
*   Parameter '%s' was empty.

### \-1106 PARAM\_NOT\_REQUIRED[​](/docs/binance-spot-api-docs/errors#-1106-param_not_required "Direct link to -1106 PARAM_NOT_REQUIRED")

*   A parameter was sent when not required.
*   Parameter '%s' sent when not required.
*   A tag '%s' was sent when not required.

### \-1108 PARAM\_OVERFLOW[​](/docs/binance-spot-api-docs/errors#-1108-param_overflow "Direct link to -1108 PARAM_OVERFLOW")

*   Parameter '%s' overflowed.

### \-1111 BAD\_PRECISION[​](/docs/binance-spot-api-docs/errors#-1111-bad_precision "Direct link to -1111 BAD_PRECISION")

*   Parameter '%s' has too much precision.

### \-1112 NO\_DEPTH[​](/docs/binance-spot-api-docs/errors#-1112-no_depth "Direct link to -1112 NO_DEPTH")

*   No orders on book for symbol.

### \-1114 TIF\_NOT\_REQUIRED[​](/docs/binance-spot-api-docs/errors#-1114-tif_not_required "Direct link to -1114 TIF_NOT_REQUIRED")

*   TimeInForce parameter sent when not required.

### \-1115 INVALID\_TIF[​](/docs/binance-spot-api-docs/errors#-1115-invalid_tif "Direct link to -1115 INVALID_TIF")

*   Invalid timeInForce.

### \-1116 INVALID\_ORDER\_TYPE[​](/docs/binance-spot-api-docs/errors#-1116-invalid_order_type "Direct link to -1116 INVALID_ORDER_TYPE")

*   Invalid orderType.

### \-1117 INVALID\_SIDE[​](/docs/binance-spot-api-docs/errors#-1117-invalid_side "Direct link to -1117 INVALID_SIDE")

*   Invalid side.

### \-1118 EMPTY\_NEW\_CL\_ORD\_ID[​](/docs/binance-spot-api-docs/errors#-1118-empty_new_cl_ord_id "Direct link to -1118 EMPTY_NEW_CL_ORD_ID")

*   New client order ID was empty.

### \-1119 EMPTY\_ORG\_CL\_ORD\_ID[​](/docs/binance-spot-api-docs/errors#-1119-empty_org_cl_ord_id "Direct link to -1119 EMPTY_ORG_CL_ORD_ID")

*   Original client order ID was empty.

### \-1120 BAD\_INTERVAL[​](/docs/binance-spot-api-docs/errors#-1120-bad_interval "Direct link to -1120 BAD_INTERVAL")

*   Invalid interval.

### \-1121 BAD\_SYMBOL[​](/docs/binance-spot-api-docs/errors#-1121-bad_symbol "Direct link to -1121 BAD_SYMBOL")

*   Invalid symbol.

### \-1122 INVALID\_SYMBOLSTATUS[​](/docs/binance-spot-api-docs/errors#-1122-invalid_symbolstatus "Direct link to -1122 INVALID_SYMBOLSTATUS")

*   Invalid symbolStatus.

### \-1125 INVALID\_LISTEN\_KEY[​](/docs/binance-spot-api-docs/errors#-1125-invalid_listen_key "Direct link to -1125 INVALID_LISTEN_KEY")

*   This listenKey does not exist.

### \-1127 MORE\_THAN\_XX\_HOURS[​](/docs/binance-spot-api-docs/errors#-1127-more_than_xx_hours "Direct link to -1127 MORE_THAN_XX_HOURS")

*   Lookup interval is too big.
*   More than %s hours between startTime and endTime.

### \-1128 OPTIONAL\_PARAMS\_BAD\_COMBO[​](/docs/binance-spot-api-docs/errors#-1128-optional_params_bad_combo "Direct link to -1128 OPTIONAL_PARAMS_BAD_COMBO")

*   Combination of optional parameters invalid.
*   Combination of optional fields invalid. Recommendation: '%s' and '%s' must both be sent.
*   Fields \[%s\] must be sent together or omitted entirely.
*   Invalid `MDEntryType (269)` combination. BID and OFFER must be requested together.

### \-1130 INVALID\_PARAMETER[​](/docs/binance-spot-api-docs/errors#-1130-invalid_parameter "Direct link to -1130 INVALID_PARAMETER")

*   Invalid data sent for a parameter.
*   Data sent for parameter '%s' is not valid.

### \-1134 BAD\_STRATEGY\_TYPE[​](/docs/binance-spot-api-docs/errors#-1134-bad_strategy_type "Direct link to -1134 BAD_STRATEGY_TYPE")

*   `strategyType` was less than 1000000.
*   `TargetStrategy (847)` was less than 1000000.

### \-1135 INVALID\_JSON[​](/docs/binance-spot-api-docs/errors#-1135-invalid_json "Direct link to -1135 INVALID_JSON")

*   Invalid JSON Request
*   JSON sent for parameter '%s' is not valid

### \-1139 INVALID\_TICKER\_TYPE[​](/docs/binance-spot-api-docs/errors#-1139-invalid_ticker_type "Direct link to -1139 INVALID_TICKER_TYPE")

*   Invalid ticker type.

### \-1145 INVALID\_CANCEL\_RESTRICTIONS[​](/docs/binance-spot-api-docs/errors#-1145-invalid_cancel_restrictions "Direct link to -1145 INVALID_CANCEL_RESTRICTIONS")

*   `cancelRestrictions` has to be either `ONLY_NEW` or `ONLY_PARTIALLY_FILLED`.

### \-1151 DUPLICATE\_SYMBOLS[​](/docs/binance-spot-api-docs/errors#-1151-duplicate_symbols "Direct link to -1151 DUPLICATE_SYMBOLS")

*   Symbol is present multiple times in the list.

### \-1152 INVALID\_SBE\_HEADER[​](/docs/binance-spot-api-docs/errors#-1152-invalid_sbe_header "Direct link to -1152 INVALID_SBE_HEADER")

*   Invalid `X-MBX-SBE` header; expected `<SCHEMA_ID>:<VERSION>`.

### \-1153 UNSUPPORTED\_SCHEMA\_ID[​](/docs/binance-spot-api-docs/errors#-1153-unsupported_schema_id "Direct link to -1153 UNSUPPORTED_SCHEMA_ID")

*   Unsupported SBE schema ID or version specified in the `X-MBX-SBE` header.

### \-1155 SBE\_DISABLED[​](/docs/binance-spot-api-docs/errors#-1155-sbe_disabled "Direct link to -1155 SBE_DISABLED")

*   SBE is not enabled.

### \-1158 OCO\_ORDER\_TYPE\_REJECTED[​](/docs/binance-spot-api-docs/errors#-1158-oco_order_type_rejected "Direct link to -1158 OCO_ORDER_TYPE_REJECTED")

*   Order type not supported in OCO.
*   If the order type provided in the `aboveType` and/or `belowType` is not supported.

### \-1160 OCO\_ICEBERGQTY\_TIMEINFORCE[​](/docs/binance-spot-api-docs/errors#-1160-oco_icebergqty_timeinforce "Direct link to -1160 OCO_ICEBERGQTY_TIMEINFORCE")

*   Parameter '%s' is not supported if `aboveTimeInForce`/`belowTimeInForce` is not GTC.
*   If the order type for the above or below leg is `STOP_LOSS_LIMIT`, and `icebergQty` is provided for that leg, the `timeInForce` has to be `GTC` else it will throw an error.
*   `TimeInForce (59)` must be `GTC (1)` when `MaxFloor (111)` is used.

### \-1161 DEPRECATED\_SCHEMA[​](/docs/binance-spot-api-docs/errors#-1161-deprecated_schema "Direct link to -1161 DEPRECATED_SCHEMA")

*   Unable to encode the response in SBE schema 'x'. Please use schema 'y' or higher.

### \-1165 BUY\_OCO\_LIMIT\_MUST\_BE\_BELOW[​](/docs/binance-spot-api-docs/errors#-1165-buy_oco_limit_must_be_below "Direct link to -1165 BUY_OCO_LIMIT_MUST_BE_BELOW")

*   A limit order in a buy OCO must be below.

### \-1166 SELL\_OCO\_LIMIT\_MUST\_BE\_ABOVE[​](/docs/binance-spot-api-docs/errors#-1166-sell_oco_limit_must_be_above "Direct link to -1166 SELL_OCO_LIMIT_MUST_BE_ABOVE")

*   A limit order in a sell OCO must be above.

### \-1168 BOTH\_OCO\_ORDERS\_CANNOT\_BE\_LIMIT[​](/docs/binance-spot-api-docs/errors#-1168-both_oco_orders_cannot_be_limit "Direct link to -1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT")

*   At least one OCO order must be contingent.

### \-1169 INVALID\_TAG\_NUMBER[​](/docs/binance-spot-api-docs/errors#-1169-invalid_tag_number "Direct link to -1169 INVALID_TAG_NUMBER")

*   Invalid tag number.

### \-1170 TAG\_NOT\_DEFINED\_IN\_MESSAGE[​](/docs/binance-spot-api-docs/errors#-1170-tag_not_defined_in_message "Direct link to -1170 TAG_NOT_DEFINED_IN_MESSAGE")

*   Tag '%s' not defined for this message type.

### \-1171 TAG\_APPEARS\_MORE\_THAN\_ONCE[​](/docs/binance-spot-api-docs/errors#-1171-tag_appears_more_than_once "Direct link to -1171 TAG_APPEARS_MORE_THAN_ONCE")

*   Tag '%s' appears more than once.

### \-1172 TAG\_OUT\_OF\_ORDER[​](/docs/binance-spot-api-docs/errors#-1172-tag_out_of_order "Direct link to -1172 TAG_OUT_OF_ORDER")

*   Tag '%s' specified out of required order.

### \-1173 GROUP\_FIELDS\_OUT\_OF\_ORDER[​](/docs/binance-spot-api-docs/errors#-1173-group_fields_out_of_order "Direct link to -1173 GROUP_FIELDS_OUT_OF_ORDER")

*   Repeating group '%s' fields out of order.

### \-1174 INVALID\_COMPONENT[​](/docs/binance-spot-api-docs/errors#-1174-invalid_component "Direct link to -1174 INVALID_COMPONENT")

*   Component '%s' is incorrectly populated on '%s' order. Recommendation: '%s'

### \-1175 RESET\_SEQ\_NUM\_SUPPORT[​](/docs/binance-spot-api-docs/errors#-1175-reset_seq_num_support "Direct link to -1175 RESET_SEQ_NUM_SUPPORT")

*   Continuation of sequence numbers to new session is currently unsupported. Sequence numbers must be reset for each new session.

### \-1176 ALREADY\_LOGGED\_IN[​](/docs/binance-spot-api-docs/errors#-1176-already_logged_in "Direct link to -1176 ALREADY_LOGGED_IN")

*   [Logon`<A>`](/docs/binance-spot-api-docs/fix-api#logon-main) should only be sent once.

### \-1177 GARBLED\_MESSAGE[​](/docs/binance-spot-api-docs/errors#-1177-garbled_message "Direct link to -1177 GARBLED_MESSAGE")

*   `CheckSum(10)` contains an incorrect value.
*   `BeginString (8)` is not the first tag in a message.
*   `MsgType (35)` is not the third tag in a message.
*   `BodyLength (9)` does not contain the correct byte count.
*   Only printable ASCII characters and SOH (Start of Header) are allowed.

### \-1178 BAD\_SENDER\_COMPID[​](/docs/binance-spot-api-docs/errors#-1178-bad_sender_compid "Direct link to -1178 BAD_SENDER_COMPID")

*   `SenderCompId(49)` contains an incorrect value. The SenderCompID value should not change throughout the lifetime of a session.

### \-1179 BAD\_SEQ\_NUM[​](/docs/binance-spot-api-docs/errors#-1179-bad_seq_num "Direct link to -1179 BAD_SEQ_NUM")

*   `MsgSeqNum(34)` contains an unexpected value. Expected: '%d'.

### \-1180 EXPECTED\_LOGON[​](/docs/binance-spot-api-docs/errors#-1180-expected_logon "Direct link to -1180 EXPECTED_LOGON")

*   [Logon`<A>`](/docs/binance-spot-api-docs/fix-api#logon-main) must be the first message in the session.

### \-1181 TOO\_MANY\_MESSAGES[​](/docs/binance-spot-api-docs/errors#-1181-too_many_messages "Direct link to -1181 TOO_MANY_MESSAGES")

*   Too many messages; current limit is '%d' messages per '%s'.

### \-1182 PARAMS\_BAD\_COMBO[​](/docs/binance-spot-api-docs/errors#-1182-params_bad_combo "Direct link to -1182 PARAMS_BAD_COMBO")

*   Conflicting fields: \[%s\]

### \-1183 NOT\_ALLOWED\_IN\_DROP\_COPY\_SESSIONS[​](/docs/binance-spot-api-docs/errors#-1183-not_allowed_in_drop_copy_sessions "Direct link to -1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS")

*   Requested operation is not allowed in DropCopy sessions.

### \-1184 DROP\_COPY\_SESSION\_NOT\_ALLOWED[​](/docs/binance-spot-api-docs/errors#-1184-drop_copy_session_not_allowed "Direct link to -1184 DROP_COPY_SESSION_NOT_ALLOWED")

*   DropCopy sessions are not supported on this server. Please reconnect to a drop copy server.

### \-1185 DROP\_COPY\_SESSION\_REQUIRED[​](/docs/binance-spot-api-docs/errors#-1185-drop_copy_session_required "Direct link to -1185 DROP_COPY_SESSION_REQUIRED")

*   Only DropCopy sessions are supported on this server. Either reconnect to order entry server or send `DropCopyFlag (9406)` field.

### \-1186 NOT\_ALLOWED\_IN\_ORDER\_ENTRY\_SESSIONS[​](/docs/binance-spot-api-docs/errors#-1186-not_allowed_in_order_entry_sessions "Direct link to -1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS")

*   Requested operation is not allowed in order entry sessions.

### \-1187 NOT\_ALLOWED\_IN\_MARKET\_DATA\_SESSIONS[​](/docs/binance-spot-api-docs/errors#-1187-not_allowed_in_market_data_sessions "Direct link to -1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS")

*   Requested operation is not allowed in market data sessions.

### \-1188 INCORRECT\_NUM\_IN\_GROUP\_COUNT[​](/docs/binance-spot-api-docs/errors#-1188-incorrect_num_in_group_count "Direct link to -1188 INCORRECT_NUM_IN_GROUP_COUNT")

*   Incorrect NumInGroup count for repeating group '%s'.

### \-1189 DUPLICATE\_ENTRIES\_IN\_A\_GROUP[​](/docs/binance-spot-api-docs/errors#-1189-duplicate_entries_in_a_group "Direct link to -1189 DUPLICATE_ENTRIES_IN_A_GROUP")

*   Group '%s' contains duplicate entries.

### \-1190 INVALID\_REQUEST\_ID[​](/docs/binance-spot-api-docs/errors#-1190-invalid_request_id "Direct link to -1190 INVALID_REQUEST_ID")

*   `MDReqID (262)` contains a subscription request id that is already in use on this connection.
*   `MDReqID (262)` contains an unsubscription request id that does not match any active subscription.

### \-1191 TOO\_MANY\_SUBSCRIPTIONS[​](/docs/binance-spot-api-docs/errors#-1191-too_many_subscriptions "Direct link to -1191 TOO_MANY_SUBSCRIPTIONS")

*   Too many subscriptions. Connection may create up to '%s' subscriptions at a time.
*   Similar subscription is already active on this connection. Symbol='%s', active subscription id: '%s'.

### \-1194 INVALID\_TIME\_UNIT[​](/docs/binance-spot-api-docs/errors#-1194-invalid_time_unit "Direct link to -1194 INVALID_TIME_UNIT")

*   Invalid value for time unit; expected either MICROSECOND or MILLISECOND.

### \-1196 BUY\_OCO\_STOP\_LOSS\_MUST\_BE\_ABOVE[​](/docs/binance-spot-api-docs/errors#-1196-buy_oco_stop_loss_must_be_above "Direct link to -1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE")

*   A stop loss order in a buy OCO must be above.

### \-1197 SELL\_OCO\_STOP\_LOSS\_MUST\_BE\_BELOW[​](/docs/binance-spot-api-docs/errors#-1197-sell_oco_stop_loss_must_be_below "Direct link to -1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW")

*   A stop loss order in a sell OCO must be below.

### \-1198 BUY\_OCO\_TAKE\_PROFIT\_MUST\_BE\_BELOW[​](/docs/binance-spot-api-docs/errors#-1198-buy_oco_take_profit_must_be_below "Direct link to -1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW")

*   A take profit order in a buy OCO must be below.

### \-1199 SELL\_OCO\_TAKE\_PROFIT\_MUST\_BE\_ABOVE[​](/docs/binance-spot-api-docs/errors#-1199-sell_oco_take_profit_must_be_above "Direct link to -1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE")

*   A take profit order in a sell OCO must be above.

### \-2010 NEW\_ORDER\_REJECTED[​](/docs/binance-spot-api-docs/errors#-2010-new_order_rejected "Direct link to -2010 NEW_ORDER_REJECTED")

*   NEW\_ORDER\_REJECTED

### \-2011 CANCEL\_REJECTED[​](/docs/binance-spot-api-docs/errors#-2011-cancel_rejected "Direct link to -2011 CANCEL_REJECTED")

*   CANCEL\_REJECTED

### \-2013 NO\_SUCH\_ORDER[​](/docs/binance-spot-api-docs/errors#-2013-no_such_order "Direct link to -2013 NO_SUCH_ORDER")

*   Order does not exist.

### \-2014 BAD\_API\_KEY\_FMT[​](/docs/binance-spot-api-docs/errors#-2014-bad_api_key_fmt "Direct link to -2014 BAD_API_KEY_FMT")

*   API-key format invalid.

### \-2015 REJECTED\_MBX\_KEY[​](/docs/binance-spot-api-docs/errors#-2015-rejected_mbx_key "Direct link to -2015 REJECTED_MBX_KEY")

*   Invalid API-key, IP, or permissions for action.

### \-2016 NO\_TRADING\_WINDOW[​](/docs/binance-spot-api-docs/errors#-2016-no_trading_window "Direct link to -2016 NO_TRADING_WINDOW")

*   No trading window could be found for the symbol. Try ticker/24hrs instead.

### \-2026 ORDER\_ARCHIVED[​](/docs/binance-spot-api-docs/errors#-2026-order_archived "Direct link to -2026 ORDER_ARCHIVED")

*   Order was canceled or expired with no executed qty over 90 days ago and has been archived.

### \-2039 CLIENT\_ORDER\_ID\_INVALID[​](/docs/binance-spot-api-docs/errors#-2039-client_order_id_invalid "Direct link to -2039 CLIENT_ORDER_ID_INVALID")

*   Client order ID is not correct for this order ID.

Messages for -1010 ERROR\_MSG\_RECEIVED, -2010 NEW\_ORDER\_REJECTED, -2011 CANCEL\_REJECTED, and -2038 ORDER\_AMEND\_REJECTED[​](/docs/binance-spot-api-docs/errors#messages-for--1010-error_msg_received--2010-new_order_rejected--2011-cancel_rejected-and--2038-order_amend_rejected "Direct link to Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED")
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

This code is sent when an error has been returned by the matching engine. The following messages which will indicate the specific error:

| Error message | Description |
| --- | --- |
| "Unknown order sent." | The order (by either `orderId`, `clOrdId`, `origClOrdId`) could not be found. 
| "Duplicate order sent." | The `clOrdId` is already in use. 
| "Market is closed." | The symbol is not trading. 
| "Account has insufficient balance for requested action." | Not enough funds to complete the action. 
| "Market orders are not supported for this symbol." | `MARKET` is not enabled on the symbol. 
| "Iceberg orders are not supported for this symbol." | `icebergQty` is not enabled on the symbol. 
| "Stop loss orders are not supported for this symbol." | `STOP_LOSS` is not enabled on the symbol. 
| "Stop loss limit orders are not supported for this symbol." | `STOP_LOSS_LIMIT` is not enabled on the symbol. 
| "Take profit orders are not supported for this symbol." | `TAKE_PROFIT` is not enabled on the symbol. 
| "Take profit limit orders are not supported for this symbol." | `TAKE_PROFIT_LIMIT` is not enabled on the symbol. 
| "Order amend is not supported for this symbol." | Order amend keep priority is not enabled on the symbol. 
| "Price \* QTY is zero or less." | `price` \* `quantity` is too low. 
| "IcebergQty exceeds QTY." | `icebergQty` must be less than the order quantity. 
| "This action is disabled on this account." | Contact customer support; some actions have been disabled on the account. 
| "This account may not place or cancel orders." | Contact customer support; the account has trading ability disabled. 
| "Unsupported order combination" | The `orderType`, `timeInForce`, `stopPrice`, and/or `icebergQty` combination isn't allowed. 
| "Order would trigger immediately." | The order's stop price is not valid when compared to the last traded price. 
| "Cancel order is invalid. Check origClOrdId and orderId." | No `origClOrdId` or `orderId` was sent in. 
| "Order would immediately match and take." | `LIMIT_MAKER` order type would immediately match and trade, and not be a pure maker order. 
| "The relationship of the prices for the orders is not correct." | The prices set in the `OCO` is breaking the Price restrictions.  
For reference:  
`BUY` : `LIMIT_MAKER` `price` < Last Traded Price < `stopPrice`  
`SELL` : `LIMIT_MAKER` `price` > Last Traded Price > `stopPrice` 
| "OCO orders are not supported for this symbol" | `OCO` is not enabled on the symbol. 
| "Quote order qty market orders are not support for this symbol." | `MARKET` orders using the parameter `quoteOrderQty` are not enabled on the symbol. 
| "Trailing stop orders are not supported for this symbol." | Orders using `trailingDelta` are not enabled on the symbol. 
| "Order cancel-replace is not supported for this symbol." | `POST /api/v3/order/cancelReplace` (REST API) or `order.cancelReplace` (WebSocket API) is not enabled on the symbol. 
| "This symbol is not permitted for this account." | Account and symbol do not have the same permissions. (e.g. `SPOT`, `MARGIN`, etc) 
| "This symbol is restricted for this account." | Account is unable to trade on that symbol. (e.g. An `ISOLATED_MARGIN` account cannot place `SPOT` orders.) 
| "Order was not canceled due to cancel restrictions." | Either `cancelRestrictions` was set to `ONLY_NEW` but the order status was not `NEW`  
or  
`cancelRestrictions` was set to `ONLY_PARTIALLY_FILLED` but the order status was not `PARTIALLY_FILLED`. 
| "Rest API trading is not enabled." / "WebSocket API trading is not enabled." | Order is being placed or a server that is not configured to allow access to `TRADE` endpoints. 
| "FIX API trading is not enabled. | Order is placed on a FIX server that is not TRADE enabled. 
| "Order book liquidity is less than `LOT_SIZE` filter minimum quantity." | Quote quantity market orders cannot be placed when the order book liquidity is less than minimum quantity configured for the `LOT_SIZE` filter. 
| "Order book liquidity is less than `MARKET_LOT_SIZE` filter minimum quantity." | Quote quantity market orders cannot be placed when the order book liquidity is less than the minimum quantity for `MARKET_LOT_SIZE` filter. 
| "Order book liquidity is less than symbol minimum quantity." | Quote quantity market orders cannot be placed when there are no orders on the book. 
| "Order amend (quantity increase) is not supported." | `newQty` must be less than the order quantity. 
| "The requested action would change no state; rejecting". | The request sent would not have changed the status quo.  
  
(e.g. `newQty` cannot equal the order quantity.) 

Errors regarding placing orders via cancelReplace[​](/docs/binance-spot-api-docs/errors#errors-regarding-placing-orders-via-cancelreplace "Direct link to Errors regarding placing orders via cancelReplace")
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### \-2021 Order cancel-replace partially failed[​](/docs/binance-spot-api-docs/errors#-2021-order-cancel-replace-partially-failed "Direct link to -2021 Order cancel-replace partially failed")

*   This code is sent when either the cancellation of the order failed or the new order placement failed but not both.

### \-2022 Order cancel-replace failed.[​](/docs/binance-spot-api-docs/errors#-2022-order-cancel-replace-failed "Direct link to -2022 Order cancel-replace failed.")

*   This code is sent when both the cancellation of the order failed and the new order placement failed.

Filter failures[​](/docs/binance-spot-api-docs/errors#filter-failures "Direct link to Filter failures")
-------------------------------------------------------------------------------------------------------

| Error message | Description |
| --- | --- |
| "Filter failure: PRICE\_FILTER" | `price` is too high, too low, and/or not following the tick size rule for the symbol. 
| "Filter failure: PERCENT\_PRICE" | `price` is X% too high or X% too low from the average weighted price over the last Y minutes. 
| "Filter failure: LOT\_SIZE" | `quantity` is too high, too low, and/or not following the step size rule for the symbol. 
| "Filter failure: MIN\_NOTIONAL" | `price` \* `quantity` is too low to be a valid order for the symbol. 
| "Filter failure: NOTIONAL" | `price` \* `quantity` is not within range of the `minNotional` and `maxNotional` 
| "Filter failure: ICEBERG\_PARTS" | `ICEBERG` order would break into too many parts; icebergQty is too small. 
| "Filter failure: MARKET\_LOT\_SIZE" | `MARKET` order's `quantity` is too high, too low, and/or not following the step size rule for the symbol. 
| "Filter failure: MAX\_POSITION" | The account's position has reached the maximum defined limit.  
This is composed of the sum of the balance of the base asset, and the sum of the quantity of all open `BUY` orders. 
| "Filter failure: MAX\_NUM\_ORDERS" | Account has too many open orders on the symbol. 
| "Filter failure: MAX\_NUM\_ALGO\_ORDERS" | Account has too many open stop loss and/or take profit orders on the symbol. 
| "Filter failure: MAX\_NUM\_ICEBERG\_ORDERS" | Account has too many open iceberg orders on the symbol. 
| "Filter failure: TRAILING\_DELTA" | `trailingDelta` is not within the defined range of the filter for that order type. 
| "Filter failure: EXCHANGE\_MAX\_NUM\_ORDERS" | Account has too many open orders on the exchange. 
| "Filter failure: EXCHANGE\_MAX\_NUM\_ALGO\_ORDERS" | Account has too many open stop loss and/or take profit orders on the exchange. 
| "Filter failure: EXCHANGE\_MAX\_NUM\_ICEBERG\_ORDERS" | Account has too many open iceberg orders on the exchange.

General API Information
=======================

*   The following base endpoints are available. Please use whichever works best for your setup:
    *   **[https://api.binance.com](https://api.binance.com)**
    *   **[https://api-gcp.binance.com](https://api-gcp.binance.com)**
    *   **[https://api1.binance.com](https://api1.binance.com)**
    *   **[https://api2.binance.com](https://api2.binance.com)**
    *   **[https://api3.binance.com](https://api3.binance.com)**
    *   **[https://api4.binance.com](https://api4.binance.com)**
*   The last 4 endpoints in the point above (`api1`\-`api4`) should give better performance but have less stability.
*   Responses are in JSON by default. To receive responses in SBE, refer to the [SBE FAQ](/docs/binance-spot-api-docs/faqs/sbe_faq) page.
*   Data is returned in **ascending** order. Oldest first, newest last.
*   All time and timestamp related fields in the JSON responses are in **milliseconds by default.** To receive the information in microseconds, please add the header `X-MBX-TIME-UNIT:MICROSECOND` or `X-MBX-TIME-UNIT:microsecond`.
*   Timestamp parameters (e.g. `startTime`, `endTime`, `timestamp`) can be passed in milliseconds or microseconds.
*   For APIs that only send public market data, please use the base endpoint **[https://data-api.binance.vision](https://data-api.binance.vision)**. Please refer to [Market Data Only](/docs/binance-spot-api-docs/faqs/market_data_only) page.
*   If there are enums or terms you want clarification on, please see the [SPOT Glossary](/docs/binance-spot-api-docs/faqs/spot_glossary) for more information.

HTTP Return Codes
=================

*   HTTP `4XX` return codes are used for malformed requests; the issue is on the sender's side.
*   HTTP `403` return code is used when the WAF Limit (Web Application Firewall) has been violated.
*   HTTP `409` return code is used when a cancelReplace order partially succeeds. (i.e. if the cancellation of the order fails but the new order placement succeeds.)
*   HTTP `429` return code is used when breaking a request rate limit.
*   HTTP `418` return code is used when an IP has been auto-banned for continuing to send requests after receiving `429` codes.
*   HTTP `5XX` return codes are used for internal errors; the issue is on Binance's side. It is important to **NOT** treat this as a failure operation; the execution status is **UNKNOWN** and could have been a success.

Error Codes
===========

*   Any endpoint can return an ERROR

Sample Payload below:

```
{  "code": -1121,  "msg": "Invalid symbol."}
```

*   Specific error codes and messages are defined in [Errors Codes](/docs/binance-spot-api-docs/errors).

General Information on Endpoints
================================

*   For `GET` endpoints, parameters must be sent as a `query string`.
*   For `POST`, `PUT`, and `DELETE` endpoints, the parameters may be sent as a `query string` or in the `request body` with content type `application/x-www-form-urlencoded`. You may mix parameters between both the `query string` and `request body` if you wish to do so.
*   Parameters may be sent in any order.
*   If a parameter sent in both the `query string` and `request body`, the `query string` parameter will be used.

LIMITS
======

### General Info on Limits[​](/docs/binance-spot-api-docs/rest-api/limits#general-info-on-limits "Direct link to General Info on Limits")

*   The following `intervalLetter` values for headers:
    *   SECOND => S
    *   MINUTE => M
    *   HOUR => H
    *   DAY => D
*   `intervalNum` describes the amount of the interval. For example, `intervalNum` 5 with `intervalLetter` M means "Every 5 minutes".
*   The `/api/v3/exchangeInfo` `rateLimits` array contains objects related to the exchange's `RAW_REQUESTS`, `REQUEST_WEIGHT`, and `ORDERS` rate limits. These are further defined in the `ENUM definitions` section under `Rate limiters (rateLimitType)`.
*   Requests fail with HTTP status code 429 when you exceed the request rate limit.

### IP Limits[​](/docs/binance-spot-api-docs/rest-api/limits#ip-limits "Direct link to IP Limits")

*   Every request will contain `X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter)` in the response headers which has the current used weight for the IP for all request rate limiters defined.
*   Each route has a `weight` which determines for the number of requests each endpoint counts for. Heavier endpoints and endpoints that do operations on multiple symbols will have a heavier `weight`.
*   When a 429 is received, it's your obligation as an API to back off and not spam the API.
*   **Repeatedly violating rate limits and/or failing to back off after receiving 429s will result in an automated IP ban (HTTP status 418).**
*   IP bans are tracked and **scale in duration** for repeat offenders, **from 2 minutes to 3 days**.
*   A `Retry-After` header is sent with a 418 or 429 responses and will give the **number of seconds** required to wait, in the case of a 429, to prevent a ban, or, in the case of a 418, until the ban is over.
*   **The limits on the API are based on the IPs, not the API keys.**

### Unfilled Order Count[​](/docs/binance-spot-api-docs/rest-api/limits#unfilled-order-count "Direct link to Unfilled Order Count")

*   Every successful order response will contain a `X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter)` header indicating how many orders you have placed for that interval.  
      
    To monitor this, refer to [`GET api/v3/rateLimit/order`](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-unfilled-order-count).
*   Rejected/unsuccessful orders are not guaranteed to have `X-MBX-ORDER-COUNT-**` headers in the response.
*   If you have exceeded this, you will receive a 429 error without the `Retry-After` header.
*   **Please note that if your orders are consistently filled by trades, you can continuously place orders on the API**. For more information, please see [Spot Unfilled Order Count Rules](/docs/binance-spot-api-docs/faqs/order_count_decrement).
*   **The number of unfilled orders is tracked for each account.**

Data Sources
============

*   The API system is asynchronous, so some delay in the response is normal and expected.
*   Each endpoint has a data source indicating where the data is being retrieved, and thus which endpoints have the most up-to-date response.

These are the three sources, ordered by least to most potential for delays in data updates.

*   **Matching Engine** - the data is from the Matching Engine
*   **Memory** - the data is from a server's local or external memory
*   **Database** - the data is taken directly from a database

Some endpoints can have more than 1 data source. (e.g. Memory => Database) This means that the endpoint will check the first Data Source, and if it cannot find the value it's looking for it will check the next one.

Endpoint security type
======================

*   Each endpoint has a security type that determines how you will interact with it. This is stated next to the NAME of the endpoint.
*   If no security type is stated, assume the security type is NONE.
*   API-keys are passed into the Rest API via the `X-MBX-APIKEY` header.
*   API-keys and secret-keys **are case sensitive**.
*   API-keys can be configured to only access certain types of secure endpoints.  
    For example, one API-key could be used for TRADE only,  
    while another API-key can access everything except for TRADE routes.
*   By default, API-keys can access all secure routes.

| Security Type | Description |
| --- | --- |
| NONE | Endpoint can be accessed freely. 
| TRADE | Endpoint requires sending a valid API-Key and signature. 
| USER\_DATA | Endpoint requires sending a valid API-Key and signature. 
| USER\_STREAM | Endpoint requires sending a valid API-Key. 

*   `TRADE` and `USER_DATA` endpoints are `SIGNED` endpoints.

### SIGNED (TRADE and USER\_DATA) Endpoint security[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#signed-trade-and-user_data-endpoint-security "Direct link to SIGNED (TRADE and USER_DATA) Endpoint security")

*   `SIGNED` endpoints require an additional parameter, `signature`, to be sent in the `query string` or `request body`.
*   The `signature` is **not case sensitive**.
*   Please consult the [examples](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#signed-endpoint-examples-for-post-apiv3order) below on how to compute signature, depending on which API key type you are using.

### Timing security[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#timing-security "Direct link to Timing security")

*   A `SIGNED` endpoint also requires a parameter, `timestamp`, to be sent which should be the millisecond timestamp of when the request was created and sent.
    
*   An additional parameter, `recvWindow`, may be sent to specify the number of milliseconds after `timestamp` the request is valid for. If `recvWindow` is not sent, **it defaults to 5000**.
    
*   The logic is as follows:
    
    ```
    if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow) {  // process request} else {  // reject request}
    ```
    

**Serious trading is about timing.** Networks can be unstable and unreliable, which can lead to requests taking varying amounts of time to reach the servers. With `recvWindow`, you can specify that the request must be processed within a certain number of milliseconds or be rejected by the server.

**It is recommended to use a small recvWindow of 5000 or less! The max cannot go beyond 60,000!**

### SIGNED Endpoint Examples for POST /api/v3/order[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#signed-endpoint-examples-for-post-apiv3order "Direct link to SIGNED Endpoint Examples for POST /api/v3/order")

#### HMAC Keys[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#hmac-keys "Direct link to HMAC Keys")

Here is a step-by-step example of how to send a valid signed payload from the Linux command line using `echo`, `openssl`, and `curl`.

| Key | Value |
| --- | --- |
| `apiKey` | vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A 
| `secretKey` | NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j 

| Parameter | Value |
| --- | --- |
| `symbol` | LTCBTC 
| `side` | BUY 
| `type` | LIMIT 
| `timeInForce` | GTC 
| `quantity` | 1 
| `price` | 0.1 
| `recvWindow` | 5000 
| `timestamp` | 1499827319559 

**Example 1: As a request body**

*   **requestBody:** symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
    
*   **HMAC SHA256 signature:**
    
    ```
    [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
    ```
    
*   **curl command:**
    
    ```
    (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order' -d 'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
    ```
    

**Example 2: As a query string**

*   **queryString:** symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
    
*   **HMAC SHA256 signature:**
    
    ```
    [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
    ```
    
*   **curl command:**
    
    ```
    (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
    ```
    

**Example 3: Mixed query string and request body**

*   **queryString:** symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC
    
*   **requestBody:** quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
    
*   **HMAC SHA256 signature:**
    
    ```
    [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTCquantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= 0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77
    ```
    
*   **curl command:**
    
    ```
    (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77'
    ```
    

Note that the signature is different in example 3. There is no & between "GTC" and "quantity=1".

#### RSA Keys[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#rsa-keys "Direct link to RSA Keys")

This will be a step by step process how to create the signature payload to send a valid signed payload.

We support `PKCS#8` currently.

To get your API key, you need to upload your RSA Public Key to your account and a corresponding API key will be provided for you.

For this example, the private key will be referenced as `./test-prv-key.pem`

| Key | Value |
| --- | --- |
| `apiKey` | CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ 

| Parameter | Value |
| --- | --- |
| `symbol` | BTCUSDT 
| `side` | SELL 
| `type` | LIMIT 
| `timeInForce` | GTC 
| `quantity` | 1 
| `price` | 0.2 
| `timestamp` | 1668481559918 
| `recvWindow` | 5000 

**Step 1: Construct the payload**

Arrange the list of parameters into a string. Separate each parameter with a `&`.

For the parameters above, the signature payload would look like this:

```
symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000
```

**Step 2: Compute the signature:**

1.  Encode signature payload as ASCII data.
2.  Sign payload using RSASSA-PKCS1-v1\_5 algorithm with SHA-256 hash function.

```
$ echo -n 'symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000' | openssl dgst -sha256 -sign ./test-prv-key.pem
```

3.  Encode output as base64 string.

```
$  echo -n 'symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000' | openssl dgst -sha256 -sign ./test-prv-key.pem | openssl enc -base64 -AHZ8HOjiJ1s/igS9JA+n7+7Ti/ihtkRF5BIWcPIEluJP6tlbFM/Bf44LfZka/iemtahZAZzcO9TnI5uaXh3++lrqtNonCwp6/245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH+XxaCmR0WcvlKjNQnp12/eKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang/1WOq+Jaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT/fNnMRxFc7u+j3qI//5yuGuu14KR0MuQKKCSpViieD+fIti46sxPTsjSemoUKp0oXA==
```

4.  Since the signature may contain `/` and `=`, this could cause issues with sending the request. So the signature has to be URL encoded.

```
HZ8HOjiJ1s%2FigS9JA%2Bn7%2B7Ti%2FihtkRF5BIWcPIEluJP6tlbFM%2FBf44LfZka%2FiemtahZAZzcO9TnI5uaXh3%2B%2BlrqtNonCwp6%2F245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH%2BXxaCmR0WcvlKjNQnp12%2FeKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang%2F1WOq%2BJaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT%2FfNnMRxFc7u%2Bj3qI%2F%2F5yuGuu14KR0MuQKKCSpViieD%2BfIti46sxPTsjSemoUKp0oXA%3D%3D
```

5.  The curl command:

```
curl -H "X-MBX-APIKEY: CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ" -X POST 'https://api.binance.com/api/v3/order?symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000&signature=HZ8HOjiJ1s%2FigS9JA%2Bn7%2B7Ti%2FihtkRF5BIWcPIEluJP6tlbFM%2FBf44LfZka%2FiemtahZAZzcO9TnI5uaXh3%2B%2BlrqtNonCwp6%2F245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH%2BXxaCmR0WcvlKjNQnp12%2FeKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang%2F1WOq%2BJaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT%2FfNnMRxFc7u%2Bj3qI%2F%2F5yuGuu14KR0MuQKKCSpViieD%2BfIti46sxPTsjSemoUKp0oXA%3D%3D'
```

A sample Bash script below does the similar steps said above.

```
API_KEY="put your own API Key here"PRIVATE_KEY_PATH="test-prv-key.pem"# Set up the request:API_METHOD="POST"API_CALL="api/v3/order"API_PARAMS="symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2"# Sign the request:timestamp=$(date +%s000)api_params_with_timestamp="$API_PARAMS&timestamp=$timestamp"signature=$(echo -n "$api_params_with_timestamp" \            | openssl dgst -sha256 -sign "$PRIVATE_KEY_PATH" \            | openssl enc -base64 -A)# Send the request:curl -H "X-MBX-APIKEY: $API_KEY" -X "$API_METHOD" \    "https://api.binance.com/$API_CALL?$api_params_with_timestamp" \    --data-urlencode "signature=$signature"
```

#### Ed25519 Keys[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#ed25519-keys "Direct link to Ed25519 Keys")

**Note: It is highly recommended to use Ed25519 API keys as it should provide the best performance and security out of all supported key types.**

| Parameter | Value |
| --- | --- |
| `symbol` | BTCUSDT 
| `side` | SELL 
| `type` | LIMIT 
| `timeInForce` | GTC 
| `quantity` | 1 
| `price` | 0.2 
| `timestamp` | 1668481559918 

This is a sample code in Python to show how to sign the payload with an Ed25519 key.

```
#!/usr/bin/env python3import base64import requestsimport timefrom cryptography.hazmat.primitives.serialization import load_pem_private_key# Set up authenticationAPI_KEY='put your own API Key here'PRIVATE_KEY_PATH='test-prv-key.pem'# Load the private key.# In this example the key is expected to be stored without encryption,# but we recommend using a strong password for improved security.with open(PRIVATE_KEY_PATH, 'rb') as f:    private_key = load_pem_private_key(data=f.read(),                                       password=None)# Set up the request parametersparams = {    'symbol':       'BTCUSDT',    'side':         'SELL',    'type':         'LIMIT',    'timeInForce':  'GTC',    'quantity':     '1.0000000',    'price':        '0.20',}# Timestamp the requesttimestamp = int(time.time() * 1000) # UNIX timestamp in millisecondsparams['timestamp'] = timestamp# Sign the requestpayload = '&'.join([f'{param}={value}' for param, value in params.items()])signature = base64.b64encode(private_key.sign(payload.encode('ASCII')))params['signature'] = signature# Send the requestheaders = {    'X-MBX-APIKEY': API_KEY,}response = requests.post(    'https://api.binance.com/api/v3/order',    headers=headers,    data=params,)print(response.json())
```

General endpoints
=================

### Test connectivity[​](/docs/binance-spot-api-docs/rest-api/general-endpoints#test-connectivity "Direct link to Test connectivity")

```
GET /api/v3/ping
```

Test connectivity to the Rest API.

**Weight:** 1

**Parameters:** NONE

**Data Source:** Memory

**Response:**

```
{}
```

### Check server time[​](/docs/binance-spot-api-docs/rest-api/general-endpoints#check-server-time "Direct link to Check server time")

```
GET /api/v3/time
```

Test connectivity to the Rest API and get the current server time.

**Weight:** 1

**Parameters:** NONE

**Data Source:** Memory

**Response:**

```
{  "serverTime": 1499827319559}
```

### Exchange information[​](/docs/binance-spot-api-docs/rest-api/general-endpoints#exchange-information "Direct link to Exchange information")

```
GET /api/v3/exchangeInfo
```

Current exchange trading rules and symbol information

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | No | Example: curl -X GET "[https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC](https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC)" 
| symbols | ARRAY OF STRING | No | Examples: curl -X GET "[https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BNBBTC%22,%22BTCUSDT%22%5D](https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BNBBTC%22,%22BTCUSDT%22%5D)"  
or  
curl -g -X GET '[https://api.binance.com/api/v3/exchangeInfo?symbols=\["BTCUSDT","BNBBTC](https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BTCUSDT%22,%22BNBBTC)"\]' 
| permissions | ENUM | No | Examples: curl -X GET "[https://api.binance.com/api/v3/exchangeInfo?permissions=SPOT](https://api.binance.com/api/v3/exchangeInfo?permissions=SPOT)"  
or  
curl -X GET "[https://api.binance.com/api/v3/exchangeInfo?permissions=%5B%22MARGIN%22%2C%22LEVERAGED%22%5D](https://api.binance.com/api/v3/exchangeInfo?permissions=%5B%22MARGIN%22%2C%22LEVERAGED%22%5D)"  
or  
curl -g -X GET '[https://api.binance.com/api/v3/exchangeInfo?permissions=\["MARGIN","LEVERAGED](https://api.binance.com/api/v3/exchangeInfo?permissions=%5B%22MARGIN%22,%22LEVERAGED)"\]' 
| showPermissionSets | BOOLEAN | No | Controls whether the content of the `permissionSets` field is populated or not. Defaults to `true` 
| symbolStatus | ENUM | No | Filters symbols that have this `tradingStatus`. Valid values: `TRADING`, `HALT`, `BREAK`  
Cannot be used in combination with `symbols` or `symbol`. 

**Notes:**

*   If the value provided to `symbol` or `symbols` do not exist, the endpoint will throw an error saying the symbol is invalid.
*   All parameters are optional.
*   `permissions` can support single or multiple values (e.g. `SPOT`, `["MARGIN","LEVERAGED"]`). This cannot be used in combination with `symbol` or `symbols`.
*   If `permissions` parameter not provided, all symbols that have either `SPOT`, `MARGIN`, or `LEVERAGED` permission will be exposed.
    *   To display symbols with any permission you need to specify them explicitly in `permissions`: (e.g. `["SPOT","MARGIN",...]`.). See [Account and Symbol Permissions](/docs/binance-spot-api-docs/enums#account-and-symbol-permissions) for the full list.

**Examples of Symbol Permissions Interpretation from the Response:**

*   `[["A","B"]]` means you may place an order if your account has either permission "A" **or** permission "B".
*   `[["A"],["B"]]` means you can place an order if your account has permission "A" **and** permission "B".
*   `[["A"],["B","C"]]` means you can place an order if your account has permission "A" **and** permission "B" or permission "C". (Inclusive or is applied here, not exclusive or, so your account may have both permission "B" and permission "C".)

**Data Source:** Memory

**Response:**

```
{  "timezone": "UTC",  "serverTime": 1565246363776,  "rateLimits": [    {      // These are defined in the `ENUM definitions` section under `Rate Limiters (rateLimitType)`.      // All limits are optional    }  ],  "exchangeFilters": [    // These are the defined filters in the `Filters` section.    // All filters are optional.  ],  "symbols": [    {      "symbol": "ETHBTC",      "status": "TRADING",      "baseAsset": "ETH",      "baseAssetPrecision": 8,      "quoteAsset": "BTC",      "quotePrecision": 8, // will be removed in future api versions (v4+)      "quoteAssetPrecision": 8,      "baseCommissionPrecision": 8,      "quoteCommissionPrecision": 8,      "orderTypes": [        "LIMIT",        "LIMIT_MAKER",        "MARKET",        "STOP_LOSS",        "STOP_LOSS_LIMIT",        "TAKE_PROFIT",        "TAKE_PROFIT_LIMIT"      ],      "icebergAllowed": true,      "ocoAllowed": true,      "otoAllowed": true,      "quoteOrderQtyMarketAllowed": true,      "allowTrailingStop": false,      "cancelReplaceAllowed":false,      "allowAmend":false,      "isSpotTradingAllowed": true,      "isMarginTradingAllowed": true,      "filters": [        // These are defined in the Filters section.        // All filters are optional      ],      "permissions": [],      "permissionSets": [        [          "SPOT",          "MARGIN"        ]      ],      "defaultSelfTradePreventionMode": "NONE",      "allowedSelfTradePreventionModes": [        "NONE"      ]    }  ],  // Optional field. Present only when SOR is available.  // https://github.com/binance/binance-spot-api-docs/blob/master/faqs/sor_faq.md  "sors": [    {      "baseAsset": "BTC",      "symbols": [        "BTCUSDT",        "BTCUSDC"      ]    }  ]}
```

Trading endpoints
=================

### New order (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade "Direct link to New order (TRADE)")

```
POST /api/v3/order
```

Send in a new order.

This adds 1 order to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| side | ENUM | YES | Please see [Enums](/docs/binance-spot-api-docs/enums#side) for supported values. 
| type | ENUM | YES | Please see [Enums](/docs/binance-spot-api-docs/enums#ordertypes) for supported values 
| timeInForce | ENUM | NO | Please see [Enums](/docs/binance-spot-api-docs/enums#timeinforce) for supported values. 
| quantity | DECIMAL | NO |  
| quoteOrderQty | DECIMAL | NO |  
| price | DECIMAL | NO |  
| newClientOrderId | STRING | NO | A unique id among open orders. Automatically generated if not sent.  
Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. 
| strategyId | LONG | NO |  
| strategyType | INT | NO | The value cannot be less than `1000000`. 
| stopPrice | DECIMAL | NO | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. 
| trailingDelta | LONG | NO | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. 
| icebergQty | DECIMAL | NO | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. 
| newOrderRespType | ENUM | NO | Set the response JSON. `ACK`, `RESULT`, or `FULL`; `MARKET` and `LIMIT` order types default to `FULL`, all other orders default to `ACK`. 
| selfTradePreventionMode | ENUM | NO | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

Some additional mandatory parameters based on order `type`:

| Type | Additional mandatory parameters | Additional Information |
| --- | --- | --- |
| `LIMIT` | `timeInForce`, `quantity`, `price` |  
| `MARKET` | `quantity` or `quoteOrderQty` | `MARKET` orders using the `quantity` field specifies the amount of the `base asset` the user wants to buy or sell at the market price.  
E.g. MARKET order on BTCUSDT will specify how much BTC the user is buying or selling.  
  
`MARKET` orders using `quoteOrderQty` specifies the amount the user wants to spend (when buying) or receive (when selling) the `quote` asset; the correct `quantity` will be determined based on the market liquidity and `quoteOrderQty`.  
E.g. Using the symbol BTCUSDT:  
`BUY` side, the order will buy as many BTC as `quoteOrderQty` USDT can.  
`SELL` side, the order will sell as much BTC needed to receive `quoteOrderQty` USDT. 
| `STOP_LOSS` | `quantity`, `stopPrice` or `trailingDelta` | This will execute a `MARKET` order when the conditions are met. (e.g. `stopPrice` is met or `trailingDelta` is activated) 
| `STOP_LOSS_LIMIT` | `timeInForce`, `quantity`, `price`, `stopPrice` or `trailingDelta` |  
| `TAKE_PROFIT` | `quantity`, `stopPrice` or `trailingDelta` | This will execute a `MARKET` order when the conditions are met. (e.g. `stopPrice` is met or `trailingDelta` is activated) 
| `TAKE_PROFIT_LIMIT` | `timeInForce`, `quantity`, `price`, `stopPrice` or `trailingDelta` |  
| `LIMIT_MAKER` | `quantity`, `price` | This is a `LIMIT` order that will be rejected if the order immediately matches and trades as a taker.  
This is also known as a POST-ONLY order. 

Other info:

*   Any `LIMIT` or `LIMIT_MAKER` type order can be made an iceberg order by sending an `icebergQty`.
    
*   Any order with an `icebergQty` MUST have `timeInForce` set to `GTC`.
    
*   For `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT_LIMIT` and `TAKE_PROFIT` orders, `trailingDelta` can be combined with `stopPrice`.
    
*   `MARKET` orders using `quoteOrderQty` will not break `LOT_SIZE` filter rules; the order will execute a `quantity` that will have the notional value as close as possible to `quoteOrderQty`. Trigger order price rules against market price for both MARKET and LIMIT versions:
    
*   Price above market price: `STOP_LOSS` `BUY`, `TAKE_PROFIT` `SELL`
    
*   Price below market price: `STOP_LOSS` `SELL`, `TAKE_PROFIT` `BUY`
    

**Data Source:** Matching Engine

**Response - ACK:**

```
{  "symbol": "BTCUSDT",  "orderId": 28,  "orderListId": -1, // Unless it's part of an order list, value will be -1  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",  "transactTime": 1507725176595}
```

**Response - RESULT:**

```
{  "symbol": "BTCUSDT",  "orderId": 28,  "orderListId": -1, // Unless it's part of an order list, value will be -1  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",  "transactTime": 1507725176595,  "price": "0.00000000",  "origQty": "10.00000000",  "executedQty": "10.00000000",  "origQuoteOrderQty": "0.000000",  "cummulativeQuoteQty": "10.00000000",  "status": "FILLED",  "timeInForce": "GTC",  "type": "MARKET",  "side": "SELL",  "workingTime": 1507725176595,  "selfTradePreventionMode": "NONE"}
```

**Response - FULL:**

```
{  "symbol": "BTCUSDT",  "orderId": 28,  "orderListId": -1, // Unless it's part of an order list, value will be -1  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",  "transactTime": 1507725176595,  "price": "0.00000000",  "origQty": "10.00000000",  "executedQty": "10.00000000",  "origQuoteOrderQty": "0.000000",  "cummulativeQuoteQty": "10.00000000",  "status": "FILLED",  "timeInForce": "GTC",  "type": "MARKET",  "side": "SELL",  "workingTime": 1507725176595,  "selfTradePreventionMode": "NONE",  "fills": [    {      "price": "4000.00000000",      "qty": "1.00000000",      "commission": "4.00000000",      "commissionAsset": "USDT",      "tradeId": 56    },    {      "price": "3999.00000000",      "qty": "5.00000000",      "commission": "19.99500000",      "commissionAsset": "USDT",      "tradeId": 57    },    {      "price": "3998.00000000",      "qty": "2.00000000",      "commission": "7.99600000",      "commissionAsset": "USDT",      "tradeId": 58    },    {      "price": "3997.00000000",      "qty": "1.00000000",      "commission": "3.99700000",      "commissionAsset": "USDT",      "tradeId": 59    },    {      "price": "3995.00000000",      "qty": "1.00000000",      "commission": "3.99500000",      "commissionAsset": "USDT",      "tradeId": 60    }  ]}
```

**Conditional fields in Order Responses**

There are fields in the order responses (e.g. order placement, order query, order cancellation) that appear only if certain conditions are met.

These fields can apply to order lists.

The fields are listed below:

| Field | Description | Visibility conditions | Examples |
| --- | --- | --- | --- |
| `icebergQty` | Quantity for the iceberg order | Appears only if the parameter `icebergQty` was sent in the request. | `"icebergQty": "0.00000000"` 
| `preventedMatchId` | When used in combination with `symbol`, can be used to query a prevented match. | Appears only if the order expired due to STP. | `"preventedMatchId": 0` 
| `preventedQuantity` | Order quantity that expired due to STP | Appears only if the order expired due to STP. | `"preventedQuantity": "1.200000"` 
| `stopPrice` | Price when the algorithmic order will be triggered | Appears for `STOP_LOSS`. `TAKE_PROFIT`, `STOP_LOSS_LIMIT` and `TAKE_PROFIT_LIMIT` orders. | `"stopPrice": "23500.00000000"` 
| `strategyId` | Can be used to label an order that's part of an order strategy. | Appears if the parameter was populated in the request. | `"strategyId": 37463720` 
| `strategyType` | Can be used to label an order that is using an order strategy. | Appears if the parameter was populated in the request. | `"strategyType": 1000000` 
| `trailingDelta` | Delta price change required before order activation | Appears for Trailing Stop Orders. | `"trailingDelta": 10` 
| `trailingTime` | Time when the trailing order is now active and tracking price changes | Appears only for Trailing Stop Orders. | `"trailingTime": -1` 
| `usedSor` | Field that determines whether order used SOR | Appears when placing orders using SOR | `"usedSor": true` 
| `workingFloor` | Field that determines whether the order is being filled by the SOR or by the order book the order was submitted to. | Appears when placing orders using SOR | `"workingFloor": "SOR"` 

### Test new order (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#test-new-order-trade "Direct link to Test new order (TRADE)")

```
POST /api/v3/order/test
```

Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.

**Weight:**

| Condition | Request Weight |
| --- | --- |
| Without `computeCommissionRates` | 1 
| With `computeCommissionRates` | 20 

**Parameters:**

In addition to all parameters accepted by [`POST /api/v3/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade), the following optional parameters are also accepted:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| computeCommissionRates | BOOLEAN | NO | Default: `false` 

**Data Source:** Memory

**Response:**

Without `computeCommissionRates`

```
{}
```

With `computeCommissionRates`

```
{  "standardCommissionForOrder": {  //Standard commission rates on trades from the order.    "maker": "0.00000112",    "taker": "0.00000114"  },  "taxCommissionForOrder": {       //Tax commission rates for trades from the order.    "maker": "0.00000112",    "taker": "0.00000114"  },  "discount": {                    //Discount on standard commissions when paying in BNB.    "enabledForAccount": true,    "enabledForSymbol": true,    "discountAsset": "BNB",    "discount": "0.25000000"       //Standard commission is reduced by this rate when paying commission in BNB.  }}
```

### Query order (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-order-user_data "Direct link to Query order (USER_DATA)")

```
GET /api/v3/order
```

Check an order's status.

**Weight:** 4

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderId | LONG | NO |  
| origClientOrderId | STRING | NO |  
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Notes:**

*   Either `orderId` or `origClientOrderId` must be sent.
*   If both `orderId` and `origClientOrderId` are provided, the `orderId` is searched first, then the `origClientOrderId` from that result is checked against that order. If both conditions are not met the request will be rejected.
*   For some historical orders `cummulativeQuoteQty` will be < 0, meaning the data is not available at this time.

**Data Source:** Memory => Database

**Response:**

```
{  "symbol": "LTCBTC",  "orderId": 1,  "orderListId": -1,                 // This field will always have a value of -1 if not an order list.  "clientOrderId": "myOrder1",  "price": "0.1",  "origQty": "1.0",  "executedQty": "0.0",  "cummulativeQuoteQty": "0.0",  "status": "NEW",  "timeInForce": "GTC",  "type": "LIMIT",  "side": "BUY",  "stopPrice": "0.0",  "icebergQty": "0.0",  "time": 1499827319559,  "updateTime": 1499827319559,  "isWorking": true,  "workingTime":1499827319559,  "origQuoteOrderQty": "0.000000",  "selfTradePreventionMode": "NONE"}
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

### Cancel order (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-order-trade "Direct link to Cancel order (TRADE)")

```
DELETE /api/v3/order
```

Cancel an active order.

**Weight:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderId | LONG | NO |  
| origClientOrderId | STRING | NO |  
| newClientOrderId | STRING | NO | Used to uniquely identify this cancel. Automatically generated by default. 
| cancelRestrictions | ENUM | NO | Supported values:  
`ONLY_NEW` - Cancel will succeed if the order status is `NEW`.  
`ONLY_PARTIALLY_FILLED` \- Cancel will succeed if order status is `PARTIALLY_FILLED`. 
| recvWindow | LONG | NO | The value cannot be greater than `60000`. 
| timestamp | LONG | YES |  

Notes:

*   Either `orderId` or `origClientOrderId` must be sent.
*   If both `orderId` and `origClientOrderId` are provided, the `orderId` is searched first, then the `origClientOrderId` from that result is checked against that order. If both conditions are not met the request will be rejected.

**Data Source:** Matching Engine

**Response:**

```
{  "symbol": "LTCBTC",  "origClientOrderId": "myOrder1",  "orderId": 4,  "orderListId": -1, // Unless it's part of an order list, value will be -1  "clientOrderId": "cancelMyOrder1",  "transactTime": 1684804350068,  "price": "2.00000000",  "origQty": "1.00000000",  "executedQty": "0.00000000",  "cummulativeQuoteQty": "0.00000000",  "status": "CANCELED",  "timeInForce": "GTC",  "type": "LIMIT",  "side": "BUY",  "selfTradePreventionMode": "NONE"}
```

**Notes:**

*   The payload above does not show all fields that can appear in the order response. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).
*   The performance for canceling an order (single cancel or as part of a cancel-replace) is always better when only orderId is sent. Sending `origClientOrderId` or both `orderId` + `origClientOrderId` will be slower.

**Regarding `cancelRestrictions`**

*   If the `cancelRestrictions` value is not any of the supported values, the error will be:

```
{    "code": -1145,    "msg": "Invalid cancelRestrictions"}
```

*   If the order did not pass the conditions for `cancelRestrictions`, the error will be:

```
{    "code": -2011,    "msg": "Order was not canceled due to cancel restrictions."}
```

### Cancel All Open Orders on a Symbol (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-all-open-orders-on-a-symbol-trade "Direct link to Cancel All Open Orders on a Symbol (TRADE)")

```
DELETE /api/v3/openOrders
```

Cancels all active orders on a symbol. This includes orders that are part of an order list.

**Weight:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Matching Engine

**Response:**

```
[  {    "symbol": "BTCUSDT",    "origClientOrderId": "E6APeyTJvkMvLMYMqu1KQ4",    "orderId": 11,    "orderListId": -1,    "clientOrderId": "pXLV6Hz6mprAcVYpVMTGgx",    "transactTime": 1684804350068,    "price": "0.089853",    "origQty": "0.178622",    "executedQty": "0.000000",    "cummulativeQuoteQty": "0.000000",    "status": "CANCELED",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "selfTradePreventionMode": "NONE"  },  {    "symbol": "BTCUSDT",    "origClientOrderId": "A3EF2HCwxgZPFMrfwbgrhv",    "orderId": 13,    "orderListId": -1,    "clientOrderId": "pXLV6Hz6mprAcVYpVMTGgx",    "transactTime": 1684804350069,    "price": "0.090430",    "origQty": "0.178622",    "executedQty": "0.000000",    "cummulativeQuoteQty": "0.000000",    "status": "CANCELED",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "selfTradePreventionMode": "NONE"  },  {    "orderListId": 1929,    "contingencyType": "OCO",    "listStatusType": "ALL_DONE",    "listOrderStatus": "ALL_DONE",    "listClientOrderId": "2inzWQdDvZLHbbAmAozX2N",    "transactionTime": 1585230948299,    "symbol": "BTCUSDT",    "orders": [      {        "symbol": "BTCUSDT",        "orderId": 20,        "clientOrderId": "CwOOIPHSmYywx6jZX77TdL"      },      {        "symbol": "BTCUSDT",        "orderId": 21,        "clientOrderId": "461cPg51vQjV3zIMOXNz39"      }    ],    "orderReports": [      {        "symbol": "BTCUSDT",        "origClientOrderId": "CwOOIPHSmYywx6jZX77TdL",        "orderId": 20,        "orderListId": 1929,        "clientOrderId": "pXLV6Hz6mprAcVYpVMTGgx",        "transactTime": 1688005070874,        "price": "0.668611",        "origQty": "0.690354",        "executedQty": "0.000000",        "cummulativeQuoteQty": "0.000000",        "status": "CANCELED",        "timeInForce": "GTC",        "type": "STOP_LOSS_LIMIT",        "side": "BUY",        "stopPrice": "0.378131",        "icebergQty": "0.017083",        "selfTradePreventionMode": "NONE"      },      {        "symbol": "BTCUSDT",        "origClientOrderId": "461cPg51vQjV3zIMOXNz39",        "orderId": 21,        "orderListId": 1929,        "clientOrderId": "pXLV6Hz6mprAcVYpVMTGgx",        "transactTime": 1688005070874,        "price": "0.008791",        "origQty": "0.690354",        "executedQty": "0.000000",        "cummulativeQuoteQty": "0.000000",        "status": "CANCELED",        "timeInForce": "GTC",        "type": "LIMIT_MAKER",        "side": "BUY",        "icebergQty": "0.639962",        "selfTradePreventionMode": "NONE"      }    ]  }]
```

### Cancel an Existing Order and Send a New Order (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-an-existing-order-and-send-a-new-order-trade "Direct link to Cancel an Existing Order and Send a New Order (TRADE)")

```
POST /api/v3/order/cancelReplace
```

Cancels an existing order and places a new order on the same symbol.

Filters and Order Count are evaluated before the processing of the cancellation and order placement occurs.

A new order that was not attempted (i.e. when `newOrderResult: NOT_ATTEMPTED`), will still increase the unfilled order count by 1.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| side | ENUM | YES |  
| type | ENUM | YES |  
| cancelReplaceMode | ENUM | YES | The allowed values are:  
`STOP_ON_FAILURE` - If the cancel request fails, the new order placement will not be attempted.  
`ALLOW_FAILURE` - new order placement will be attempted even if cancel request fails. 
| timeInForce | ENUM | NO |  
| quantity | DECIMAL | NO |  
| quoteOrderQty | DECIMAL | NO |  
| price | DECIMAL | NO |  
| cancelNewClientOrderId | STRING | NO | Used to uniquely identify this cancel. Automatically generated by default. 
| cancelOrigClientOrderId | STRING | NO | Either `cancelOrderId` or `cancelOrigClientOrderId` must be sent.  
  
If both `cancelOrderId` and `cancelOrigClientOrderId` parameters are provided, the `cancelOrderId` is searched first, then the `cancelOrigClientOrderId` from that result is checked against that order.  
  
If both conditions are not met the request will be rejected. 
| cancelOrderId | LONG | NO | Either `cancelOrderId` or `cancelOrigClientOrderId` must be sent.  
  
If both `cancelOrderId` and `cancelOrigClientOrderId` parameters are provided, the `cancelOrderId` is searched first, then the `cancelOrigClientOrderId` from that result is checked against that order.  
  
If both conditions are not met the request will be rejected. 
| newClientOrderId | STRING | NO | Used to identify the new order. 
| strategyId | LONG | NO |  
| strategyType | INT | NO | The value cannot be less than `1000000`. 
| stopPrice | DECIMAL | NO |  
| trailingDelta | LONG | NO | See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) 
| icebergQty | DECIMAL | NO |  
| newOrderRespType | ENUM | NO | Allowed values:  
`ACK`, `RESULT`, `FULL`  
`MARKET` and `LIMIT` orders types default to `FULL`; all other orders default to `ACK` 
| selfTradePreventionMode | ENUM | NO | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). 
| cancelRestrictions | ENUM | NO | Supported values:  
`ONLY_NEW` - Cancel will succeed if the order status is `NEW`.  
`ONLY_PARTIALLY_FILLED` \- Cancel will succeed if order status is `PARTIALLY_FILLED`. For more information please refer to [Regarding `cancelRestrictions`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#regarding-cancelrestrictions) 
| orderRateLimitExceededMode | ENUM | No | Supported values:  
`DO_NOTHING` (default)- will only attempt to cancel the order if account has not exceeded the unfilled order rate limit  
`CANCEL_ONLY` - will always cancel the order 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

Similar to `POST /api/v3/order`, additional mandatory parameters are determined by `type`.

Response format varies depending on whether the processing of the message succeeded, partially succeeded, or failed.

**Data Source:** Matching Engine

| Request | Response |
| --- | --- |
| `cancelReplaceMode` | `orderRateLimitExceededMode` | Unfilled Order Count | `cancelResult` | `newOrderResult` | `status` |
| --- | --- | --- | --- | --- | --- |
| `STOP_ON_FAILURE` | `DO_NOTHING` | Within Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | `200` 
| ❌ `FAILURE` | ➖ `NOT_ATTEMPTED` | `400` 
| ✅ `SUCCESS` | ❌ `FAILURE` | `409` 
| Exceeds Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | N/A 
| ❌ `FAILURE` | ➖ `NOT_ATTEMPTED` | N/A 
| ✅ `SUCCESS` | ❌ `FAILURE` | N/A 
| `CANCEL_ONLY` | Within Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | `200` 
| ❌ `FAILURE` | ➖ `NOT_ATTEMPTED` | `400` 
| ✅ `SUCCESS` | ❌ `FAILURE` | `409` 
| Exceeds Limits | ❌ `FAILURE` | ➖ `NOT_ATTEMPTED` | `429` 
| ✅ `SUCCESS` | ❌ `FAILURE` | `429` 
| `ALLOW_FAILURE` | `DO_NOTHING` | Within Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | `200` 
| ❌ `FAILURE` | ❌ `FAILURE` | `400` 
| ❌ `FAILURE` | ✅ `SUCCESS` | `409` 
| ✅ `SUCCESS` | ❌ `FAILURE` | `409` 
| Exceeds Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | N/A 
| ❌ `FAILURE` | ❌ `FAILURE` | N/A 
| ❌ `FAILURE` | ✅ `SUCCESS` | N/A 
| ✅ `SUCCESS` | ❌ `FAILURE` | N/A 
| `CANCEL_ONLY` | Within Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | `200` 
| ❌ `FAILURE` | ❌ `FAILURE` | `400` 
| ❌ `FAILURE` | ✅ `SUCCESS` | `409` 
| ✅ `SUCCESS` | ❌ `FAILURE` | `409` 
| Exceeds Limits | ✅ `SUCCESS` | ✅ `SUCCESS` | `N/A` 
| ❌ `FAILURE` | ❌ `FAILURE` | `400` 
| ❌ `FAILURE` | ✅ `SUCCESS` | N/A 
| ✅ `SUCCESS` | ❌ `FAILURE` | `409` 

**Response SUCCESS unfilled order count is not exceeded:**

```
// Both the cancel order placement and new order placement succeeded.{  "cancelResult": "SUCCESS",  "newOrderResult": "SUCCESS",  "cancelResponse": {    "symbol": "BTCUSDT",    "origClientOrderId": "DnLo3vTAQcjha43lAZhZ0y",    "orderId": 9,    "orderListId": -1,    "clientOrderId": "osxN3JXAtJvKvCqGeMWMVR",    "transactTime": 1684804350068,    "price": "0.01000000",    "origQty": "0.000100",    "executedQty": "0.00000000",    "origQuoteOrderQty": "0.000000",    "cummulativeQuoteQty": "0.00000000",    "status": "CANCELED",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "SELL",    "selfTradePreventionMode": "NONE"  },  "newOrderResponse": {    "symbol": "BTCUSDT",    "orderId": 10,    "orderListId": -1,    "clientOrderId": "wOceeeOzNORyLiQfw7jd8S",    "transactTime": 1652928801803,    "price": "0.02000000",    "origQty": "0.040000",    "executedQty": "0.00000000",    "cummulativeQuoteQty": "0.00000000",    "origQuoteOrderQty": "0.000000",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "workingTime": 1669277163808,    "fills": [],    "selfTradePreventionMode": "NONE"  }}
```

**Response when Cancel Order Fails with STOP\_ON FAILURE and account has not exceeded unfilled order count:**

```
{  "code": -2022,  "msg": "Order cancel-replace failed.",  "data": {    "cancelResult": "FAILURE",    "newOrderResult": "NOT_ATTEMPTED",    "cancelResponse": {      "code": -2011,      "msg": "Unknown order sent."    },    "newOrderResponse": null  }}
```

**Response when Cancel Order Succeeds but New Order Placement Fails and account has not exceeded the unfilled order count:**

```
{  "code": -2021,  "msg": "Order cancel-replace partially failed.",  "data": {    "cancelResult": "SUCCESS",    "newOrderResult": "FAILURE",    "cancelResponse": {      "symbol": "BTCUSDT",      "origClientOrderId": "86M8erehfExV8z2RC8Zo8k",      "orderId": 3,      "orderListId": -1,      "clientOrderId": "G1kLo6aDv2KGNTFcjfTSFq",      "price": "0.006123",      "origQty": "10000.000000",      "executedQty": "0.000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.000000",      "status": "CANCELED",      "timeInForce": "GTC",      "type": "LIMIT_MAKER",      "side": "SELL",      "selfTradePreventionMode": "NONE"    },    "newOrderResponse": {      "code": -2010,      "msg": "Order would immediately match and take."    }  }}
```

**Response when Cancel Order fails with ALLOW\_FAILURE and account has not exceeded the unfilled order count:**

```
{  "code": -2021,  "msg": "Order cancel-replace partially failed.",  "data": {    "cancelResult": "FAILURE",    "newOrderResult": "SUCCESS",    "cancelResponse": {      "code": -2011,      "msg": "Unknown order sent."    },    "newOrderResponse": {      "symbol": "BTCUSDT",      "orderId": 11,      "orderListId": -1,      "clientOrderId": "pfojJMg6IMNDKuJqDxvoxN",      "transactTime": 1648540168818    }  }}
```

**Response when both Cancel Order and New Order Placement fail using `cancelReplaceMode=ALLOW_FAILURE` and account has not exceeded the unfilled order count:**

```
{  "code": -2022,  "msg": "Order cancel-replace failed.",  "data": {    "cancelResult": "FAILURE",    "newOrderResult": "FAILURE",    "cancelResponse": {      "code": -2011,      "msg": "Unknown order sent."    },    "newOrderResponse": {      "code": -2010,      "msg": "Order would immediately match and take."    }  }}
```

**Response when using `orderRateLimitExceededMode=DO_NOTHING` and account's unfilled order count has been exceeded:**

```
{  "code": -1015,  "msg": "Too many new orders; current limit is 1 orders per 10 SECOND."}
```

**Response when using `orderRateLimitExceededMode=CANCEL_ONLY` and account's unfilled order count has been exceeded:**

```
{  "code": -2021,  "msg": "Order cancel-replace partially failed.",  "data": {    "cancelResult": "SUCCESS",    "newOrderResult": "FAILURE",    "cancelResponse": {      "symbol": "LTCBNB",      "origClientOrderId": "GKt5zzfOxRDSQLveDYCTkc",      "orderId": 64,      "orderListId": -1,      "clientOrderId": "loehOJF3FjoreUBDmv739R",      "transactTime": 1715779007228,      "price": "1.00",      "origQty": "10.00000000",      "executedQty": "0.00000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.00",      "status": "CANCELED",      "timeInForce": "GTC",      "type": "LIMIT",      "side": "SELL",      "selfTradePreventionMode": "NONE"    },    "newOrderResponse": {      "code": -1015,      "msg": "Too many new orders; current limit is 1 orders per 10 SECOND."    }  }}
```

**Notes:**

*   The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).
*   The performance for canceling an order (single cancel or as part of a cancel-replace) is always better when only `orderId` is sent. Sending `origClientOrderId` or both `orderId` + `origClientOrderId` will be slower.

### Order Amend Keep Priority (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#order-amend-keep-priority-trade "Direct link to Order Amend Keep Priority (TRADE)")

```
PUT /api/v3/order/amend/keepPriority
```

Reduce the quantity of an existing open order.

This adds 0 orders to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

Read [Order Amend Keep Priority FAQ](/docs/binance-spot-api-docs/faqs/order_amend_keep_priority) to learn more.

**Weight**: 4

**Unfilled Order Count:** 0

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderId | LONG | NO\* | `orderId` or `origClientOrderId` must be sent 
| origClientOrderId | STRING | NO\* | `orderId` or `origClientOrderId` must be sent 
| newClientOrderId | STRING | NO\* | The new client order ID for the order after being amended.  
If not sent, one will be randomly generated.  
It is possible to reuse the current clientOrderId by sending it as the `newClientOrderId`. 
| newQty | DECIMAL | YES | `newQty` must be greater than 0 and less than the order's quantity. 
| recvWindow | LONG | NO | The value cannot be greater than `60000`. 
| timestamp | LONG | YES |  

**Data Source**: Matching Engine

**Response:** Response for a single order:

```
{  "transactTime": 1741926410255,  "executionId": 75,  "amendedOrder":  {    "symbol": "BTCUSDT",    "orderId": 33,    "orderListId": -1,    "origClientOrderId": "5xrgbMyg6z36NzBn2pbT8H",    "clientOrderId": "PFaq6hIHxqFENGfdtn4J6Q",    "price": "6.00000000",    "qty": "5.00000000",    "executedQty": "0.00000000",    "preventedQty": "0.00000000",    "quoteOrderQty": "0.00000000",    "cumulativeQuoteQty": "0.00000000",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "SELL",    "workingTime": 1741926410242,    "selfTradePreventionMode": "NONE"  }}
```

Response for an order that is part of an Order list:

```
{  "transactTime": 1741669661670,  "executionId": 22,  "amendedOrder":  {    "symbol": "BTCUSDT",    "orderId": 9,    "orderListId": 1,    "origClientOrderId": "W0fJ9fiLKHOJutovPK3oJp",    "clientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi",    "price": "0.00000000",    "qty": "4.00000000",    "executedQty": "0.00000000",    "preventedQty": "0.00000000",    "quoteOrderQty": "0.00000000",    "cumulativeQuoteQty": "0.00000000",    "status": "PENDING_NEW",    "timeInForce": "GTC",    "type": "MARKET",    "side": "BUY",    "selfTradePreventionMode": "NONE"  },  "listStatus":  {    "orderListId": 1,    "contingencyType": "OTO",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "AT7FTxZXylVSwRoZs52mt3",    "symbol": "BTCUSDT",    "orders":    [      {        "symbol": "BTCUSDT",        "orderId": 8,        "clientOrderId": "GkwwHZUUbFtZOoH1YsZk9Q"      },      {        "symbol": "BTCUSDT",        "orderId": 9,        "clientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi"      }    ]  }}
```

**Note:** The payloads above do not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

### Current open orders (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#current-open-orders-user_data "Direct link to Current open orders (USER_DATA)")

```
GET /api/v3/openOrders
```

Get all open orders on a symbol. **Careful** when accessing this with no symbol.

**Weight:** 6 for a single symbol; **80** when the symbol parameter is omitted

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | NO |  
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

*   If the symbol is not sent, orders for all symbols will be returned in an array.

**Data Source:** Memory => Database

**Response:**

```
[  {    "symbol": "LTCBTC",    "orderId": 1,    "orderListId": -1, // Unless it's part of an order list, value will be -1    "clientOrderId": "myOrder1",    "price": "0.1",    "origQty": "1.0",    "executedQty": "0.0",    "cummulativeQuoteQty": "0.0",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "stopPrice": "0.0",    "icebergQty": "0.0",    "time": 1499827319559,    "updateTime": 1499827319559,    "isWorking": true,    "origQuoteOrderQty": "0.000000",    "workingTime": 1499827319559,    "selfTradePreventionMode": "NONE"  }]
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

### All orders (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#all-orders-user_data "Direct link to All orders (USER_DATA)")

```
GET /api/v3/allOrders
```

Get all account orders; active, canceled, or filled.

**Weight:** 20

**Data Source:** Database

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderId | LONG | NO |  
| startTime | LONG | NO |  
| endTime | LONG | NO |  
| limit | INT | NO | Default: 500; Maximum: 1000. 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Notes:**

*   If `orderId` is set, it will get orders >= that `orderId`. Otherwise most recent orders are returned.
*   For some historical orders `cummulativeQuoteQty` will be < 0, meaning the data is not available at this time.
*   If `startTime` and/or `endTime` provided, `orderId` is not required.
*   The time between `startTime` and `endTime` can't be longer than 24 hours.

**Response:**

```
[  {    "symbol": "LTCBTC",    "orderId": 1,    "orderListId": -1, //Unless it's part of an order list, value will be -1    "clientOrderId": "myOrder1",    "price": "0.1",    "origQty": "1.0",    "executedQty": "0.0",    "cummulativeQuoteQty": "0.0",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "stopPrice": "0.0",    "icebergQty": "0.0",    "time": 1499827319559,    "updateTime": 1499827319559,    "isWorking": true,    "origQuoteOrderQty": "0.000000",    "workingTime": 1499827319559,    "selfTradePreventionMode": "NONE"  }]
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

### Order lists[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#order-lists "Direct link to Order lists")

#### New OCO - Deprecated (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-oco---deprecated-trade "Direct link to New OCO - Deprecated (TRADE)")

```
POST /api/v3/order/oco
```

Send in a new OCO.

*   Price Restrictions:
    *   `SELL`: Limit Price > Last Price > Stop Price
    *   `BUY`: Limit Price < Last Price < Stop Price
*   Quantity Restrictions:
    *   Both legs must have the same quantity.
    *   `ICEBERG` quantities however do not have to be the same
*   `OCO` adds **2 orders** to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| listClientOrderId | STRING | NO | A unique Id for the entire orderList 
| side | ENUM | YES |  
| quantity | DECIMAL | YES |  
| limitClientOrderId | STRING | NO | A unique Id for the limit order 
| price | DECIMAL | YES |  
| limitStrategyId | LONG | NO |  
| limitStrategyType | INT | NO | The value cannot be less than `1000000`. 
| limitIcebergQty | DECIMAL | NO | Used to make the `LIMIT_MAKER` leg an iceberg order. 
| trailingDelta | LONG | NO |  
| stopClientOrderId | STRING | NO | A unique Id for the stop loss/stop loss limit leg 
| stopPrice | DECIMAL | YES |  
| stopStrategyId | LONG | NO |  
| stopStrategyType | INT | NO | The value cannot be less than `1000000`. 
| stopLimitPrice | DECIMAL | NO | If provided, `stopLimitTimeInForce` is required. 
| stopIcebergQty | DECIMAL | NO | Used with `STOP_LOSS_LIMIT` leg to make an iceberg order. 
| stopLimitTimeInForce | ENUM | NO | Valid values are `GTC`/`FOK`/`IOC` 
| newOrderRespType | ENUM | NO | Set the response JSON. 
| selfTradePreventionMode | ENUM | NO | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Matching Engine

**Response:**

```
{  "orderListId": 0,  "contingencyType": "OCO",  "listStatusType": "EXEC_STARTED",  "listOrderStatus": "EXECUTING",  "listClientOrderId": "JYVpp3F0f5CAG15DhtrqLp",  "transactionTime": 1563417480525,  "symbol": "LTCBTC",  "orders": [    {      "symbol": "LTCBTC",      "orderId": 2,      "clientOrderId": "Kk7sqHb9J6mJWTMDVW7Vos"    },    {      "symbol": "LTCBTC",      "orderId": 3,      "clientOrderId": "xTXKaGYd4bluPVp78IVRvl"    }  ],  "orderReports": [    {      "symbol": "LTCBTC",      "orderId": 2,      "orderListId": 0,      "clientOrderId": "Kk7sqHb9J6mJWTMDVW7Vos",      "transactTime": 1563417480525,      "price": "0.000000",      "origQty": "0.624363",      "executedQty": "0.000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.000000",      "status": "NEW",      "timeInForce": "GTC",      "type": "STOP_LOSS",      "side": "BUY",      "stopPrice": "0.960664",      "workingTime": -1,      "selfTradePreventionMode": "NONE"    },    {      "symbol": "LTCBTC",      "orderId": 3,      "orderListId": 0,      "clientOrderId": "xTXKaGYd4bluPVp78IVRvl",      "transactTime": 1563417480525,      "price": "0.036435",      "origQty": "0.624363",      "executedQty": "0.000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.000000",      "status": "NEW",      "timeInForce": "GTC",      "type": "LIMIT_MAKER",      "side": "BUY",      "workingTime": 1563417480525,      "selfTradePreventionMode": "NONE"    }  ]}
```

#### New Order list - OCO (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oco-trade "Direct link to New Order list - OCO (TRADE)")

```
POST /api/v3/orderList/oco
```

Send in an one-cancels-the-other (OCO) pair, where activation of one order immediately cancels the other.

*   An OCO has 2 orders called the **above order** and **below order**.
*   One of the orders must be a `LIMIT_MAKER/TAKE_PROFIT/TAKE_PROFIT_LIMIT` order and the other must be `STOP_LOSS` or `STOP_LOSS_LIMIT` order.
*   Price restrictions
    *   If the OCO is on the `SELL` side:
        *   `LIMIT_MAKER/TAKE_PROFIT_LIMIT` `price` > Last Traded Price > `STOP_LOSS/STOP_LOSS_LIMIT` `stopPrice`
        *   `TAKE_PROFIT stopPrice` > Last Traded Price > `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
    *   If the OCO is on the `BUY` side:
        *   `LIMIT_MAKER/TAKE_PROFIT_LIMIT price` < Last Traded Price < `stopPrice`
        *   `TAKE_PROFIT stopPrice` < Last Traded Price < `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
*   OCOs add **2 orders** to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | Yes |  
| listClientOrderId | STRING | No | Arbitrary unique ID among open order lists. Automatically generated if not sent.  
A new order list with the same `listClientOrderId` is accepted only when the previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `aboveClientOrderId` and the `belowCLientOrderId`. 
| side | ENUM | Yes | `BUY` or `SELL` 
| quantity | DECIMAL | Yes | Quantity for both orders of the order list. 
| aboveType | ENUM | Yes | Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` 
| aboveClientOrderId | STRING | No | Arbitrary unique ID among open orders for the above order. Automatically generated if not sent 
| aboveIcebergQty | LONG | No | Note that this can only be used if `aboveTimeInForce` is `GTC`. 
| abovePrice | DECIMAL | No | Can be used if `aboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. 
| aboveStopPrice | DECIMAL | No | Can be used if `aboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`  
Either `aboveStopPrice` or `aboveTrailingDelta` or both, must be specified. 
| aboveTrailingDelta | LONG | No | See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). 
| aboveTimeInForce | DECIMAL | No | Required if `aboveType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` 
| aboveStrategyId | LONG | No | Arbitrary numeric value identifying the above order within an order strategy. 
| aboveStrategyType | INT | No | Arbitrary numeric value identifying the above order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| belowType | ENUM | Yes | Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT` 
| belowClientOrderId | STRING | No | Arbitrary unique ID among open orders for the below order. Automatically generated if not sent 
| belowIcebergQty | LONG | No | Note that this can only be used if `belowTimeInForce` is `GTC`. 
| belowPrice | DECIMAL | No | Can be used if `belowType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. 
| belowStopPrice | DECIMAL | No | Can be used if `belowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT` or `TAKE_PROFIT_LIMIT`  
Either belowStopPrice or belowTrailingDelta or both, must be specified. 
| belowTrailingDelta | LONG | No | See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). 
| belowTimeInForce | ENUM | No | Required if `belowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT`. 
| belowStrategyId | LONG | No | Arbitrary numeric value identifying the below order within an order strategy. 
| belowStrategyType | INT | No | Arbitrary numeric value identifying the below order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| newOrderRespType | ENUM | No | Select response format: `ACK`, `RESULT`, `FULL` 
| selfTradePreventionMode | ENUM | No | The allowed enums is dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) 
| recvWindow | LONG | No | The value cannot be greater than `60000`. 
| timestamp | LONG | Yes |  

**Data Source:** Matching Engine

**Response:**

Response format for `orderReports` is selected using the `newOrderRespType` parameter. The following example is for the `RESULT` response type. See [`POST /api/v3/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade) for more examples.

```
{    "orderListId": 1,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "lH1YDkuQKWiXVXHPSKYEIp",    "transactionTime": 1710485608839,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 10,            "clientOrderId": "44nZvqpemY7sVYgPYbvPih"        },        {            "symbol": "LTCBTC",            "orderId": 11,            "clientOrderId": "NuMp0nVYnciDiFmVqfpBqK"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 10,            "orderListId": 1,            "clientOrderId": "44nZvqpemY7sVYgPYbvPih",            "transactTime": 1710485608839,            "price": "1.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "STOP_LOSS_LIMIT",            "side": "SELL",            "stopPrice": "1.00000000",            "workingTime": -1,            "icebergQty": "1.00000000",            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 11,            "orderListId": 1,            "clientOrderId": "NuMp0nVYnciDiFmVqfpBqK",            "transactTime": 1710485608839,            "price": "3.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT_MAKER",            "side": "SELL",            "workingTime": 1710485608839,            "selfTradePreventionMode": "NONE"        }    ]}
```

#### New Order list - OTO (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oto-trade "Direct link to New Order list - OTO (TRADE)")

```
POST /api/v3/orderList/oto
```

Places an OTO.

*   An OTO (One-Triggers-the-Other) is an order list comprised of 2 orders.
*   The first order is called the **working order** and must be `LIMIT` or `LIMIT_MAKER`. Initially, only the working order goes on the order book.
*   The second order is called the **pending order**. It can be any order type except for `MARKET` orders using parameter `quoteOrderQty`. The pending order is only placed on the order book when the working order gets **fully filled**.
*   If either the working order or the pending order is cancelled individually, the other order in the order list will also be canceled or expired.
*   When the order list is placed, if the working order gets **immediately fully filled**, the placement response will show the working order as `FILLED` but the pending order will still appear as `PENDING_NEW`. You need to query the status of the pending order again to see its updated status.
*   OTOs add **2 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| listClientOrderId | STRING | NO | Arbitrary unique ID among open order lists. Automatically generated if not sent.  
A new order list with the same listClientOrderId is accepted only when the previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `workingClientOrderId` and the `pendingClientOrderId`. 
| newOrderRespType | ENUM | NO | Format of the JSON response. Supported values: [Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype) 
| selfTradePreventionMode | ENUM | NO | The allowed values are dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) 
| workingType | ENUM | YES | Supported values: `LIMIT`,`LIMIT_MAKER` 
| workingSide | ENUM | YES | Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side) 
| workingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the working order.  
Automatically generated if not sent. 
| workingPrice | DECIMAL | YES |  
| workingQuantity | DECIMAL | YES | Sets the quantity for the working order. 
| workingIcebergQty | DECIMAL | NO | This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`. 
| workingTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) 
| workingStrategyId | LONG | NO | Arbitrary numeric value identifying the working order within an order strategy. 
| workingStrategyType | INT | NO | Arbitrary numeric value identifying the working order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| pendingType | ENUM | YES | Supported values: [Order Types](/docs/binance-spot-api-docs/rest-api/trading-endpoints#order-type)  
Note that `MARKET` orders using `quoteOrderQty` are not supported. 
| pendingSide | ENUM | YES | Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side) 
| pendingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the pending order.  
Automatically generated if not sent. 
| pendingPrice | DECIMAL | NO |  
| pendingStopPrice | DECIMAL | NO |  
| pendingTrailingDelta | DECIMAL | NO |  
| pendingQuantity | DECIMAL | YES | Sets the quantity for the pending order. 
| pendingIcebergQty | DECIMAL | NO | This can only be used if `pendingTimeInForce` is `GTC` or if `pendingType` is `LIMIT_MAKER`. 
| pendingTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) 
| pendingStrategyId | LONG | NO | Arbitrary numeric value identifying the pending order within an order strategy. 
| pendingStrategyType | INT | NO | Arbitrary numeric value identifying the pending order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| recvWindow | LONG | NO | The value cannot be greater than `60000`. 
| timestamp | LONG | YES |  

**Mandatory parameters based on `pendingType` or `workingType`**

Depending on the `pendingType` or `workingType`, some optional parameters will become mandatory.

| Type | Additional mandatory parameters | Additional information |
| --- | --- | --- |
| `workingType` = `LIMIT` | `workingTimeInForce` |  
| `pendingType` = `LIMIT` | `pendingPrice`, `pendingTimeInForce` |  
| `pendingType` = `STOP_LOSS` or `TAKE_PROFIT` | `pendingStopPrice` and/or `pendingTrailingDelta` |  
| `pendingType` = `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` | `pendingPrice`, `pendingStopPrice` and/or `pendingTrailingDelta`, `pendingTimeInForce` |  

**Data Source:**

Matching Engine

**Response:**

```
{    "orderListId": 0,    "contingencyType": "OTO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "yl2ERtcar1o25zcWtqVBTC",    "transactionTime": 1712289389158,    "symbol": "ABCDEF",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 4,            "clientOrderId": "Bq17mn9fP6vyCn75Jw1xya"        },        {            "symbol": "LTCBTC",            "orderId": 5,            "clientOrderId": "arLFo0zGJVDE69cvGBaU0d"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 4,            "orderListId": 0,            "clientOrderId": "Bq17mn9fP6vyCn75Jw1xya",            "transactTime": 1712289389158,            "price": "1.00000000",            "origQty": "1.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT",            "side": "SELL",            "workingTime": 1712289389158,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 5,            "orderListId": 0,            "clientOrderId": "arLFo0zGJVDE69cvGBaU0d",            "transactTime": 1712289389158,            "price": "0.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "GTC",            "type": "MARKET",            "side": "BUY",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        }    ]}
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

#### New Order list - OTOCO (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---otoco-trade "Direct link to New Order list - OTOCO (TRADE)")

```
POST /api/v3/orderList/otoco
```

Place an OTOCO.

*   An OTOCO (One-Triggers-One-Cancels-the-Other) is an order list comprised of 3 orders.
*   The first order is called the **working order** and must be `LIMIT` or `LIMIT_MAKER`. Initially, only the working order goes on the order book.
    *   The behavior of the working order is the same as the [OTO](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oto-trade).
*   OTOCO has 2 pending orders (pending above and pending below), forming an OCO pair. The pending orders are only placed on the order book when the working order gets **fully filled**.
    *   The rules of the pending above and pending below follow the same rules as the [Order list OCO](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oco-trade).
*   OTOCOs add **3 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 3

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| listClientOrderId | STRING | NO | Arbitrary unique ID among open order lists. Automatically generated if not sent.  
A new order list with the same listClientOrderId is accepted only when the previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `workingClientOrderId`, `pendingAboveClientOrderId`, and the `pendingBelowClientOrderId`. 
| newOrderRespType | ENUM | NO | Format of the JSON response. Supported values: [Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype) 
| selfTradePreventionMode | ENUM | NO | The allowed values are dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) 
| workingType | ENUM | YES | Supported values: `LIMIT`, `LIMIT_MAKER` 
| workingSide | ENUM | YES | Supported values: [Order side](/docs/binance-spot-api-docs/enums#side) 
| workingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the working order.  
Automatically generated if not sent. 
| workingPrice | DECIMAL | YES |  
| workingQuantity | DECIMAL | YES |  
| workingIcebergQty | DECIMAL | NO | This can only be used if `workingTimeInForce` is `GTC`. 
| workingTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) 
| workingStrategyId | LONG | NO | Arbitrary numeric value identifying the working order within an order strategy. 
| workingStrategyType | INT | NO | Arbitrary numeric value identifying the working order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| pendingSide | ENUM | YES | Supported values: [Order side](/docs/binance-spot-api-docs/enums#side) 
| pendingQuantity | DECIMAL | YES |  
| pendingAboveType | ENUM | YES | Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` 
| pendingAboveClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the pending above order.  
Automatically generated if not sent. 
| pendingAbovePrice | DECIMAL | NO | Can be used if `pendingAboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. 
| pendingAboveStopPrice | DECIMAL | NO | Can be used if `pendingAboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` 
| pendingAboveTrailingDelta | DECIMAL | NO | See [Trailing Stop FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) 
| pendingAboveIcebergQty | DECIMAL | NO | This can only be used if `pendingAboveTimeInForce` is `GTC` or if `pendingAboveType` is `LIMIT_MAKER`. 
| pendingAboveTimeInForce | ENUM | NO |  
| pendingAboveStrategyId | LONG | NO | Arbitrary numeric value identifying the pending above order within an order strategy. 
| pendingAboveStrategyType | INT | NO | Arbitrary numeric value identifying the pending above order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| pendingBelowType | ENUM | NO | Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT` 
| pendingBelowClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the pending below order.  
Automatically generated if not sent. 
| pendingBelowPrice | DECIMAL | NO | Can be used if `pendingBelowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` to specify limit price 
| pendingBelowStopPrice | DECIMAL | NO | Can be used if `pendingBelowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT`.  
Either `pendingBelowStopPrice` or `pendingBelowTrailingDelta` or both, must be specified. 
| pendingBelowTrailingDelta | DECIMAL | NO |  
| pendingBelowIcebergQty | DECIMAL | NO | This can only be used if `pendingBelowTimeInForce` is `GTC`, or if `pendingBelowType` is `LIMIT_MAKER`. 
| pendingBelowTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) 
| pendingBelowStrategyId | LONG | NO | Arbitrary numeric value identifying the pending below order within an order strategy. 
| pendingBelowStrategyType | INT | NO | Arbitrary numeric value identifying the pending below order strategy.  
Values smaller than 1000000 are reserved and cannot be used. 
| recvWindow | LONG | NO | The value cannot be greater than `60000`. 
| timestamp | LONG | YES |  

**Mandatory parameters based on `pendingAboveType`, `pendingBelowType` or `workingType`**

Depending on the `pendingAboveType`/`pendingBelowType` or `workingType`, some optional parameters will become mandatory.

| Type | Additional mandatory parameters | Additional information |
| --- | --- | --- |
| `workingType` = `LIMIT` | `workingTimeInForce` |  
| `pendingAboveType`\= `LIMIT_MAKER` | `pendingAbovePrice` |  
| `pendingAboveType` = `STOP_LOSS/TAKE_PROFIT` | `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta` |  
| `pendingAboveType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | `pendingAbovePrice`, `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta`, `pendingAboveTimeInForce` |  
| `pendingBelowType`\= `LIMIT_MAKER` | `pendingBelowPrice` |  
| `pendingBelowType= STOP_LOSS/TAKE_PROFIT` | `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta` |  
| `pendingBelowType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | `pendingBelowPrice`, `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta`, `pendingBelowTimeInForce` |  

**Data Source:**

Matching Engine

**Response:**

```
{    "orderListId": 1,    "contingencyType": "OTO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "RumwQpBaDctlUu5jyG5rs0",    "transactionTime": 1712291372842,    "symbol": "ABCDEF",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 6,            "clientOrderId": "fM9Y4m23IFJVCQmIrlUmMK"        },        {            "symbol": "LTCBTC",            "orderId": 7,            "clientOrderId": "6pcQbFIzTXGZQ1e2MkGDq4"        },        {            "symbol": "LTCBTC",            "orderId": 8,            "clientOrderId": "r4JMv9cwAYYUwwBZfbussx"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 6,            "orderListId": 1,            "clientOrderId": "fM9Y4m23IFJVCQmIrlUmMK",            "transactTime": 1712291372842,            "price": "1.00000000",            "origQty": "1.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT",            "side": "SELL",            "workingTime": 1712291372842,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 7,            "orderListId": 1,            "clientOrderId": "6pcQbFIzTXGZQ1e2MkGDq4",            "transactTime": 1712291372842,            "price": "1.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "IOC",            "type": "STOP_LOSS_LIMIT",            "side": "BUY",            "stopPrice": "6.00000000",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 8,            "orderListId": 1,            "clientOrderId": "r4JMv9cwAYYUwwBZfbussx",            "transactTime": 1712291372842,            "price": "3.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "GTC",            "type": "LIMIT_MAKER",            "side": "BUY",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        }    ]}
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

#### Cancel Order list (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-order-list-trade "Direct link to Cancel Order list (TRADE)")

```
DELETE /api/v3/orderList
```

Cancel an entire Order list

**Weight:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderListId | LONG | NO | Either `orderListId` or `listClientOrderId` must be provided 
| listClientOrderId | STRING | NO | Either `orderListId` or `listClientOrderId` must be provided 
| newClientOrderId | STRING | NO | Used to uniquely identify this cancel. Automatically generated by default 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Notes:**

*   Canceling an individual order from an order list will cancel the entire order list.
*   If both `orderListId` and `listClientOrderId` parameters are provided, the `orderListId` is searched first, then the `listClientOrderId` from that result is checked against that order. If both conditions are not met the request will be rejected.

**Data Source:** Matching Engine

**Response:**

```
{  "orderListId": 0,  "contingencyType": "OCO",  "listStatusType": "ALL_DONE",  "listOrderStatus": "ALL_DONE",  "listClientOrderId": "C3wyj4WVEktd7u9aVBRXcN",  "transactionTime": 1574040868128,  "symbol": "LTCBTC",  "orders": [    {      "symbol": "LTCBTC",      "orderId": 2,      "clientOrderId": "pO9ufTiFGg3nw2fOdgeOXa"    },    {      "symbol": "LTCBTC",      "orderId": 3,      "clientOrderId": "TXOvglzXuaubXAaENpaRCB"    }  ],  "orderReports": [    {      "symbol": "LTCBTC",      "origClientOrderId": "pO9ufTiFGg3nw2fOdgeOXa",      "orderId": 2,      "orderListId": 0,      "clientOrderId": "unfWT8ig8i0uj6lPuYLez6",      "transactTime": 1688005070874,      "price": "1.00000000",      "origQty": "10.00000000",      "executedQty": "0.00000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.00000000",      "status": "CANCELED",      "timeInForce": "GTC",      "type": "STOP_LOSS_LIMIT",      "side": "SELL",      "stopPrice": "1.00000000",      "selfTradePreventionMode": "NONE"    },    {      "symbol": "LTCBTC",      "origClientOrderId": "TXOvglzXuaubXAaENpaRCB",      "orderId": 3,      "orderListId": 0,      "clientOrderId": "unfWT8ig8i0uj6lPuYLez6",      "transactTime": 1688005070874,      "price": "3.00000000",      "origQty": "10.00000000",      "executedQty": "0.00000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.00000000",      "status": "CANCELED",      "timeInForce": "GTC",      "type": "LIMIT_MAKER",      "side": "SELL",      "selfTradePreventionMode": "NONE"    }  ]}
```

#### Query Order list (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-order-list-user_data "Direct link to Query Order list (USER_DATA)")

```
GET /api/v3/orderList
```

Retrieves a specific order list based on provided optional parameters.

**Weight:** 4

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| orderListId | LONG | NO | Either `orderListId` or `listClientOrderId` must be provided 
| origClientOrderId | STRING | NO | Either `orderListId` or `listClientOrderId` must be provided 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Database

**Response:**

```
{  "orderListId": 27,  "contingencyType": "OCO",  "listStatusType": "EXEC_STARTED",  "listOrderStatus": "EXECUTING",  "listClientOrderId": "h2USkA5YQpaXHPIrkd96xE",  "transactionTime": 1565245656253,  "symbol": "LTCBTC",  "orders": [    {      "symbol": "LTCBTC",      "orderId": 4,      "clientOrderId": "qD1gy3kc3Gx0rihm9Y3xwS"    },    {      "symbol": "LTCBTC",      "orderId": 5,      "clientOrderId": "ARzZ9I00CPM8i3NhmU9Ega"    }  ]}
```

#### Query all Order lists (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-all-order-lists-user_data "Direct link to Query all Order lists (USER_DATA)")

```
GET /api/v3/allOrderList
```

Retrieves all order lists based on provided optional parameters.

Note that the time between `startTime` and `endTime` can't be longer than 24 hours.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| fromId | LONG | NO | If supplied, neither `startTime` or `endTime` can be provided 
| startTime | LONG | NO |  
| endTime | LONG | NO |  
| limit | INT | NO | Default: 500; Maximum: 1000 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Database

**Response:**

```
[  {    "orderListId": 29,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "amEEAXryFzFwYF1FeRpUoZ",    "transactionTime": 1565245913483,    "symbol": "LTCBTC",    "orders": [      {        "symbol": "LTCBTC",        "orderId": 4,        "clientOrderId": "oD7aesZqjEGlZrbtRpy5zB"      },      {        "symbol": "LTCBTC",        "orderId": 5,        "clientOrderId": "Jr1h6xirOxgeJOUuYQS7V3"      }    ]  },  {    "orderListId": 28,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "hG7hFNxJV6cZy3Ze4AUT4d",    "transactionTime": 1565245913407,    "symbol": "LTCBTC",    "orders": [      {        "symbol": "LTCBTC",        "orderId": 2,        "clientOrderId": "j6lFOfbmFMRjTYA7rRJ0LP"      },      {        "symbol": "LTCBTC",        "orderId": 3,        "clientOrderId": "z0KCjOdditiLS5ekAFtK81"      }    ]  }]
```

#### Query Open Order lists (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-open-order-lists-user_data "Direct link to Query Open Order lists (USER_DATA)")

```
GET /api/v3/openOrderList
```

**Weight:** 6

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Database

**Response:**

```
[  {    "orderListId": 31,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "wuB13fmulKj3YjdqWEcsnp",    "transactionTime": 1565246080644,    "symbol": "LTCBTC",    "orders": [      {        "symbol": "LTCBTC",        "orderId": 4,        "clientOrderId": "r3EH2N76dHfLoSZWIUw1bT"      },      {        "symbol": "LTCBTC",        "orderId": 5,        "clientOrderId": "Cv1SnyPD3qhqpbjpYEHbd2"      }    ]  }]
```

### SOR[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#sor "Direct link to SOR")

#### New order using SOR (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-using-sor-trade "Direct link to New order using SOR (TRADE)")

```
POST /api/v3/sor/order
```

Places an order using smart order routing (SOR).

This adds 1 order to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

Read [SOR FAQ](/docs/binance-spot-api-docs/faqs/sor_faq) to learn more.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| side | ENUM | YES |  
| type | ENUM | YES |  
| timeInForce | ENUM | NO |  
| quantity | DECIMAL | YES |  
| price | DECIMAL | NO |  
| newClientOrderId | STRING | NO | A unique id among open orders. Automatically generated if not sent.  
Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. 
| strategyId | LONG | NO |  
| strategyType | INT | NO | The value cannot be less than `1000000`. 
| icebergQty | DECIMAL | NO | Used with `LIMIT` to create an iceberg order. 
| newOrderRespType | ENUM | NO | Set the response JSON. `ACK`, `RESULT`, or `FULL`. Default to `FULL` 
| selfTradePreventionMode | ENUM | NO | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Note:** `POST /api/v3/sor/order` only supports `LIMIT` and `MARKET` orders. `quoteOrderQty` is not supported.

**Data Source:** Matching Engine

**Response:**

```
{  "symbol": "BTCUSDT",  "orderId": 2,  "orderListId": -1,  "clientOrderId": "sBI1KM6nNtOfj5tccZSKly",  "transactTime": 1689149087774,  "price": "31000.00000000",  "origQty": "0.50000000",  "executedQty": "0.50000000",  "origQuoteOrderQty": "0.000000",  "cummulativeQuoteQty": "14000.00000000",  "status": "FILLED",  "timeInForce": "GTC",  "type": "LIMIT",  "side": "BUY",  "workingTime": 1689149087774,  "fills": [    {      "matchType": "ONE_PARTY_TRADE_REPORT",      "price": "28000.00000000",      "qty": "0.50000000",      "commission": "0.00000000",      "commissionAsset": "BTC",      "tradeId": -1,      "allocId": 0    }  ],  "workingFloor": "SOR",  "selfTradePreventionMode": "NONE",  "usedSor": true}
```

#### Test new order using SOR (TRADE)[​](/docs/binance-spot-api-docs/rest-api/trading-endpoints#test-new-order-using-sor-trade "Direct link to Test new order using SOR (TRADE)")

```
POST /api/v3/sor/order/test
```

Test new order creation and signature/recvWindow using smart order routing (SOR). Creates and validates a new order but does not send it into the matching engine.

**Weight:**

| Condition | Request Weight |
| --- | --- |
| Without `computeCommissionRates` | 1 
| With `computeCommissionRates` | 20 

**Parameters:**

In addition to all parameters accepted by [`POST /api/v3/sor/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-using-sor-trade), the following optional parameters are also accepted:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| computeCommissionRates | BOOLEAN | NO | Default: `false` 

**Data Source:** Memory

**Response:**

Without `computeCommissionRates`

```
{}
```

With `computeCommissionRates`

```
{  "standardCommissionForOrder": {  //Standard commission rates on trades from the order.    "maker": "0.00000112",    "taker": "0.00000114"  },  "taxCommissionForOrder": {       //Tax commission rates for trades from the order    "maker": "0.00000112",    "taker": "0.00000114"  },  "discount": {                    //Discount on standard commissions when paying in BNB.    "enabledForAccount": true,    "enabledForSymbol": true,    "discountAsset": "BNB",    "discount": "0.25000000"       //Standard commission is reduced by this rate when paying commission in BNB.  }}
```

Account Endpoints
=================

### Account information (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#account-information-user_data "Direct link to Account information (USER_DATA)")

```
GET /api/v3/account
```

Get current account information.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| omitZeroBalances | BOOLEAN | NO | When set to `true`, emits only the non-zero balances of an account.  
Default value: `false` 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Memory => Database

**Response:**

```
{  "makerCommission": 15,  "takerCommission": 15,  "buyerCommission": 0,  "sellerCommission": 0,  "commissionRates": {    "maker": "0.00150000",    "taker": "0.00150000",    "buyer": "0.00000000",    "seller": "0.00000000"  },  "canTrade": true,  "canWithdraw": true,  "canDeposit": true,  "brokered": false,  "requireSelfTradePrevention": false,  "preventSor": false,  "updateTime": 123456789,  "accountType": "SPOT",  "balances": [    {      "asset": "BTC",      "free": "4723846.89208129",      "locked": "0.00000000"    },    {      "asset": "LTC",      "free": "4763368.68006011",      "locked": "0.00000000"    }  ],  "permissions": [    "SPOT"  ],  "uid": 354937868}
```

### Account trade list (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#account-trade-list-user_data "Direct link to Account trade list (USER_DATA)")

```
GET /api/v3/myTrades
```

Get trades for a specific account and symbol.

**Weight:**

| Condition | Weight |
| --- | --- |
| Without orderId | 20 
| With orderId | 5 

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderId | LONG | NO | This can only be used in combination with `symbol`. 
| startTime | LONG | NO |  
| endTime | LONG | NO |  
| fromId | LONG | NO | TradeId to fetch from. Default gets most recent trades. 
| limit | INT | NO | Default: 500; Maximum: 1000. 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Notes:**

*   If `fromId` is set, it will get trades >= that `fromId`. Otherwise most recent trades are returned.
*   The time between `startTime` and `endTime` can't be longer than 24 hours.
*   These are the supported combinations of all parameters:
    *   `symbol`
    *   `symbol` + `orderId`
    *   `symbol` + `startTime`
    *   `symbol` + `endTime`
    *   `symbol` + `fromId`
    *   `symbol` + `startTime` + `endTime`
    *   `symbol`\+ `orderId` + `fromId`

**Data Source:** Memory => Database

**Response:**

```
[  {    "symbol": "BNBBTC",    "id": 28457,    "orderId": 100234,    "orderListId": -1,    "price": "4.00000100",    "qty": "12.00000000",    "quoteQty": "48.000012",    "commission": "10.10000000",    "commissionAsset": "BNB",    "time": 1499865549590,    "isBuyer": true,    "isMaker": false,    "isBestMatch": true  }]
```

### Query Unfilled Order Count (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-unfilled-order-count-user_data "Direct link to Query Unfilled Order Count (USER_DATA)")

```
GET /api/v3/rateLimit/order
```

Displays the user's unfilled order count for all intervals.

**Weight:** 40

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Data Source:** Memory

**Response:**

```
[  {    "rateLimitType": "ORDERS",    "interval": "SECOND",    "intervalNum": 10,    "limit": 50,    "count": 0  },  {    "rateLimitType": "ORDERS",    "interval": "DAY",    "intervalNum": 1,    "limit": 160000,    "count": 0  }]
```

### Query Prevented Matches (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-prevented-matches-user_data "Direct link to Query Prevented Matches (USER_DATA)")

```
GET /api/v3/myPreventedMatches
```

Displays the list of orders that were expired due to STP.

These are the combinations supported:

*   `symbol` + `preventedMatchId`
*   `symbol` + `orderId`
*   `symbol` + `orderId` + `fromPreventedMatchId` (`limit` will default to 500)
*   `symbol` + `orderId` + `fromPreventedMatchId` + `limit`

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| preventedMatchId | LONG | NO |  
| orderId | LONG | NO |  
| fromPreventedMatchId | LONG | NO |  
| limit | INT | NO | Default: `500`; Maximum: `1000` 
| recvWindow | LONG | NO | The value cannot be greater than `60000` 
| timestamp | LONG | YES |  

**Weight:**

| Case | Weight |
| --- | --- |
| If `symbol` is invalid | 2 
| Querying by `preventedMatchId` | 2 
| Querying by `orderId` | 20 

**Data Source:**

Database

**Response:**

```
[  {    "symbol": "BTCUSDT",    "preventedMatchId": 1,    "takerOrderId": 5,    "makerSymbol": "BTCUSDT",    "makerOrderId": 3,    "tradeGroupId": 1,    "selfTradePreventionMode": "EXPIRE_MAKER",    "price": "1.100000",    "makerPreventedQuantity": "1.300000",    "transactTime": 1669101687094  }]
```

### Query Allocations (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-allocations-user_data "Direct link to Query Allocations (USER_DATA)")

```
GET /api/v3/myAllocations
```

Retrieves allocations resulting from SOR order placement.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | Yes |  
| startTime | LONG | No |  
| endTime | LONG | No |  
| fromAllocationId | INT | No |  
| limit | INT | No | Default: 500; Maximum: 1000 
| orderId | LONG | No |  
| recvWindow | LONG | No | The value cannot be greater than `60000`. 
| timestamp | LONG | No |  

Supported parameter combinations:

| Parameters | Response |
| --- | --- |
| `symbol` | allocations from oldest to newest 
| `symbol` + `startTime` | oldest allocations since `startTime` 
| `symbol` + `endTime` | newest allocations until `endTime` 
| `symbol` + `startTime` + `endTime` | allocations within the time range 
| `symbol` + `fromAllocationId` | allocations by allocation ID 
| `symbol` + `orderId` | allocations related to an order starting with oldest 
| `symbol` + `orderId` + `fromAllocationId` | allocations related to an order by allocation ID 

**Note:** The time between `startTime` and `endTime` can't be longer than 24 hours.

**Data Source:** Database

**Response:**

```
[  {    "symbol": "BTCUSDT",    "allocationId": 0,    "allocationType": "SOR",    "orderId": 1,    "orderListId": -1,    "price": "1.00000000",    "qty": "5.00000000",    "quoteQty": "5.00000000",    "commission": "0.00000000",    "commissionAsset": "BTC",    "time": 1687506878118,    "isBuyer": true,    "isMaker": false,    "isAllocator": false  }]
```

### Query Commission Rates (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-commission-rates-user_data "Direct link to Query Commission Rates (USER_DATA)")

```
GET /api/v3/account/commission
```

Get current account commission rates.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  

**Data Source:** Database

**Response:**

```
{  "symbol": "BTCUSDT",  "standardCommission": {         //Commission rates on trades from the order.    "maker": "0.00000010",    "taker": "0.00000020",    "buyer": "0.00000030",    "seller": "0.00000040"  },  "taxCommission": {              //Tax commission rates for trades from the order.    "maker": "0.00000112",    "taker": "0.00000114",    "buyer": "0.00000118",    "seller": "0.00000116"  },  "discount": {                   //Discount commission when paying in BNB    "enabledForAccount": true,    "enabledForSymbol": true,    "discountAsset": "BNB",    "discount": "0.75000000"      //Standard commission is reduced by this rate when paying commission in BNB.  }}
```

### Query Order Amendments (USER\_DATA)[​](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-order-amendments-user_data "Direct link to Query Order Amendments (USER_DATA)")

```
GET /api/v3/order/amendments
```

Queries all amendments of a single order.

**Weight**: 4

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  
| orderId | LONG | YES |  
| fromExecutionId | LONG | NO |  
| limit | LONG | NO | Default:500; Maximum: 1000 
| recvWindow | LONG | NO | The value cannot be greater than `60000`. 
| timestamp | LONG | YES |  

**Data Source:**

Database

**Response:**

```
[  {      "symbol": "BTCUSDT",      "orderId": 9,      "executionId": 22,      "origClientOrderId": "W0fJ9fiLKHOJutovPK3oJp",      "newClientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi",      "origQty": "5.00000000",      "newQty": "4.00000000",      "time": 1741669661670  },  {      "symbol": "BTCUDST",      "orderId": 9,      "executionId": 25,      "origClientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi",      "newClientOrderId": "5uS0r35ohuQyDlCzZuYXq2",      "origQty": "4.00000000",      "newQty": "3.00000000",      "time": 1741672924895  }]
```

