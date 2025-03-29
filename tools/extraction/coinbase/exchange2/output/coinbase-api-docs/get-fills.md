
# List fills

GET

https://api.exchange.coinbase.com/fills

Get a list of fills. A fill is a partial or complete match on a specific order.

Get a list of recent fills of the API key's profile.

## API Key Permissions

This endpoint requires either the "view" or "trade" permission.

## Settlement and Fees

Fees are recorded in two stages. Immediately after the matching engine completes a match, the fill is inserted into our datastore. Once the fill is recorded, a settlement process settles the fill and credit both trading counterparties.

The `fee` field indicates the fees charged for this individual fill.

### Liquidity

The `liquidity` field indicates if the fill was the result of a liquidity provider or liquidity taker. `M` indicates Maker and `T` indicates Taker.

### Pagination

Fills are returned sorted by descending `trade_id` from the largest `trade_id` to the smallest `trade_id`. The `CB-BEFORE` header has this first trade ID so that future requests using the `cb-before` parameter fetch fills with a greater trade ID (newer fills).

See [Pagination](/exchange/docs/rest-pagination) for more information.

### Query Params

order\_id

string

limit to fills on a specific order. Either `order_id` or `product_id` is required.

product\_id

string

limit to fills on a specific product. Either `order_id` or `product_id` is required.

limit

int64

Limit on number of results to return.

before

string

Used for pagination. Sets start cursor to `before` id.

after

string

Used for pagination. Sets end cursor to `after` id.

market\_type

string

Market type which the order was filled in.

spot

​

start\_date

string

Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time.

end\_date

string

Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time.


## Authentication

| Parameter | Type | Required |
| --------- | ---- | -------- |
| cb-access-key | string | required |
| cb-access-passphrase | string | required |
| cb-access-sign | string | required |
| cb-access-timestamp | string | required |




## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| trade_id | int32 | id of trade that created the fill |
| product_id | string | book the order was placed on |
| order_id | string | uuid |
| user_id | string | id of user's account |
| profile_id | string | profile_id that placed the order |
| liquidity | string | Possible values: [M, T, O] |
| price | string | price per unit of base currency |
| size | string | amount of base currency to buy/sell |
| fee | string | fees paid on current filled amount |
| created_at | date-time | timestamp of fill |
| side | string | Possible values: [buy, sell] |
| settled | boolean | true if funds have been exchanged and settled |
| usd_volume | string | true if funds have been exchanged and settled |
| market_type | string | market type which the order was filled in |
| funding_currency | string | funding currency which the order was filled in |

### Response: 401Unauthorized.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |

### Response: 500An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |


