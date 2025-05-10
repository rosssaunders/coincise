# Coinbase Exchange API Documentation

Generated on 5/10/2025 12:23:10 AM

## Table of Contents

* [Welcome to Exchange APIs](#welcome-to-exchange-apis)
* [Quickstart: Making Your First REST API Call](#quickstart-making-your-first-rest-api-call)
* [Exchange Sandbox](#exchange-sandbox)
* [Exchange Matching Engine](#exchange-matching-engine)
* [Exchange Rate Limits Overview](#exchange-rate-limits-overview)
* [Exchange Systems & Operations](#exchange-systems-operations)
* [Exchange REST API Requests](#exchange-rest-api-requests)
* [Exchange REST API Authentication](#exchange-rest-api-authentication)
* [Exchange REST API Rate Limits](#exchange-rest-api-rate-limits)
* [Exchange REST API Pagination](#exchange-rest-api-pagination)
* [Exchange Profiles](#exchange-profiles)
* [Exchange Types](#exchange-types)
* [Create a new order](#create-a-new-order)
* [Get all fills](#get-all-fills)
* [Get all orders](#get-all-orders)
* [Cancel all orders](#cancel-all-orders)
* [Get single order](#get-single-order)
* [Cancel an order](#cancel-an-order)

---

# Welcome to Exchange APIs




FIX 4.2 Order Entry Gateway Deprecation

FIX 4.2 Order Entry Gateway will be deprecated on **June 3rd, 2025**. For FIX
based order entry, **leverage the newer, more performant**
[FIX 5 Order Entry Gateway](/exchange/docs/fix-msg-order-entry-50).

Welcome to Coinbase Exchange API documentation for traders and developers! The
APIs are separated into two categories, trading and market data:

- **Trading APIs** require authentication and let you place orders and access
  account information.
- **Market Data APIs** provide market data and are public.

Coinbase Exchange offers multiple connectivity options tailored to your trading
and data needs:

- [REST API](/exchange/docs/rest-requests) for lower-frequency trading and
  general requests.
- [FIX Order Entry API](/exchange/docs/fix-msg-order-entry-50) for
  higher-frequency trading.
- [WebSocket Feed](/exchange/docs/websocket-overview) for market data.
- [FIX Market Data API](/exchange/docs/fix-msg-market-data) for latency
  sensitive market data feeds.

Exchange's developer docs are part of [Coinbase Developer Platform](/), the
single portal from which to access Coinbase's full suite of APIs and blockchain
infrastructure products.



Info

By accessing the Exchange Market Data API, you agree to be bound by the
[Market Data Terms of Use](https://www.coinbase.com/legal/market_data).

Last updated on **Apr 2, 2025**


---

# Quickstart: Making Your First REST API Call


This quickstart walks through creating an API key, setting up the Exchange Go
SDK, and making your first few REST API calls.

## Initial Setup

1.  **Create a Coinbase Exchange Account:** Sign up at
    [Coinbase Exchange](https://exchange.coinbase.com/).
2.  **Generate an API Key:** From the web UI, navigate to
    [API](https://exchange.coinbase.com/apikeys).
3.  **Authenticate:** Ensure you authenticate all API requests. Detailed
    guidance is available at [API Authentication](/exchange/docs/rest-auth).



REST API URL

`https://api.exchange.coinbase.com`

## Using the Exchange Go SDK

### Setting up the SDK

First, initialize a new Go module, install the Exchange Go SDK, and tidy
dependencies. Run the following commands in your project directory, replacing
example.com/test with your desired project path:

```
go mod init example.com/testgo get github.com/coinbase-samples/exchange-sdk-gogo mod tidygo build
```

Next, initialize the `Credentials` struct and create a new client. The
Credentials struct is JSON enabled. Ensure that Exchange API credentials are
stored in a secure manner.

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")if err != nil {    panic(fmt.Sprintf("unable to read exchange credentials: %v", err))}httpClient, err := core.DefaultHttpClient()if err != nil {    panic(fmt.Sprintf("unable to load default http client: %v", err))}client := client.NewRestClient(credentials, httpClient)
```

There are convenience functions to read the credentials as an environment
variable (credentials.ReadEnvCredentials) and to deserialize the JSON structure
(credentials.UnmarshalCredentials) if pulled from a different source.

To set up your credentials, add the `EXCHANGE_CREDENTIALS` environment variable
to your `~/.zshrc` file:

```
export EXCHANGE_CREDENTIALS='{    "apiKey":"YOUR_API_KEY",    "passphrase":"YOUR_PASSPHRASE",    "signingKey":"YOUR_SIGNING_KEY"}'
```

After adding this line, run source ~/.zshrc to load the environment variable
into your current shell session.

## Making your first API call

After initializing the client, you need to set up the appropriate service to
access specific API endpoints. Specific examples are provided below.

### Listing Accounts

Account IDs are needed in order to track asset-level events, e.g. transfers and
ledger. To list all accounts, initialize the accounts service, pass in the
request object, check for an error, and, if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    accountsSvc := accounts.NewAccountsService(client)    request := &accounts.ListAccountsRequest{}    response, err := accountsSvc.ListAccounts(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to list accounts: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

### Get Account Transfers

You can use account IDs to track historical transfers. To get a specific
account's transfer history, initialize the accounts service if you haven't
already, pass in the request object with account ID, check for an error, and, if
nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    accountsSvc := accounts.NewAccountsService(client)    request := &accounts.GetAccountTransfersRequest{        AccountId: "account_id_here",    }    response, err := accountsSvc.GetAccountTransfers(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to get account transfers: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

### Listing Profiles

Certain requests require that you know your Profile ID. To list all profile IDs
associated with your Exchange account, initialize the profiles service, pass in
the request object, check for an error, and, if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    profilesSvc := profiles.NewProfilesService(client)    request := &profiles.ListProfilesRequest{}    response, err := profilesSvc.ListProfiles(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to list profiles: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

### Get Product Details

To get product details, initialize the products service, pass in the request
object with the Product ID (e.g. `BTC-USD`) you want data for, check for an
error, and if nil, process the response.

```
func main() {    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")    if err != nil {        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))    }    httpClient, err := core.DefaultHttpClient()    if err != nil {        panic(fmt.Sprintf("unable to load default http client: %v", err))    }    client := client.NewRestClient(credentials, httpClient)    productsSvc := products.NewProductsService(client)    request := &products.GetProductRequest{        ProductId: "BTC-USD",    }    response, err := productsSvc.GetProduct(context.Background(), request)    if err != nil {        panic(fmt.Sprintf("unable to get product: %v", err))    }    jsonResponse, err := json.MarshalIndent(response, "", "  ")    if err != nil {        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))    }    fmt.Println(string(jsonResponse))}
```

Last updated on **Dec 17, 2024**


---

# Exchange Sandbox


A public sandbox is available for testing API connectivity and web trading.



Sandbox is subset

The sandbox hosts a _subset_ of the production order books and supports all
exchange functionality _except_
[Transfers](/exchange/docs/sandbox#unsupported-features). You can add unlimited
fake funds for testing.



Info

Login sessions and API keys are separate from production. Log into the
[sandbox web interface](https://public.sandbox.exchange.coinbase.com) to create
an API key, deposit/withdraw funds, etc.

## Sandbox URLs

Use the following URLs to test your API connectivity. See the
[Runbook](/exchange/docs/runbook#production-urls) for Production URLs.

| API                           | URL                                                       |
| ----------------------------- | --------------------------------------------------------- |
| REST API                      | `https://api-public.sandbox.exchange.coinbase.com`        |
| Websocket Feed                | `wss://ws-feed-public.sandbox.exchange.coinbase.com`      |
| Websocket Direct Feed         | `wss://ws-direct.sandbox.exchange.coinbase.com`           |
| FIX API - Order Entry 4.2     | `tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198` |
| FIX API - Order Entry 5.0 SP2 | `tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121`    |
| FIX API - Market Data 5.0 SP2 | `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121`     |

## Sandbox SSL Certificate

Your FIX SSL client must validate the following sandbox FIX server SSL
certificate:

```
-----BEGIN CERTIFICATE-----MIIEdDCCA1ygAwIBAgIQD03L1cHVypYSDFuvcnpAHzANBgkqhkiG9w0BAQsFADBGMQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRUwEwYDVQQLEwxTZXJ2ZXIgQ0EgMUIxDzANBgNVBAMTBkFtYXpvbjAeFw0yMjAzMjcwMDAwMDBaFw0yMzA0MjUyMzU5NTlaMCoxKDAmBgNVBAMMHyouc2FuZGJveC5leGNoYW5nZS5jb2luYmFzZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8LYRdqMoVNa/0M4MF+Wkr8SiybZ95JycTE+0ZVmf92DKo4I8m/8fBtOrH0jgrhvamVSJ0lI6VFiAzlTd1doUbliQ9Xm1aE/YHQO9J64AIP97peysgHBd+g3/Vhz33aaaU2vyHH5kPHiekU8n/ObXPPoFd/Awul8uxxlXsVFx8oBWL2MeMjLNLLWNiGWq+lQloGKsQYVR/fQZizvpPvyZO6pCLRId6+Wq3Tcb7NHQZc6+tePVi+5fovE+lm/yQrhjGqDzI7P4rWjJqCPrAsYJeYFcVJhdSuFY2Ngm8eKeDP14TVEs9pkIWvyMGmB17QBPbRJipdoKu1N6fsx54N9JDAgMBAAGjggF4MIIBdDAfBgNVHSMEGDAWgBRZpGYGUqB7lZI8o5QHJ5Z0W/k90DAdBgNVHQ4EFgQUa5RZ0yvv71YteSuqO1VRvmGGKv0wKgYDVR0RBCMwIYIfKi5zYW5kYm94LmV4Y2hhbmdlLmNvaW5iYXNlLmNvbTAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMD0GA1UdHwQ2MDQwMqAwoC6GLGh0dHA6Ly9jcmwuc2NhMWIuYW1hem9udHJ1c3QuY29tL3NjYTFiLTEuY3JsMBMGA1UdIAQMMAowCAYGZ4EMAQIBMHUGCCsGAQUFBwEBBGkwZzAtBggrBgEFBQcwAYYhaHR0cDovL29jc3Auc2NhMWIuYW1hem9udHJ1c3QuY29tMDYGCCsGAQUFBzAChipodHRwOi8vY3J0LnNjYTFiLmFtYXpvbnRydXN0LmNvbS9zY2ExYi5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsFAAOCAQEATpjyCMwAOSFKFTA67UaVkDCjz/ULBY6PL4JwTJ+7kmT+HMvGimx15CsVjne64bT5twWlzqA/l4h25HGj0hD0TU2ktqmFhfAmDpjGVp4KgIcZpvv7oRIU4e5I422Y++2UVuATwLWdELgpnm4AVq1aqI10XrQlJeHLgRVfV5qkr9Vsc+fk7HY7YwbNQk2jXbRaj22f6GxiJ/6VmUcCD7zZ1GZtUipv0JEyPtWD/BbSKNx1GJnLZ6L+QytPs+MW+FEetlU/oqPuyYRhmJUBUiwKkm6yKWRj9tQfsq0a4uLI3SUgsBv/CQ/Qa9LnRdNjvlWSKLzeIX2LU9rE/3F3oQh7HQ==-----END CERTIFICATE-----
```

## Unsupported Features

The Transfer endpoints are _not_ available for testing in the Sandbox:

- [Withdraw to payment](/exchange/reference/exchangerestapi_postwithdrawpaymentmethod)
- [Deposit from payment](/exchange/reference/exchangerestapi_postdepositpaymentmethod)
- [Deposit from Coinbase account](/exchange/reference/exchangerestapi_postdepositcoinbaseaccount)
- [Withdraw to crypto address](/exchange/reference/exchangerestapi_postwithdrawcrypto)
- [Withdraw to Coinbase Account](/exchange/reference/exchangerestapi_postwithdrawcoinbaseaccount)

## Creating API Keys

To create an API key in the sandbox web interface:

1.  Go to the
    [sandbox web interface](https://public.sandbox.exchange.coinbase.com)
2.  Create an account or sign in.
3.  Go to **API** in your profile dropdown menu.
4.  Click **New API Key**.

## Managing Funds

To add or remove funds in the sandbox web interface:

1.  Go to the **Portfolios** tab.
2.  Click the **Deposit** and **Withdraw** buttons as you would on the
    production web interface.

Last updated on **Aug 27, 2024**


---

# Exchange Matching Engine


Coinbase Exchange operates a continuous first-come, first-serve order book.
Orders are executed in price-time priority as received by the matching engine.

## Self-Trade Prevention

Self-trading is not allowed on Coinbase Exchange. When two orders from the same
user cross, they do not fill one another.



Caution

The STP instruction on the taker order (latest order) takes precedence over the
older/resting order.

You can define your self-trade prevention behavior when
[placing an order](/exchange/reference/exchangerestapi_postorders#self-trade-prevention)
with the STP flag:

| Self-Trade Prevention Option     | STP Flag | Description                                                                                         |
| -------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| Decrement &amp; cancel (default) | `dc`     | Cancel smaller order and decrement larger order by the smaller size. If the same size, cancel both. |
| Cancel oldest                    | `co`     | Cancel older (resting) order in full. Continue to execute the newer taking order.                   |
| Cancel newest                    | `cn`     | Cancel newer (taking) order in full. Let the old resting order remain on the order book.            |
| Cancel both                      | `cb`     | Cancel both orders immediately.                                                                     |

## Market Orders

When a `market` order using decrement and cancel (`dc` ) self-trade prevention
encounters an open limit order, the behavior depends on which fields were
specified for the market order.

- If `funds` and `size` are specified:

  - For a market buy order, size is decremented internally within the matching
    engine and funds remain unchanged. The intent is to offset your target size
    without limiting your buying power.

- If `funds` is specified (and not `size`):

  - For a market buy order, funds are decremented.
  - For a market sell order, size is decremented when encountering existing
    limit orders.

## Price Improvement

Orders are matched against existing order book orders at the price of the order
_on the book_, not at the price of the taker order.

**Example**

User A places a buy order for 1 BTC at 100 USD. Then User B places a sell order
for 1 BTC at 80 USD. The result is that the trade occurs at 100 USD because User
A's order was first to the trading engine and User A has price priority.

## Order Lifecycle

| Order State | Description                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `received`  | Valid orders that are sent to the matching engine and confirmed immediately.                                                       |
| `open`      | Any part of the order not filled immediately. Orders stay open until canceled or filled by new orders.                             |
| `done`      | An full order executed against another order immediately. A partial order filled or canceled (and no longer eligible for matching) |

Last updated on **Feb 25, 2025**


---

# Exchange Rate Limits Overview


## Summary



Info

Private endpoints are authenticated.

### [REST API Rate Limits](/exchange/docs/rest-rate-limits)

#### Public Endpoints

- Requests per second per IP: 10
- Requests per second per IP in bursts: Up to 15

#### Private Endpoints

- Requests per second per profile: 15
- Requests per second per profile in bursts: Up to 30

#### Private `/fills` Endpoint

- Requests per second per profile: 10
- Requests per second per profile in bursts: Up to 20

#### Private `/loans` Endpoint

- Requests per second per profile: 10



Info

Rate limits do not apply to
[List loan assets](/exchange/reference/exchangerestapi_getloanassets)
(`/loans/assets`) which is not private.

### [FIX API Rate Limits](/exchange/docs/fix-rate-limits)

#### FIX 4.2 Rate Limits

- Requests per rolling second per session: 50
- Messages per second in bursts: 100

#### FIX 5.0 Rate Limits

- 2 logons per second per API key
- 100 requests per second



Caution

Your FIX 5 session is disconnected if your messages exceed 200 messages per
second

#### FIX Maximums

- Maximum API keys per session/connection: 1
- Maximum connections per profile: 75 . See
  [FIX Best Practices](/exchange/docs/fix-best-practices).
- Maximum connections per user across all profiles: 175
- Maximum profiles per user: 100
- Maximum orders per batch message message (new and cancelled): 15

### [Websocket Rate Limits](/exchange/docs/websocket-rate-limits)

- Requests per second per IP: 8
- Requests per second per IP in bursts: Up to 20
- Messages sent by the client every second per IP: 100

### Other

- Maximum open orders: 500

## How Rate Limits Work

Rate-limiting for both the Exchange REST API and the FIX API use a **lazy-fill
token bucket** implementation.

A TokenBucket stores a maximum amount of tokens, which is the **burst size**,
and fills at a given rate called the **refresh rate**. The bucket starts full,
and as requests are received, a token is removed for each request. Tokens are
continuously added to the bucket at the refresh rate until full.

When a user sends a request, the TokenBucket calculates whether or not to rate
limit the user as follows:

1.  Fill the user's TokenBucket to a token size based on the following formula:
    `token_amount = min(burst, previous_token_amount + (current_time - previous_request_time) * refresh_rate)`
2.  Remove 1 token if possible, otherwise rate limit the request.
3.  Repeat Steps 1 and 2 for each subsequent request.

### TokenBucket Example

Let's say you have a TokenBucket with burst = 3 and refresh_rate = 1. The table
below represents the state of your token bucket after a series of requests:

| Action        | Time | Tokens | Notes                                                                                                                                             |
| ------------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial State | 0.0  | 3.0    | New TokenBucket is initialized to max capacity (burst)                                                                                            |
| Request 1     | 0.5  | 2.0    | Fill TokenBucket, then remove a token, because we are at max capacity, and subtract 1 token from 3                                                |
| Request 2     | 0.8  | 1.3    | Fill TokenBucket to 2.3 (`min(3, (2 + (.8 - .5) * 1.0)) = min(3, 2.3) = 2.3`), then subtract 1                                                    |
| Request 3     | 0.9  | 0.4    | Fill TokenBucket to 1.4 (`min(3, (1.3 + (.9 - .8) * 1.0)) = min(3, 1.4) = 1.4`), then subtract 1                                                  |
| Request 4     | 1.0  | 0.5    | Fill TokenBucket to 0.5 (`min(3, (.4 + (1.0 - .9) * 1.0)) = min(3, 0.5) = 0.5`). Ratelimit because we don't have enough tokens available          |
| Request 5     | 1.4  | 0.9    | Fill TokenBucket to 0.9 (`min(3, (0.5 + (1.4 - 1.0) * 1.0)) = min(3, 0.9) = 0.9`). Ratelimit because we don't have enough tokens available        |
| Request 6     | 1.8  | 0.3    | Fill TokenBucket to 1.3 (`min(3, (0.9 + (1.8 - 1.4) * 1.0)) = min(3, 1.3) = 1.3`), then remove 1                                                  |
| Request 7     | 5.0  | 2.0    | Fill TokenBucket to 3.0 (`min(3, (0.3 + (5.0 - 1.8) * 1.0)) = min(3, 3.5) = 3`), since we would "overflow" with our calculations, then subtract 1 |

Last updated on **Feb 25, 2025**


---

# Exchange Systems & Operations


## Deployment

The deployment schedules for different components vary and may change without
notice.

| API       | Schedule                              |
| --------- | ------------------------------------- |
| FIX       | Monday, Thursday at 2PM ET            |
| WebSocket | Monday, Wednesday, Thursday at 2PM ET |
| REST      | Monday, Wednesday, Thursday at 2PM ET |

## Production URLs

Use the following URLs to connect to Coinbase Exchange production APIs. See
[Sandbox URLs](/exchange/docs/sandbox) for testing.

| API                           | URL                                            |
| ----------------------------- | ---------------------------------------------- |
| REST API                      | `https://api.exchange.coinbase.com`            |
| Websocket Feed                | `wss://ws-feed.exchange.coinbase.com`          |
| Websocket Direct Feed         | `wss://ws-direct.exchange.coinbase.com`        |
| FIX API - Order Entry 4.2     | `tcp+ssl://fix.exchange.coinbase.com:4198`     |
| FIX API - Order Entry 5.0 SP2 | `tcp+ssl://fix-ord.exchange.coinbase.com:6121` |
| FIX API - Market Data 5.0 SP2 | `tcp+ssl://fix-md.exchange.coinbase.com:6121`  |

## Availability Zones

The infrastructure for the US Spot Exchange is hosted in **US-EAST-1 (AWS)**
within multiple availability zones.



Caution

The following information is subject to change without notification, and there
is no guarantee that it will remain static over time.

| Product                | Availability Zone ID |
| ---------------------- | -------------------- |
| FIX Order Gateways     | use1-az4             |
| Order Entry Gateway    | use1-az4             |
| Trade Engine           | use1-az4             |
| Web Socket Market Data | use1-az4             |
| FIX Market Data        | use1-az4             |

## System Components

### REST Entry Gateways

- Requests are routed through Cloudflare.
- Requests are processed on a FIFO basis with no queuing.
- REST requires additional authentication because it's stateless (as opposed to
  FIX order gateways, which authenticate during login).

### FIX Order Gateways

- Each instance contains a per-user product based queue.
- Each per-user product-based queue can hold a maximum of 50 queued requests
  before requests are rejected.
- Each per-user product-based queue is processed on a FIFO basis.

### Order Entry Gateway (Risk System)

- Each instance processes requests from FIX Order Gateways and REST in real time
  with no queuing.
- System performs real-time risk checks and account collateralization.

### Trade Engine

- Clustered service that guarantees FIFO sequencing at a product level.
- Processes all requests from Order Entry Gateway.
- Publishes market data to WebSocket / FIX Market Data.

### Market Data (Websocket & FIX)

- Each instance can process all market data requests across all products.
- Messages are distributed to customers randomly, and there is no intended
  benefit to being “first to subscribe”.

Last updated on **Feb 25, 2025**


---

# Exchange REST API Requests


All requests and responses are `application/json` content type and follow
typical HTTP response status codes for success and failure.

Note: Request URLs must be lowercase as URLs are
[case-sensitive](https://www.w3.org/TR/WD-html40-970708/htmlweb.html).

## Errors

```
{  "message": "Invalid Price"}
```

Unless otherwise stated, errors to bad requests respond with HTTP 4xx or status
codes. The body also contains a `message` parameter indicating the cause. Your
language's http library should be configured to provide message bodies for
non-2xx requests so that you can read the message field from the body.

### Common Error Codes

| Status Code | Reason                                                        |
| ----------- | ------------------------------------------------------------- |
| 400         | Bad Request -- Invalid request format                         |
| 401         | Unauthorized -- Invalid API Key                               |
| 403         | Forbidden -- You do not have access to the requested resource |
| 404         | Not Found                                                     |
| 500         | Internal Server Error -- We had a problem with our server     |

## Success

A successful response is indicated by HTTP status code 200 and may contain an
optional body. If the response has a body it is documented under each resource
below.

Last updated on **Feb 25, 2025**


---

# Exchange REST API Authentication


This page explains how to sign and authenticate REST API endpoints with API keys
that let you control authorization.



Note

See [FIX API Connectivity](/exchange/docs/fix-connectivity) for FIX API
authentication.

## Private Endpoints

Private endpoints are available for order management and account management.
Every private request must be signed using the described authentication scheme.



Info

Private endpoints require authentication using your Coinbase Exchange API key.
You can generate API keys [here](https://exchange.coinbase.com/profile/api).

## API Keys

To sign a request, you must create an API key via the Coinbase Exchange website.
The API key is scoped to a specific profile. Each user can generate a max of 300
API keys.

### Generating an API Key

When creating a key, you must remember (and should write down) your (1) key, (2)
secret, and (3) passphrase. The key and secret are randomly generated and
provided by Coinbase Exchange -- you choose a passphrase to further secure your
API access.



Warning

Coinbase Exchange stores the salted hash of your passphrase for verification and
cannot be recovered if you forget it.

### API Key Permissions

You can control access by restricting the functionality of API keys. Before
creating the key, you must choose what permissions you would like the key to
have:

| Permission | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| View       | Key has read permissions for all endpoints (including GET)                             |
| Transfer   | Key can transfer value for accounts, including deposits/withdrawals (and bypasses 2FA) |
| Trade      | Key can post orders and get data                                                       |
| Manage     | Key can manage user settings and preferences such as address books entries             |

Refer to the documentation below to see what API key permissions are required
for a specific route.

## Signing Requests

All REST requests must contain the following headers:

| Header                 | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `CB-ACCESS-KEY`        | API key as a string                                                    |
| `CB-ACCESS-SIGN`       | base64-encoded signature (see [Signing a Message](#signing-a-message)) |
| `CB-ACCESS-TIMESTAMP`  | Timestamp for your request                                             |
| `CB-ACCESS-PASSPHRASE` | Passphrase you specified when creating the API key                     |

All request bodies should have content type `application/json` and be valid
JSON.

### Selecting a Timestamp

The `CB-ACCESS-TIMESTAMP` header MUST be number of seconds since
[Unix Epoch](http://en.wikipedia.org/wiki/Unix_time) in UTC. Decimal values are
allowed.

Your timestamp must be within 30 seconds of the API service time or your request
is considered expired and rejected. We recommend using the
[time](https://api.exchange.coinbase.com/time) endpoint to query for the API
server time if you believe there is a time difference between your server and
the API servers.

### Signing a Message

The `CB-ACCESS-SIGN` header is generated by creating a sha256 HMAC using the
base64-decoded secret key on the prehash string
`timestamp + method + requestPath + body` (where `+` represents string
concatenation) and base64-encode the output.



Info

Remember to base64-decode the alphanumeric secret string (resulting in 64 bytes)
before using it as the key for HMAC. Also, base64-encode the digest output
before sending in the header.

- `timestamp` is the same as the `CB-ACCESS-TIMESTAMP` header.
- `method` should be UPPER CASE e.g., `GET` or `POST`.
- `requestPath` should only include the path of the API endpoint.
- `body` is the request body string or omitted if there is no request body
  (typically for `GET` requests).

### Signature Example

The following example demonstrates how to generate a signature in Javascript:

```
// import crypto libraryvar crypto = require("crypto");// create the json request objectvar cb_access_timestamp = Date.now() / 1000; // in msvar cb_access_passphrase = "...";var secret = "PYPd1Hv4J6/7x...";var requestPath = "/orders";var body = JSON.stringify({  price: "1.0",  size: "1.0",  side: "buy",  product_id: "BTC-USD",});var method = "POST";// create the prehash string by concatenating required partsvar message = cb_access_timestamp + method + requestPath + body;// decode the base64 secretvar key = Buffer.from(secret, "base64");// create a sha256 hmac with the secretvar hmac = crypto.createHmac("sha256", key);// sign the require message with the hmac and base64 encode the resultvar cb_access_sign = hmac.update(message).digest("base64");
```

Last updated on **May 20, 2024**


---

# Exchange REST API Rate Limits


Public endpoints are throttled by IP and private endpoints by profile ID. Some
endpoints (like `/fills`) may have custom rate limits.

When a REST API rate limit is exceeded, a status of `429 Too Many Requests` is
returned.

#### Public Endpoints

- Requests per second per IP: 10
- Requests per second per IP in bursts: Up to 15

#### Private Endpoints

Private endpoints are authenticated.

- Requests per second per profile: 15
- Requests per second per profile in bursts: Up to 30

#### Private `/fills` Endpoint

- Requests per second per profile: 10
- Requests per second per profile in bursts: Up to 20

#### Private `/loans` Endpoint

- Requests per second per profile: 10



Info

Rate limits do not apply to
[List loan assets](/exchange/reference/exchangerestapi_getloanassets)
(`/loans/assets`) which is not private.

Last updated on **Dec 7, 2024**


---

# Exchange REST API Pagination


Coinbase Exchange uses cursor pagination for all REST requests which return
arrays.

Cursor pagination allows for fetching results before and after the current page
of results and is well suited for realtime data. Endpoints like `/trades`,
`/fills`, `/orders`, return the latest items by default. To retrieve more
results subsequent requests should specify which direction to paginate based on
the data previously returned.

`before` and `after` cursors are available via response headers `CB-BEFORE` and
`CB-AFTER`. Your requests should use these cursor values when making requests
for pages after the initial request.

### Parameters

| Parameter | Default | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| `before`  |         | Request page before (newer) this pagination id             |
| `after`   |         | Request page after (older) this pagination id              |
| `limit`   | 1000    | Number of results per request. Maximum 1000 (default 1000) |

### Example

`GET /orders?before=2&limit=30`

### Before and After cursors

The `before` cursor references the first item in a results page and the `after`
cursor references the last item in a set of results.

#### Before Cursor

To request a page of records before the current one, use the `before` query
parameter. Your initial request can omit this parameter to get the default first
page.

The response contains a `CB-BEFORE` header which returns the cursor id to use in
your next request for the page before the current one. **The page before is a
newer page and not one that happened before in chronological time.**

#### After Cursor

The response also contains a `CB-AFTER` header which returns the cursor id to
use in your next request for the page after this one. **The page after is an
older page and not one that happened after this one in chronological time.**

Cursor pagination can be unintuitive at first. `before` and `after` cursor
arguments should not be confused with before and after in chronological time.
Most paginated requests return the latest information (newest) as the first page
sorted by newest (in chronological time) first. To get older information you
would request pages `after` the initial page. To get information newer, you
would request pages `before` the first page.

Last updated on **Feb 25, 2025**


---

# Exchange Profiles


Profiles are the equivalent of portfolios on the
[Coinbase Exchange](https://exchange.coinbase.com/portfolios) website. The
maximum number of profiles is 100 .

## API Keys

An API key is scoped to a specific profile. An API key can only view and create
data that belongs to its own profile, unless otherwise noted. This is true for
the REST API, FIX API and Websocket Feed.

To access data or actions on a different profile, create a new API key on the
Coinbase Exchange website.

## Deleted Profiles

Profiles can be deleted on the Coinbase Exchange website. The permissions of an
API key associatd with a deleted profile are automatically set to "View."

Last updated on **May 9, 2024**


---

# Exchange Types


## Timestamps

```
2014-11-06T10:34:47.123456Z
```

Unless otherwise specified, all timestamps from API are returned in
[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) with microseconds. Make sure
you can parse the following ISO 8601 format. Most modern languages and libraries
handle this without issues.

## Numbers

Decimal numbers are returned as strings to preserve full precision across
platforms. When making a request, it is recommended that you also convert your
numbers to strings to avoid truncation and precision errors.

Integer numbers (such as trade id and sequence) are unquoted.

## IDs

Most identifiers are UUID unless otherwise specified. When making a request
which requires a UUID, both forms (with and without dashes) are accepted.

`132fb6ae-456b-4654-b4e0-d681ac05cea1` or `132fb6ae456b4654b4e0d681ac05cea1`

Last updated on **May 8, 2024**


---

# Create a new order


POST

https://api.exchange.coinbase.com/orders

Create an order. You can place two types of orders: limit and market. Orders can
only be placed if your account has sufficient funds. Once an order is placed,
your account funds will be put on hold for the duration of the order. How much
and which funds are put on hold depends on the order type and parameters
specified.



Caution

Each profile can place a maximum of 500 open orders on a product. Once reached,
the profile cannot place any new orders until the total number of open orders is
below 500.

## API Key Permissions

This endpoint requires the "trade" permission.

### Limit Order Parameters

| Parameter     | Description                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| price         | Price per bitcoin                                                                                                               |
| size          | [optional]\* Amount of BTC to buy or sell                                                                                       |
| funds         | [optional]\* Desired amount of quote currency to use (See [Limit Order With Funds](/exchange/docs/fix-msg-oe-lwf/) for details) |
| time_in_force | [optional] `GTC`, `GTT`, `IOC`, or `FOK` (default is `GTC`)                                                                     |
| cancel_after  | [optional]\*\* `min`, `hour`, `day`                                                                                             |
| post_only     | [optional]\*\*\* Post only flag                                                                                                 |
| max_floor     | [optional] Max size of iceberg order to display. Must be &gt; 10% of OrderQty.                                                  |

\* One of size or funds is required. Only one may be specified  
\*\* Requires `time_in_force` to be `GTT`  
\*\*\* Invalid when time_in_force is `IOC` or `FOK`

### Market Order Parameters

| Parameter | Description                                          |
| --------- | ---------------------------------------------------- |
| size      | [optional]\* Desired amount in BTC                   |
| funds     | [optional]\* Desired amount of quote currency to use |

\* One of `size` or `funds` is required.

## Product ID

The `product_id` must match a valid product. The products list is available via
the [/products](/exchange/reference/exchangerestapi_getproducts) endpoint.

## Client Order ID

The optional `client_oid` field must be a variant 1 UUIDv4 that follows the
standard format. This means all lowercase and hyphens that group the characters
in sequences of 8, 4, 4, 4, 12 (e.g. 1985ca2d-61ef-49f1-bfce-6c39d8462914)
generated by your trading application. This field value is broadcast in the
public feed for `received` messages. You can use this field to identify your
orders in the public feed.

The `client_oid` is different than the server-assigned order ID. If you are
consuming the public feed and see a `received` message with your `client_oid`,
you should record the server-assigned `order_id` as it is used for future order
status updates. The `client_oid` is NOT used after the `received` message is
sent.

The server-assigned order id is also returned as the `id` field to this HTTP
POST request.

If the `client_oid` is not in the correct UUIDv4 format it will be accepted via
REST but NOT processed and will not be visible in future REST calls.

## Type

When placing an order, you can specify the order type. The order type you
specify influences which other order parameters are required as well as how your
order is executed by the matching engine. If `type` is not specified, the order
defaults to a `limit` order.

**Limit** orders are both the default and basic order type. A limit order
requires that you specify a `price` and one of either `size` or `funds`. The
`size` parameter denotes the amount in fiat, and `funds` denotes the number of
bitcoin to buy or sell. The `price` is the price per bitcoin. Limit orders are
filled at the price specified or better. A sell order can be filled at the
specified price per bitcoin or a higher price per bitcoin, and a buy order can
be filled at the specified price or a lower price depending on market
conditions. If market conditions cannot fill the limit order immediately, then
the limit order becomes part of the open order book until filled by another
incoming order or canceled by the user.

**Market** orders differ from limit orders in that they provide no pricing
guarantees. They however do provide a way to buy or sell specific amounts of
bitcoin or fiat without having to specify the price. Market orders execute
immediately and no part of the market order goes on the open order book. Market
orders are always considered `takers` and incur taker fees. When placing a
market order you can specify `funds` and/or `size`. Funds limit how much of your
quote currency account balance is used and size limits the bitcoin amount
transacted.

## Stop Orders

Stop orders become active and wait to trigger based on the movement of the last
trade price. There are two types of stop orders, `stop loss` and `stop entry`:

`stop: 'loss'`: Triggers when the last trade price changes to a value at or
below the `stop_price`.

`stop: 'entry'`: Triggers when the last trade price changes to a value at or
above the `stop_price`.

The last trade price is the last price at which an order was filled. This price
can be found in the latest
[match message](/exchange/docs/websocket-channels#matches-channel). Not all
match messages may be received due to
[dropped messages](/exchange/docs/websocket-overview#sequence-numbers).

When stop orders are triggered, they execute as limit orders and are therefore
subject to [holds](#holds).

## Price

The price must be specified in `quote_increment` product units. The quote
increment is the smallest unit of price. For the BTC-USD product, the quote
increment is `0.01` or 1 penny. Prices less than 1 penny are not accepted, and
no fractional penny prices are accepted. Not required for `market` orders.

## Size



Order Size Limits Removed

The properties `base_max_size`, `base_min_size`, `max_market_funds` were
[removed on June 30, 2022](/exchange/docs/changelog#2022-jun-30).

The property, `min_market_funds`, has been repurposed as the notional minimum
size for limit orders.

The size must be greater than the `base_min_size` for the product and no larger
than the `base_max_size`. The size can be in incremented in units of
`base_increment`. `size` indicates the amount of BTC (or base currency) to buy
or sell.

`size` indicates the amount of base currency to buy or sell. The size must be no
less than the `base_min_size` and no larger than the `base_max_size` for the
product. However, for post-only limit orders, there is no enforced
`base_max_size`. The size can be in any increment of the base currency (e.g. BTC
for the BTC-USD product).



Info

There is no max size restriction for `post_only` limit orders.

## Funds

The funds field is optionally used for `market` or `limit` orders. When
specified it indicates how much of the product quote currency to buy or sell.
For example, a market buy for `BTC-USD` with `funds` specified as `150.00` will
spend `150 USD` to buy BTC (including any fees). If the funds field is not
specified for a market buy order, `size` must be specified and Coinbase Exchange
uses available funds in your account to buy bitcoin.

A market sell order can also specify the `funds`. If `funds` is specified, it
limits the sell to the amount of `funds` specified. You can use `funds` with
sell orders to limit the amount of quote currency funds received.

A `limit` order that specifies `funds` functions similarly to a `market` order
but provides more control in its ability to specify `price`. See
[Limit Order With Funds](/exchange/docs/fix-msg-oe-lwf/) for more information on
how this order works.

## Time In Force

Time in force policies provide guarantees about the lifetime of an order. There
are four policies: good till canceled `GTC`, good till date `GTD`, immediate or
cancel `IOC`, and fill or kill `FOK`.

`GTC` Good till canceled orders remain open on the book until canceled. This is
the default behavior if no policy is specified.

`GTD` Good till date orders are valid till a specified date or time (within a
90-day hard limit) unless it has been already fulfilled or cancelled.

`IOC` Immediate or cancel orders instantly cancel the remaining size of the
limit order instead of opening it on the book.

`FOK` Fill or kill orders are rejected if the entire size cannot be matched.



Info

Match also refers to self trades.

## Post Only

The post-only flag indicates that the order should only make liquidity. If any
part of the order results in taking liquidity, the order will be rejected and no
part of it will execute.

## Holds

For `limit` `buy` orders, we hold `price x size x (1 + fee-percent)` USD. For
`sell` orders, we hold the number of Bitcoin you wish to sell. Actual fees are
assessed at time of trade. If you cancel a partially filled or unfilled order,
any remaining funds are released from hold.

For `market` `buy` orders where `funds` is specified, the `funds` amount is put
on hold. If only `size` is specified, all of your account balance (in the quote
account) is put on hold for the duration of the market order (usually a
trivially short time). For a `sell` order, the `size` in BTC is put on hold. If
`size` is not specified (and only `funds` is specified), your entire BTC balance
is put on hold for the duration of the market order.

## Self-Trade Prevention

Self-trading is not allowed on the exchange. Two orders from the same user are
not allowed to match with one another. To change the self-trade behavior,
specify the `stp` flag.

| Flag | Name                          |
| ---- | ----------------------------- |
| dc   | Decrease and Cancel (default) |
| co   | Cancel oldest                 |
| cn   | Cancel newest                 |
| cb   | Cancel both                   |

See the
[self-trade prevention](/exchange/docs/matching-engine#self-trade-prevention)
documentation for details about these fields.

## Order Lifecycle

The HTTP Request responds when an order is either rejected (insufficient funds,
invalid parameters, etc) or received (accepted by the matching engine). A `200`
response indicates that the order was received and is active. Active orders may
execute immediately (depending on price and market conditions) either partially
or fully. A partial execution puts the remaining size of the order in the `open`
state. An order that is filled completely, goes into the `done` state.

Users listening to streaming market data are encouraged to use the `client_oid`
field to identify their `received` messages in the feed. The REST response with
a server `order_id` may come after the `received` message in the public data
feed.

## Response

A successful order is assigned an order id. A successful order is defined as one
that has been accepted by the matching engine.



Info

Open orders do not expire and remain open until they are either filled or
canceled.

## Request Parameters

| Parameter        | Type    | Description                                                                                                             |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| profile_id       | string  | Create order on a specific `profile_id`. If none is passed, defaults to `default` profile.                              |
| type             | string  | Possible values: [limit, market, stop]                                                                                  |
| side             | string  | Possible values: [buy, sell]                                                                                            |
| product_id       | string  | Book on which to place an order                                                                                         |
| stp              | string  | Possible values: [dc, co, cn, cb]                                                                                       |
| stop             | string  | Possible values: [loss, entry]                                                                                          |
| stop_price       | string  | Price threshold at which a `stop` order will be placed on the book                                                      |
| price            | string  | Price per unit of cryptocurrency - required for `limit`/`stop` orders                                                   |
| size             | string  | Amount of base currency to buy or sell - required for `limit`/`stop` orders and `market` `sell`s                        |
| funds            | string  | Amount of quote currency to buy - required for `market` `buy`s                                                          |
| time_in_force    | string  | Possible values: [GTC, GTT, IOC, FOK]                                                                                   |
| cancel_after     | string  | Possible values: [min, hour, day]                                                                                       |
| post_only        | boolean | If true, order will only execute as a `maker` order                                                                     |
| client_oid       | string  | Optional Order ID selected by the user or the frontend client to identify their order                                   |
| max_floor        | string  | Placing an iceberg order. Use this to specify how much to show                                                          |
| stop_limit_price | string  | Required for take profit/stop loss orders. Denotes the updated limit price upon the activation of the stop loss trigger |

## API Response Details

### Response: 200 The new order that was successfully created

| Property           | Type      | Description                                                             |
| ------------------ | --------- | ----------------------------------------------------------------------- |
| id                 | string    | uuid                                                                    |
| price              | string    | price per unit of base currency                                         |
| size               | string    | amount of base currency to buy/sell                                     |
| product_id         | string    | book the order was placed on                                            |
| profile_id         | string    | profile_id that placed the order                                        |
| side               | string    | Possible values: [buy, sell]                                            |
| funds              | string    | amount of quote currency to spend (for market orders)                   |
| specified_funds    | string    | funds with fees                                                         |
| type               | string    | Possible values: [limit, market, stop]                                  |
| time_in_force      | string    | Possible values: [GTC, GTT, IOC, FOK]                                   |
| expire_time        | date-time | timestamp at which order expires                                        |
| post_only          | boolean   | if true, forces order to be `maker` only                                |
| created_at         | date-time | timestamp at which order was placed                                     |
| done_at            | date-time | timestamp at which order was done                                       |
| done_reason        | string    | reason order was done (filled, rejected, or otherwise)                  |
| reject_reason      | string    | reason order was rejected by engine                                     |
| fill_fees          | string    | fees paid on current filled amount                                      |
| filled_size        | string    | amount (in base currency) of the order that has been filled             |
| executed_value     | string    |                                                                         |
| status             | string    | Possible values: [open, pending, rejected, done, active, received, all] |
| settled            | boolean   | true if funds have been exchanged and settled                           |
| stop               | string    | Possible values: [loss, entry]                                          |
| stop_price         | string    | price (in quote currency) at which to execute the order                 |
| funding_amount     | string    |                                                                         |
| client_oid         | string    | client order id                                                         |
| market_type        | string    | market type where order was traded                                      |
| max_floor          | string    | maximum visible quantity for iceberg order                              |
| secondary_order_id | string    | order id for the visible order for iceberg order                        |
| stop_limit_price   | string    | stop limit price for TPSL order                                         |

### Response: 401 Unauthorized.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| message  | string |             |


---

# Get all fills


GET

https://api.exchange.coinbase.com/fills

Get a list of fills. A fill is a partial or complete match on a specific order.

Get a list of recent fills of the API key's profile.

## API Key Permissions

This endpoint requires either the "view" or "trade" permission.

## Settlement and Fees

Fees are recorded in two stages. Immediately after the matching engine completes
a match, the fill is inserted into our datastore. Once the fill is recorded, a
settlement process settles the fill and credit both trading counterparties.

The `fee` field indicates the fees charged for this individual fill.

### Liquidity

The `liquidity` field indicates if the fill was the result of a liquidity
provider or liquidity taker. `M` indicates Maker and `T` indicates Taker.

### Pagination

Fills are returned sorted by descending `trade_id` from the largest `trade_id`
to the smallest `trade_id`. The `CB-BEFORE` header has this first trade ID so
that future requests using the `cb-before` parameter fetch fills with a greater
trade ID (newer fills).

See [Pagination](/exchange/docs/rest-pagination) for more information.

## Query Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                  |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| order_id    | string | No       | limit to fills on a specific order. Either `order_id` or `product_id` is required.                                                                           |
| product_id  | string | No       | limit to fills on a specific product. Either `order_id` or `product_id` is required.                                                                         |
| limit       | int64  | No       | Limit on number of results to return.                                                                                                                        |
| before      | string | No       | Used for pagination. Sets start cursor to `before` id.                                                                                                       |
| after       | string | No       | Used for pagination. Sets end cursor to `after` id.                                                                                                          |
| market_type | string | No       | Market type which the order was filled in.                                                                                                                   |
| start_date  | string | No       | Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| end_date    | string | No       | Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |

## API Response Details

### Response: 200

| Property         | Type      | Description                                    |
| ---------------- | --------- | ---------------------------------------------- |
| trade_id         | int32     | id of trade that created the fill              |
| product_id       | string    | book the order was placed on                   |
| order_id         | string    | uuid                                           |
| user_id          | string    | id of user's account                           |
| profile_id       | string    | profile_id that placed the order               |
| liquidity        | string    | Possible values: [M, T, O]                     |
| price            | string    | price per unit of base currency                |
| size             | string    | amount of base currency to buy/sell            |
| fee              | string    | fees paid on current filled amount             |
| created_at       | date-time | timestamp of fill                              |
| side             | string    | Possible values: [buy, sell]                   |
| settled          | boolean   | true if funds have been exchanged and settled  |
| usd_volume       | string    | true if funds have been exchanged and settled  |
| market_type      | string    | market type which the order was filled in      |
| funding_currency | string    | funding currency which the order was filled in |

### Response: 401 Unauthorized.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| message  | string |             |


---

# Get all orders


GET

https://api.exchange.coinbase.com/orders

List your current open orders. Only open or un-settled orders are returned by
default. As soon as an order is no longer open and settled, it will no longer
appear in the default request. Open orders may change state between the request
and the response depending on market conditions.

## Pending Orders

Orders with a "pending" status have fewer fields in the response.

- Pending limit orders do not have `stp`, `time_in_force`, `expire_time`, and
  `post_only`.
- Pending market orders have the same fields as a pending limit order minus
  `price` and `size`, and no market specific fields (`funds`,
  `specified_funds`).
- Pending stop orders have the same fields as a pending limit order and no stop
  specific fields (`stop`, `stop_price`).

| Order Type           | Does Not Have These Fields                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Pending Limit Order  | `stp`, `time_in_force`, `expire_time`, `post_only`                                              |
| Pending Market Order | `stp`, `time_in_force`, `expire_time`, `post_only`, `price`, `size`, `funds`, `specified_funds` |
| Pending Stop Order   | `stp`, `time_in_force`, `expire_time`, `post_only`, `stop`, `stop_price`                        |

## API Key Permissions

This endpoint requires either the "view" or "trade" permission.



Tip

To specify multiple statuses, use the status query argument multiple times:
`/orders?status=done&status=pending`.

## Order Status and Settlement

Orders which are no longer resting on the order book, are marked with the `done`
status. There is a small window between an order being `done` and `settled`. An
order is settled when all of the fills have settled and the remaining holds (if
any) have been removed.

## Polling

For high-volume trading it is strongly recommended that you maintain your own
list of open orders and use one of the streaming market data feeds to keep it
updated. You should poll the open orders endpoint once when you start trading to
obtain the current state of any open orders.

`executed_value` is the cumulative match `size` \* `price` and is only present
for orders placed after 2016-05-20.



Info

Open orders can change state between the request and the response depending on
market conditions.

## Pagination

This request is paginated. See [Pagination](/exchange/docs/rest-pagination) for
more information.

## Query Parameters

| Parameter   | Type      | Required | Description                                              |
| ----------- | --------- | -------- | -------------------------------------------------------- |
| profile_id  | string    | No       | Filter results by a specific profile_id                  |
| product_id  | string    | No       | Filter results by a specific product_id                  |
| sortedBy    | string    | No       | Sort criteria for results.                               |
| sorting     | string    | No       | Ascending or descending order, by `sortedBy`             |
| start_date  | date-time | No       | Filter results by minimum posted date                    |
| end_date    | date-time | No       | Filter results by maximum posted date                    |
| before      | string    | No       | Used for pagination. Sets start cursor to `before` date. |
| after       | string    | No       | Used for pagination. Sets end cursor to `after` date.    |
| limit       | int64     | Yes      | Limit on number of results to return.                    |
| status      | string[]  | Yes      | Array with order statuses to filter by.                  |
| market_type | string    | No       | Market type which the order was traded in.               |

## API Response Details

### Response: 200

| Property           | Type      | Description                                                             |
| ------------------ | --------- | ----------------------------------------------------------------------- |
| id                 | string    | uuid                                                                    |
| price              | string    | price per unit of base currency                                         |
| size               | string    | amount of base currency to buy/sell                                     |
| product_id         | string    | book the order was placed on                                            |
| profile_id         | string    | profile_id that placed the order                                        |
| side               | string    | Possible values: [buy, sell]                                            |
| funds              | string    | amount of quote currency to spend (for market orders)                   |
| specified_funds    | string    | funds with fees                                                         |
| type               | string    | Possible values: [limit, market, stop]                                  |
| time_in_force      | string    | Possible values: [GTC, GTT, IOC, FOK]                                   |
| expire_time        | date-time | timestamp at which order expires                                        |
| post_only          | boolean   | if true, forces order to be `maker` only                                |
| created_at         | date-time | timestamp at which order was placed                                     |
| done_at            | date-time | timestamp at which order was done                                       |
| done_reason        | string    | reason order was done (filled, rejected, or otherwise)                  |
| reject_reason      | string    | reason order was rejected by engine                                     |
| fill_fees          | string    | fees paid on current filled amount                                      |
| filled_size        | string    | amount (in base currency) of the order that has been filled             |
| executed_value     | string    |                                                                         |
| status             | string    | Possible values: [open, pending, rejected, done, active, received, all] |
| settled            | boolean   | true if funds have been exchanged and settled                           |
| stop               | string    | Possible values: [loss, entry]                                          |
| stop_price         | string    | price (in quote currency) at which to execute the order                 |
| funding_amount     | string    |                                                                         |
| client_oid         | string    | client order id                                                         |
| market_type        | string    | market type where order was traded                                      |
| max_floor          | string    | maximum visible quantity for iceberg order                              |
| secondary_order_id | string    | order id for the visible order for iceberg order                        |
| stop_limit_price   | string    | stop limit price for TPSL order                                         |

### Response: 401 Unauthorized.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| message  | string |             |


---

# Cancel all orders


DELETE

https://api.exchange.coinbase.com/orders

With best effort, cancel all open orders. This may require you to make the
request multiple times until all of the open orders are deleted.

## API Key Permissions

This endpoint requires the "trade" permission.

## Examples

| Example                      | Response                                 |
| ---------------------------- | ---------------------------------------- |
| `/orders?product_id=FOO-BAR` | (404) ProductNotFound                    |
| `/orders?product_id=BtC-uSd` | (200) Cancel all orders for BTC-USD      |
| `/orders?Product_id=BTC-USD` | (400) Return BadRequest Error            |
| `/orders`                    | (200) Cancel all orders for all products |

## Query Parameters

| Parameter  | Type   | Required | Description                               |
| ---------- | ------ | -------- | ----------------------------------------- |
| profile_id | string | No       | Cancels orders on a specific profile      |
| product_id | string | No       | Cancels orders on a specific product only |

## API Response Details

### Response: 200 A list of the ids of open orders that were successfully cancelled

| Property | Type | Description |
| -------- | ---- | ----------- |

### Response: 401 Unauthorized.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| message  | string |             |


---

# Get single order


GET

https://api.exchange.coinbase.com/orders/{order\_id}

Get a single order by `id`.

## API Key Permissions

This endpoint requires either the "view" or "trade" permission.

Orders can be queried using either the exchange assigned `id` or the client
assigned `client_oid`. When using `client_oid` it must be preceded by the
`client:` namespace.

If the order is canceled, and if the order had no matches, the response might
return the status code `404`.



Info

Open orders can change state between the request and the response depending on
market conditions.

## Path Parameters

| Parameter | Type   | Required | Description                                                                                                                                          |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id  | string | Yes      | `order_id` is either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace. |

## Query Parameters

| Parameter   | Type   | Required | Description                                |
| ----------- | ------ | -------- | ------------------------------------------ |
| market_type | string | No       | Market type which the order was traded in. |

## API Response Details

### Response: 200

| Property           | Type      | Description                                                             |
| ------------------ | --------- | ----------------------------------------------------------------------- |
| id                 | string    | uuid                                                                    |
| price              | string    | price per unit of base currency                                         |
| size               | string    | amount of base currency to buy/sell                                     |
| product_id         | string    | book the order was placed on                                            |
| profile_id         | string    | profile_id that placed the order                                        |
| side               | string    | Possible values: [buy, sell]                                            |
| funds              | string    | amount of quote currency to spend (for market orders)                   |
| specified_funds    | string    | funds with fees                                                         |
| type               | string    | Possible values: [limit, market, stop]                                  |
| time_in_force      | string    | Possible values: [GTC, GTT, IOC, FOK]                                   |
| expire_time        | date-time | timestamp at which order expires                                        |
| post_only          | boolean   | if true, forces order to be `maker` only                                |
| created_at         | date-time | timestamp at which order was placed                                     |
| done_at            | date-time | timestamp at which order was done                                       |
| done_reason        | string    | reason order was done (filled, rejected, or otherwise)                  |
| reject_reason      | string    | reason order was rejected by engine                                     |
| fill_fees          | string    | fees paid on current filled amount                                      |
| filled_size        | string    | amount (in base currency) of the order that has been filled             |
| executed_value     | string    |                                                                         |
| status             | string    | Possible values: [open, pending, rejected, done, active, received, all] |
| settled            | boolean   | true if funds have been exchanged and settled                           |
| stop               | string    | Possible values: [loss, entry]                                          |
| stop_price         | string    | price (in quote currency) at which to execute the order                 |
| funding_amount     | string    |                                                                         |
| client_oid         | string    | client order id                                                         |
| market_type        | string    | market type where order was traded                                      |
| max_floor          | string    | maximum visible quantity for iceberg order                              |
| secondary_order_id | string    | order id for the visible order for iceberg order                        |
| stop_limit_price   | string    | stop limit price for TPSL order                                         |

### Response: 401 Unauthorized.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| message  | string |             |


---

# Cancel an order


DELETE

https://api.exchange.coinbase.com/orders/{order\_id}

Cancel a single open order by `{id}`.



Cancel a previously placed order

The order must belong to the profile that the API key belongs to. If the order
had no matches during its lifetime, its record may be purged. This means the
order details is not available with `GET /orders/<id>`.



Caution

To prevent a race condition when canceling an order, it is highly recommended
that you specify the product id as a query string.

## API Key Permissions

This endpoint requires the "trade" permission.

Orders can be canceled using either the exchange assigned `id` or the client
assigned `client_oid`. When using `client_oid` it must be preceded by the
`client:` namespace.

## Response

A successfully cancelled order response includes:

- the order ID if the order is cancelled with the exchange assigned `id`,
- the client assigned `client_oid` if the order is cancelled with client order
  ID.

## Cancel Reject

If the order could not be canceled (already filled or previously canceled,
etc.), then an error response indicates the reason in the `message` field.

## Path Parameters

| Parameter | Type   | Required | Description                                                                                                                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id  | string | Yes      | Orders may be canceled using either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the `client:` namespace. |

## Query Parameters

| Parameter  | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| profile_id | string | No       | Cancels orders on a specific profile |
| product_id | string | No       | Optional product id of order         |

## API Response Details

### Response: 200 the id of the order that was cancelled`

| Property | Type | Description |
| -------- | ---- | ----------- |

### Response: 401 Unauthorized.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| message  | string |             |


---

