# List orders

GET

https://api.exchange.coinbase.com/orders

List your current open orders. Only open or un-settled orders are returned by default. As soon as an order is no longer open and settled, it will no longer appear in the default request. Open orders may change state between the request and the response depending on market conditions.

## Pending Orders

Orders with a "pending" status have fewer fields in the response.

*   Pending limit orders do not have `stp`, `time_in_force`, `expire_time`, and `post_only`.
*   Pending market orders have the same fields as a pending limit order minus `price` and `size`, and no market specific fields (`funds`, `specified_funds`).
*   Pending stop orders have the same fields as a pending limit order and no stop specific fields (`stop`, `stop_price`).

| Order Type | Does Not Have These Fields |
| --- | --- |
| Pending Limit Order | `stp`, `time_in_force`, `expire_time`, `post_only` |
| Pending Market Order | `stp`, `time_in_force`, `expire_time`, `post_only`, `price`, `size`, `funds`, `specified_funds` |
| Pending Stop Order | `stp`, `time_in_force`, `expire_time`, `post_only`, `stop`, `stop_price` |

  

## API Key Permissions

This endpoint requires either the "view" or "trade" permission.



Tip

To specify multiple statuses, use the status query argument multiple times: `/orders?status=done&status=pending`.

## Order Status and Settlement

Orders which are no longer resting on the order book, are marked with the `done` status. There is a small window between an order being `done` and `settled`. An order is settled when all of the fills have settled and the remaining holds (if any) have been removed.

## Polling

For high-volume trading it is strongly recommended that you maintain your own list of open orders and use one of the streaming market data feeds to keep it updated. You should poll the open orders endpoint once when you start trading to obtain the current state of any open orders.

`executed_value` is the cumulative match `size` \* `price` and is only present for orders placed after 2016-05-20.



Info

Open orders can change state between the request and the response depending on market conditions.

## Pagination

This request is paginated. See [Pagination](/exchange/docs/rest-pagination) for more information.


## Authentication

| Parameter | Type | Required |
| --------- | ---- | -------- |
| cb-access-key | string | required |
| cb-access-passphrase | string | required |
| cb-access-sign | string | required |
| cb-access-timestamp | string | required |





## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| profile_id | string | No | Filter results by a specific profile_id |
| product_id | string | No | Filter results by a specific product_id |
| sortedBy | string | No | Sort criteria for results. |
| sorting | string | No | Ascending or descending order, by `sortedBy` |
| start_date | date-time | No | Filter results by minimum posted date |
| end_date | date-time | No | Filter results by maximum posted date |
| before | string | No | Used for pagination. Sets start cursor to `before` date. |
| after | string | No | Used for pagination. Sets end cursor to `after` date. |
| limit | int64 | Yes | Limit on number of results to return. |
| status | string[] | Yes | Array with order statuses to filter by. |
| market_type | string | No | Market type which the order was traded in. |




## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | string | uuid |
| price | string | price per unit of base currency |
| size | string | amount of base currency to buy/sell |
| product_id | string | book the order was placed on |
| profile_id | string | profile_id that placed the order |
| side | string | Possible values: [buy, sell] |
| funds | string | amount of quote currency to spend (for market orders) |
| specified_funds | string | funds with fees |
| type | string | Possible values: [limit, market, stop] |
| time_in_force | string | Possible values: [GTC, GTT, IOC, FOK] |
| expire_time | date-time | timestamp at which order expires |
| post_only | boolean | if true, forces order to be `maker` only |
| created_at | date-time | timestamp at which order was placed |
| done_at | date-time | timestamp at which order was done |
| done_reason | string | reason order was done (filled, rejected, or otherwise) |
| reject_reason | string | reason order was rejected by engine |
| fill_fees | string | fees paid on current filled amount |
| filled_size | string | amount (in base currency) of the order that has been filled |
| executed_value | string |  |
| status | string | Possible values: [open, pending, rejected, done, active, received, all] |
| settled | boolean | true if funds have been exchanged and settled |
| stop | string | Possible values: [loss, entry] |
| stop_price | string | price (in quote currency) at which to execute the order |
| funding_amount | string |  |
| client_oid | string | client order id |
| market_type | string | market type where order was traded |
| max_floor | string | maximum visible quantity for iceberg order |
| secondary_order_id | string | order id for the visible order for iceberg order |
| stop_limit_price | string | stop limit price for TPSL order |

### Response: 401 Unauthorized.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |