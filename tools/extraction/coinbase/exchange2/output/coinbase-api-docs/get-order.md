# Get single order

GET

https://api.exchange.coinbase.com/orders/{order\_id}

Get a single order by `id`.

## API Key Permissions

This endpoint requires either the "view" or "trade" permission.

Orders can be queried using either the exchange assigned `id` or the client assigned `client_oid`. When using `client_oid` it must be preceded by the `client:` namespace.

If the order is canceled, and if the order had no matches, the response might return the status code `404`.



Info

Open orders can change state between the request and the response depending on market conditions.


## Authentication

| Parameter | Type | Required |
| --------- | ---- | -------- |
| cb-access-key | string | required |
| cb-access-passphrase | string | required |
| cb-access-sign | string | required |
| cb-access-timestamp | string | required |



## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| order_id | string | Yes | `order_id` is either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace. |



## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
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