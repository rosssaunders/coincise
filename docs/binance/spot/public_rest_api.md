# Binance Spot Public REST API Documentation

# Filters

Filters define trading rules on a symbol or an exchange. Filters come in two
forms: `symbol filters` and `exchange filters`.

## Symbol filters[​](/docs/binance-spot-api-docs/filters#symbol-filters "Direct link to Symbol filters")

### PRICE_FILTER[​](/docs/binance-spot-api-docs/filters#price_filter "Direct link to PRICE_FILTER")

The `PRICE_FILTER` defines the `price` rules for a symbol. There are 3 parts:

- `minPrice` defines the minimum `price`/`stopPrice` allowed; disabled on
  `minPrice` == 0.
- `maxPrice` defines the maximum `price`/`stopPrice` allowed; disabled on
  `maxPrice` == 0.
- `tickSize` defines the intervals that a `price`/`stopPrice` can be
  increased/decreased by; disabled on `tickSize` == 0.

Any of the above variables can be set to 0, which disables that rule in the
`price filter`. In order to pass the `price filter`, the following must be true
for `price`/`stopPrice` of the enabled rules:

- `price` >= `minPrice`
- `price` <= `maxPrice`
- `price` % `tickSize` == 0

**/exchangeInfo format:**

```
{  "filterType": "PRICE_FILTER",  "minPrice": "0.00000100",  "maxPrice": "100000.00000000",  "tickSize": "0.00000100"}
```

### PERCENT_PRICE[​](/docs/binance-spot-api-docs/filters#percent_price "Direct link to PERCENT_PRICE")

The `PERCENT_PRICE` filter defines the valid range for the price based on the
average of the previous trades. `avgPriceMins` is the number of minutes the
average price is calculated over. 0 means the last price is used.

In order to pass the `percent price`, the following must be true for `price`:

- `price` <= `weightedAveragePrice` \* `multiplierUp`
- `price` >= `weightedAveragePrice` \* `multiplierDown`

**/exchangeInfo format:**

```
{  "filterType": "PERCENT_PRICE",  "multiplierUp": "1.3000",  "multiplierDown": "0.7000",  "avgPriceMins": 5}
```

### PERCENT_PRICE_BY_SIDE[​](/docs/binance-spot-api-docs/filters#percent_price_by_side "Direct link to PERCENT_PRICE_BY_SIDE")

The `PERCENT_PRICE_BY_SIDE` filter defines the valid range for the price based
on the average of the previous trades.  
`avgPriceMins` is the number of minutes the average price is calculated over. 0
means the last price is used.  
There is a different range depending on whether the order is placed on the `BUY`
side or the `SELL` side.

Buy orders will succeed on this filter if:

- `Order price` <= `weightedAveragePrice` \* `bidMultiplierUp`
- `Order price` >= `weightedAveragePrice` \* `bidMultiplierDown`

Sell orders will succeed on this filter if:

- `Order Price` <= `weightedAveragePrice` \* `askMultiplierUp`
- `Order Price` >= `weightedAveragePrice` \* `askMultiplierDown`

**/exchangeInfo format:**

```
  {    "filterType": "PERCENT_PRICE_BY_SIDE",    "bidMultiplierUp": "1.2",    "bidMultiplierDown": "0.2",    "askMultiplierUp": "5",    "askMultiplierDown": "0.8",    "avgPriceMins": 1  }
```

### LOT_SIZE[​](/docs/binance-spot-api-docs/filters#lot_size "Direct link to LOT_SIZE")

The `LOT_SIZE` filter defines the `quantity` (aka "lots" in auction terms) rules
for a symbol. There are 3 parts:

- `minQty` defines the minimum `quantity`/`icebergQty` allowed.
- `maxQty` defines the maximum `quantity`/`icebergQty` allowed.
- `stepSize` defines the intervals that a `quantity`/`icebergQty` can be
  increased/decreased by.

In order to pass the `lot size`, the following must be true for
`quantity`/`icebergQty`:

- `quantity` >= `minQty`
- `quantity` <= `maxQty`
- `quantity` % `stepSize` == 0

**/exchangeInfo format:**

```
{  "filterType": "LOT_SIZE",  "minQty": "0.00100000",  "maxQty": "100000.00000000",  "stepSize": "0.00100000"}
```

### MIN_NOTIONAL[​](/docs/binance-spot-api-docs/filters#min_notional "Direct link to MIN_NOTIONAL")

The `MIN_NOTIONAL` filter defines the minimum notional value allowed for an
order on a symbol. An order's notional value is the `price` \* `quantity`.
`applyToMarket` determines whether or not the `MIN_NOTIONAL` filter will also be
applied to `MARKET` orders. Since `MARKET` orders have no price, the average
price is used over the last `avgPriceMins` minutes. `avgPriceMins` is the number
of minutes the average price is calculated over. 0 means the last price is used.

**/exchangeInfo format:**

```
{  "filterType": "MIN_NOTIONAL",  "minNotional": "0.00100000",  "applyToMarket": true,  "avgPriceMins": 5}
```

### NOTIONAL[​](/docs/binance-spot-api-docs/filters#notional "Direct link to NOTIONAL")

The `NOTIONAL` filter defines the acceptable notional range allowed for an order
on a symbol.

`applyMinToMarket` determines whether the `minNotional` will be applied to
`MARKET` orders.  
`applyMaxToMarket` determines whether the `maxNotional` will be applied to
`MARKET` orders.

In order to pass this filter, the notional (`price * quantity`) has to pass the
following conditions:

- `price * quantity` <= `maxNotional`
- `price * quantity` >= `minNotional`

For `MARKET` orders, the average price used over the last `avgPriceMins` minutes
will be used for calculation.  
If the `avgPriceMins` is 0, then the last price will be used.

**/exchangeInfo format:**

```
{   "filterType": "NOTIONAL",   "minNotional": "10.00000000",   "applyMinToMarket": false,   "maxNotional": "10000.00000000",   "applyMaxToMarket": false,   "avgPriceMins": 5}
```

### ICEBERG_PARTS[​](/docs/binance-spot-api-docs/filters#iceberg_parts "Direct link to ICEBERG_PARTS")

The `ICEBERG_PARTS` filter defines the maximum parts an iceberg order can have.
The number of `ICEBERG_PARTS` is defined as `CEIL(qty / icebergQty)`.

**/exchangeInfo format:**

```
{  "filterType": "ICEBERG_PARTS",  "limit": 10}
```

### MARKET_LOT_SIZE[​](/docs/binance-spot-api-docs/filters#market_lot_size "Direct link to MARKET_LOT_SIZE")

The `MARKET_LOT_SIZE` filter defines the `quantity` (aka "lots" in auction
terms) rules for `MARKET` orders on a symbol. There are 3 parts:

- `minQty` defines the minimum `quantity` allowed.
- `maxQty` defines the maximum `quantity` allowed.
- `stepSize` defines the intervals that a `quantity` can be increased/decreased
  by.

In order to pass the `market lot size`, the following must be true for
`quantity`:

- `quantity` >= `minQty`
- `quantity` <= `maxQty`
- `quantity` % `stepSize` == 0

**/exchangeInfo format:**

```
{  "filterType": "MARKET_LOT_SIZE",  "minQty": "0.00100000",  "maxQty": "100000.00000000",  "stepSize": "0.00100000"}
```

### MAX_NUM_ORDERS[​](/docs/binance-spot-api-docs/filters#max_num_orders "Direct link to MAX_NUM_ORDERS")

The `MAX_NUM_ORDERS` filter defines the maximum number of orders an account is
allowed to have open on a symbol. Note that both "algo" orders and normal orders
are counted for this filter.

**/exchangeInfo format:**

```
{  "filterType": "MAX_NUM_ORDERS",  "maxNumOrders": 25}
```

### MAX_NUM_ALGO_ORDERS[​](/docs/binance-spot-api-docs/filters#max_num_algo_orders "Direct link to MAX_NUM_ALGO_ORDERS")

The `MAX_NUM_ALGO_ORDERS` filter defines the maximum number of "algo" orders an
account is allowed to have open on a symbol. "Algo" orders are `STOP_LOSS`,
`STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders.

**/exchangeInfo format:**

```
{  "filterType": "MAX_NUM_ALGO_ORDERS",  "maxNumAlgoOrders": 5}
```

### MAX_NUM_ICEBERG_ORDERS[​](/docs/binance-spot-api-docs/filters#max_num_iceberg_orders "Direct link to MAX_NUM_ICEBERG_ORDERS")

The `MAX_NUM_ICEBERG_ORDERS` filter defines the maximum number of `ICEBERG`
orders an account is allowed to have open on a symbol. An `ICEBERG` order is any
order where the `icebergQty` is > 0.

**/exchangeInfo format:**

```
{  "filterType": "MAX_NUM_ICEBERG_ORDERS",  "maxNumIcebergOrders": 5}
```

### MAX_POSITION[​](/docs/binance-spot-api-docs/filters#max_position "Direct link to MAX_POSITION")

The `MAX_POSITION` filter defines the allowed maximum position an account can
have on the base asset of a symbol. An account's position defined as the sum of
the account's:

1.  free balance of the base asset
2.  locked balance of the base asset
3.  sum of the qty of all open BUY orders

`BUY` orders will be rejected if the account's position is greater than the
maximum position allowed.

If an order's `quantity` can cause the position to overflow, this will also fail
the `MAX_POSITION` filter.

**/exchangeInfo format:**

```
{  "filterType":"MAX_POSITION",  "maxPosition":"10.00000000"}
```

### TRAILING_DELTA[​](/docs/binance-spot-api-docs/filters#trailing_delta "Direct link to TRAILING_DELTA")

The `TRAILING_DELTA` filter defines the minimum and maximum value for the
parameter `trailingDelta`.

In order for a trailing stop order to pass this filter, the following must be
true:

For `STOP_LOSS BUY`, `STOP_LOSS_LIMIT_BUY`,`TAKE_PROFIT SELL` and
`TAKE_PROFIT_LIMIT SELL` orders:

- `trailingDelta` >= `minTrailingAboveDelta`
- `trailingDelta` <= `maxTrailingAboveDelta`

For `STOP_LOSS SELL`, `STOP_LOSS_LIMIT SELL`, `TAKE_PROFIT BUY`, and
`TAKE_PROFIT_LIMIT BUY` orders:

- `trailingDelta` >= `minTrailingBelowDelta`
- `trailingDelta` <= `maxTrailingBelowDelta`

**/exchangeInfo format:**

```
    {          "filterType": "TRAILING_DELTA",          "minTrailingAboveDelta": 10,          "maxTrailingAboveDelta": 2000,          "minTrailingBelowDelta": 10,          "maxTrailingBelowDelta": 2000   }
```

## Exchange Filters[​](/docs/binance-spot-api-docs/filters#exchange-filters "Direct link to Exchange Filters")

### EXCHANGE_MAX_NUM_ORDERS[​](/docs/binance-spot-api-docs/filters#exchange_max_num_orders "Direct link to EXCHANGE_MAX_NUM_ORDERS")

The `EXCHANGE_MAX_NUM_ORDERS` filter defines the maximum number of orders an
account is allowed to have open on the exchange. Note that both "algo" orders
and normal orders are counted for this filter.

**/exchangeInfo format:**

```
{  "filterType": "EXCHANGE_MAX_NUM_ORDERS",  "maxNumOrders": 1000}
```

### EXCHANGE_MAX_NUM_ALGO_ORDERS[​](/docs/binance-spot-api-docs/filters#exchange_max_num_algo_orders "Direct link to EXCHANGE_MAX_NUM_ALGO_ORDERS")

The `EXCHANGE_MAX_NUM_ALGO_ORDERS` filter defines the maximum number of "algo"
orders an account is allowed to have open on the exchange. "Algo" orders are
`STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders.

**/exchangeInfo format:**

```
{  "filterType": "EXCHANGE_MAX_NUM_ALGO_ORDERS",  "maxNumAlgoOrders": 200}
```

### EXCHANGE_MAX_NUM_ICEBERG_ORDERS[​](/docs/binance-spot-api-docs/filters#exchange_max_num_iceberg_orders "Direct link to EXCHANGE_MAX_NUM_ICEBERG_ORDERS")

The `EXCHANGE_MAX_NUM_ICEBERG_ORDERS` filter defines the maximum number of
iceberg orders an account is allowed to have open on the exchange.

**/exchangeInfo format:**

```
{  "filterType": "EXCHANGE_MAX_NUM_ICEBERG_ORDERS",  "maxNumIcebergOrders": 10000}
```

# ENUM Definitions

This will apply for both REST API and WebSocket API.

## Symbol status (status)[​](/docs/binance-spot-api-docs/enums#symbol-status-status "Direct link to Symbol status (status)")

- `TRADING`
- `END_OF_DAY`
- `HALT`
- `BREAK`

## Account and Symbol Permissions (permissions)[​](/docs/binance-spot-api-docs/enums#account-and-symbol-permissions-permissions "Direct link to Account and Symbol Permissions (permissions)")

- `SPOT`
- `MARGIN`
- `LEVERAGED`
- `TRD_GRP_002`
- `TRD_GRP_003`
- `TRD_GRP_004`
- `TRD_GRP_005`
- `TRD_GRP_006`
- `TRD_GRP_007`
- `TRD_GRP_008`
- `TRD_GRP_009`
- `TRD_GRP_010`
- `TRD_GRP_011`
- `TRD_GRP_012`
- `TRD_GRP_013`
- `TRD_GRP_014`
- `TRD_GRP_015`
- `TRD_GRP_016`
- `TRD_GRP_017`
- `TRD_GRP_018`
- `TRD_GRP_019`
- `TRD_GRP_020`
- `TRD_GRP_021`
- `TRD_GRP_022`
- `TRD_GRP_023`
- `TRD_GRP_024`
- `TRD_GRP_025`

## Order status (status)[​](/docs/binance-spot-api-docs/enums#order-status-status "Direct link to Order status (status)")

| Status                                                                                            | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEW`                                                                                             | The order has been accepted by the engine.                                                                                                                                     |
| `PENDING_NEW`                                                                                     | The order is in a pending phase until the working order of an order list has been fully filled.                                                                                |
| `PARTIALLY_FILLED`                                                                                | A part of the order has been filled.                                                                                                                                           |
| `FILLED`                                                                                          | The order has been completed.                                                                                                                                                  |
| `CANCELED`                                                                                        | The order has been canceled by the user.                                                                                                                                       |
| `PENDING_CANCEL`                                                                                  | Currently unused                                                                                                                                                               |
| `REJECTED`                                                                                        | The order was not accepted by the engine and not processed.                                                                                                                    |
| `EXPIRED`                                                                                         | The order was canceled according to the order type's rules (e.g. LIMIT FOK orders with no fill, LIMIT IOC or MARKET orders that partially fill)                                |
| or by the exchange, (e.g. orders canceled during liquidation, orders canceled during maintenance) |
| `EXPIRED_IN_MATCH`                                                                                | The order was expired by the exchange due to STP. (e.g. an order with `EXPIRE_TAKER` will match with existing orders on the book with the same account or same `tradeGroupId`) |

## Order List Status (listStatusType)[​](/docs/binance-spot-api-docs/enums#order-list-status-liststatustype "Direct link to Order List Status (listStatusType)")

| Status         | Description                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `RESPONSE`     | This is used when the ListStatus is responding to a failed action. (E.g. order list placement or cancellation) |
| `EXEC_STARTED` | The order list has been placed or there is an update to the order list status.                                 |
| `UPDATED`      | The clientOrderId of an order in the order list has been changed.                                              |
| `ALL_DONE`     | The order list has finished executing and thus is no longer active.                                            |

## Order List Order Status (listOrderStatus)[​](/docs/binance-spot-api-docs/enums#order-list-order-status-listorderstatus "Direct link to Order List Order Status (listOrderStatus)")

| Status      | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `EXECUTING` | Either an order list has been placed or there is an update to the status of the list.             |
| `ALL_DONE`  | An order list has completed execution and thus no longer active.                                  |
| `REJECT`    | The List Status is responding to a failed action either during order placement or order canceled. |

## ContingencyType[​](/docs/binance-spot-api-docs/enums#contingencytype "Direct link to ContingencyType")

- `OCO`
- `OTO`

## AllocationType[​](/docs/binance-spot-api-docs/enums#allocationtype "Direct link to AllocationType")

- `SOR`

## Order types (orderTypes, type)[​](/docs/binance-spot-api-docs/enums#order-types-ordertypes-type "Direct link to Order types (orderTypes, type)")

- `LIMIT`
- `MARKET`
- `STOP_LOSS`
- `STOP_LOSS_LIMIT`
- `TAKE_PROFIT`
- `TAKE_PROFIT_LIMIT`
- `LIMIT_MAKER`

## Order Response Type (newOrderRespType)[​](/docs/binance-spot-api-docs/enums#order-response-type-neworderresptype "Direct link to Order Response Type (newOrderRespType)")

- `ACK`
- `RESULT`
- `FULL`

## Working Floor[​](/docs/binance-spot-api-docs/enums#working-floor "Direct link to Working Floor")

- `EXCHANGE`
- `SOR`

## Order side (side)[​](/docs/binance-spot-api-docs/enums#order-side-side "Direct link to Order side (side)")

- `BUY`
- `SELL`

## Time in force (timeInForce)[​](/docs/binance-spot-api-docs/enums#time-in-force-timeinforce "Direct link to Time in force (timeInForce)")

This sets how long an order will be active before expiration.

| Status                                                                          | Description         |
| ------------------------------------------------------------------------------- | ------------------- |
| `GTC`                                                                           | Good Til Canceled   |
| An order will be on the book unless the order is canceled.                      |
| `IOC`                                                                           | Immediate Or Cancel |
| An order will try to fill the order as much as it can before the order expires. |
| `FOK`                                                                           | Fill or Kill        |
| An order will expire if the full order cannot be filled upon execution.         |

## Rate limiters (rateLimitType)[​](/docs/binance-spot-api-docs/enums#rate-limiters-ratelimittype "Direct link to Rate limiters (rateLimitType)")

- REQUEST_WEIGHT

```
    {      "rateLimitType": "REQUEST_WEIGHT",      "interval": "MINUTE",      "intervalNum": 1,      "limit": 6000    }
```

- ORDERS

```
    {      "rateLimitType": "ORDERS",      "interval": "SECOND",      "intervalNum": 1,      "limit": 10    }
```

- RAW_REQUESTS

```
    {      "rateLimitType": "RAW_REQUESTS",      "interval": "MINUTE",      "intervalNum": 5,      "limit": 61000    }
```

## Rate limit intervals (interval)[​](/docs/binance-spot-api-docs/enums#rate-limit-intervals-interval "Direct link to Rate limit intervals (interval)")

- SECOND
- MINUTE
- DAY

## STP Modes[​](/docs/binance-spot-api-docs/enums#stp-modes "Direct link to STP Modes")

Read [Self Trade Prevention (STP) FAQ](/docs/binance-spot-api-docs/faqs/stp_faq)
to learn more.

- `NONE`
- `EXPIRE_MAKER`
- `EXPIRE_TAKER`
- `EXPIRE_BOTH`
- `DECREMENT`

# Error codes for Binance

**Last Updated: 2025-04-08**

Errors consist of two parts: an error code and a message. Codes are universal,
but messages can vary. Here is the error JSON payload:

```
{  "code":-1121,  "msg":"Invalid symbol."}
```

## 10xx - General Server or Network issues[​](/docs/binance-spot-api-docs/errors#10xx---general-server-or-network-issues "Direct link to 10xx - General Server or Network issues")

### \-1000 UNKNOWN[​](/docs/binance-spot-api-docs/errors#-1000-unknown "Direct link to -1000 UNKNOWN")

- An unknown error occurred while processing the request.

### \-1001 DISCONNECTED[​](/docs/binance-spot-api-docs/errors#-1001-disconnected "Direct link to -1001 DISCONNECTED")

- Internal error; unable to process your request. Please try again.

### \-1002 UNAUTHORIZED[​](/docs/binance-spot-api-docs/errors#-1002-unauthorized "Direct link to -1002 UNAUTHORIZED")

- You are not authorized to execute this request.

### \-1003 TOO_MANY_REQUESTS[​](/docs/binance-spot-api-docs/errors#-1003-too_many_requests "Direct link to -1003 TOO_MANY_REQUESTS")

- Too many requests queued.
- Too much request weight used; current limit is %s request weight per %s.
  Please use WebSocket Streams for live updates to avoid polling the API.
- Way too much request weight used; IP banned until %s. Please use WebSocket
  Streams for live updates to avoid bans.

### \-1006 UNEXPECTED_RESP[​](/docs/binance-spot-api-docs/errors#-1006-unexpected_resp "Direct link to -1006 UNEXPECTED_RESP")

- An unexpected response was received from the message bus. Execution status
  unknown.

### \-1007 TIMEOUT[​](/docs/binance-spot-api-docs/errors#-1007-timeout "Direct link to -1007 TIMEOUT")

- Timeout waiting for response from backend server. Send status unknown;
  execution status unknown.

### \-1008 SERVER_BUSY[​](/docs/binance-spot-api-docs/errors#-1008-server_busy "Direct link to -1008 SERVER_BUSY")

- Server is currently overloaded with other requests. Please try again in a few
  minutes.

### \-1013 INVALID_MESSAGE[​](/docs/binance-spot-api-docs/errors#-1013-invalid_message "Direct link to -1013 INVALID_MESSAGE")

- The request is rejected by the API. (i.e. The request didn't reach the
  Matching Engine.)
- Potential error messages can be found in
  [Filter Failures](/docs/binance-spot-api-docs/errors#filter-failures) or
  [Failures during order placement](/docs/binance-spot-api-docs/errors#other-errors).

### \-1014 UNKNOWN_ORDER_COMPOSITION[​](/docs/binance-spot-api-docs/errors#-1014-unknown_order_composition "Direct link to -1014 UNKNOWN_ORDER_COMPOSITION")

- Unsupported order combination.

### \-1015 TOO_MANY_ORDERS[​](/docs/binance-spot-api-docs/errors#-1015-too_many_orders "Direct link to -1015 TOO_MANY_ORDERS")

- Too many new orders.
- Too many new orders; current limit is %s orders per %s.

### \-1016 SERVICE_SHUTTING_DOWN[​](/docs/binance-spot-api-docs/errors#-1016-service_shutting_down "Direct link to -1016 SERVICE_SHUTTING_DOWN")

- This service is no longer available.

### \-1020 UNSUPPORTED_OPERATION[​](/docs/binance-spot-api-docs/errors#-1020-unsupported_operation "Direct link to -1020 UNSUPPORTED_OPERATION")

- This operation is not supported.

### \-1021 INVALID_TIMESTAMP[​](/docs/binance-spot-api-docs/errors#-1021-invalid_timestamp "Direct link to -1021 INVALID_TIMESTAMP")

- Timestamp for this request is outside of the recvWindow.
- Timestamp for this request was 1000ms ahead of the server's time.

### \-1022 INVALID_SIGNATURE[​](/docs/binance-spot-api-docs/errors#-1022-invalid_signature "Direct link to -1022 INVALID_SIGNATURE")

- Signature for this request is not valid.

### \-1033 COMP_ID_IN_USE[​](/docs/binance-spot-api-docs/errors#-1033-comp_id_in_use "Direct link to -1033 COMP_ID_IN_USE")

- `SenderCompId(49)` is currently in use. Concurrent use of the same
  SenderCompId within one account is not allowed.

### \-1034 TOO_MANY_CONNECTIONS[​](/docs/binance-spot-api-docs/errors#-1034-too_many_connections "Direct link to -1034 TOO_MANY_CONNECTIONS")

- Too many concurrent connections; current limit is '%s'.
- Too many connection attempts for account; current limit is %s per '%s'.
- Too many connection attempts from IP; current limit is %s per '%s'.

### \-1035 LOGGED_OUT[​](/docs/binance-spot-api-docs/errors#-1035-logged_out "Direct link to -1035 LOGGED_OUT")

- Please send [Logout`<5>`](/docs/binance-spot-api-docs/fix-api#logout) message
  to close the session.

## 11xx - Request issues[​](/docs/binance-spot-api-docs/errors#11xx---request-issues "Direct link to 11xx - Request issues")

### \-1100 ILLEGAL_CHARS[​](/docs/binance-spot-api-docs/errors#-1100-illegal_chars "Direct link to -1100 ILLEGAL_CHARS")

- Illegal characters found in a parameter.
- Illegal characters found in parameter '%s'; legal range is '%s'.

### \-1101 TOO_MANY_PARAMETERS[​](/docs/binance-spot-api-docs/errors#-1101-too_many_parameters "Direct link to -1101 TOO_MANY_PARAMETERS")

- Too many parameters sent for this endpoint.
- Too many parameters; expected '%s' and received '%s'.
- Duplicate values for a parameter detected.

### \-1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED[​](/docs/binance-spot-api-docs/errors#-1102-mandatory_param_empty_or_malformed "Direct link to -1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED")

- A mandatory parameter was not sent, was empty/null, or malformed.
- Mandatory parameter '%s' was not sent, was empty/null, or malformed.
- Param '%s' or '%s' must be sent, but both were empty/null!
- Required tag '%s' missing.
- Field value was empty or malformed.
- '%s' contains unexpected value. Cannot be greater than %s.

### \-1103 UNKNOWN_PARAM[​](/docs/binance-spot-api-docs/errors#-1103-unknown_param "Direct link to -1103 UNKNOWN_PARAM")

- An unknown parameter was sent.
- Undefined Tag.

### \-1104 UNREAD_PARAMETERS[​](/docs/binance-spot-api-docs/errors#-1104-unread_parameters "Direct link to -1104 UNREAD_PARAMETERS")

- Not all sent parameters were read.
- Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.

### \-1105 PARAM_EMPTY[​](/docs/binance-spot-api-docs/errors#-1105-param_empty "Direct link to -1105 PARAM_EMPTY")

- A parameter was empty.
- Parameter '%s' was empty.

### \-1106 PARAM_NOT_REQUIRED[​](/docs/binance-spot-api-docs/errors#-1106-param_not_required "Direct link to -1106 PARAM_NOT_REQUIRED")

- A parameter was sent when not required.
- Parameter '%s' sent when not required.
- A tag '%s' was sent when not required.

### \-1108 PARAM_OVERFLOW[​](/docs/binance-spot-api-docs/errors#-1108-param_overflow "Direct link to -1108 PARAM_OVERFLOW")

- Parameter '%s' overflowed.

### \-1111 BAD_PRECISION[​](/docs/binance-spot-api-docs/errors#-1111-bad_precision "Direct link to -1111 BAD_PRECISION")

- Parameter '%s' has too much precision.

### \-1112 NO_DEPTH[​](/docs/binance-spot-api-docs/errors#-1112-no_depth "Direct link to -1112 NO_DEPTH")

- No orders on book for symbol.

### \-1114 TIF_NOT_REQUIRED[​](/docs/binance-spot-api-docs/errors#-1114-tif_not_required "Direct link to -1114 TIF_NOT_REQUIRED")

- TimeInForce parameter sent when not required.

### \-1115 INVALID_TIF[​](/docs/binance-spot-api-docs/errors#-1115-invalid_tif "Direct link to -1115 INVALID_TIF")

- Invalid timeInForce.

### \-1116 INVALID_ORDER_TYPE[​](/docs/binance-spot-api-docs/errors#-1116-invalid_order_type "Direct link to -1116 INVALID_ORDER_TYPE")

- Invalid orderType.

### \-1117 INVALID_SIDE[​](/docs/binance-spot-api-docs/errors#-1117-invalid_side "Direct link to -1117 INVALID_SIDE")

- Invalid side.

### \-1118 EMPTY_NEW_CL_ORD_ID[​](/docs/binance-spot-api-docs/errors#-1118-empty_new_cl_ord_id "Direct link to -1118 EMPTY_NEW_CL_ORD_ID")

- New client order ID was empty.

### \-1119 EMPTY_ORG_CL_ORD_ID[​](/docs/binance-spot-api-docs/errors#-1119-empty_org_cl_ord_id "Direct link to -1119 EMPTY_ORG_CL_ORD_ID")

- Original client order ID was empty.

### \-1120 BAD_INTERVAL[​](/docs/binance-spot-api-docs/errors#-1120-bad_interval "Direct link to -1120 BAD_INTERVAL")

- Invalid interval.

### \-1121 BAD_SYMBOL[​](/docs/binance-spot-api-docs/errors#-1121-bad_symbol "Direct link to -1121 BAD_SYMBOL")

- Invalid symbol.

### \-1122 INVALID_SYMBOLSTATUS[​](/docs/binance-spot-api-docs/errors#-1122-invalid_symbolstatus "Direct link to -1122 INVALID_SYMBOLSTATUS")

- Invalid symbolStatus.

### \-1125 INVALID_LISTEN_KEY[​](/docs/binance-spot-api-docs/errors#-1125-invalid_listen_key "Direct link to -1125 INVALID_LISTEN_KEY")

- This listenKey does not exist.

### \-1127 MORE_THAN_XX_HOURS[​](/docs/binance-spot-api-docs/errors#-1127-more_than_xx_hours "Direct link to -1127 MORE_THAN_XX_HOURS")

- Lookup interval is too big.
- More than %s hours between startTime and endTime.

### \-1128 OPTIONAL_PARAMS_BAD_COMBO[​](/docs/binance-spot-api-docs/errors#-1128-optional_params_bad_combo "Direct link to -1128 OPTIONAL_PARAMS_BAD_COMBO")

- Combination of optional parameters invalid.
- Combination of optional fields invalid. Recommendation: '%s' and '%s' must
  both be sent.
- Fields \[%s\] must be sent together or omitted entirely.
- Invalid `MDEntryType (269)` combination. BID and OFFER must be requested
  together.

### \-1130 INVALID_PARAMETER[​](/docs/binance-spot-api-docs/errors#-1130-invalid_parameter "Direct link to -1130 INVALID_PARAMETER")

- Invalid data sent for a parameter.
- Data sent for parameter '%s' is not valid.

### \-1134 BAD_STRATEGY_TYPE[​](/docs/binance-spot-api-docs/errors#-1134-bad_strategy_type "Direct link to -1134 BAD_STRATEGY_TYPE")

- `strategyType` was less than 1000000.
- `TargetStrategy (847)` was less than 1000000.

### \-1135 INVALID_JSON[​](/docs/binance-spot-api-docs/errors#-1135-invalid_json "Direct link to -1135 INVALID_JSON")

- Invalid JSON Request
- JSON sent for parameter '%s' is not valid

### \-1139 INVALID_TICKER_TYPE[​](/docs/binance-spot-api-docs/errors#-1139-invalid_ticker_type "Direct link to -1139 INVALID_TICKER_TYPE")

- Invalid ticker type.

### \-1145 INVALID_CANCEL_RESTRICTIONS[​](/docs/binance-spot-api-docs/errors#-1145-invalid_cancel_restrictions "Direct link to -1145 INVALID_CANCEL_RESTRICTIONS")

- `cancelRestrictions` has to be either `ONLY_NEW` or `ONLY_PARTIALLY_FILLED`.

### \-1151 DUPLICATE_SYMBOLS[​](/docs/binance-spot-api-docs/errors#-1151-duplicate_symbols "Direct link to -1151 DUPLICATE_SYMBOLS")

- Symbol is present multiple times in the list.

### \-1152 INVALID_SBE_HEADER[​](/docs/binance-spot-api-docs/errors#-1152-invalid_sbe_header "Direct link to -1152 INVALID_SBE_HEADER")

- Invalid `X-MBX-SBE` header; expected `<SCHEMA_ID>:<VERSION>`.

### \-1153 UNSUPPORTED_SCHEMA_ID[​](/docs/binance-spot-api-docs/errors#-1153-unsupported_schema_id "Direct link to -1153 UNSUPPORTED_SCHEMA_ID")

- Unsupported SBE schema ID or version specified in the `X-MBX-SBE` header.

### \-1155 SBE_DISABLED[​](/docs/binance-spot-api-docs/errors#-1155-sbe_disabled "Direct link to -1155 SBE_DISABLED")

- SBE is not enabled.

### \-1158 OCO_ORDER_TYPE_REJECTED[​](/docs/binance-spot-api-docs/errors#-1158-oco_order_type_rejected "Direct link to -1158 OCO_ORDER_TYPE_REJECTED")

- Order type not supported in OCO.
- If the order type provided in the `aboveType` and/or `belowType` is not
  supported.

### \-1160 OCO_ICEBERGQTY_TIMEINFORCE[​](/docs/binance-spot-api-docs/errors#-1160-oco_icebergqty_timeinforce "Direct link to -1160 OCO_ICEBERGQTY_TIMEINFORCE")

- Parameter '%s' is not supported if `aboveTimeInForce`/`belowTimeInForce` is
  not GTC.
- If the order type for the above or below leg is `STOP_LOSS_LIMIT`, and
  `icebergQty` is provided for that leg, the `timeInForce` has to be `GTC` else
  it will throw an error.
- `TimeInForce (59)` must be `GTC (1)` when `MaxFloor (111)` is used.

### \-1161 DEPRECATED_SCHEMA[​](/docs/binance-spot-api-docs/errors#-1161-deprecated_schema "Direct link to -1161 DEPRECATED_SCHEMA")

- Unable to encode the response in SBE schema 'x'. Please use schema 'y' or
  higher.

### \-1165 BUY_OCO_LIMIT_MUST_BE_BELOW[​](/docs/binance-spot-api-docs/errors#-1165-buy_oco_limit_must_be_below "Direct link to -1165 BUY_OCO_LIMIT_MUST_BE_BELOW")

- A limit order in a buy OCO must be below.

### \-1166 SELL_OCO_LIMIT_MUST_BE_ABOVE[​](/docs/binance-spot-api-docs/errors#-1166-sell_oco_limit_must_be_above "Direct link to -1166 SELL_OCO_LIMIT_MUST_BE_ABOVE")

- A limit order in a sell OCO must be above.

### \-1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT[​](/docs/binance-spot-api-docs/errors#-1168-both_oco_orders_cannot_be_limit "Direct link to -1168 BOTH_OCO_ORDERS_CANNOT_BE_LIMIT")

- At least one OCO order must be contingent.

### \-1169 INVALID_TAG_NUMBER[​](/docs/binance-spot-api-docs/errors#-1169-invalid_tag_number "Direct link to -1169 INVALID_TAG_NUMBER")

- Invalid tag number.

### \-1170 TAG_NOT_DEFINED_IN_MESSAGE[​](/docs/binance-spot-api-docs/errors#-1170-tag_not_defined_in_message "Direct link to -1170 TAG_NOT_DEFINED_IN_MESSAGE")

- Tag '%s' not defined for this message type.

### \-1171 TAG_APPEARS_MORE_THAN_ONCE[​](/docs/binance-spot-api-docs/errors#-1171-tag_appears_more_than_once "Direct link to -1171 TAG_APPEARS_MORE_THAN_ONCE")

- Tag '%s' appears more than once.

### \-1172 TAG_OUT_OF_ORDER[​](/docs/binance-spot-api-docs/errors#-1172-tag_out_of_order "Direct link to -1172 TAG_OUT_OF_ORDER")

- Tag '%s' specified out of required order.

### \-1173 GROUP_FIELDS_OUT_OF_ORDER[​](/docs/binance-spot-api-docs/errors#-1173-group_fields_out_of_order "Direct link to -1173 GROUP_FIELDS_OUT_OF_ORDER")

- Repeating group '%s' fields out of order.

### \-1174 INVALID_COMPONENT[​](/docs/binance-spot-api-docs/errors#-1174-invalid_component "Direct link to -1174 INVALID_COMPONENT")

- Component '%s' is incorrectly populated on '%s' order. Recommendation: '%s'

### \-1175 RESET_SEQ_NUM_SUPPORT[​](/docs/binance-spot-api-docs/errors#-1175-reset_seq_num_support "Direct link to -1175 RESET_SEQ_NUM_SUPPORT")

- Continuation of sequence numbers to new session is currently unsupported.
  Sequence numbers must be reset for each new session.

### \-1176 ALREADY_LOGGED_IN[​](/docs/binance-spot-api-docs/errors#-1176-already_logged_in "Direct link to -1176 ALREADY_LOGGED_IN")

- [Logon`<A>`](/docs/binance-spot-api-docs/fix-api#logon-main) should only be
  sent once.

### \-1177 GARBLED_MESSAGE[​](/docs/binance-spot-api-docs/errors#-1177-garbled_message "Direct link to -1177 GARBLED_MESSAGE")

- `CheckSum(10)` contains an incorrect value.
- `BeginString (8)` is not the first tag in a message.
- `MsgType (35)` is not the third tag in a message.
- `BodyLength (9)` does not contain the correct byte count.
- Only printable ASCII characters and SOH (Start of Header) are allowed.

### \-1178 BAD_SENDER_COMPID[​](/docs/binance-spot-api-docs/errors#-1178-bad_sender_compid "Direct link to -1178 BAD_SENDER_COMPID")

- `SenderCompId(49)` contains an incorrect value. The SenderCompID value should
  not change throughout the lifetime of a session.

### \-1179 BAD_SEQ_NUM[​](/docs/binance-spot-api-docs/errors#-1179-bad_seq_num "Direct link to -1179 BAD_SEQ_NUM")

- `MsgSeqNum(34)` contains an unexpected value. Expected: '%d'.

### \-1180 EXPECTED_LOGON[​](/docs/binance-spot-api-docs/errors#-1180-expected_logon "Direct link to -1180 EXPECTED_LOGON")

- [Logon`<A>`](/docs/binance-spot-api-docs/fix-api#logon-main) must be the first
  message in the session.

### \-1181 TOO_MANY_MESSAGES[​](/docs/binance-spot-api-docs/errors#-1181-too_many_messages "Direct link to -1181 TOO_MANY_MESSAGES")

- Too many messages; current limit is '%d' messages per '%s'.

### \-1182 PARAMS_BAD_COMBO[​](/docs/binance-spot-api-docs/errors#-1182-params_bad_combo "Direct link to -1182 PARAMS_BAD_COMBO")

- Conflicting fields: \[%s\]

### \-1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS[​](/docs/binance-spot-api-docs/errors#-1183-not_allowed_in_drop_copy_sessions "Direct link to -1183 NOT_ALLOWED_IN_DROP_COPY_SESSIONS")

- Requested operation is not allowed in DropCopy sessions.

### \-1184 DROP_COPY_SESSION_NOT_ALLOWED[​](/docs/binance-spot-api-docs/errors#-1184-drop_copy_session_not_allowed "Direct link to -1184 DROP_COPY_SESSION_NOT_ALLOWED")

- DropCopy sessions are not supported on this server. Please reconnect to a drop
  copy server.

### \-1185 DROP_COPY_SESSION_REQUIRED[​](/docs/binance-spot-api-docs/errors#-1185-drop_copy_session_required "Direct link to -1185 DROP_COPY_SESSION_REQUIRED")

- Only DropCopy sessions are supported on this server. Either reconnect to order
  entry server or send `DropCopyFlag (9406)` field.

### \-1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS[​](/docs/binance-spot-api-docs/errors#-1186-not_allowed_in_order_entry_sessions "Direct link to -1186 NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS")

- Requested operation is not allowed in order entry sessions.

### \-1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS[​](/docs/binance-spot-api-docs/errors#-1187-not_allowed_in_market_data_sessions "Direct link to -1187 NOT_ALLOWED_IN_MARKET_DATA_SESSIONS")

- Requested operation is not allowed in market data sessions.

### \-1188 INCORRECT_NUM_IN_GROUP_COUNT[​](/docs/binance-spot-api-docs/errors#-1188-incorrect_num_in_group_count "Direct link to -1188 INCORRECT_NUM_IN_GROUP_COUNT")

- Incorrect NumInGroup count for repeating group '%s'.

### \-1189 DUPLICATE_ENTRIES_IN_A_GROUP[​](/docs/binance-spot-api-docs/errors#-1189-duplicate_entries_in_a_group "Direct link to -1189 DUPLICATE_ENTRIES_IN_A_GROUP")

- Group '%s' contains duplicate entries.

### \-1190 INVALID_REQUEST_ID[​](/docs/binance-spot-api-docs/errors#-1190-invalid_request_id "Direct link to -1190 INVALID_REQUEST_ID")

- `MDReqID (262)` contains a subscription request id that is already in use on
  this connection.
- `MDReqID (262)` contains an unsubscription request id that does not match any
  active subscription.

### \-1191 TOO_MANY_SUBSCRIPTIONS[​](/docs/binance-spot-api-docs/errors#-1191-too_many_subscriptions "Direct link to -1191 TOO_MANY_SUBSCRIPTIONS")

- Too many subscriptions. Connection may create up to '%s' subscriptions at a
  time.
- Similar subscription is already active on this connection. Symbol='%s', active
  subscription id: '%s'.

### \-1194 INVALID_TIME_UNIT[​](/docs/binance-spot-api-docs/errors#-1194-invalid_time_unit "Direct link to -1194 INVALID_TIME_UNIT")

- Invalid value for time unit; expected either MICROSECOND or MILLISECOND.

### \-1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE[​](/docs/binance-spot-api-docs/errors#-1196-buy_oco_stop_loss_must_be_above "Direct link to -1196 BUY_OCO_STOP_LOSS_MUST_BE_ABOVE")

- A stop loss order in a buy OCO must be above.

### \-1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW[​](/docs/binance-spot-api-docs/errors#-1197-sell_oco_stop_loss_must_be_below "Direct link to -1197 SELL_OCO_STOP_LOSS_MUST_BE_BELOW")

- A stop loss order in a sell OCO must be below.

### \-1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW[​](/docs/binance-spot-api-docs/errors#-1198-buy_oco_take_profit_must_be_below "Direct link to -1198 BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW")

- A take profit order in a buy OCO must be below.

### \-1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE[​](/docs/binance-spot-api-docs/errors#-1199-sell_oco_take_profit_must_be_above "Direct link to -1199 SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE")

- A take profit order in a sell OCO must be above.

### \-2010 NEW_ORDER_REJECTED[​](/docs/binance-spot-api-docs/errors#-2010-new_order_rejected "Direct link to -2010 NEW_ORDER_REJECTED")

- NEW_ORDER_REJECTED

### \-2011 CANCEL_REJECTED[​](/docs/binance-spot-api-docs/errors#-2011-cancel_rejected "Direct link to -2011 CANCEL_REJECTED")

- CANCEL_REJECTED

### \-2013 NO_SUCH_ORDER[​](/docs/binance-spot-api-docs/errors#-2013-no_such_order "Direct link to -2013 NO_SUCH_ORDER")

- Order does not exist.

### \-2014 BAD_API_KEY_FMT[​](/docs/binance-spot-api-docs/errors#-2014-bad_api_key_fmt "Direct link to -2014 BAD_API_KEY_FMT")

- API-key format invalid.

### \-2015 REJECTED_MBX_KEY[​](/docs/binance-spot-api-docs/errors#-2015-rejected_mbx_key "Direct link to -2015 REJECTED_MBX_KEY")

- Invalid API-key, IP, or permissions for action.

### \-2016 NO_TRADING_WINDOW[​](/docs/binance-spot-api-docs/errors#-2016-no_trading_window "Direct link to -2016 NO_TRADING_WINDOW")

- No trading window could be found for the symbol. Try ticker/24hrs instead.

### \-2026 ORDER_ARCHIVED[​](/docs/binance-spot-api-docs/errors#-2026-order_archived "Direct link to -2026 ORDER_ARCHIVED")

- Order was canceled or expired with no executed qty over 90 days ago and has
  been archived.

### \-2039 CLIENT_ORDER_ID_INVALID[​](/docs/binance-spot-api-docs/errors#-2039-client_order_id_invalid "Direct link to -2039 CLIENT_ORDER_ID_INVALID")

- Client order ID is not correct for this order ID.

## Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED[​](/docs/binance-spot-api-docs/errors#messages-for--1010-error_msg_received--2010-new_order_rejected--2011-cancel_rejected-and--2038-order_amend_rejected "Direct link to Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED")

This code is sent when an error has been returned by the matching engine. The
following messages which will indicate the specific error:

| Error message                                                   | Description                                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| "Unknown order sent."                                           | The order (by either `orderId`, `clOrdId`, `origClOrdId`) could not be found.               |
| "Duplicate order sent."                                         | The `clOrdId` is already in use.                                                            |
| "Market is closed."                                             | The symbol is not trading.                                                                  |
| "Account has insufficient balance for requested action."        | Not enough funds to complete the action.                                                    |
| "Market orders are not supported for this symbol."              | `MARKET` is not enabled on the symbol.                                                      |
| "Iceberg orders are not supported for this symbol."             | `icebergQty` is not enabled on the symbol.                                                  |
| "Stop loss orders are not supported for this symbol."           | `STOP_LOSS` is not enabled on the symbol.                                                   |
| "Stop loss limit orders are not supported for this symbol."     | `STOP_LOSS_LIMIT` is not enabled on the symbol.                                             |
| "Take profit orders are not supported for this symbol."         | `TAKE_PROFIT` is not enabled on the symbol.                                                 |
| "Take profit limit orders are not supported for this symbol."   | `TAKE_PROFIT_LIMIT` is not enabled on the symbol.                                           |
| "Order amend is not supported for this symbol."                 | Order amend keep priority is not enabled on the symbol.                                     |
| "Price \* QTY is zero or less."                                 | `price` \* `quantity` is too low.                                                           |
| "IcebergQty exceeds QTY."                                       | `icebergQty` must be less than the order quantity.                                          |
| "This action is disabled on this account."                      | Contact customer support; some actions have been disabled on the account.                   |
| "This account may not place or cancel orders."                  | Contact customer support; the account has trading ability disabled.                         |
| "Unsupported order combination"                                 | The `orderType`, `timeInForce`, `stopPrice`, and/or `icebergQty` combination isn't allowed. |
| "Order would trigger immediately."                              | The order's stop price is not valid when compared to the last traded price.                 |
| "Cancel order is invalid. Check origClOrdId and orderId."       | No `origClOrdId` or `orderId` was sent in.                                                  |
| "Order would immediately match and take."                       | `LIMIT_MAKER` order type would immediately match and trade, and not be a pure maker order.  |
| "The relationship of the prices for the orders is not correct." | The prices set in the `OCO` is breaking the Price restrictions.                             |

For reference:  
`BUY` : `LIMIT_MAKER` `price` < Last Traded Price < `stopPrice`  
`SELL` : `LIMIT_MAKER` `price` > Last Traded Price > `stopPrice` | | "OCO orders
are not supported for this symbol" | `OCO` is not enabled on the symbol. | |
"Quote order qty market orders are not support for this symbol." | `MARKET`
orders using the parameter `quoteOrderQty` are not enabled on the symbol. | |
"Trailing stop orders are not supported for this symbol." | Orders using
`trailingDelta` are not enabled on the symbol. | | "Order cancel-replace is not
supported for this symbol." | `POST /api/v3/order/cancelReplace` (REST API) or
`order.cancelReplace` (WebSocket API) is not enabled on the symbol. | | "This
symbol is not permitted for this account." | Account and symbol do not have the
same permissions. (e.g. `SPOT`, `MARGIN`, etc) | | "This symbol is restricted
for this account." | Account is unable to trade on that symbol. (e.g. An
`ISOLATED_MARGIN` account cannot place `SPOT` orders.) | | "Order was not
canceled due to cancel restrictions." | Either `cancelRestrictions` was set to
`ONLY_NEW` but the order status was not `NEW`  
or  
`cancelRestrictions` was set to `ONLY_PARTIALLY_FILLED` but the order status was
not `PARTIALLY_FILLED`. | | "Rest API trading is not enabled." / "WebSocket API
trading is not enabled." | Order is being placed or a server that is not
configured to allow access to `TRADE` endpoints. | | "FIX API trading is not
enabled. | Order is placed on a FIX server that is not TRADE enabled. | | "Order
book liquidity is less than `LOT_SIZE` filter minimum quantity." | Quote
quantity market orders cannot be placed when the order book liquidity is less
than minimum quantity configured for the `LOT_SIZE` filter. | | "Order book
liquidity is less than `MARKET_LOT_SIZE` filter minimum quantity." | Quote
quantity market orders cannot be placed when the order book liquidity is less
than the minimum quantity for `MARKET_LOT_SIZE` filter. | | "Order book
liquidity is less than symbol minimum quantity." | Quote quantity market orders
cannot be placed when there are no orders on the book. | | "Order amend
(quantity increase) is not supported." | `newQty` must be less than the order
quantity. | | "The requested action would change no state; rejecting". | The
request sent would not have changed the status quo.

(e.g. `newQty` cannot equal the order quantity.) |

## Errors regarding placing orders via cancelReplace[​](/docs/binance-spot-api-docs/errors#errors-regarding-placing-orders-via-cancelreplace "Direct link to Errors regarding placing orders via cancelReplace")

### \-2021 Order cancel-replace partially failed[​](/docs/binance-spot-api-docs/errors#-2021-order-cancel-replace-partially-failed "Direct link to -2021 Order cancel-replace partially failed")

- This code is sent when either the cancellation of the order failed or the new
  order placement failed but not both.

### \-2022 Order cancel-replace failed.[​](/docs/binance-spot-api-docs/errors#-2022-order-cancel-replace-failed "Direct link to -2022 Order cancel-replace failed.")

- This code is sent when both the cancellation of the order failed and the new
  order placement failed.

## Filter failures[​](/docs/binance-spot-api-docs/errors#filter-failures "Direct link to Filter failures")

| Error message                                                                                                       | Description                                                                                               |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| "Filter failure: PRICE_FILTER"                                                                                      | `price` is too high, too low, and/or not following the tick size rule for the symbol.                     |
| "Filter failure: PERCENT_PRICE"                                                                                     | `price` is X% too high or X% too low from the average weighted price over the last Y minutes.             |
| "Filter failure: LOT_SIZE"                                                                                          | `quantity` is too high, too low, and/or not following the step size rule for the symbol.                  |
| "Filter failure: MIN_NOTIONAL"                                                                                      | `price` \* `quantity` is too low to be a valid order for the symbol.                                      |
| "Filter failure: NOTIONAL"                                                                                          | `price` \* `quantity` is not within range of the `minNotional` and `maxNotional`                          |
| "Filter failure: ICEBERG_PARTS"                                                                                     | `ICEBERG` order would break into too many parts; icebergQty is too small.                                 |
| "Filter failure: MARKET_LOT_SIZE"                                                                                   | `MARKET` order's `quantity` is too high, too low, and/or not following the step size rule for the symbol. |
| "Filter failure: MAX_POSITION"                                                                                      | The account's position has reached the maximum defined limit.                                             |
| This is composed of the sum of the balance of the base asset, and the sum of the quantity of all open `BUY` orders. |
| "Filter failure: MAX_NUM_ORDERS"                                                                                    | Account has too many open orders on the symbol.                                                           |
| "Filter failure: MAX_NUM_ALGO_ORDERS"                                                                               | Account has too many open stop loss and/or take profit orders on the symbol.                              |
| "Filter failure: MAX_NUM_ICEBERG_ORDERS"                                                                            | Account has too many open iceberg orders on the symbol.                                                   |
| "Filter failure: TRAILING_DELTA"                                                                                    | `trailingDelta` is not within the defined range of the filter for that order type.                        |
| "Filter failure: EXCHANGE_MAX_NUM_ORDERS"                                                                           | Account has too many open orders on the exchange.                                                         |
| "Filter failure: EXCHANGE_MAX_NUM_ALGO_ORDERS"                                                                      | Account has too many open stop loss and/or take profit orders on the exchange.                            |
| "Filter failure: EXCHANGE_MAX_NUM_ICEBERG_ORDERS"                                                                   | Account has too many open iceberg orders on the exchange.                                                 |

# General API Information

- The following base endpoints are available. Please use whichever works best
  for your setup:
  - **[https://api.binance.com](https://api.binance.com)**
  - **[https://api-gcp.binance.com](https://api-gcp.binance.com)**
  - **[https://api1.binance.com](https://api1.binance.com)**
  - **[https://api2.binance.com](https://api2.binance.com)**
  - **[https://api3.binance.com](https://api3.binance.com)**
  - **[https://api4.binance.com](https://api4.binance.com)**
- The last 4 endpoints in the point above (`api1`\-`api4`) should give better
  performance but have less stability.
- Responses are in JSON by default. To receive responses in SBE, refer to the
  [SBE FAQ](/docs/binance-spot-api-docs/faqs/sbe_faq) page.
- Data is returned in **ascending** order. Oldest first, newest last.
- All time and timestamp related fields in the JSON responses are in
  **milliseconds by default.** To receive the information in microseconds,
  please add the header `X-MBX-TIME-UNIT:MICROSECOND` or
  `X-MBX-TIME-UNIT:microsecond`.
- Timestamp parameters (e.g. `startTime`, `endTime`, `timestamp`) can be passed
  in milliseconds or microseconds.
- For APIs that only send public market data, please use the base endpoint
  **[https://data-api.binance.vision](https://data-api.binance.vision)**. Please
  refer to [Market Data Only](/docs/binance-spot-api-docs/faqs/market_data_only)
  page.
- If there are enums or terms you want clarification on, please see the
  [SPOT Glossary](/docs/binance-spot-api-docs/faqs/spot_glossary) for more
  information.

# HTTP Return Codes

- HTTP `4XX` return codes are used for malformed requests; the issue is on the
  sender's side.
- HTTP `403` return code is used when the WAF Limit (Web Application Firewall)
  has been violated.
- HTTP `409` return code is used when a cancelReplace order partially succeeds.
  (i.e. if the cancellation of the order fails but the new order placement
  succeeds.)
- HTTP `429` return code is used when breaking a request rate limit.
- HTTP `418` return code is used when an IP has been auto-banned for continuing
  to send requests after receiving `429` codes.
- HTTP `5XX` return codes are used for internal errors; the issue is on
  Binance's side. It is important to **NOT** treat this as a failure operation;
  the execution status is **UNKNOWN** and could have been a success.

# Error Codes

- Any endpoint can return an ERROR

Sample Payload below:

```
{  "code": -1121,  "msg": "Invalid symbol."}
```

- Specific error codes and messages are defined in
  [Errors Codes](/docs/binance-spot-api-docs/errors).

# General Information on Endpoints

- For `GET` endpoints, parameters must be sent as a `query string`.
- For `POST`, `PUT`, and `DELETE` endpoints, the parameters may be sent as a
  `query string` or in the `request body` with content type
  `application/x-www-form-urlencoded`. You may mix parameters between both the
  `query string` and `request body` if you wish to do so.
- Parameters may be sent in any order.
- If a parameter sent in both the `query string` and `request body`, the
  `query string` parameter will be used.

# LIMITS

### General Info on Limits[​](/docs/binance-spot-api-docs/rest-api/limits#general-info-on-limits "Direct link to General Info on Limits")

- The following `intervalLetter` values for headers:
  - SECOND => S
  - MINUTE => M
  - HOUR => H
  - DAY => D
- `intervalNum` describes the amount of the interval. For example, `intervalNum`
  5 with `intervalLetter` M means "Every 5 minutes".
- The `/api/v3/exchangeInfo` `rateLimits` array contains objects related to the
  exchange's `RAW_REQUESTS`, `REQUEST_WEIGHT`, and `ORDERS` rate limits. These
  are further defined in the `ENUM definitions` section under
  `Rate limiters (rateLimitType)`.
- Requests fail with HTTP status code 429 when you exceed the request rate
  limit.

### IP Limits[​](/docs/binance-spot-api-docs/rest-api/limits#ip-limits "Direct link to IP Limits")

- Every request will contain `X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter)`
  in the response headers which has the current used weight for the IP for all
  request rate limiters defined.
- Each route has a `weight` which determines for the number of requests each
  endpoint counts for. Heavier endpoints and endpoints that do operations on
  multiple symbols will have a heavier `weight`.
- When a 429 is received, it's your obligation as an API to back off and not
  spam the API.
- **Repeatedly violating rate limits and/or failing to back off after receiving
  429s will result in an automated IP ban (HTTP status 418).**
- IP bans are tracked and **scale in duration** for repeat offenders, **from 2
  minutes to 3 days**.
- A `Retry-After` header is sent with a 418 or 429 responses and will give the
  **number of seconds** required to wait, in the case of a 429, to prevent a
  ban, or, in the case of a 418, until the ban is over.
- **The limits on the API are based on the IPs, not the API keys.**

### Unfilled Order Count[​](/docs/binance-spot-api-docs/rest-api/limits#unfilled-order-count "Direct link to Unfilled Order Count")

- Every successful order response will contain a
  `X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter)` header indicating how many
  orders you have placed for that interval.
  To monitor this, refer to
  [`GET api/v3/rateLimit/order`](/docs/binance-spot-api-docs/rest-api/account-endpoints#query-unfilled-order-count).
- Rejected/unsuccessful orders are not guaranteed to have `X-MBX-ORDER-COUNT-**`
  headers in the response.
- If you have exceeded this, you will receive a 429 error without the
  `Retry-After` header.
- **Please note that if your orders are consistently filled by trades, you can
  continuously place orders on the API**. For more information, please see
  [Spot Unfilled Order Count Rules](/docs/binance-spot-api-docs/faqs/order_count_decrement).
- **The number of unfilled orders is tracked for each account.**

# Data Sources

- The API system is asynchronous, so some delay in the response is normal and
  expected.
- Each endpoint has a data source indicating where the data is being retrieved,
  and thus which endpoints have the most up-to-date response.

These are the three sources, ordered by least to most potential for delays in
data updates.

- **Matching Engine** - the data is from the Matching Engine
- **Memory** - the data is from a server's local or external memory
- **Database** - the data is taken directly from a database

Some endpoints can have more than 1 data source. (e.g. Memory => Database) This
means that the endpoint will check the first Data Source, and if it cannot find
the value it's looking for it will check the next one.

# Endpoint security type

- Each endpoint has a security type that determines how you will interact with
  it. This is stated next to the NAME of the endpoint.
- If no security type is stated, assume the security type is NONE.
- API-keys are passed into the Rest API via the `X-MBX-APIKEY` header.
- API-keys and secret-keys **are case sensitive**.
- API-keys can be configured to only access certain types of secure endpoints.  
  For example, one API-key could be used for TRADE only,  
  while another API-key can access everything except for TRADE routes.
- By default, API-keys can access all secure routes.

| Security Type | Description                                              |
| ------------- | -------------------------------------------------------- |
| NONE          | Endpoint can be accessed freely.                         |
| TRADE         | Endpoint requires sending a valid API-Key and signature. |
| USER_DATA     | Endpoint requires sending a valid API-Key and signature. |
| USER_STREAM   | Endpoint requires sending a valid API-Key.               |

- `TRADE` and `USER_DATA` endpoints are `SIGNED` endpoints.

### SIGNED (TRADE and USER_DATA) Endpoint security[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#signed-trade-and-user_data-endpoint-security "Direct link to SIGNED (TRADE and USER_DATA) Endpoint security")

- `SIGNED` endpoints require an additional parameter, `signature`, to be sent in
  the `query string` or `request body`.
- The `signature` is **not case sensitive**.
- Please consult the
  [examples](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#signed-endpoint-examples-for-post-apiv3order)
  below on how to compute signature, depending on which API key type you are
  using.

### Timing security[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#timing-security "Direct link to Timing security")

- A `SIGNED` endpoint also requires a parameter, `timestamp`, to be sent which
  should be the millisecond timestamp of when the request was created and sent.
- An additional parameter, `recvWindow`, may be sent to specify the number of
  milliseconds after `timestamp` the request is valid for. If `recvWindow` is
  not sent, **it defaults to 5000**.
- The logic is as follows:

  ```
  if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow) {  // process request} else {  // reject request}
  ```

**Serious trading is about timing.** Networks can be unstable and unreliable,
which can lead to requests taking varying amounts of time to reach the servers.
With `recvWindow`, you can specify that the request must be processed within a
certain number of milliseconds or be rejected by the server.

**It is recommended to use a small recvWindow of 5000 or less! The max cannot go
beyond 60,000!**

### SIGNED Endpoint Examples for POST /api/v3/order[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#signed-endpoint-examples-for-post-apiv3order "Direct link to SIGNED Endpoint Examples for POST /api/v3/order")

#### HMAC Keys[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#hmac-keys "Direct link to HMAC Keys")

Here is a step-by-step example of how to send a valid signed payload from the
Linux command line using `echo`, `openssl`, and `curl`.

| Key         | Value                                                            |
| ----------- | ---------------------------------------------------------------- |
| `apiKey`    | vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A |
| `secretKey` | NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j |

| Parameter     | Value         |
| ------------- | ------------- |
| `symbol`      | LTCBTC        |
| `side`        | BUY           |
| `type`        | LIMIT         |
| `timeInForce` | GTC           |
| `quantity`    | 1             |
| `price`       | 0.1           |
| `recvWindow`  | 5000          |
| `timestamp`   | 1499827319559 |

**Example 1: As a request body**

- **requestBody:**
  symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
- **HMAC SHA256 signature:**

  ```
  [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
  ```

- **curl command:**

  ```
  (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order' -d 'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
  ```

**Example 2: As a query string**

- **queryString:**
  symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
- **HMAC SHA256 signature:**

  ```
  [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
  ```

- **curl command:**

  ```
  (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
  ```

**Example 3: Mixed query string and request body**

- **queryString:** symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC
- **requestBody:** quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
- **HMAC SHA256 signature:**

  ```
  [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTCquantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= 0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77
  ```

- **curl command:**

  ```
  (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77'
  ```

Note that the signature is different in example 3. There is no & between "GTC"
and "quantity=1".

#### RSA Keys[​](/docs/binance-spot-api-docs/rest-api/endpoint-security-type#rsa-keys "Direct link to RSA Keys")

This will be a step by step process how to create the signature payload to send
a valid signed payload.

We support `PKCS#8` currently.

To get your API key, you need to upload your RSA Public Key to your account and
a corresponding API key will be provided for you.

For this example, the private key will be referenced as `./test-prv-key.pem`

| Key      | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| `apiKey` | CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ |

| Parameter     | Value         |
| ------------- | ------------- |
| `symbol`      | BTCUSDT       |
| `side`        | SELL          |
| `type`        | LIMIT         |
| `timeInForce` | GTC           |
| `quantity`    | 1             |
| `price`       | 0.2           |
| `timestamp`   | 1668481559918 |
| `recvWindow`  | 5000          |

**Step 1: Construct the payload**

Arrange the list of parameters into a string. Separate each parameter with a
`&`.

For the parameters above, the signature payload would look like this:

```
symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000
```

**Step 2: Compute the signature:**

1.  Encode signature payload as ASCII data.
2.  Sign payload using RSASSA-PKCS1-v1_5 algorithm with SHA-256 hash function.

```
$ echo -n 'symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000' | openssl dgst -sha256 -sign ./test-prv-key.pem
```

3.  Encode output as base64 string.

```
$  echo -n 'symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000' | openssl dgst -sha256 -sign ./test-prv-key.pem | openssl enc -base64 -AHZ8HOjiJ1s/igS9JA+n7+7Ti/ihtkRF5BIWcPIEluJP6tlbFM/Bf44LfZka/iemtahZAZzcO9TnI5uaXh3++lrqtNonCwp6/245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH+XxaCmR0WcvlKjNQnp12/eKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang/1WOq+Jaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT/fNnMRxFc7u+j3qI//5yuGuu14KR0MuQKKCSpViieD+fIti46sxPTsjSemoUKp0oXA==
```

4.  Since the signature may contain `/` and `=`, this could cause issues with
    sending the request. So the signature has to be URL encoded.

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

**Note: It is highly recommended to use Ed25519 API keys as it should provide
the best performance and security out of all supported key types.**

| Parameter     | Value         |
| ------------- | ------------- |
| `symbol`      | BTCUSDT       |
| `side`        | SELL          |
| `type`        | LIMIT         |
| `timeInForce` | GTC           |
| `quantity`    | 1             |
| `price`       | 0.2           |
| `timestamp`   | 1668481559918 |

This is a sample code in Python to show how to sign the payload with an Ed25519
key.

```
#!/usr/bin/env python3import base64import requestsimport timefrom cryptography.hazmat.primitives.serialization import load_pem_private_key# Set up authenticationAPI_KEY='put your own API Key here'PRIVATE_KEY_PATH='test-prv-key.pem'# Load the private key.# In this example the key is expected to be stored without encryption,# but we recommend using a strong password for improved security.with open(PRIVATE_KEY_PATH, 'rb') as f:    private_key = load_pem_private_key(data=f.read(),                                       password=None)# Set up the request parametersparams = {    'symbol':       'BTCUSDT',    'side':         'SELL',    'type':         'LIMIT',    'timeInForce':  'GTC',    'quantity':     '1.0000000',    'price':        '0.20',}# Timestamp the requesttimestamp = int(time.time() * 1000) # UNIX timestamp in millisecondsparams['timestamp'] = timestamp# Sign the requestpayload = '&'.join([f'{param}={value}' for param, value in params.items()])signature = base64.b64encode(private_key.sign(payload.encode('ASCII')))params['signature'] = signature# Send the requestheaders = {    'X-MBX-APIKEY': API_KEY,}response = requests.post(    'https://api.binance.com/api/v3/order',    headers=headers,    data=params,)print(response.json())
```

# General endpoints

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

| Name    | Type            | Mandatory | Description                                                                                                                                                                                          |
| ------- | --------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol  | STRING          | No        | Example: curl -X GET "[https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC](https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC)"                                                        |
| symbols | ARRAY OF STRING | No        | Examples: curl -X GET "[https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BNBBTC%22,%22BTCUSDT%22%5D](https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BNBBTC%22,%22BTCUSDT%22%5D)" |

or  
curl -g -X GET
'[https://api.binance.com/api/v3/exchangeInfo?symbols=\["BTCUSDT","BNBBTC](https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BTCUSDT%22,%22BNBBTC)"\]'
| | permissions | ENUM | No | Examples: curl -X GET
"[https://api.binance.com/api/v3/exchangeInfo?permissions=SPOT](https://api.binance.com/api/v3/exchangeInfo?permissions=SPOT)"  
or  
curl
-X GET
"[https://api.binance.com/api/v3/exchangeInfo?permissions=%5B%22MARGIN%22%2C%22LEVERAGED%22%5D](https://api.binance.com/api/v3/exchangeInfo?permissions=%5B%22MARGIN%22%2C%22LEVERAGED%22%5D)"  
or  
curl
-g -X GET
'[https://api.binance.com/api/v3/exchangeInfo?permissions=\["MARGIN","LEVERAGED](https://api.binance.com/api/v3/exchangeInfo?permissions=%5B%22MARGIN%22,%22LEVERAGED)"\]'
| | showPermissionSets | BOOLEAN | No | Controls whether the content of the
`permissionSets` field is populated or not. Defaults to `true` | | symbolStatus
| ENUM | No | Filters symbols that have this `tradingStatus`. Valid values:
`TRADING`, `HALT`, `BREAK`  
Cannot be used in combination with `symbols` or `symbol`. |

**Notes:**

- If the value provided to `symbol` or `symbols` do not exist, the endpoint will
  throw an error saying the symbol is invalid.
- All parameters are optional.
- `permissions` can support single or multiple values (e.g. `SPOT`,
  `["MARGIN","LEVERAGED"]`). This cannot be used in combination with `symbol` or
  `symbols`.
- If `permissions` parameter not provided, all symbols that have either `SPOT`,
  `MARGIN`, or `LEVERAGED` permission will be exposed.
  - To display symbols with any permission you need to specify them explicitly
    in `permissions`: (e.g. `["SPOT","MARGIN",...]`.). See
    [Account and Symbol Permissions](/docs/binance-spot-api-docs/enums#account-and-symbol-permissions)
    for the full list.

**Examples of Symbol Permissions Interpretation from the Response:**

- `[["A","B"]]` means you may place an order if your account has either
  permission "A" **or** permission "B".
- `[["A"],["B"]]` means you can place an order if your account has permission
  "A" **and** permission "B".
- `[["A"],["B","C"]]` means you can place an order if your account has
  permission "A" **and** permission "B" or permission "C". (Inclusive or is
  applied here, not exclusive or, so your account may have both permission "B"
  and permission "C".)

**Data Source:** Memory

**Response:**

```
{  "timezone": "UTC",  "serverTime": 1565246363776,  "rateLimits": [    {      // These are defined in the `ENUM definitions` section under `Rate Limiters (rateLimitType)`.      // All limits are optional    }  ],  "exchangeFilters": [    // These are the defined filters in the `Filters` section.    // All filters are optional.  ],  "symbols": [    {      "symbol": "ETHBTC",      "status": "TRADING",      "baseAsset": "ETH",      "baseAssetPrecision": 8,      "quoteAsset": "BTC",      "quotePrecision": 8, // will be removed in future api versions (v4+)      "quoteAssetPrecision": 8,      "baseCommissionPrecision": 8,      "quoteCommissionPrecision": 8,      "orderTypes": [        "LIMIT",        "LIMIT_MAKER",        "MARKET",        "STOP_LOSS",        "STOP_LOSS_LIMIT",        "TAKE_PROFIT",        "TAKE_PROFIT_LIMIT"      ],      "icebergAllowed": true,      "ocoAllowed": true,      "otoAllowed": true,      "quoteOrderQtyMarketAllowed": true,      "allowTrailingStop": false,      "cancelReplaceAllowed":false,      "allowAmend":false,      "isSpotTradingAllowed": true,      "isMarginTradingAllowed": true,      "filters": [        // These are defined in the Filters section.        // All filters are optional      ],      "permissions": [],      "permissionSets": [        [          "SPOT",          "MARGIN"        ]      ],      "defaultSelfTradePreventionMode": "NONE",      "allowedSelfTradePreventionModes": [        "NONE"      ]    }  ],  // Optional field. Present only when SOR is available.  // https://github.com/binance/binance-spot-api-docs/blob/master/faqs/sor_faq.md  "sors": [    {      "baseAsset": "BTC",      "symbols": [        "BTCUSDT",        "BTCUSDC"      ]    }  ]}
```

# Market Data endpoints

### Order book[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#order-book "Direct link to Order book")

```
GET /api/v3/depth
```

**Weight:** Adjusted based on the limit:

| Limit     | Request Weight |
| --------- | -------------- |
| 1-100     | 5              |
| 101-500   | 25             |
| 501-1000  | 50             |
| 1001-5000 | 250            |

**Parameters:**

| Name                                                 | Type   | Mandatory | Description                  |
| ---------------------------------------------------- | ------ | --------- | ---------------------------- |
| symbol                                               | STRING | YES       |                              |
| limit                                                | INT    | NO        | Default: 100; Maximum: 5000. |
| If limit > 5000, only 5000 entries will be returned. |

**Data Source:** Memory

**Response:**

```
{  "lastUpdateId": 1027024,  "bids": [    [      "4.00000000",     // PRICE      "431.00000000"    // QTY    ]  ],  "asks": [    [      "4.00000200",      "12.00000000"    ]  ]}
```

### Recent trades list[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#recent-trades-list "Direct link to Recent trades list")

```
GET /api/v3/trades
```

Get recent trades.

**Weight:** 25

**Parameters:**

| Name   | Type   | Mandatory | Description                  |
| ------ | ------ | --------- | ---------------------------- |
| symbol | STRING | YES       |                              |
| limit  | INT    | NO        | Default: 500; Maximum: 1000. |

**Data Source:** Memory

**Response:**

```
[  {    "id": 28457,    "price": "4.00000100",    "qty": "12.00000000",    "quoteQty": "48.000012",    "time": 1499865549590,    "isBuyerMaker": true,    "isBestMatch": true  }]
```

### Old trade lookup[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#old-trade-lookup "Direct link to Old trade lookup")

```
GET /api/v3/historicalTrades
```

Get older trades.

**Weight:** 25

**Parameters:**

| Name   | Type   | Mandatory | Description                                             |
| ------ | ------ | --------- | ------------------------------------------------------- |
| symbol | STRING | YES       |                                                         |
| limit  | INT    | NO        | Default: 500; Maximum: 1000.                            |
| fromId | LONG   | NO        | TradeId to fetch from. Default gets most recent trades. |

**Data Source:** Database

**Response:**

```
[  {    "id": 28457,    "price": "4.00000100",    "qty": "12.00000000",    "quoteQty": "48.000012",    "time": 1499865549590,    "isBuyerMaker": true,    "isBestMatch": true  }]
```

### Compressed/Aggregate trades list[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#compressedaggregate-trades-list "Direct link to Compressed/Aggregate trades list")

```
GET /api/v3/aggTrades
```

Get compressed, aggregate trades. Trades that fill at the time, from the same
taker order, with the same price will have the quantity aggregated.

**Weight:** 4

**Parameters:**

| Name      | Type   | Mandatory | Description                                              |
| --------- | ------ | --------- | -------------------------------------------------------- |
| symbol    | STRING | YES       |                                                          |
| fromId    | LONG   | NO        | ID to get aggregate trades from INCLUSIVE.               |
| startTime | LONG   | NO        | Timestamp in ms to get aggregate trades from INCLUSIVE.  |
| endTime   | LONG   | NO        | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| limit     | INT    | NO        | Default: 500; Maximum: 1000.                             |

- If fromId, startTime, and endTime are not sent, the most recent aggregate
  trades will be returned.

**Data Source:** Database

**Response:**

```
[  {    "a": 26129,         // Aggregate tradeId    "p": "0.01633102",  // Price    "q": "4.70443515",  // Quantity    "f": 27781,         // First tradeId    "l": 27781,         // Last tradeId    "T": 1498793709153, // Timestamp    "m": true,          // Was the buyer the maker?    "M": true           // Was the trade the best price match?  }]
```

### Kline/Candlestick data[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data "Direct link to Kline/Candlestick data")

```
GET /api/v3/klines
```

Kline/candlestick bars for a symbol. Klines are uniquely identified by their
open time.

**Weight:** 2

**Parameters:**

| Name      | Type   | Mandatory | Description                  |
| --------- | ------ | --------- | ---------------------------- |
| symbol    | STRING | YES       |                              |
| interval  | ENUM   | YES       |                              |
| startTime | LONG   | NO        |                              |
| endTime   | LONG   | NO        |                              |
| timeZone  | STRING | NO        | Default: 0 (UTC)             |
| limit     | INT    | NO        | Default: 500; Maximum: 1000. |

Supported kline intervals (case-sensitive):

| Interval | `interval` value                    |
| -------- | ----------------------------------- |
| seconds  | `1s`                                |
| minutes  | `1m`, `3m`, `5m`, `15m`, `30m`      |
| hours    | `1h`, `2h`, `4h`, `6h`, `8h`, `12h` |
| days     | `1d`, `3d`                          |
| weeks    | `1w`                                |
| months   | `1M`                                |

**Notes:**

- If `startTime` and `endTime` are not sent, the most recent klines are
  returned.
- Supported values for `timeZone`:
  - Hours and minutes (e.g. `-1:00`, `05:45`)
  - Only hours (e.g. `0`, `8`, `4`)
  - Accepted range is strictly \[-12:00 to +14:00\] inclusive
- If `timeZone` provided, kline intervals are interpreted in that timezone
  instead of UTC.
- Note that `startTime` and `endTime` are always interpreted in UTC, regardless
  of `timeZone`.

**Data Source:** Database

**Response:**

```
[  [    1499040000000,      // Kline open time    "0.01634790",       // Open price    "0.80000000",       // High price    "0.01575800",       // Low price    "0.01577100",       // Close price    "148976.11427815",  // Volume    1499644799999,      // Kline Close time    "2434.19055334",    // Quote asset volume    308,                // Number of trades    "1756.87402397",    // Taker buy base asset volume    "28.46694368",      // Taker buy quote asset volume    "0"                 // Unused field, ignore.  ]]
```

### UIKlines[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#uiklines "Direct link to UIKlines")

```
GET /api/v3/uiKlines
```

The request is similar to klines having the same parameters and response.

`uiKlines` return modified kline data, optimized for presentation of candlestick
charts.

**Weight:** 2

**Parameters:**

| Name      | Type   | Mandatory | Description                                                                                |
| --------- | ------ | --------- | ------------------------------------------------------------------------------------------ |
| symbol    | STRING | YES       |                                                                                            |
| interval  | ENUM   | YES       | See [`klines`](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#kline-intervals) |
| startTime | LONG   | NO        |                                                                                            |
| endTime   | LONG   | NO        |                                                                                            |
| timeZone  | STRING | NO        | Default: 0 (UTC)                                                                           |
| limit     | INT    | NO        | Default: 500; Maximum: 1000.                                                               |

- If `startTime` and `endTime` are not sent, the most recent klines are
  returned.
- Supported values for `timeZone`:
  - Hours and minutes (e.g. `-1:00`, `05:45`)
  - Only hours (e.g. `0`, `8`, `4`)
  - Accepted range is strictly \[-12:00 to +14:00\] inclusive
- If `timeZone` provided, kline intervals are interpreted in that timezone
  instead of UTC.
- Note that `startTime` and `endTime` are always interpreted in UTC, regardless
  of `timeZone`.

**Data Source:** Database

**Response:**

```
[  [    1499040000000,      // Kline open time    "0.01634790",       // Open price    "0.80000000",       // High price    "0.01575800",       // Low price    "0.01577100",       // Close price    "148976.11427815",  // Volume    1499644799999,      // Kline close time    "2434.19055334",    // Quote asset volume    308,                // Number of trades    "1756.87402397",    // Taker buy base asset volume    "28.46694368",      // Taker buy quote asset volume    "0"                 // Unused field. Ignore.  ]]
```

### Current average price[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#current-average-price "Direct link to Current average price")

```
GET /api/v3/avgPrice
```

Current average price for a symbol.

**Weight:** 2

**Parameters:**

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | YES       |             |

**Data Source:** Memory

**Response:**

```
{  "mins": 5,                    // Average price interval (in minutes)  "price": "9.35751834",        // Average price  "closeTime": 1694061154503    // Last trade time}
```

### 24hr ticker price change statistics[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#24hr-ticker-price-change-statistics "Direct link to 24hr ticker price change statistics")

```
GET /api/v3/ticker/24hr
```

24 hour rolling window price change statistics. **Careful** when accessing this
with no symbol.

**Weight:**

| Parameter                    | Symbols Provided | Weight |
| ---------------------------- | ---------------- | ------ |
| symbol                       | 1                | 2      |
| symbol parameter is omitted  | 80               |
| symbols                      | 1-20             | 2      |
| 21-100                       | 40               |
| 101 or more                  | 80               |
| symbols parameter is omitted | 80               |

**Parameters:**

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | NO        | Parameter symbol and symbols cannot be used in combination. |

If neither parameter is sent, tickers for all symbols will be returned in an
array.

Examples of accepted format for the symbols parameter: \["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D | | symbols | STRING | NO | | type | ENUM | NO
| Supported values: FULL or MINI.  
If none provided, the default is FULL |

**Data Source:** Memory

**Response - FULL:**

```
{  "symbol": "BNBBTC",  "priceChange": "-94.99999800",  "priceChangePercent": "-95.960",  "weightedAvgPrice": "0.29628482",  "prevClosePrice": "0.10002000",  "lastPrice": "4.00000200",  "lastQty": "200.00000000",  "bidPrice": "4.00000000",  "bidQty": "100.00000000",  "askPrice": "4.00000200",  "askQty": "100.00000000",  "openPrice": "99.00000000",  "highPrice": "100.00000000",  "lowPrice": "0.10000000",  "volume": "8913.30000000",  "quoteVolume": "15.30000000",  "openTime": 1499783499040,  "closeTime": 1499869899040,  "firstId": 28385,   // First tradeId  "lastId": 28460,    // Last tradeId  "count": 76         // Trade count}
```

OR

```
[  {    "symbol": "BNBBTC",    "priceChange": "-94.99999800",    "priceChangePercent": "-95.960",    "weightedAvgPrice": "0.29628482",    "prevClosePrice": "0.10002000",    "lastPrice": "4.00000200",    "lastQty": "200.00000000",    "bidPrice": "4.00000000",    "bidQty": "100.00000000",    "askPrice": "4.00000200",    "askQty": "100.00000000",    "openPrice": "99.00000000",    "highPrice": "100.00000000",    "lowPrice": "0.10000000",    "volume": "8913.30000000",    "quoteVolume": "15.30000000",    "openTime": 1499783499040,    "closeTime": 1499869899040,    "firstId": 28385,   // First tradeId    "lastId": 28460,    // Last tradeId    "count": 76         // Trade count  }]
```

**Response - MINI:**

```
{  "symbol":      "BNBBTC",          // Symbol Name  "openPrice":   "99.00000000",     // Opening price of the Interval  "highPrice":   "100.00000000",    // Highest price in the interval  "lowPrice":    "0.10000000",      // Lowest  price in the interval  "lastPrice":   "4.00000200",      // Closing price of the interval  "volume":      "8913.30000000",   // Total trade volume (in base asset)  "quoteVolume": "15.30000000",     // Total trade volume (in quote asset)  "openTime":    1499783499040,     // Start of the ticker interval  "closeTime":   1499869899040,     // End of the ticker interval  "firstId":     28385,             // First tradeId considered  "lastId":      28460,             // Last tradeId considered  "count":       76                 // Total trade count}
```

OR

```
[  {    "symbol": "BNBBTC",    "openPrice": "99.00000000",    "highPrice": "100.00000000",    "lowPrice": "0.10000000",    "lastPrice": "4.00000200",    "volume": "8913.30000000",    "quoteVolume": "15.30000000",    "openTime": 1499783499040,    "closeTime": 1499869899040,    "firstId": 28385,    "lastId": 28460,    "count": 76  },  {    "symbol": "LTCBTC",    "openPrice": "0.07000000",    "highPrice": "0.07000000",    "lowPrice": "0.07000000",    "lastPrice": "0.07000000",    "volume": "11.00000000",    "quoteVolume": "0.77000000",    "openTime": 1656908192899,    "closeTime": 1656994592899,    "firstId": 0,    "lastId": 10,    "count": 11  }]
```

### Trading Day Ticker[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#trading-day-ticker "Direct link to Trading Day Ticker")

```
GET /api/v3/ticker/tradingDay
```

Price change statistics for a trading day.

**Weight:**

4 for each requested symbol.

The weight for this request will cap at 200 once the number of `symbols` in the
request is more than 50.

**Parameters:**

| Name   | Type   | Mandatory | Description                               |
| ------ | ------ | --------- | ----------------------------------------- |
| symbol | STRING | YES       | Either symbol or symbols must be provided |

Examples of accepted format for the symbols parameter:  
\["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D

The maximum number of symbols allowed in a request is 100. | | symbols | |
timeZone | STRING | NO | Default: 0 (UTC) | | type | ENUM | NO | Supported
values: FULL or MINI.  
If none provided, the default is FULL |

**Notes:**

- Supported values for `timeZone`:
  - Hours and minutes (e.g. `-1:00`, `05:45`)
  - Only hours (e.g. `0`, `8`, `4`)

**Data Source:** Database

**Response - FULL:**

With `symbol`:

```
{  "symbol":             "BTCUSDT",  "priceChange":        "-83.13000000",         // Absolute price change  "priceChangePercent": "-0.317",               // Relative price change in percent  "weightedAvgPrice":   "26234.58803036",       // quoteVolume / volume  "openPrice":          "26304.80000000",  "highPrice":          "26397.46000000",  "lowPrice":           "26088.34000000",  "lastPrice":          "26221.67000000",  "volume":             "18495.35066000",       // Volume in base asset  "quoteVolume":        "485217905.04210480",   // Volume in quote asset  "openTime":           1695686400000,  "closeTime":          1695772799999,  "firstId":            3220151555,             // Trade ID of the first trade in the interval  "lastId":             3220849281,             // Trade ID of the last trade in the interval  "count":              697727                  // Number of trades in the interval}
```

With `symbols`:

```
[  {    "symbol": "BTCUSDT",    "priceChange": "-83.13000000",    "priceChangePercent": "-0.317",    "weightedAvgPrice": "26234.58803036",    "openPrice": "26304.80000000",    "highPrice": "26397.46000000",    "lowPrice": "26088.34000000",    "lastPrice": "26221.67000000",    "volume": "18495.35066000",    "quoteVolume": "485217905.04210480",    "openTime": 1695686400000,    "closeTime": 1695772799999,    "firstId": 3220151555,    "lastId": 3220849281,    "count": 697727  },  {    "symbol": "BNBUSDT",    "priceChange": "2.60000000",    "priceChangePercent": "1.238",    "weightedAvgPrice": "211.92276958",    "openPrice": "210.00000000",    "highPrice": "213.70000000",    "lowPrice": "209.70000000",    "lastPrice": "212.60000000",    "volume": "280709.58900000",    "quoteVolume": "59488753.54750000",    "openTime": 1695686400000,    "closeTime": 1695772799999,    "firstId": 672397461,    "lastId": 672496158,    "count": 98698  }]
```

**Response - MINI:**

With `symbol`:

```
{  "symbol":         "BTCUSDT",  "openPrice":      "26304.80000000",  "highPrice":      "26397.46000000",  "lowPrice":       "26088.34000000",  "lastPrice":      "26221.67000000",  "volume":         "18495.35066000",       // Volume in base asset  "quoteVolume":    "485217905.04210480",   // Volume in quote asset  "openTime":       1695686400000,  "closeTime":      1695772799999,  "firstId":        3220151555,             // Trade ID of the first trade in the interval  "lastId":         3220849281,             // Trade ID of the last trade in the interval  "count":          697727                  // Number of trades in the interval}
```

With `symbols`:

```
[  {    "symbol": "BTCUSDT",    "openPrice": "26304.80000000",    "highPrice": "26397.46000000",    "lowPrice": "26088.34000000",    "lastPrice": "26221.67000000",    "volume": "18495.35066000",    "quoteVolume": "485217905.04210480",    "openTime": 1695686400000,    "closeTime": 1695772799999,    "firstId": 3220151555,    "lastId": 3220849281,    "count": 697727  },  {    "symbol": "BNBUSDT",    "openPrice": "210.00000000",    "highPrice": "213.70000000",    "lowPrice": "209.70000000",    "lastPrice": "212.60000000",    "volume": "280709.58900000",    "quoteVolume": "59488753.54750000",    "openTime": 1695686400000,    "closeTime": 1695772799999,    "firstId": 672397461,    "lastId": 672496158,    "count": 98698  }]
```

### Symbol price ticker[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#symbol-price-ticker "Direct link to Symbol price ticker")

```
GET /api/v3/ticker/price
```

Latest price for a symbol or symbols.

**Weight:**

| Parameter                   | Symbols Provided | Weight |
| --------------------------- | ---------------- | ------ |
| symbol                      | 1                | 2      |
| symbol parameter is omitted | 4                |
| symbols                     | Any              | 4      |

**Parameters:**

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | NO        | Parameter symbol and symbols cannot be used in combination. |

If neither parameter is sent, prices for all symbols will be returned in an
array.

Examples of accepted format for the symbols parameter: \["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D | | symbols | STRING | NO |

**Data Source:** Memory

**Response:**

```
{  "symbol": "LTCBTC",  "price": "4.00000200"}
```

OR

```
[  {    "symbol": "LTCBTC",    "price": "4.00000200"  },  {    "symbol": "ETHBTC",    "price": "0.07946600"  }]
```

### Symbol order book ticker[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#symbol-order-book-ticker "Direct link to Symbol order book ticker")

```
GET /api/v3/ticker/bookTicker
```

Best price/qty on the order book for a symbol or symbols.

**Weight:**

| Parameter                   | Symbols Provided | Weight |
| --------------------------- | ---------------- | ------ |
| symbol                      | 1                | 2      |
| symbol parameter is omitted | 4                |
| symbols                     | Any              | 4      |

**Parameters:**

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | NO        | Parameter symbol and symbols cannot be used in combination. |

If neither parameter is sent, bookTickers for all symbols will be returned in an
array.

Examples of accepted format for the symbols parameter: \["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D | | symbols | STRING | NO |

**Data Source:** Memory

**Response:**

```
{  "symbol": "LTCBTC",  "bidPrice": "4.00000000",  "bidQty": "431.00000000",  "askPrice": "4.00000200",  "askQty": "9.00000000"}
```

OR

```
[  {    "symbol": "LTCBTC",    "bidPrice": "4.00000000",    "bidQty": "431.00000000",    "askPrice": "4.00000200",    "askQty": "9.00000000"  },  {    "symbol": "ETHBTC",    "bidPrice": "0.07946700",    "bidQty": "9.00000000",    "askPrice": "100000.00000000",    "askQty": "1000.00000000"  }]
```

### Rolling window price change statistics[​](/docs/binance-spot-api-docs/rest-api/market-data-endpoints#rolling-window-price-change-statistics "Direct link to Rolling window price change statistics")

```
GET /api/v3/ticker
```

**Note:** This endpoint is different from the `GET /api/v3/ticker/24hr`
endpoint.

The window used to compute statistics will be no more than 59999ms from the
requested `windowSize`.

`openTime` for `/api/v3/ticker` always starts on a minute, while the `closeTime`
is the current time of the request. As such, the effective window will be up to
59999ms wider than `windowSize`.

E.g. If the `closeTime` is 1641287867099 (January 04, 2022 09:17:47:099 UTC) ,
and the `windowSize` is `1d`. the `openTime` will be: 1641201420000 (January 3,
2022, 09:17:00)

**Weight:**

4 for each requested symbol regardless of windowSize.

The weight for this request will cap at 200 once the number of `symbols` in the
request is more than 50.

**Parameters:**

| Name   | Type   | Mandatory | Description                               |
| ------ | ------ | --------- | ----------------------------------------- |
| symbol | STRING | YES       | Either symbol or symbols must be provided |

Examples of accepted format for the symbols parameter:  
\["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D

The maximum number of symbols allowed in a request is 100. | | symbols | |
windowSize | ENUM | NO | Defaults to 1d if no parameter provided  
Supported windowSize values:  
1m,2m....59m for minutes  
1h, 2h....23h - for hours  
1d...7d - for days

Units cannot be combined (e.g. 1d2h is not allowed) | | type | ENUM | NO |
Supported values: FULL or MINI.  
If none provided, the default is FULL |

**Data Source:** Database

**Response - FULL:**

When using `symbol`:

```
{  "symbol":             "BNBBTC",  "priceChange":        "-8.00000000",  // Absolute price change  "priceChangePercent": "-88.889",      // Relative price change in percent  "weightedAvgPrice":   "2.60427807",   // QuoteVolume / Volume  "openPrice":          "9.00000000",  "highPrice":          "9.00000000",  "lowPrice":           "1.00000000",  "lastPrice":          "1.00000000",  "volume":             "187.00000000",  "quoteVolume":        "487.00000000", // Sum of (price * volume) for all trades  "openTime":           1641859200000,  // Open time for ticker window  "closeTime":          1642031999999,  // Close time for ticker window  "firstId":            0,              // Trade IDs  "lastId":             60,  "count":              61              // Number of trades in the interval}
```

or

When using `symbols`:

```
[  {    "symbol": "BTCUSDT",    "priceChange": "-154.13000000",        // Absolute price change    "priceChangePercent": "-0.740",        // Relative price change in percent    "weightedAvgPrice": "20677.46305250",  // QuoteVolume / Volume    "openPrice": "20825.27000000",    "highPrice": "20972.46000000",    "lowPrice": "20327.92000000",    "lastPrice": "20671.14000000",    "volume": "72.65112300",    "quoteVolume": "1502240.91155513",     // Sum of (price * volume) for all trades    "openTime": 1655432400000,             // Open time for ticker window    "closeTime": 1655446835460,            // Close time for ticker window    "firstId": 11147809,                   // Trade IDs    "lastId": 11149775,    "count": 1967                          // Number of trades in the interval  },  {    "symbol": "BNBBTC",    "priceChange": "0.00008530",    "priceChangePercent": "0.823",    "weightedAvgPrice": "0.01043129",    "openPrice": "0.01036170",    "highPrice": "0.01049850",    "lowPrice": "0.01033870",    "lastPrice": "0.01044700",    "volume": "166.67000000",    "quoteVolume": "1.73858301",    "openTime": 1655432400000,    "closeTime": 1655446835460,    "firstId": 2351674,    "lastId": 2352034,    "count": 361  }]
```

**Response - MINI:**

When using `symbol`:

```
{    "symbol": "LTCBTC",    "openPrice": "0.10000000",    "highPrice": "2.00000000",    "lowPrice": "0.10000000",    "lastPrice": "2.00000000",    "volume": "39.00000000",    "quoteVolume": "13.40000000",  // Sum of (price * volume) for all trades    "openTime": 1656986580000,     // Open time for ticker window    "closeTime": 1657001016795,    // Close time for ticker window    "firstId": 0,                  // Trade IDs    "lastId": 34,    "count": 35                    // Number of trades in the interval}
```

OR

When using `symbols`:

```
[    {        "symbol": "BNBBTC",        "openPrice": "0.10000000",        "highPrice": "2.00000000",        "lowPrice": "0.10000000",        "lastPrice": "2.00000000",        "volume": "39.00000000",        "quoteVolume": "13.40000000", // Sum of (price * volume) for all trades        "openTime": 1656986880000,    // Open time for ticker window        "closeTime": 1657001297799,   // Close time for ticker window        "firstId": 0,                 // Trade IDs        "lastId": 34,        "count": 35                   // Number of trades in the interval    },    {        "symbol": "LTCBTC",        "openPrice": "0.07000000",        "highPrice": "0.07000000",        "lowPrice": "0.07000000",        "lastPrice": "0.07000000",        "volume": "33.00000000",        "quoteVolume": "2.31000000",        "openTime": 1656986880000,        "closeTime": 1657001297799,        "firstId": 0,        "lastId": 32,        "count": 33    }]
```
