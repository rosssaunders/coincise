# Coinbase Exchange API Documentation

Generated on Sat Mar 29 13:21:05 GMT 2025

## Table of Contents

* [# Welcome to Exchange APIs](#--welcome-to-exchange-apis)
* [# Quickstart: Making Your First REST API Call](#--quickstart--making-your-first-rest-api-call)
* [# Exchange Sandbox](#--exchange-sandbox)
* [# Exchange Matching Engine](#--exchange-matching-engine)
* [# Exchange Rate Limits Overview](#--exchange-rate-limits-overview)
* [# Exchange Systems & Operations](#--exchange-systems---operations)
* [# Exchange REST API Requests](#--exchange-rest-api-requests)
* [# Exchange REST API Authentication](#--exchange-rest-api-authentication)
* [# Exchange REST API Rate Limits](#--exchange-rest-api-rate-limits)
* [# Exchange REST API Pagination](#--exchange-rest-api-pagination)
* [# Exchange Profiles](#--exchange-profiles)
* [# Exchange Types](#--exchange-types)
* [# List trading pairs](#--list-trading-pairs)
* [# Get all product volume](#--get-all-product-volume)
* [# Get single product](#--get-single-product)
* [# Get product book](#--get-product-book)
* [# Get product candles](#--get-product-candles)
* [# Get product stats](#--get-product-stats)
* [# Get product ticker](#--get-product-ticker)
* [# Get product trades](#--get-product-trades)

---

# # Welcome to Exchange APIs


Welcome to Coinbase Exchange API documentation for traders and developers! The APIs are separated into two categories, trading and market data:

*   **Trading APIs** require authentication and let you place orders and access account information.
*   **Market Data APIs** provide market data and are public.

Coinbase Exchange offers multiple connectivity options tailored to your trading and data needs:

*   [REST API](/exchange/docs/rest-requests) for lower-frequency trading and general requests.
*   [FIX Order Entry API](/exchange/docs/fix-msg-order-entry-50) for higher-frequency trading.
*   [WebSocket Feed](/exchange/docs/websocket-overview) for market data.
*   [FIX Market Data API](/exchange/docs/fix-msg-market-data) for latency sensitive market data feeds.

Exchange's developer docs are part of [Coinbase Developer Platform](/), the single portal from which to access Coinbase's full suite of APIs and blockchain infrastructure products.



Info

By accessing the Exchange Market Data API, you agree to be bound by the [Market Data Terms of Use](https://www.coinbase.com/legal/market_data).

Last updated on **Feb 25, 2025**
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

# # Exchange Sandbox


A public sandbox is available for testing API connectivity and web trading.



Sandbox is subset

The sandbox hosts a _subset_ of the production order books and supports all exchange functionality _except_ [Transfers](/exchange/docs/sandbox#unsupported-features). You can add unlimited fake funds for testing.



Info

Login sessions and API keys are separate from production. Log into the [sandbox web interface](https://public.sandbox.exchange.coinbase.com) to create an API key, deposit/withdraw funds, etc.

## Sandbox URLs

Use the following URLs to test your API connectivity. See the [Runbook](/exchange/docs/runbook#production-urls) for Production URLs.

| API | URL |
| --- | --- |
| REST API | `https://api-public.sandbox.exchange.coinbase.com` |
| Websocket Feed | `wss://ws-feed-public.sandbox.exchange.coinbase.com` |
| Websocket Direct Feed | `wss://ws-direct.sandbox.exchange.coinbase.com` |
| FIX API - Order Entry 4.2 | `tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198` |
| FIX API - Order Entry 5.0 SP2 | `tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121` |
| FIX API - Market Data 5.0 SP2 | `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121` |

  

## Sandbox SSL Certificate

Your FIX SSL client must validate the following sandbox FIX server SSL certificate:

```
-----BEGIN CERTIFICATE-----MIIEdDCCA1ygAwIBAgIQD03L1cHVypYSDFuvcnpAHzANBgkqhkiG9w0BAQsFADBGMQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRUwEwYDVQQLEwxTZXJ2ZXIgQ0EgMUIxDzANBgNVBAMTBkFtYXpvbjAeFw0yMjAzMjcwMDAwMDBaFw0yMzA0MjUyMzU5NTlaMCoxKDAmBgNVBAMMHyouc2FuZGJveC5leGNoYW5nZS5jb2luYmFzZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8LYRdqMoVNa/0M4MF+Wkr8SiybZ95JycTE+0ZVmf92DKo4I8m/8fBtOrH0jgrhvamVSJ0lI6VFiAzlTd1doUbliQ9Xm1aE/YHQO9J64AIP97peysgHBd+g3/Vhz33aaaU2vyHH5kPHiekU8n/ObXPPoFd/Awul8uxxlXsVFx8oBWL2MeMjLNLLWNiGWq+lQloGKsQYVR/fQZizvpPvyZO6pCLRId6+Wq3Tcb7NHQZc6+tePVi+5fovE+lm/yQrhjGqDzI7P4rWjJqCPrAsYJeYFcVJhdSuFY2Ngm8eKeDP14TVEs9pkIWvyMGmB17QBPbRJipdoKu1N6fsx54N9JDAgMBAAGjggF4MIIBdDAfBgNVHSMEGDAWgBRZpGYGUqB7lZI8o5QHJ5Z0W/k90DAdBgNVHQ4EFgQUa5RZ0yvv71YteSuqO1VRvmGGKv0wKgYDVR0RBCMwIYIfKi5zYW5kYm94LmV4Y2hhbmdlLmNvaW5iYXNlLmNvbTAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMD0GA1UdHwQ2MDQwMqAwoC6GLGh0dHA6Ly9jcmwuc2NhMWIuYW1hem9udHJ1c3QuY29tL3NjYTFiLTEuY3JsMBMGA1UdIAQMMAowCAYGZ4EMAQIBMHUGCCsGAQUFBwEBBGkwZzAtBggrBgEFBQcwAYYhaHR0cDovL29jc3Auc2NhMWIuYW1hem9udHJ1c3QuY29tMDYGCCsGAQUFBzAChipodHRwOi8vY3J0LnNjYTFiLmFtYXpvbnRydXN0LmNvbS9zY2ExYi5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsFAAOCAQEATpjyCMwAOSFKFTA67UaVkDCjz/ULBY6PL4JwTJ+7kmT+HMvGimx15CsVjne64bT5twWlzqA/l4h25HGj0hD0TU2ktqmFhfAmDpjGVp4KgIcZpvv7oRIU4e5I422Y++2UVuATwLWdELgpnm4AVq1aqI10XrQlJeHLgRVfV5qkr9Vsc+fk7HY7YwbNQk2jXbRaj22f6GxiJ/6VmUcCD7zZ1GZtUipv0JEyPtWD/BbSKNx1GJnLZ6L+QytPs+MW+FEetlU/oqPuyYRhmJUBUiwKkm6yKWRj9tQfsq0a4uLI3SUgsBv/CQ/Qa9LnRdNjvlWSKLzeIX2LU9rE/3F3oQh7HQ==-----END CERTIFICATE-----
```

## Unsupported Features

The Transfer endpoints are _not_ available for testing in the Sandbox:

*   [Withdraw to payment](/exchange/reference/exchangerestapi_postwithdrawpaymentmethod)
*   [Deposit from payment](/exchange/reference/exchangerestapi_postdepositpaymentmethod)
*   [Deposit from Coinbase account](/exchange/reference/exchangerestapi_postdepositcoinbaseaccount)
*   [Withdraw to crypto address](/exchange/reference/exchangerestapi_postwithdrawcrypto)
*   [Withdraw to Coinbase Account](/exchange/reference/exchangerestapi_postwithdrawcoinbaseaccount)

## Creating API Keys

To create an API key in the sandbox web interface:

1.  Go to the [sandbox web interface](https://public.sandbox.exchange.coinbase.com)
2.  Create an account or sign in.
3.  Go to **API** in your profile dropdown menu.
4.  Click **New API Key**.

## Managing Funds

To add or remove funds in the sandbox web interface:

1.  Go to the **Portfolios** tab.
2.  Click the **Deposit** and **Withdraw** buttons as you would on the production web interface.

Last updated on **Aug 27, 2024**
---

# # Exchange Matching Engine


Coinbase Exchange operates a continuous first-come, first-serve order book. Orders are executed in price-time priority as received by the matching engine.

## Self-Trade Prevention

Self-trading is not allowed on Coinbase Exchange. When two orders from the same user cross, they do not fill one another.



Caution

The STP instruction on the taker order (latest order) takes precedence over the older/resting order.

You can define your self-trade prevention behavior when [placing an order](/exchange/reference/exchangerestapi_postorders#self-trade-prevention) with the STP flag:

| Self-Trade Prevention Option | STP Flag | Description |
| --- | --- | --- |
| Decrement &amp; cancel (default) | `dc` | Cancel smaller order and decrement larger order by the smaller size. If the same size, cancel both. |
| Cancel oldest | `co` | Cancel older (resting) order in full. Continue to execute the newer taking order. |
| Cancel newest | `cn` | Cancel newer (taking) order in full. Let the old resting order remain on the order book. |
| Cancel both | `cb` | Cancel both orders immediately. |

  

## Market Orders

When a `market` order using decrement and cancel (`dc` ) self-trade prevention encounters an open limit order, the behavior depends on which fields were specified for the market order.

*   If `funds` and `size` are specified:
    
    *   For a market buy order, size is decremented internally within the matching engine and funds remain unchanged. The intent is to offset your target size without limiting your buying power.
*   If `funds` is specified (and not `size`):
    
    *   For a market buy order, funds are decremented.
    *   For a market sell order, size is decremented when encountering existing limit orders.

## Price Improvement

Orders are matched against existing order book orders at the price of the order _on the book_, not at the price of the taker order.

**Example**

User A places a buy order for 1 BTC at 100 USD. Then User B places a sell order for 1 BTC at 80 USD. The result is that the trade occurs at 100 USD because User A's order was first to the trading engine and User A has price priority.

## Order Lifecycle

| Order State | Description |
| --- | --- |
| `received` | Valid orders that are sent to the matching engine and confirmed immediately. |
| `open` | Any part of the order not filled immediately. Orders stay open until canceled or filled by new orders. |
| `done` | An full order executed against another order immediately. A partial order filled or canceled (and no longer eligible for matching) |

  

Last updated on **Feb 25, 2025**
---

# # Exchange Rate Limits Overview


## Summary



Info

Private endpoints are authenticated.

### [REST API Rate Limits](/exchange/docs/rest-rate-limits)

#### Public Endpoints

*   Requests per second per IP: 10
*   Requests per second per IP in bursts: Up to 15

#### Private Endpoints

*   Requests per second per profile: 15
*   Requests per second per profile in bursts: Up to 30

#### Private `/fills` Endpoint

*   Requests per second per profile: 10
*   Requests per second per profile in bursts: Up to 20

#### Private `/loans` Endpoint

*   Requests per second per profile: 10



Info

Rate limits do not apply to [List loan assets](/exchange/reference/exchangerestapi_getloanassets) (`/loans/assets`) which is not private.

### [FIX API Rate Limits](/exchange/docs/fix-rate-limits)

#### FIX 4.2 Rate Limits

*   Requests per rolling second per session: 50
*   Messages per second in bursts: 100

#### FIX 5.0 Rate Limits

*   2 logons per second per API key
*   100 requests per second



Caution

Your FIX 5 session is disconnected if your messages exceed 200 messages per second

#### FIX Maximums

*   Maximum API keys per session/connection: 1
*   Maximum connections per profile: 75 . See [FIX Best Practices](/exchange/docs/fix-best-practices).
*   Maximum connections per user across all profiles: 175
*   Maximum profiles per user: 100
*   Maximum orders per batch message message (new and cancelled): 15

### [Websocket Rate Limits](/exchange/docs/websocket-rate-limits)

*   Requests per second per IP: 8
*   Requests per second per IP in bursts: Up to 20
*   Messages sent by the client every second per IP: 100

### Other

*   Maximum open orders: 500

## How Rate Limits Work

Rate-limiting for both the Exchange REST API and the FIX API use a **lazy-fill token bucket** implementation.

A TokenBucket stores a maximum amount of tokens, which is the **burst size**, and fills at a given rate called the **refresh rate**. The bucket starts full, and as requests are received, a token is removed for each request. Tokens are continuously added to the bucket at the refresh rate until full.

When a user sends a request, the TokenBucket calculates whether or not to rate limit the user as follows:

1.  Fill the user's TokenBucket to a token size based on the following formula: `token_amount = min(burst, previous_token_amount + (current_time - previous_request_time) * refresh_rate)`
2.  Remove 1 token if possible, otherwise rate limit the request.
3.  Repeat Steps 1 and 2 for each subsequent request.

### TokenBucket Example

Let's say you have a TokenBucket with burst = 3 and refresh\_rate = 1. The table below represents the state of your token bucket after a series of requests:

| Action | Time | Tokens | Notes |
| --- | --- | --- | --- |
| Initial State | 0.0 | 3.0 | New TokenBucket is initialized to max capacity (burst) |
| Request 1 | 0.5 | 2.0 | Fill TokenBucket, then remove a token, because we are at max capacity, and subtract 1 token from 3 |
| Request 2 | 0.8 | 1.3 | Fill TokenBucket to 2.3 (`min(3, (2 + (.8 - .5) * 1.0)) = min(3, 2.3) = 2.3`), then subtract 1 |
| Request 3 | 0.9 | 0.4 | Fill TokenBucket to 1.4 (`min(3, (1.3 + (.9 - .8) * 1.0)) = min(3, 1.4) = 1.4`), then subtract 1 |
| Request 4 | 1.0 | 0.5 | Fill TokenBucket to 0.5 (`min(3, (.4 + (1.0 - .9) * 1.0)) = min(3, 0.5) = 0.5`). Ratelimit because we don't have enough tokens available |
| Request 5 | 1.4 | 0.9 | Fill TokenBucket to 0.9 (`min(3, (0.5 + (1.4 - 1.0) * 1.0)) = min(3, 0.9) = 0.9`). Ratelimit because we don't have enough tokens available |
| Request 6 | 1.8 | 0.3 | Fill TokenBucket to 1.3 (`min(3, (0.9 + (1.8 - 1.4) * 1.0)) = min(3, 1.3) = 1.3`), then remove 1 |
| Request 7 | 5.0 | 2.0 | Fill TokenBucket to 3.0 (`min(3, (0.3 + (5.0 - 1.8) * 1.0)) = min(3, 3.5) = 3`), since we would "overflow" with our calculations, then subtract 1 |

  

Last updated on **Feb 25, 2025**
---

# # Exchange Systems & Operations


## Deployment

The deployment schedules for different components vary and may change without notice.

| API | Schedule |
| --- | --- |
| FIX | Monday, Thursday at 2PM ET |
| WebSocket | Monday, Wednesday, Thursday at 2PM ET |
| REST | Monday, Wednesday, Thursday at 2PM ET |

  

## Production URLs

Use the following URLs to connect to Coinbase Exchange production APIs. See [Sandbox URLs](/exchange/docs/sandbox) for testing.

| API | URL |
| --- | --- |
| REST API | `https://api.exchange.coinbase.com` |
| Websocket Feed | `wss://ws-feed.exchange.coinbase.com` |
| Websocket Direct Feed | `wss://ws-direct.exchange.coinbase.com` |
| FIX API - Order Entry 4.2 | `tcp+ssl://fix.exchange.coinbase.com:4198` |
| FIX API - Order Entry 5.0 SP2 | `tcp+ssl://fix-ord.exchange.coinbase.com:6121` |
| FIX API - Market Data 5.0 SP2 | `tcp+ssl://fix-md.exchange.coinbase.com:6121` |

  

## Availability Zones

The infrastructure for the US Spot Exchange is hosted in **US-EAST-1 (AWS)** within multiple availability zones.



Caution

The following information is subject to change without notification, and there is no guarantee that it will remain static over time.

| Product | Availability Zone ID |
| --- | --- |
| FIX Order Gateways | use1-az4 |
| Order Entry Gateway | use1-az4 |
| Trade Engine | use1-az4 |
| Web Socket Market Data | use1-az4 |
| FIX Market Data | use1-az4 |

  

## System Components

### REST Entry Gateways

*   Requests are routed through Cloudflare.
*   Requests are processed on a FIFO basis with no queuing.
*   REST requires additional authentication because it's stateless (as opposed to FIX order gateways, which authenticate during login).

### FIX Order Gateways

*   Each instance contains a per-user product based queue.
*   Each per-user product-based queue can hold a maximum of 50 queued requests before requests are rejected.
*   Each per-user product-based queue is processed on a FIFO basis.

### Order Entry Gateway (Risk System)

*   Each instance processes requests from FIX Order Gateways and REST in real time with no queuing.
*   System performs real-time risk checks and account collateralization.

### Trade Engine

*   Clustered service that guarantees FIFO sequencing at a product level.
*   Processes all requests from Order Entry Gateway.
*   Publishes market data to WebSocket / FIX Market Data.

### Market Data (Websocket & FIX)

*   Each instance can process all market data requests across all products.
*   Messages are distributed to customers randomly, and there is no intended benefit to being “first to subscribe”.

Last updated on **Feb 25, 2025**
---

# # Exchange REST API Requests


All requests and responses are `application/json` content type and follow typical HTTP response status codes for success and failure.

Note: Request URLs must be lowercase as URLs are [case-sensitive](https://www.w3.org/TR/WD-html40-970708/htmlweb.html).

## Errors

```
{  "message": "Invalid Price"}
```

Unless otherwise stated, errors to bad requests respond with HTTP 4xx or status codes. The body also contains a `message` parameter indicating the cause. Your language's http library should be configured to provide message bodies for non-2xx requests so that you can read the message field from the body.

### Common Error Codes

| Status Code | Reason |
| --- | --- |
| 400 | Bad Request -- Invalid request format |
| 401 | Unauthorized -- Invalid API Key |
| 403 | Forbidden -- You do not have access to the requested resource |
| 404 | Not Found |
| 500 | Internal Server Error -- We had a problem with our server |

  

## Success

A successful response is indicated by HTTP status code 200 and may contain an optional body. If the response has a body it is documented under each resource below.

Last updated on **Feb 25, 2025**
---

# # Exchange REST API Authentication


This page explains how to sign and authenticate REST API endpoints with API keys that let you control authorization.



Note

See [FIX API Connectivity](/exchange/docs/fix-connectivity) for FIX API authentication.

## Private Endpoints

Private endpoints are available for order management and account management. Every private request must be signed using the described authentication scheme.



Info

Private endpoints require authentication using your Coinbase Exchange API key. You can generate API keys [here](https://exchange.coinbase.com/profile/api).

## API Keys

To sign a request, you must create an API key via the Coinbase Exchange website. The API key is scoped to a specific profile. Each user can generate a max of 300 API keys.

### Generating an API Key

When creating a key, you must remember (and should write down) your (1) key, (2) secret, and (3) passphrase. The key and secret are randomly generated and provided by Coinbase Exchange -- you choose a passphrase to further secure your API access.



Warning

Coinbase Exchange stores the salted hash of your passphrase for verification and cannot be recovered if you forget it.

### API Key Permissions

You can control access by restricting the functionality of API keys. Before creating the key, you must choose what permissions you would like the key to have:

| Permission | Description |
| --- | --- |
| View | Key has read permissions for all endpoints (including GET) |
| Transfer | Key can transfer value for accounts, including deposits/withdrawals (and bypasses 2FA) |
| Trade | Key can post orders and get data |
| Manage | Key can manage user settings and preferences such as address books entries |

  

Refer to the documentation below to see what API key permissions are required for a specific route.

## Signing Requests

All REST requests must contain the following headers:

| Header | Description |
| --- | --- |
| `CB-ACCESS-KEY` | API key as a string |
| `CB-ACCESS-SIGN` | base64-encoded signature (see [Signing a Message](#signing-a-message)) |
| `CB-ACCESS-TIMESTAMP` | Timestamp for your request |
| `CB-ACCESS-PASSPHRASE` | Passphrase you specified when creating the API key |

  

All request bodies should have content type `application/json` and be valid JSON.

### Selecting a Timestamp

The `CB-ACCESS-TIMESTAMP` header MUST be number of seconds since [Unix Epoch](http://en.wikipedia.org/wiki/Unix_time) in UTC. Decimal values are allowed.

Your timestamp must be within 30 seconds of the API service time or your request is considered expired and rejected. We recommend using the [time](https://api.exchange.coinbase.com/time) endpoint to query for the API server time if you believe there is a time difference between your server and the API servers.

### Signing a Message

The `CB-ACCESS-SIGN` header is generated by creating a sha256 HMAC using the base64-decoded secret key on the prehash string `timestamp + method + requestPath + body` (where `+` represents string concatenation) and base64-encode the output.



Info

Remember to base64-decode the alphanumeric secret string (resulting in 64 bytes) before using it as the key for HMAC. Also, base64-encode the digest output before sending in the header.

*   `timestamp` is the same as the `CB-ACCESS-TIMESTAMP` header.
    
*   `method` should be UPPER CASE e.g., `GET` or `POST`.
    
*   `requestPath` should only include the path of the API endpoint.
    
*   `body` is the request body string or omitted if there is no request body (typically for `GET` requests).
    

### Signature Example

The following example demonstrates how to generate a signature in Javascript:

```
// import crypto libraryvar crypto = require("crypto");// create the json request objectvar cb_access_timestamp = Date.now() / 1000; // in msvar cb_access_passphrase = "...";var secret = "PYPd1Hv4J6/7x...";var requestPath = "/orders";var body = JSON.stringify({  price: "1.0",  size: "1.0",  side: "buy",  product_id: "BTC-USD",});var method = "POST";// create the prehash string by concatenating required partsvar message = cb_access_timestamp + method + requestPath + body;// decode the base64 secretvar key = Buffer.from(secret, "base64");// create a sha256 hmac with the secretvar hmac = crypto.createHmac("sha256", key);// sign the require message with the hmac and base64 encode the resultvar cb_access_sign = hmac.update(message).digest("base64");
```

Last updated on **May 20, 2024**
---

# # Exchange REST API Rate Limits


Public endpoints are throttled by IP and private endpoints by profile ID. Some endpoints (like `/fills`) may have custom rate limits.

When a REST API rate limit is exceeded, a status of `429 Too Many Requests` is returned.

#### Public Endpoints

*   Requests per second per IP: 10
*   Requests per second per IP in bursts: Up to 15

#### Private Endpoints

Private endpoints are authenticated.

*   Requests per second per profile: 15
*   Requests per second per profile in bursts: Up to 30

#### Private `/fills` Endpoint

*   Requests per second per profile: 10
*   Requests per second per profile in bursts: Up to 20

#### Private `/loans` Endpoint

*   Requests per second per profile: 10



Info

Rate limits do not apply to [List loan assets](/exchange/reference/exchangerestapi_getloanassets) (`/loans/assets`) which is not private.

Last updated on **Dec 7, 2024**
---

# # Exchange REST API Pagination


Coinbase Exchange uses cursor pagination for all REST requests which return arrays.

Cursor pagination allows for fetching results before and after the current page of results and is well suited for realtime data. Endpoints like `/trades`, `/fills`, `/orders`, return the latest items by default. To retrieve more results subsequent requests should specify which direction to paginate based on the data previously returned.

`before` and `after` cursors are available via response headers `CB-BEFORE` and `CB-AFTER`. Your requests should use these cursor values when making requests for pages after the initial request.

### Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `before` |  | Request page before (newer) this pagination id |
| `after` |  | Request page after (older) this pagination id |
| `limit` | 1000 | Number of results per request. Maximum 1000 (default 1000) |

  

### Example

`GET /orders?before=2&limit=30`

### Before and After cursors

The `before` cursor references the first item in a results page and the `after` cursor references the last item in a set of results.

#### Before Cursor

To request a page of records before the current one, use the `before` query parameter. Your initial request can omit this parameter to get the default first page.

The response contains a `CB-BEFORE` header which returns the cursor id to use in your next request for the page before the current one. **The page before is a newer page and not one that happened before in chronological time.**

#### After Cursor

The response also contains a `CB-AFTER` header which returns the cursor id to use in your next request for the page after this one. **The page after is an older page and not one that happened after this one in chronological time.**

Cursor pagination can be unintuitive at first. `before` and `after` cursor arguments should not be confused with before and after in chronological time. Most paginated requests return the latest information (newest) as the first page sorted by newest (in chronological time) first. To get older information you would request pages `after` the initial page. To get information newer, you would request pages `before` the first page.

Last updated on **Feb 25, 2025**
---

# # Exchange Profiles


Profiles are the equivalent of portfolios on the [Coinbase Exchange](https://exchange.coinbase.com/portfolios) website. The maximum number of profiles is 100 .

## API Keys

An API key is scoped to a specific profile. An API key can only view and create data that belongs to its own profile, unless otherwise noted. This is true for the REST API, FIX API and Websocket Feed.

To access data or actions on a different profile, create a new API key on the Coinbase Exchange website.

## Deleted Profiles

Profiles can be deleted on the Coinbase Exchange website. The permissions of an API key associatd with a deleted profile are automatically set to "View."

Last updated on **May 9, 2024**
---

# # Exchange Types


## Timestamps

```
2014-11-06T10:34:47.123456Z
```

Unless otherwise specified, all timestamps from API are returned in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) with microseconds. Make sure you can parse the following ISO 8601 format. Most modern languages and libraries handle this without issues.

## Numbers

Decimal numbers are returned as strings to preserve full precision across platforms. When making a request, it is recommended that you also convert your numbers to strings to avoid truncation and precision errors.

Integer numbers (such as trade id and sequence) are unquoted.

## IDs

Most identifiers are UUID unless otherwise specified. When making a request which requires a UUID, both forms (with and without dashes) are accepted.

`132fb6ae-456b-4654-b4e0-d681ac05cea1` or `132fb6ae456b4654b4e0d681ac05cea1`

Last updated on **May 8, 2024**
---

# # List trading pairs


GET

https://api.exchange.coinbase.com/products

Gets a list of available currency pairs for trading.



Order Size Limits Removed

The properties `base_max_size`, `base_min_size`, `max_market_funds` were [removed on June 30](/exchange/docs/changelog#2022-jun-30).

The property, `min_market_funds`, has been repurposed as the notional minimum size for limit orders.

The `base_min_size` and `base_max_size` fields define the min and max order size.

The `min_market_funds` and `max_market_funds` fields define the min and max funds allowed in a market order.

`status_message` provides any extra information regarding the status if available.

The `quote_increment` field specifies the min order price as well as the price increment.

The order price must be a multiple of this increment (i.e. if the increment is 0.01, order prices of 0.001 or 0.021 would be rejected).

The `base_increment` field specifies the minimum increment for the `base_currency`.

`trading_disabled` indicates whether trading is currently restricted on this product, this includes whether both new orders and order cancellations are restricted.

`cancel_only` indicates whether this product only accepts cancel requests for orders.

`post_only` indicates whether only maker orders can be placed. No orders will be matched when post\_only mode is active.

`limit_only` indicates whether this product only accepts limit orders.

Only a maximum of one of `trading_disabled`, `cancel_only`, `post_only`, `limit_only` can be true at once. If none are true, the product is trading normally.

`fx_stablecoin` indicates whether the currency pair is a Stable Pair.

`auction_mode` boolean which indicates whether or not the book is in auction mode. For more details on the auction mode see [Get product book](/exchange/reference/exchangerestapi_getproductbook) describing the level 1 book which contains information pertaining to products in auction mode.



Info

When limit\_only is true, matching can occur if a limit order crosses the book. Product ID will not change once assigned to a product but all other fields ares subject to change.

## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| type | string | No |  |

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | string |  |
| base_currency | string |  |
| quote_currency | string |  |
| quote_increment | string | Min order price (a.k.a. price increment |
| base_increment | string |  |
| display_name | string |  |
| min_market_funds | string |  |
| margin_enabled | boolean |  |
| post_only | boolean |  |
| limit_only | boolean |  |
| cancel_only | boolean |  |
| status | string | Possible values: [online, offline, internal, delisted] |
| status_message | string |  |
| trading_disabled | boolean |  |
| fx_stablecoin | boolean |  |
| max_slippage_percentage | string |  |
| auction_mode | boolean |  |
| high_bid_limit_percentage | string | Percentage to calculate highest price for limit buy order (Stable coin trading pair only) |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Get all product volume


GET

https://api.exchange.coinbase.com/products/volume-summary

Gets 30day and 24hour volume for all products and market types

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | string |  |
| base_currency | string |  |
| quote_currency | string |  |
| display_name | string |  |
| market_types | object[] |  |
| spot_volume_24hour | string |  |
| spot_volume_30day | string |  |
| rfq_volume_24hour | string |  |
| rfq_volume_30day | string |  |
| conversion_volume_24hour | string |  |
| conversion_volume_30day | string |  |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Get single product


GET

https://api.exchange.coinbase.com/products/{product\_id}

Get information on a single product.

## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| product_id | string | Yes |  |

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | string |  |
| base_currency | string |  |
| quote_currency | string |  |
| quote_increment | string | Min order price (a.k.a. price increment |
| base_increment | string |  |
| display_name | string |  |
| min_market_funds | string |  |
| margin_enabled | boolean |  |
| post_only | boolean |  |
| limit_only | boolean |  |
| cancel_only | boolean |  |
| status | string | Possible values: [online, offline, internal, delisted] |
| status_message | string |  |
| trading_disabled | boolean |  |
| fx_stablecoin | boolean |  |
| max_slippage_percentage | string |  |
| auction_mode | boolean |  |
| high_bid_limit_percentage | string | Percentage to calculate highest price for limit buy order (Stable coin trading pair only) |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Get product book


GET

https://api.exchange.coinbase.com/products/{product\_id}/book

Get a list of open orders for a product. The amount of detail shown can be customized with the `level` parameter.

## Details

By default, only the inside (i.e., the best) bid and ask are returned. This is equivalent to a book depth of 1 level. To see a larger order book, specify the `level` query parameter.

If a level is not aggregated, all of the orders at each price are returned. Aggregated levels return only one size for each active price (as if there was only a single order for that size at the level).

## Levels

| Level | Description |
| --- | --- |
| 1 | The best bid, ask and auction info |
| 2 | Full order book (aggregated) and auction info |
| 3 | Full order book (non aggregated) and auction info |

  

**Levels 1 and 2 are aggregated**. The `size` field is the sum of the size of the orders at that `price`, and `num-orders` is the count of orders at that `price`; `size` should not be multiplied by `num-orders`.

**Level 3 is non-aggregated** and returns the entire order book.

## Auction Mode

While the book is in an auction, the L1, L2 and L3 book contain the most recent indicative quote disseminated during the auction, and `auction_mode` is set to true.

These indicative quote messages are sent on an interval basis (approximately once a second) during the collection phase of an auction and includes information about the tentative price and size affiliated with the completion.

*   Opening Price - The price used for matching all the orders as the auction enters the opening state.
*   Opening Size - Aggregate size of all the orders eligible for crossing Best Bid/Ask Price and Size. The anticipated BBO upon entering trading after matching has completed.

Because these indicative quote messages get disseminated on an interval basis, the values aren’t firm as changes in the book may occur between the last update and beginning the transition from auction mode to trading.

While in auction mode, the auction\_state indicates what phase the auction is in which includes:

| auction_state |
| --- |
| collection |
| opening |
| complete |

  

## Auction Details

The `collection` state indicates the auction is currently accepting orders and cancellations within the book. During this state, orders do not match and the book may appear crossed in the market data feeds.

The `opening` state indicates the book transitions towards full trading or limit only. During `opening` state any buy orders at or over the open price and any sell orders at or below the open price may cross during the opening phase. Matches in this stage are charged taker fees. Any new orders or cancels entered while in the opening phase get queued and processed when the market resumes trading.

The `complete` state indicates the dissemination of opening trades is finishing, and immediately after that the book goes into the next mode (either full trading or limit only).

The `opening` state passes by too quickly in most normal scenarios to see these states show up in the REST API.

During the `collection` state the `can_open` field indicates whether or not the book can complete the auction and enter full trading or limit only mode.

`can_open: yes` indicates the book is in a healthy state and the book can enter full trading or limit only once the auction collection state finishes.

`can_open: no` indicates the book cannot continue to full trading or limit only.

Once a book leaves auction mode — either by moving to full trading, or by being canceled by our market ops team — the book endpoint no longer shows indicative quote data and display `auction_mode` as false.



Info

This request is NOT paginated. The entire book is returned in one response.



Info

Level 1 and Level 2 are recommended for polling. For the most up-to-date data, consider using the WebSocket stream. Level 3 is only recommended for users wishing to maintain a full real-time order book using the WebSocket stream. Abuse of Level 3 via polling can cause your access to be limited or blocked.

## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| product_id | string | Yes |  |

## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| level | int32 | No |  |

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| bids | object[] |  |
| asks | object[] |  |
| sequence | double |  |
| auction_mode | boolean |  |
| auction | object | open_pricestringopen_sizestringbest_bid_pricestringbest_bid_sizestringbest_ask_pricestringbest_ask_sizestringauction_statestringcan_openstringtimedate-time |
| open_price | string |  |
| open_size | string |  |
| best_bid_price | string |  |
| best_bid_size | string |  |
| best_ask_price | string |  |
| best_ask_size | string |  |
| auction_state | string |  |
| can_open | string |  |
| time | date-time |  |
| time | date-time |  |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Get product candles


GET

https://api.exchange.coinbase.com/products/{product\_id}/candles

Historic rates for a product. Rates are returned in grouped buckets. Candle schema is of the form `[timestamp, price_low, price_high, price_open, price_close]`



Caution

*   Historical rate data may be incomplete. No data is published for intervals where there are no ticks.
*   Historical rates should _not_ be polled frequently. For real-time info, use the trade and book endpoints in conjunction with the WebSocket feed.

## Time Range

If the `start` or `end` fields are not provided, both fields are ignored. If a custom time range is not declared, then one ending now is selected.

The `granularity` field must be one of the following "second" values: `{60, 300, 900, 3600, 21600, 86400}`, or your request is rejected. These values correspond to timeslices representing one minute, five minutes, fifteen minutes, one hour, six hours, and one day, respectively.

If data points are readily available, your response may contain as many as 300 candles and some of those candles may precede your declared `start` value.

## Max Candles



Info

The maximum number of data points for a single request is 300 candles.

If your selection of start/end time and granularity results in more than 300 data points, your request is rejected. To retrieve fine granularity data over a larger time range, you must make multiple requests with new start/end ranges.

## Response Items

Each bucket is an array of the following information:

*   `time` bucket start time
*   `low` lowest price during the bucket interval
*   `high` highest price during the bucket interval
*   `open` opening price (first trade) in the bucket interval
*   `close` closing price (last trade) in the bucket interval
*   `volume` volume of trading activity during the bucket interval

## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| product_id | string | Yes |  |

## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| granularity | string | No |  |
| start | string | No | Timestamp for starting range of aggregations |
| end | string | No | Timestamp for ending range of aggregations |

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |

### Response: 500 An unexpected error response.

| Property | Type | Description |
| -------- | ---- | ----------- |
| message | string |  |
---

# # Get product stats


GET

https://api.exchange.coinbase.com/products/{product\_id}/stats

Gets 30day and 24hour stats for a product.



Info

The`volume` property is in base currency units. Properties `open`, `high`, `low` are in quote currency units.

## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| product_id | string | Yes |  |

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| open | string |  |
| high | string |  |
| low | string |  |
| last | string |  |
| volume | string |  |
| volume_30day | string |  |
| rfq_volume_24hour | string |  |
| rfq_volume_30day | string |  |
| conversions_volume_24hour | string |  |
| conversions_volume_30day | string |  |
---

# # Get product ticker


GET

https://api.exchange.coinbase.com/products/{product\_id}/ticker

Gets snapshot information about the last trade (tick), best bid/ask and 24h volume.

## Real-time updates

Coinbase recommends that you get real-time updates by connecting with the WebSocket stream and listening for match messages, rather than polling.

## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| product_id | string | Yes |  |

## API Response Details

### Response: 200

| Property | Type | Description |
| -------- | ---- | ----------- |
| ask | string |  |
| bid | string |  |
| volume | string |  |
| trade_id | int32 |  |
| price | string |  |
| size | string |  |
| time | date-time |  |
| rfq_volume | string |  |
| conversions_volume | string |  |
---

# # Get product trades


GET

https://api.exchange.coinbase.com/products/{product\_id}/trades

Gets a list the latest trades for a product.

## Side

The `side` of a trade indicates the maker order side. The maker order is the order that was open on the order book.

A `buy` side indicates a down-tick because the maker was a buy order and their order was removed. A `sell` side indicates an up-tick.

## Pagination

This request is paginated. See [Pagination](/exchange/docs/rest-pagination) for more information.

## Path Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| product_id | string | Yes | list trades for specific product. |

## Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| limit | int64 | No | Limit on number of results to return. |
| before | string | No | Used for pagination. Sets start cursor to `before` id. |
| after | string | No | Used for pagination. Sets end cursor to `after` id. |
---

