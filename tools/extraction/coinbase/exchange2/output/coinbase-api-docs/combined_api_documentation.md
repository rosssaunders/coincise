# Coinbase Exchange API Documentation

Generated on Sat Mar 29 10:50:47 GMT 2025

## Table of Contents

* [# Cancel an order](#--cancel-an-order)
* [# Cancel all orders](#--cancel-all-orders)
* [# List fills](#--list-fills)
* [# Get single order](#--get-single-order)
* [# List orders](#--list-orders)
* [# Quickstart: Making Your First REST API Call](#--quickstart--making-your-first-rest-api-call)
* [# Create a new order](#--create-a-new-order)

---

# # Cancel an order


DELETE

https://api.exchange.coinbase.com/orders/{order\_id}

Cancel a single open order by `{id}`.



Cancel a previously placed order

The order must belong to the profile that the API key belongs to. If the order had no matches during its lifetime, its record may be purged. This means the order details is not available with `GET /orders/<id>`.



Caution

To prevent a race condition when canceling an order, it is highly recommended that you specify the product id as a query string.

## API Key Permissions

This endpoint requires the "trade" permission.

Orders can be canceled using either the exchange assigned `id` or the client assigned `client_oid`. When using `client_oid` it must be preceded by the `client:` namespace.

## Response

A successfully cancelled order response includes:

*   the order ID if the order is cancelled with the exchange assigned `id`,
*   the client assigned `client_oid` if the order is cancelled with client order ID.

## Cancel Reject

If the order could not be canceled (already filled or previously canceled, etc.), then an error response indicates the reason in the `message` field.

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
| order_id | string | Yes | Orders may be canceled using either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the `client:` namespace. |

## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| profile_id | string | No | Cancels orders on a specific profile |
| product_id | string | No | Optional product id of order |

## API Response Details

### Response: 200 the id of the order that was cancelled`

| Property | Type | Description |
| -------- | ---- | ----------- |

### Response: 401 Unauthorized.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Cancel all orders


DELETE

https://api.exchange.coinbase.com/orders

With best effort, cancel all open orders. This may require you to make the request multiple times until all of the open orders are deleted.

## API Key Permissions

This endpoint requires the "trade" permission.

## Examples

| Example | Response |
| --- | --- |
| `/orders?product_id=FOO-BAR` | (404) ProductNotFound |
| `/orders?product_id=BtC-uSd` | (200) Cancel all orders for BTC-USD |
| `/orders?Product_id=BTC-USD` | (400) Return BadRequest Error |
| `/orders` | (200) Cancel all orders for all products |

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
| profile_id | string | No | Cancels orders on a specific profile |
| product_id | string | No | Cancels orders on a specific product only |

## API Response Details

### Response: 200 A list of the ids of open orders that were successfully cancelled

| Property | Type | Description |
| -------- | ---- | ----------- |

### Response: 401 Unauthorized.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # List fills


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
| order_id | string | No | limit to fills on a specific order. Either `order_id` or `product_id` is required. |
| product_id | string | No | limit to fills on a specific product. Either `order_id` or `product_id` is required. |
| limit | int64 | No | Limit on number of results to return. |
| before | string | No | Used for pagination. Sets start cursor to `before` id. |
| after | string | No | Used for pagination. Sets end cursor to `after` id. |
| market_type | string | No | Market type which the order was filled in. |
| start_date | string | No | Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| end_date | string | No | Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |

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

### Response: 401 Unauthorized.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Get single order


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
---

# # List orders


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
---

# # Quickstart: Making Your First REST API Call


This quickstart walks through creating an API key, setting up the Exchange Go SDK, and making your first few REST API calls.

## Initial Setup

1.  **Create a Coinbase Exchange Account:** Sign up at [Coinbase Exchange](https://exchange.coinbase.com/).
2.  **Generate an API Key:** From the web UI, navigate to [API](https://exchange.coinbase.com/apikeys).
3.  **Authenticate:** Ensure you authenticate all API requests. Detailed guidance is available at [API Authentication](/exchange/docs/rest-auth).



REST API URL

`https://api.exchange.coinbase.com`

## Using the Exchange Go SDK

### Setting up the SDK

First, initialize a new Go module, install the Exchange Go SDK, and tidy dependencies. Run the following commands in your project directory, replacing example.com/test with your desired project path:

```
go mod init example.com/testgo get github.com/coinbase-samples/exchange-sdk-gogo mod tidygo build
```

Next, initialize the `Credentials` struct and create a new client. The Credentials struct is JSON enabled. Ensure that Exchange API credentials are stored in a secure manner.

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")if err != nil {    panic(fmt.Sprintf("unable to read exchange credentials: %v", err))}httpClient, err := core.DefaultHttpClient()if err != nil {    panic(fmt.Sprintf("unable to load default http client: %v", err))}client := client.NewRestClient(credentials, httpClient)
```

There are convenience functions to read the credentials as an environment variable (credentials.ReadEnvCredentials) and to deserialize the JSON structure (credentials.UnmarshalCredentials) if pulled from a different source.

To set up your credentials, add the `EXCHANGE_CREDENTIALS` environment variable to your `~/.zshrc` file:

```
export EXCHANGE_CREDENTIALS='{    "apiKey":"YOUR_API_KEY",    "passphrase":"YOUR_PASSPHRASE",    "signingKey":"YOUR_SIGNING_KEY"}'
```

After adding this line, run source ~/.zshrc to load the environment variable into your current shell session.

## Making your first API call

After initializing the client, you need to set up the appropriate service to access specific API endpoints. Specific examples are provided below.

### Listing Accounts

Account IDs are needed in order to track asset-level events, e.g. transfers and ledger. To list all accounts, initialize the accounts service, pass in the request object, check for an error, and, if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    accountsSvc := accounts.NewAccountsService(client)    request := &accounts.ListAccountsRequest{}    response, err := accountsSvc.ListAccounts(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to list accounts: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

### Get Account Transfers

You can use account IDs to track historical transfers. To get a specific account's transfer history, initialize the accounts service if you haven't already, pass in the request object with account ID, check for an error, and, if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    accountsSvc := accounts.NewAccountsService(client)    request := &accounts.GetAccountTransfersRequest{        AccountId: "account_id_here",    }    response, err := accountsSvc.GetAccountTransfers(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to get account transfers: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

### Listing Profiles

Certain requests require that you know your Profile ID. To list all profile IDs associated with your Exchange account, initialize the profiles service, pass in the request object, check for an error, and, if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    profilesSvc := profiles.NewProfilesService(client)    request := &profiles.ListProfilesRequest{}    response, err := profilesSvc.ListProfiles(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to list profiles: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

### Get Product Details

To get product details, initialize the products service, pass in the request object with the Product ID (e.g. `BTC-USD`) you want data for, check for an error, and if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    productsSvc := products.NewProductsService(client)    request := &products.GetProductRequest{        ProductId: "BTC-USD",    }    response, err := productsSvc.GetProduct(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to get product: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

Last updated on **Dec 17, 2024**
---

# # Create a new order


POST

https://api.exchange.coinbase.com/orders

Create an order. You can place two types of orders: limit and market. Orders can only be placed if your account has sufficient funds. Once an order is placed, your account funds will be put on hold for the duration of the order. How much and which funds are put on hold depends on the order type and parameters specified.



Caution

Each profile can place a maximum of 500 open orders on a product. Once reached, the profile cannot place any new orders until the total number of open orders is below 500.

## API Key Permissions

This endpoint requires the "trade" permission.

### Limit Order Parameters

| Parameter | Description |
| --- | --- |
| price | Price per bitcoin |
| size | [optional]* Amount of BTC to buy or sell |
| funds | [optional]* Desired amount of quote currency to use (See [Limit Order With Funds](/exchange/docs/fix-msg-oe-lwf/) for details) |
| time_in_force | [optional] `GTC`, `GTT`, `IOC`, or `FOK` (default is `GTC`) |
| cancel_after | [optional]** `min`, `hour`, `day` |
| post_only | [optional]*** Post only flag |
| max_floor | [optional] Max size of iceberg order to display. Must be &gt; 10% of OrderQty. |

  

\* One of size or funds is required. Only one may be specified  
\*\* Requires `time_in_force` to be `GTT`  
\*\*\* Invalid when time\_in\_force is `IOC` or `FOK`

### Market Order Parameters

| Parameter | Description |
| --- | --- |
| size | [optional]* Desired amount in BTC |
| funds | [optional]* Desired amount of quote currency to use |

  

\* One of `size` or `funds` is required.

## Product ID

The `product_id` must match a valid product. The products list is available via the [/products](/exchange/reference/exchangerestapi_getproducts) endpoint.

## Client Order ID

The optional `client_oid` field must be a UUID generated by your trading application. This field value is broadcast in the public feed for `received` messages. You can use this field to identify your orders in the public feed.

The `client_oid` is different than the server-assigned order ID. If you are consuming the public feed and see a `received` message with your `client_oid`, you should record the server-assigned `order_id` as it is used for future order status updates. The `client_oid` is NOT used after the `received` message is sent.

The server-assigned order id is also returned as the `id` field to this HTTP POST request.

## Type

When placing an order, you can specify the order type. The order type you specify influences which other order parameters are required as well as how your order is executed by the matching engine. If `type` is not specified, the order defaults to a `limit` order.

**Limit** orders are both the default and basic order type. A limit order requires that you specify a `price` and one of either `size` or `funds`. The `size` parameter denotes the amount in fiat, and `funds` denotes the number of bitcoin to buy or sell. The `price` is the price per bitcoin. Limit orders are filled at the price specified or better. A sell order can be filled at the specified price per bitcoin or a higher price per bitcoin, and a buy order can be filled at the specified price or a lower price depending on market conditions. If market conditions cannot fill the limit order immediately, then the limit order becomes part of the open order book until filled by another incoming order or canceled by the user.

**Market** orders differ from limit orders in that they provide no pricing guarantees. They however do provide a way to buy or sell specific amounts of bitcoin or fiat without having to specify the price. Market orders execute immediately and no part of the market order goes on the open order book. Market orders are always considered `takers` and incur taker fees. When placing a market order you can specify `funds` and/or `size`. Funds limit how much of your quote currency account balance is used and size limits the bitcoin amount transacted.

## Stop Orders

Stop orders become active and wait to trigger based on the movement of the last trade price. There are two types of stop orders, `stop loss` and `stop entry`:

`stop: 'loss'`: Triggers when the last trade price changes to a value at or below the `stop_price`.

`stop: 'entry'`: Triggers when the last trade price changes to a value at or above the `stop_price`.

The last trade price is the last price at which an order was filled. This price can be found in the latest [match message](/exchange/docs/websocket-channels#matches-channel). Not all match messages may be received due to [dropped messages](/exchange/docs/websocket-overview#sequence-numbers).

When stop orders are triggered, they execute as limit orders and are therefore subject to [holds](#holds).

## Price

The price must be specified in `quote_increment` product units. The quote increment is the smallest unit of price. For the BTC-USD product, the quote increment is `0.01` or 1 penny. Prices less than 1 penny are not accepted, and no fractional penny prices are accepted. Not required for `market` orders.

## Size



Order Size Limits Removed

The properties `base_max_size`, `base_min_size`, `max_market_funds` were [removed on June 30, 2022](/exchange/docs/changelog#2022-jun-30).

The property, `min_market_funds`, has been repurposed as the notional minimum size for limit orders.

The size must be greater than the `base_min_size` for the product and no larger than the `base_max_size`. The size can be in incremented in units of `base_increment`. `size` indicates the amount of BTC (or base currency) to buy or sell.

`size` indicates the amount of base currency to buy or sell. The size must be no less than the `base_min_size` and no larger than the `base_max_size` for the product. However, for post-only limit orders, there is no enforced `base_max_size`. The size can be in any increment of the base currency (e.g. BTC for the BTC-USD product).



Info

There is no max size restriction for `post_only` limit orders.

## Funds

The funds field is optionally used for `market` or `limit` orders. When specified it indicates how much of the product quote currency to buy or sell. For example, a market buy for `BTC-USD` with `funds` specified as `150.00` will spend `150 USD` to buy BTC (including any fees). If the funds field is not specified for a market buy order, `size` must be specified and Coinbase Exchange uses available funds in your account to buy bitcoin.

A market sell order can also specify the `funds`. If `funds` is specified, it limits the sell to the amount of `funds` specified. You can use `funds` with sell orders to limit the amount of quote currency funds received.

A `limit` order that specifies `funds` functions similarly to a `market` order but provides more control in its ability to specify `price`. See [Limit Order With Funds](/exchange/docs/fix-msg-oe-lwf/) for more information on how this order works.

## Time In Force

Time in force policies provide guarantees about the lifetime of an order. There are four policies: good till canceled `GTC`, good till date `GTD`, immediate or cancel `IOC`, and fill or kill `FOK`.

`GTC` Good till canceled orders remain open on the book until canceled. This is the default behavior if no policy is specified.

`GTD` Good till date orders are valid till a specified date or time (within a 90-day hard limit) unless it has been already fulfilled or cancelled.

`IOC` Immediate or cancel orders instantly cancel the remaining size of the limit order instead of opening it on the book.

`FOK` Fill or kill orders are rejected if the entire size cannot be matched.



Info

Match also refers to self trades.

## Post Only

The post-only flag indicates that the order should only make liquidity. If any part of the order results in taking liquidity, the order will be rejected and no part of it will execute.

## Holds

For `limit` `buy` orders, we hold `price x size x (1 + fee-percent)` USD. For `sell` orders, we hold the number of Bitcoin you wish to sell. Actual fees are assessed at time of trade. If you cancel a partially filled or unfilled order, any remaining funds are released from hold.

For `market` `buy` orders where `funds` is specified, the `funds` amount is put on hold. If only `size` is specified, all of your account balance (in the quote account) is put on hold for the duration of the market order (usually a trivially short time). For a `sell` order, the `size` in BTC is put on hold. If `size` is not specified (and only `funds` is specified), your entire BTC balance is put on hold for the duration of the market order.

## Self-Trade Prevention

Self-trading is not allowed on the exchange. Two orders from the same user are not allowed to match with one another. To change the self-trade behavior, specify the `stp` flag.

| Flag | Name |
| --- | --- |
| dc | Decrease and Cancel (default) |
| co | Cancel oldest |
| cn | Cancel newest |
| cb | Cancel both |

  

See the [self-trade prevention](/exchange/docs/matching-engine#self-trade-prevention) documentation for details about these fields.

## Order Lifecycle

The HTTP Request responds when an order is either rejected (insufficient funds, invalid parameters, etc) or received (accepted by the matching engine). A `200` response indicates that the order was received and is active. Active orders may execute immediately (depending on price and market conditions) either partially or fully. A partial execution puts the remaining size of the order in the `open` state. An order that is filled completely, goes into the `done` state.

Users listening to streaming market data are encouraged to use the `client_oid` field to identify their `received` messages in the feed. The REST response with a server `order_id` may come after the `received` message in the public data feed.

## Response

A successful order is assigned an order id. A successful order is defined as one that has been accepted by the matching engine.



Info

Open orders do not expire and remain open until they are either filled or canceled.

## Authentication

| Parameter | Type | Required |
| --------- | ---- | -------- |
| cb-access-key | string | required |
| cb-access-passphrase | string | required |
| cb-access-sign | string | required |
| cb-access-timestamp | string | required |

## Request Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| profile_id | string | Create order on a specific `profile_id`. If none is passed, defaults to `default` profile. |
| type | string | Possible values: [limit, market, stop] |
| side | string | Possible values: [buy, sell] |
| product_id | string | Book on which to place an order |
| stp | string | Possible values: [dc, co, cn, cb] |
| stop | string | Possible values: [loss, entry] |
| stop_price | string | Price threshold at which a `stop` order will be placed on the book |
| price | string | Price per unit of cryptocurrency - required for `limit`/`stop` orders |
| size | string | Amount of base currency to buy or sell - required for `limit`/`stop` orders and `market` `sell`s |
| funds | string | Amount of quote currency to buy - required for `market` `buy`s |
| time_in_force | string | Possible values: [GTC, GTT, IOC, FOK] |
| cancel_after | string | Possible values: [min, hour, day] |
| post_only | boolean | If true, order will only execute as a `maker` order |
| client_oid | string | Optional Order ID selected by the user or the frontend client to identify their order |
| max_floor | string | Placing an iceberg order. Use this to specify how much to show |
| stop_limit_price | string | Required for take profit/stop loss orders. Denotes the updated limit price upon the activation of the stop loss trigger |

## API Response Details

### Response: 200 The new order that was successfully created

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
---

