# Kraken API Documentation

## Trading

*   [](/api/)
*   Spot Rest API
*   [Trading](/api/docs/category/rest-api/trading)
*   Add Order

Add Order
=========

POST 

https://api.kraken.com/0/private/AddOrder
-----------------------------------------

Place a new order.

**Note**: See the [AssetPairs](/api/docs/rest-api/get-tradable-asset-pairs) endpoint for details on the available trading pairs, their price and quantity precisions, order minimums, available leverage, etc.

**API Key Permissions Required:** `Orders and trades - Create & modify orders`

Request[​](#request "Direct link to Request")
---------------------------------------------

Responses[​](#responses "Direct link to Responses")
---------------------------------------------------

*   200

Order added.

*   Schema
*   Example (from schema)
*   Limit with conditional stop-loss

```
{  "error": [],  "result": {    "descr": {      "order": "buy 1.45 XBTUSD @ limit 27500.0"    },    "txid": [      "OU22CG-KLAF2-FWUDD7"    ]  }}
```

```
{  "error": [],  "result": {    "descr": {      "order": "buy 2.12340000 XBTUSD @ limit 25000.1 with 2:1 leverage",      "close": "close position @ stop loss 22000.0 -> limit 21000.0"    },    "txid": [      "OUF4EM-FRGI2-MQMWZD"    ]  }}
```

[

Previous

Trading

](/api/docs/category/rest-api/trading)[

Next

Add Order Batch

](/api/docs/rest-api/add-order-batch)

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| nonce | int64 | required | Nonce used in construction of API-Sign header |
| userref | int32 |  | This is an optional non-unique, numeric identifier which can associated with a number of orders by the client. This field is mutually exclusive with cl_ord_id parameter. |
| cl_ord_id | string |  | Adds an alphanumeric client order identifier which uniquely identifies an open order for each client. This field is mutually exclusive with userref parameter. The cl_ord_id parameter can be one of the following formats: |
| ordertype | ordertype (string) | required | Possible values: [market, limit, iceberg, stop-loss, take-profit, stop-loss-limit, take-profit-limit, trailing-stop, trailing-stop-limit, settle-position] The execution model of the order. |
| type | string | required | Possible values: [buy, sell] Order direction (buy/sell) |
| volume | string | required | Order quantity in terms of the base asset |
| displayvol | string |  | For iceberg orders only, it defines the quantity to show in the book while the rest of order quantity remains hidden. Minimum value is 1 / 15 of volume. |
| pair | string | required | Asset pair id or altname |
| price | string |  | Price: Notes: |
| price2 | string |  | Secondary Price: Note: |
| trigger | string |  | Possible values: [index, last] Default value: last Price signal used to trigger stop-loss, stop-loss-limit, take-profit, take-profit-limit, trailing-stop and trailing-stop-limit orders Notes: |
| leverage | string |  | Amount of leverage desired (default: none) |
| reduce_only | boolean |  | If true, order will only reduce a currently open position, not increase it or open a new position. |
| stptype | string |  | Possible values: [cancel-newest, cancel-oldest, cancel-both] Default value: cancel-newest Self Trade Prevention (STP) is a protection feature to prevent users from inadvertently or deliberately trading against themselves. To prevent a self-match, one of the following STP modes can be used to define which order(s) will be expired: |
| oflags | oflags (string) |  | Comma delimited list of order flags |
| timeinforce | string |  | Possible values: [GTC, IOC, GTD] Default value: GTC Time-in-force of the order to specify how long it should remain in the order book before being cancelled. GTC (Good-'til-cancelled) is default if the parameter is omitted. IOC (immediate-or-cancel) will immediately execute the amount possible and cancel any remaining balance rather than resting in the book. GTD (good-'til-date), if specified, must coincide with a desired expiretm. |
| starttm | string |  | Scheduled start time, can be specified as an absolute timestamp or as a number of seconds in the future: |
| expiretm | string |  | Expiry time on GTD orders can be set up to one month in future, it is specified as an absolute timestamp or as a number of seconds from now: |
| close[ordertype] | string |  | Possible values: [limit, iceberg, stop-loss, take-profit, stop-loss-limit, take-profit-limit, trailing-stop, trailing-stop-limit] Conditional close order type |
| close[price] | string |  | Conditional close order price |
| close[price2] | string |  | Conditional close order price2 |
| deadline | string |  | RFC3339 timestamp (e.g. 2021-04-01T00:18:45Z) after which the matching engine should reject the new order request, in presence of latency or order queueing: min now() + 2 seconds, max now() + 60 seconds. |
| validate | boolean |  | If set to true the order will be validated only, it will not trade in the matching engine. |
| result | object |  | Order description info Order description Conditional close order description, if applicable Transaction IDs for order (if order was added successfully) |
| descr | object |  | Order description info Order description Conditional close order description, if applicable |
| order | string |  | Order description |
| close | string |  | Conditional close order description, if applicable |
| txid | string[] |  | Transaction IDs for order (if order was added successfully) |
| error | array[] |  |  |



*   [](/api/)
*   Spot Rest API
*   [Trading](/api/docs/category/rest-api/trading)
*   Add Order Batch

Add Order Batch
===============

POST 

https://api.kraken.com/0/private/AddOrderBatch
----------------------------------------------

Sends a collection of orders (minimum of 2 and maximum 15):

*   Validation is performed on the whole batch prior to submission to the engine. If an order fails validation, the whole batch will be rejected.
*   On submission to the engine, if an order fails pre-match checks (i.e. funding), then the individual order will be rejected and remainder of the batch will be processed.
*   All orders in batch are limited to a single pair.

**Note**: See the [AssetPairs](/api/docs/rest-api/get-tradable-asset-pairs) endpoint for details on the available trading pairs, their price and quantity precisions, order minimums, available leverage, etc.

**API Key Permissions Required:** `Orders and trades - Create & modify orders` and `Orders and trades - Cancel & close orders`

Request[​](#request "Direct link to Request")
---------------------------------------------

Responses[​](#responses "Direct link to Responses")
---------------------------------------------------

*   200

The order of returned `orders` in the response array is the same as the order of the order list sent in request.

*   Schema
*   Example (from schema)
*   Limits, one with conditional stop-loss

```
{  "error": [],  "result": {    "orders": [      {        "txid": "65LRD3-AHGRA-YAH8E5",        "descr": {          "order": "buy 1.02010000 XBTUSD @ limit 29000.0"        }      },      {        "txid": "OK8HFF-5J2PL-XLR17S",        "descr": {          "order": "sell 0.14000000 XBTUSD @ limit 40000.0"        }      }    ]  }}
```

```
{  "error": [],  "result": {    "orders": [      {        "txid": "O5OR23-ADFAD-Y2G61C",        "descr": {          "order": "buy 0.80300000 XBTUSD @ limit 28300.0"        },        "close": "close position @ stop loss 27000.0 -> limit 26000.0"      },      {        "txid": "9K6KFS-5H3PL-XBRC7A",        "descr": {          "order": "sell 0.10500000 XBTUSD @ limit 36000.0"        }      }    ]  }}
```

[

Previous

Add Order

](/api/docs/rest-api/add-order)[

Next

Amend Order

](/api/docs/rest-api/amend-order)

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| nonce | int64 | required | Nonce used in construction of API-Sign header |
| orders | object[] | required | Possible values: [market, limit, iceberg, stop-loss, take-profit, stop-loss-limit, take-profit-limit, trailing-stop, trailing-stop-limit, settle-position] Possible values: [buy, sell] Possible values: [index, last] Default value: last Possible values: [cancel-newest, cancel-oldest, cancel-both] Default value: cancel-newest Possible values: [GTC, IOC, GTD] Default value: GTC User reference id userref is an optional user-specified integer id that can be associated with any number of orders. Many clients choose a userref corresponding to a unique integer id generated by their systems (e.g. a timestamp). However, because we don't enforce uniqueness on our side, it can also be used to easily group orders by pair, side, strategy, etc. This allows clients to more readily cancel or query information about orders in a particular group, with fewer API calls by using userref instead of our txid, where supported. Adds an alphanumeric client order identifier which uniquely identifies an open order for each client. This field is mutually exclusive with userref parameter. The cl_ord_id parameter can be one of the following formats: Order type Order direction (buy/sell) Order quantity in terms of the base asset For iceberg orders only, it defines the quantity to show in the book while the rest of order quantity remains hidden. Minimum value is 1 / 15 of volume. Price: Notes: Secondary Price: Price signal used to trigger stop-loss, stop-loss-limit, take-profit, and take-profit-limit orders Notes: Amount of leverage desired (default: none) If true, order will only reduce a currently open position, not increase it or open a new position. Self trade prevention behaviour definition: Comma delimited list of order flags Time-in-force of the order to specify how long it should remain in the order book before being cancelled. GTC (Good-'til-cancelled) is default if the parameter is omitted. IOC (immediate-or-cancel) will immediately execute the amount possible and cancel any remaining balance rather than resting in the book. GTD (good-'til-date), if specified, must coincide with a desired expiretm. Scheduled start time, can be specified as an absolute timestamp or as a number of seconds in the future: Expiry time on GTD orders can be set up to one month in future, it is specified as an absolute timestamp or as a number of seconds from now: |
| userref | int32 |  | User reference id userref is an optional user-specified integer id that can be associated with any number of orders. Many clients choose a userref corresponding to a unique integer id generated by their systems (e.g. a timestamp). However, because we don't enforce uniqueness on our side, it can also be used to easily group orders by pair, side, strategy, etc. This allows clients to more readily cancel or query information about orders in a particular group, with fewer API calls by using userref instead of our txid, where supported. |
| cl_ord_id | string |  | Adds an alphanumeric client order identifier which uniquely identifies an open order for each client. This field is mutually exclusive with userref parameter. The cl_ord_id parameter can be one of the following formats: |
| ordertype | string | required | Possible values: [market, limit, iceberg, stop-loss, take-profit, stop-loss-limit, take-profit-limit, trailing-stop, trailing-stop-limit, settle-position] Order type |
| type | string | required | Possible values: [buy, sell] Order direction (buy/sell) |
| volume | string | required | Order quantity in terms of the base asset |
| displayvol | string |  | For iceberg orders only, it defines the quantity to show in the book while the rest of order quantity remains hidden. Minimum value is 1 / 15 of volume. |
| price | string |  | Price: Notes: |
| price2 | string |  | Secondary Price: |
| trigger | string |  | Possible values: [index, last] Default value: last Price signal used to trigger stop-loss, stop-loss-limit, take-profit, and take-profit-limit orders Notes: |
| leverage | string |  | Amount of leverage desired (default: none) |
| reduce_only | boolean |  | If true, order will only reduce a currently open position, not increase it or open a new position. |
| stptype | string |  | Possible values: [cancel-newest, cancel-oldest, cancel-both] Default value: cancel-newest Self trade prevention behaviour definition: |
| oflags | oflags (string) |  | Comma delimited list of order flags |
| timeinforce | string |  | Possible values: [GTC, IOC, GTD] Default value: GTC Time-in-force of the order to specify how long it should remain in the order book before being cancelled. GTC (Good-'til-cancelled) is default if the parameter is omitted. IOC (immediate-or-cancel) will immediately execute the amount possible and cancel any remaining balance rather than resting in the book. GTD (good-'til-date), if specified, must coincide with a desired expiretm. |
| starttm | string |  | Scheduled start time, can be specified as an absolute timestamp or as a number of seconds in the future: |
| expiretm | string |  | Expiry time on GTD orders can be set up to one month in future, it is specified as an absolute timestamp or as a number of seconds from now: |
| pair | string | required | Asset pair id or altname |
| deadline | string |  | RFC3339 timestamp (e.g. 2021-04-01T00:18:45Z) after which the matching engine should reject the new order request, in presence of latency or order queueing. min now() + 2 seconds, max now() + 60 seconds. |
| validate | boolean |  | Validate inputs only. Do not submit order. |
| result | object |  | Order description info Error description from individual order processing Transaction ID for order (if order was added successfully) |
| orders | object[] |  | Order description info Error description from individual order processing Transaction ID for order (if order was added successfully) |
| descr | object |  | Order description info |
| order | string |  |  |
| error | string |  | Error description from individual order processing |
| txid | string |  | Transaction ID for order (if order was added successfully) |
| error | array[] |  |  |




