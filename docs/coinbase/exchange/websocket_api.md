# Coinbase Exchange API Documentation

Generated on 5/4/2025 12:12:22 AM

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
* [Exchange WebSocket Overview](#exchange-websocket-overview)
* [Exchange WebSocket Best Practices](#exchange-websocket-best-practices)
* [Exchange WebSocket Authentication](#exchange-websocket-authentication)
* [Exchange WebSocket Channels](#exchange-websocket-channels)
* [Exchange WebSocket Rate Limits](#exchange-websocket-rate-limits)
* [Exchange WebSocket Errors](#exchange-websocket-errors)

---

# Welcome to Exchange APIs




FIX 4.2 Order Entry Gateway Deprecation

FIX 4.2 Order Entry Gateway will be deprecated on **June 3rd, 2025**. For FIX based order entry, **leverage the newer, more performant** [FIX 5 Order Entry Gateway](/exchange/docs/fix-msg-order-entry-50).

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

Last updated on **Apr 2, 2025**

---

# Quickstart: Making Your First REST API Call


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

# Exchange Sandbox


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

# Exchange Matching Engine


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

# Exchange Rate Limits Overview


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

# Exchange Systems & Operations


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

# Exchange REST API Requests


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

# Exchange REST API Authentication


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

# Exchange REST API Rate Limits


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

# Exchange REST API Pagination


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

# Exchange Profiles


Profiles are the equivalent of portfolios on the [Coinbase Exchange](https://exchange.coinbase.com/portfolios) website. The maximum number of profiles is 100 .

## API Keys

An API key is scoped to a specific profile. An API key can only view and create data that belongs to its own profile, unless otherwise noted. This is true for the REST API, FIX API and Websocket Feed.

To access data or actions on a different profile, create a new API key on the Coinbase Exchange website.

## Deleted Profiles

Profiles can be deleted on the Coinbase Exchange website. The permissions of an API key associatd with a deleted profile are automatically set to "View."

Last updated on **May 9, 2024**

---

# Exchange Types


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

# Exchange WebSocket Overview


The WebSocket feed is publicly available and provides real-time market data updates for orders and trades. Two endpoints are supported in both production and sandbox:

*   **Coinbase Market Data** is our traditional feed which is available without authentication.
*   **Coinbase Direct Market Data** has direct access to Coinbase Exchange servers and requires [Authentication](/exchange/docs/websocket-auth).



Tip

You can subscribe to both endpoints, but if `ws-direct` is your primary connection, we recommend using `ws-feed` as a failover.



Info

**Coinbase Market Data**  
production = wss://ws-feed.exchange.coinbase.com  
sandbox = wss://ws-feed-public.sandbox.exchange.coinbase.com  
  

**Coinbase Direct Market Data**  
production = wss://ws-direct.exchange.coinbase.com  
sandbox = wss://ws-direct.sandbox.exchange.coinbase.com

## Protocol

The WebSocket feed uses a bidirectional protocol that encodes all messages as JSON objects. All messages have a `type` attribute that can be used to handle the message appropriately.



Tip

New message types can be added at any time. Clients are expected to ignore messages they do not support.

## Subscribe

To begin receiving feed messages, you must send a `subscribe` message to the server indicating which channels and products to receive. This message is mandatory—you are disconnected if no `subscribe` has been received within 5 seconds.



Caution

To receive feed messages, you must send a `subscribe` message or you are disconnected in 5 seconds.

```
// Request// Subscribe to ETH-USD and ETH-EUR with the level2, heartbeat and ticker channels,// plus receive the ticker entries for ETH-BTC and ETH-USD{  "type": "subscribe",  "product_ids": ["ETH-USD", "ETH-EUR"],  "channels": [    "level2",    "heartbeat",    {      "name": "ticker",      "product_ids": ["ETH-BTC", "ETH-USD"]    }  ]}
```

You receive a `subscriptions` message as a response to an `subscribe` message.

### Unsubscribe

To unsubscribe from channel/product pairs, send an `unsubscribe` message. The structure is equivalent to `subscribe` messages.



Tip

You can also unsubscribe from a channel entirely by providing no product IDs.

```
// Request{  "type": "unsubscribe",  "channels": ["heartbeat"]}
```

You receive a `subscriptions` message as a response to an `unsubscribe` message.

### Specifying Product IDs

There are two ways to specify the product IDs to listen for within each channel:

*   You can define product IDs for an individual channel.
*   You can define product IDs at the root of the object—this adds them to all the channels you subscribe to.

```
// Request{  "type": "unsubscribe",  "product_ids": ["ETH-USD", "ETH-EUR"],  "channels": ["ticker"]}
```

### Subscriptions Message

A `subscriptions` message is sent in response to both [subscribe](#subscribe) and [unsubscribe](#unsubscribe) messages.

In response to a `subscribe` message, the `subscriptions` message lists all channels you are subscribed to. Subsequent subscribe messages add to the list of subscriptions. If you subscribed to a channel without being authenticated, you will remain in the unauthenticated channel.

```
// Response{  "type": "subscriptions",  "channels": [    {      "name": "level2",      "product_ids": ["ETH-USD", "ETH-EUR"]    },    {      "name": "heartbeat",      "product_ids": ["ETH-USD", "ETH-EUR"]    },    {      "name": "ticker",      "product_ids": ["ETH-USD", "ETH-EUR", "ETH-BTC"]    }  ]}
```

## Websocket Compression Extension

Websocket compression, defined in RFC7692, compresses the payload of WebSocket messages which can increase total throughput and potentially reduce message delivery latency. The **permessage-deflate extension** can be enabled by adding the extension header. Currently, it is not possible to specify the compression level.

From [RFC7692](https://datatracker.ietf.org/doc/html/rfc7692#section-7.1.3):

The simplest "Sec-WebSocket-Extensions" header in a client (or server's) opening handshake to offer (or accept) use of the "permessage-deflate" extension looks like this:

```
    GET wss://ws-feed.exchange.coinbase.com       Sec-WebSocket-Extensions: permessage-deflate
```

## Sequence Numbers

Most feed messages contain a sequence number. Sequence numbers are increasing integer values for each product, with each new message being exactly one sequence number greater than the one before it.

Sequence numbers that are _greater than one integer value_ from the previous number indicate that a message has been dropped. Sequence numbers that are _less_ than the previous number can be ignored or represent a message that has arrived out of order.

In either situation you may need to perform logic to make sure your system is in the correct state.



Caution

Even though a WebSocket connection is over TCP, the WebSocket servers receive market data in a manner that can result in dropped messages. Your feed consumer should be designed to handle sequence gaps and out of order messages, or should use channels that guarantee delivery of messages.



Tip

To guarantee that messages are delivered and your order book is in sync, consider using the [level2 channel](/exchange/docs/websocket-channels#level2-channel).

## End-to-end Example

Below is an end-to-end example for Python that handles authentication and connection to the Exchange WebSocket. This code sample can be cloned at [Coinbase Samples](https://github.com/coinbase-samples/exchange-scripts-py/tree/main/websocket).

```
import asyncio, base64, hashlib, hmac, json, os, time, websocketsAPI_KEY = str(os.environ.get('API_KEY'))PASSPHRASE = str(os.environ.get('PASSPHRASE'))SECRET_KEY = str(os.environ.get('SECRET_KEY'))URI = 'wss://ws-feed.exchange.coinbase.com'SIGNATURE_PATH = '/users/self/verify'channel = 'level2'product_ids = 'ETH-USD'async def generate_signature():    timestamp = str(time.time())    message = f'{timestamp}GET{SIGNATURE_PATH}'    hmac_key = base64.b64decode(SECRET_KEY)    signature = hmac.new(        hmac_key,        message.encode('utf-8'),        digestmod=hashlib.sha256).digest()    signature_b64 = base64.b64encode(signature).decode().rstrip('\n')    return signature_b64, timestampasync def websocket_listener():    signature_b64, timestamp = await generate_signature()    subscribe_message = json.dumps({        'type': 'subscribe',        'channels': [{'name': channel, 'product_ids': [product_ids]}],        'signature': signature_b64,        'key': API_KEY,        'passphrase': PASSPHRASE,        'timestamp': timestamp    })    while True:        try:            async with websockets.connect(URI, ping_interval=None) as websocket:                await websocket.send(subscribe_message)                while True:                    response = await websocket.recv()                    json_response = json.loads(response)                    print(json_response)        except (websockets.exceptions.ConnectionClosedError, websockets.exceptions.ConnectionClosedOK):            print('Connection closed, retrying..')            await asyncio.sleep(1)if __name__ == '__main__':    try:        asyncio.run(websocket_listener())    except KeyboardInterrupt:        print("Exiting WebSocket..")
```

Last updated on **May 20, 2024**

---

# Exchange WebSocket Best Practices


*   You can subscribe to both `ws-feed` (Coinbase Market Data) and `ws-direct` (Coinbase Direct Market Data), but if `ws-direct` is your primary connection, we recommend using `ws-feed` as a failover.
    
*   Remember [WebSocket rate limits](/exchange/docs/websocket-rate-limits).
    
*   Spread subscriptions (especially full channel subscriptions) over more than one websocket client connection. For example, do not subscribe to BTC-USD and ETH-USD on the same channel if possible. Instead, open up two separate websocket connections to help load balance those inbound messages across separate connections.
    
*   Websocket clients should authenticate to help troubleshoot issues if necessary. Authenticating is optional and does not impact web socket performance.
    
*   Connected clients should increase their web socket receive buffer to the largest configurable amount possible (given any client library or infrastructure limitations), due to the potential volume of data for any given product.
    
*   Include the following header in the opening handshake to allow for compression, which will lower bandwidth consumption with minimal impact to CPU / memory: `Sec-WebSocket-Extensions: permessage-deflate`. See [Websocket Compression Extension](/exchange/docs/websocket-overview#websocket-compression-extension)
    
*   Use less verbose subscriptions where possible (e.g., Level 2 over Full/Level 3).
    
*   Use alternative batch channels like “level2\_batch” instead of “level2” and “ticket\_batch” instead of “ticket” which deliver a batched version of the respective data on a set interval reducing overall traffic.
    
*   Mitigate error messages which are returned when the client is actively disconnected for any of these reasons:
    
    *   The client has too many backed up messages (`ErrSlowConsume`)
    
    Limit the use of I/O operations and in-memory lock-free constructs when processing any websocket client callbacks. Queuing messages and processing them off-thread is another strategy that can prevent slow consumer errors.
    
    *   The client is sending too many messages (`ErrSlowRead`)
    
    Space out websocket requests to adhere to the above rate limits.
    
    *   The message size is too large ("Message too big").
    
    Break up your subscription messages into smaller requests abiding by the rate limits.
    

Last updated on **Feb 25, 2025**

---

# Exchange WebSocket Authentication


The following WebSocket feeds require authentication:

*   [Full channel](/exchange/docs/websocket-channels#full-channel)
*   [User channel](/exchange/docs/websocket-channels#user-channel)
*   [Level2 channel](/exchange/docs/websocket-channels#level2-channel)
*   [Level3 channel](/exchange/docs/websocket-channels#level3-channel)

To authenticate, send a `subscribe` message and pass in fields to `GET /users/self/verify`, just as if you were [signing a request](/exchange/docs/rest-auth#signing-a-message). To get the necessary parameters, go through the same process as you would to make [authenticated calls to the API](/exchange/docs/rest-auth#signing-requests).



Caution

Authenticated feed messages do not increment the [sequence number](/exchange/docs/websocket-overview#sequence-numbers), which means that it is currently not possible to detect if an authenticated feed message was dropped.

## Examples

A Python example of authenticating a WebSocket connection is shown below. This code sample can be cloned at [Coinbase Samples](https://github.com/coinbase-samples/exchange-scripts-py/tree/main/websocket).

```
API_KEY = str(os.environ.get('API_KEY'))PASSPHRASE = str(os.environ.get('PASSPHRASE'))SECRET_KEY = str(os.environ.get('SECRET_KEY'))URI = 'wss://ws-feed.exchange.coinbase.com'SIGNATURE_PATH = '/users/self/verify'channel = 'level2'product_ids = 'ETH-USD'async def generate_signature():    timestamp = str(time.time())    message = f'{timestamp}GET{SIGNATURE_PATH}'    hmac_key = base64.b64decode(SECRET_KEY)    signature = hmac.new(        hmac_key,        message.encode('utf-8'),        digestmod=hashlib.sha256).digest()    signature_b64 = base64.b64encode(signature).decode().rstrip('\n')    return signature_b64, timestampasync def websocket_listener():    signature_b64, timestamp = await generate_signature()    subscribe_message = json.dumps({        'type': 'subscribe',        'channels': [{'name': channel, 'product_ids': [product_ids]}],        'signature': signature_b64,        'key': API_KEY,        'passphrase': PASSPHRASE,        'timestamp': timestamp    })
```

Further examples are shown below:

```
// Authenticated feed messages add user_id and// profile_id for messages related to your user{  "type": "open", // "received" | "open" | "done" | "match" | "change" | "activate"  "user_id": "5844eceecf7e803e259d0365",  "profile_id": "765d1549-9660-4be2-97d4-fa2d65fa3352"  /* ... */}
```

Here's an example of an authenticated `subscribe` request:

```
// Request{  "type": "subscribe",  "product_ids": ["BTC-USD"],  "channels": ["full"],  "signature": "...",  "key": "...",  "passphrase": "...",  "timestamp": "..."}
```

## Benefits

Coinbase recommends that you authenticate _all_ WebSocket channels, but only those listed above are enforced. You can authenticate yourself when [subscribing](/exchange/docs/websocket-overview#subscribe) to the WebSocket Feed. The benefits of authenticating are:

*   Messages (in which you are of the parties) are expanded and have more useful fields.
*   You receive private messages, such as lifecycle information about stop orders you placed.

Last updated on **Feb 25, 2025**

---

# Exchange WebSocket Channels


## Heartbeat Channel

To receive heartbeat messages for specific products every second, subscribe to the `heartbeat` channel. Heartbeats include [sequence numbers](/exchange/docs/websocket-overview#sequence-numbers) and last trade IDs that can be used to verify that no messages were missed.

```
// Request{    "type": "subscribe",    "channels": [        {            "name": "heartbeat",            "product_ids": [                "ETH-EUR"            ]        }    ]}
```

```
// Heartbeat message{  "type": "heartbeat",  "sequence": 90,  "last_trade_id": 20,  "product_id": "BTC-USD",  "time": "2014-11-07T08:19:28.464459Z"}
```

## Status Channel



Order Size Properties Removed

The properties `base_max_size`, `base_min_size`, `max_market_funds` were removed on June 30. The property, `min_market_funds`, has been repurposed as the notional minimum size for limit orders. See the [Changelog](/exchange/docs/changelog#2022-jun-30).

The `status` channel sends all products and currencies on a preset interval.

```
// Request{  "type": "subscribe",  "channels": [{ "name": "status"}]}
```

```
// Status Message{  "type": "status",  "products": [    {      "id": "BTC-USD",      "base_currency": "BTC",      "quote_currency": "USD",      "base_increment": "0.00000001",      "quote_increment": "0.01",      "display_name": "BTC-USD",      "status": "online",      "status_message": null,      "min_market_funds": "10",      "post_only": false,      "limit_only": false,      "cancel_only": false,      "fx_stablecoin": false    }  ],  "currencies": [    {      "id": "USD",      "name": "United States Dollar",      "display_name": "USD",      "min_size": "0.01000000",      "status": "online",      "status_message": null,      "max_precision": "0.01",      "convertible_to": ["USDC"],      "details": {},      "default_network": "",      "supported_networks": []    },    {      "id": "USDC",      "name": "USD Coin",      "display_name": "USDC",      "min_size": "0.00000100",      "status": "online",      "status_message": null,      "max_precision": "0.000001",      "convertible_to": ["USD"],      "details": {},      "default_network": "ethereum",      "supported_networks": [        {          "id": "ethereum",          "name": "Ethereum",          "status": "online",          "contract_address": "",          "crypto_address_link": "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?a={{address}}",          "crypto_transaction_link": "https://etherscan.io/tx/0x{{txId}}",          "min_withdrawal_amount": 0.001,          "max_withdrawal_amount": 300000000,          "network_confirmations": 14,          "processing_time_seconds": 0,          "destination_tag_regex": ""        }      ]    },    {      "id": "BTC",      "name": "Bitcoin",      "display_name": "BTC",      "min_size":" 0.00000001",      "status": "online",      "status_message": null,      "max_precision": "0.00000001",      "convertible_to": [],      "details": {},      "default_network": "bitcoin",      "supported_networks": [        {          "id": "bitcoin",          "name": "Bitcoin",          "status": "online",          "contract_address": "",          "crypto_address_link": "https://live.blockcypher.com/btc/address/{{address}}",          "crypto_transaction_link": "https://live.blockcypher.com/btc/tx/{{txId}}",          "min_withdrawal_amount": 0.0001,          "max_withdrawal_amount": 2400,          "network_confirmations": 2,          "processing_time_seconds": 0,          "destination_tag_regex": ""        }      ]    }  ]}
```

## Auction Channel

The `auction` channel sends information about the auction while the product is in auction mode.

Auction messages provide the most recent indicative quote disseminated during the auction. Indicative quote messages are sent on an interval basis (about once a second) during the collection phase of an auction. The indicative quote includes information about the tentative price and size affiliated with the completion.

The open price and size indicate the aggregate size of all the orders eligible for crossing, along with the price used for matching all the orders as the auction enters the opening state. The best bid and ask price and size fields indicate the anticipated BBO upon entering full trading or limit only after the matching has completed.

Because indicative quotes are sent on an interval, values are not firm. The price may change in between two quote updates: (1) in between two normal quote update intervals, or (2) in between the last normal quote update interval and the final indicative quote that occurs when the book transitions from auction mode to full trading.

See [Get Product Book](/exchange/reference/exchangerestapi_getproductbook) in the API Reference for more details on the level 1 book and products in auction mode.

```
// Request{  "type": "subscribe",  "channels": [{ "name": "auctionfeed", "product_ids": ["LTC-USD"] }]}
```

```
// Auction Message{    "type": "auction",    "product_id": "LTC-USD",    "sequence": 3262786978,    "auction_state": "collection",    "best_bid_price": "333.98",    "best_bid_size": "4.39088265",    "best_ask_price": "333.99",    "best_ask_size": "25.23542881",    "open_price": "333.99",    "open_size": "0.193",    "can_open": "yes",    "timestamp": "2015-11-14T20:46:03.511254Z"}
```

## Matches Channel

If you are only interested in [match](#match) messages, you can subscribe to the matches channel. This is useful when you're consuming the remaining feed using the [level2 channel](#level2-channel).

After subscribing to the matches channel, the message `type` of the first message returned (and only the first message) is `last_match`, for example, `"type": "last_match",`



Caution

Messages can be dropped from this channel. Use the [heartbeat channel](#heartbeat-channel) to track the last trade ID and fetch trades that you missed from the REST API.

## RFQ Matches Channel

The subscription message for the Request For Quote or `rfq_matches` channel does not require the `product_ids` field; otherwise, it is the same as all other WebSocket feed channels.

*   If `product_ids` is not sent, or sent as an empty string "", or sent as "ALL", the user receives `rfq_matches` for all products.
*   If `product_ids` is defined, the subscriber only receives `rfq_matches` for that product. The product specified must be a valid Coinbase product ID.



Tip

Coinbase recommends submitting an empty list in the subscription request (and not specifying `product_ids`) to ensure you get all RFQ matches.



Caution

If the user has an "ALL" subscription and subscribes to a specific product, that new subscription is denied.

```
// Subscription Request{  "type": "subscriptions",  "channels": [    {      "name": "rfq_matches",      "product_ids": [        "",      ],    },  ]}
```



Caution

The subscription message uses the plural `product_ids`, whereas RFQ messages use the singular, `product_id`.

```
// RFQ Request{  "type": "rfq_match",  "maker_order_id": "ac928c66-ca53-498f-9c13-a110027a60e8",  "taker_order_id": "132fb6ae-456b-4654-b4e0-d681ac05cea1",  "time": "2014-11-07T08:19:27.028459Z",  "trade_id": 30,  "product_id": "BTC-USD",  "size": "5.23512",  "price": "400.23",  "side": "sell"}
```



Info

See also the new [FIX Request For Quote messages](/exchange/docs/fix-msg-order-entry#rfq-request-ah).

## Ticker Channel

The `ticker` channel provides real-time price updates every time a match happens. It batches updates in case of cascading matches, greatly reducing bandwidth requirements.

```
// Request{    "type": "subscribe",    "product_ids": [        "ETH-USD",        "BTC-USD"    ],    "channels": ["ticker"]}
```

```
// Ticker message{  "type": "ticker",  "sequence": 37475248783,  "product_id": "ETH-USD",  "price": "1285.22",  "open_24h": "1310.79",  "volume_24h": "245532.79269678",  "low_24h": "1280.52",  "high_24h": "1313.8",  "volume_30d": "9788783.60117027",  "best_bid": "1285.04",  "best_bid_size": "0.46688654",  "best_ask": "1285.27",  "best_ask_size": "1.56637040",  "side": "buy",  "time": "2022-10-19T23:28:22.061769Z",  "trade_id": 370843401,  "last_size": "11.4396987"}
```

## Ticker Batch Channel

The `ticker_batch` channel provides latest price updates **every 5000 milliseconds** (5 seconds) if there is a change. It has the same JSON message schema as the [ticker channel](#ticker-channel).



Info

The `ticker_1000` channel was renamed ticker\_batch but you can use either name when subscribing.

```
// Request{    "type": "subscribe",    "product_ids": [        "ETH-USD",        "BTC-USD"    ],    "channels": ["ticker_batch"]}
```

## Full Channel

[![](https://img.shields.io/badge/Full Channel-Authentication Required-0a639a)](/exchange/docs/websocket-auth)

The `full` channel provides real-time updates on orders and trades. These updates can be applied to a level3 order book snapshot to maintain an accurate and up-to-date copy of the exchange order book.

To maintain an up-to-date level3 order book:

1.  Send a `subscribe` message for the product(s) of interest and the `full` channel.
2.  Queue any messages received over the websocket stream.
3.  Make a REST request for the order book snapshot from the REST feed.
4.  Playback queued messages, discarding sequence numbers before or equal to the snapshot sequence number.
5.  Apply playback messages to the snapshot as needed (see below).
6.  After playback is complete, apply real-time stream messages as they arrive.



Info

All `open` and `match` messages always result in a change to the order book. Not all `done` or `change` messages result in changing the order book. These messages are sent for received orders which are not yet on the order book. Do not alter the order book for such messages, otherwise your order book will be incorrect.

The following messages are sent over the websocket stream in JSON format when subscribing to the full channel:

### Received

_A valid order has been received and is now active._

This message is emitted for every single valid order as soon as the matching engine receives it, whether it fills immediately or not.

The `received` message does not indicate a resting order on the order book. The `received` message indicates that a new incoming order has been accepted by the matching engine for processing. Received orders may cause `match` message to follow if they are able to begin being filled (taker behavior).

[Self-trade prevention](/exchange/docs/matching-engine#self-trade-prevention) may also trigger `change` messages to follow if the order size needs to be adjusted. Orders that are not fully filled or that are canceled due to self-trade prevention, result in an `open` message and become resting orders on the order book.

Market orders (indicated by the `order_type` field) may have an optional `funds` field which indicates how much quote currency is used to buy or sell. For example, a `funds` field of `100.00` for the `BTC-USD` product would indicate a purchase of up to `100.00 USD` worth of bitcoin.



Caution

`client_oid` is only available in the **authenticated** `full` channel and the [user channel](/exchange/docs/websocket-channels#user-channel) (which is also authenticated). You can only see your own `client_oid`.

Received message for limit order:

```
{  "type": "received",  "time": "2014-11-07T08:19:27.028459Z",  "product_id": "BTC-USD",  "sequence": 10,  "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",  "size": "1.34",  "price": "502.1",  "side": "buy",  "order_type": "limit",  "client_oid": "d50ec974-76a2-454b-66f135b1ea8c"}
```

Received message for market order:

```
{  "type": "received",  "time": "2014-11-09T08:19:27.028459Z",  "product_id": "BTC-USD",  "sequence": 12,  "order_id": "dddec984-77a8-460a-b958-66f114b0de9b",  "funds": "3000.234",  "side": "buy",  "order_type": "market",  "client_oid": "d50ec974-76a2-454b-66f135b1ea8c"}
```

### Open

_The order is now open on the order book._

This message is only sent for orders that are not fully filled immediately. `remaining_size` indicates how much of the order is unfilled and going on the book.



Info

There is no `open` message for orders that are filled immediately. And there is no `open` message for market orders since they are filled immediately.

```
{  "type": "open",  "time": "2014-11-07T08:19:27.028459Z",  "product_id": "BTC-USD",  "sequence": 10,  "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",  "price": "200.2",  "remaining_size": "1.00",  "side": "sell"}
```

### Done

_The order is no longer on the order book._

This message is sent for all orders for which there was a received message and can result from an order being canceled or filled.

There are no more messages for an `order_id` after a done message. `remaining_size` indicates how much of the order went unfilled; this is `0` for `filled` orders.

`market` orders do not have a `remaining_size` or `price` field as they are never on the open order book at a given price.



Info

A `done` message is sent for received orders that are fully filled or canceled due to self-trade prevention. There are no `open` messages for such orders. `done` messages for orders that are not on the book should be ignored when maintaining a real-time order book.

```
{  "type": "done",  "time": "2014-11-07T08:19:27.028459Z",  "product_id": "BTC-USD",  "sequence": 10,  "price": "200.2",  "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",  "reason": "filled", // or "canceled"  "side": "sell",  "remaining_size": "0"}
```

#### Cancel Reason

Done messages with `reason=canceled` (that are authenticated and that originated with you the user) return the reason in the `cancel_reason` field:

Supported cancel reasons are:

```
101:Time In Force102:Self Trade Prevention103:Admin104:Price Bound Order Protection105:Insufficient Funds106:Insufficient Liquidity107:Broker
```

### Match

_A trade occurred between two orders._

The aggressor or `taker` order is the one executing immediately after being received and the `maker` order is a resting order on the book.

The `side` field indicates the maker order side. If the side is `sell` this indicates the maker was a sell order and the `match` is considered an up-tick. A `buy` side match is a down-tick.

```
{  "type": "match",  "trade_id": 10,  "sequence": 50,  "maker_order_id": "ac928c66-ca53-498f-9c13-a110027a60e8",  "taker_order_id": "132fb6ae-456b-4654-b4e0-d681ac05cea1",  "time": "2014-11-07T08:19:27.028459Z",  "product_id": "BTC-USD",  "size": "5.23512",  "price": "400.23",  "side": "sell"}
```

If authenticated, and you were the taker, the message would also have the following fields:

```
{  ...  "taker_user_id": "5844eceecf7e803e259d0365",  "user_id": "5844eceecf7e803e259d0365",  "taker_profile_id": "765d1549-9660-4be2-97d4-fa2d65fa3352",  "profile_id": "765d1549-9660-4be2-97d4-fa2d65fa3352",  "taker_fee_rate": "0.005"}
```

Similarly, if you were the maker, the message would have the following:

```
{  ...  "maker_user_id": "5f8a07f17b7a102330be40a3",  "user_id": "5f8a07f17b7a102330be40a3",  "maker_profile_id": "7aa6b75c-0ff1-11eb-adc1-0242ac120002",  "profile_id": "7aa6b75c-0ff1-11eb-adc1-0242ac120002",  "maker_fee_rate": "0.001"}
```

### Change

_An order has changed._

A `change` message can be the result of either a [Self-trade Prevention (STP)](/exchange/docs/matching-engine#self-trade-prevention) or a Modify Order Request:



Info

Modify Order Request adds three new fields: `new_price`, `old_price`, `reason`. See also [FIX Modify Order Request (G)](/exchange/docs/fix-msg-order-entry#modify-order-request-g).

*   A Self-trade Prevention adjusts the order size or available funds (and can only decrease).
*   A Modify Order Request adjusts the order size or price.

`change` messages are sent anytime an order changes in size or price. This includes:

*   Orders that are open (resting)
*   Orders that are received but not yet open.
*   Market orders with `funds` changed from a Self-trade Prevention control.



Info

If you are building a real-time order book, you can ignore `change` messages for received but not yet open orders.

> If you are building from a level2 book, the `side` and `price` fields to indicate whether the change message is relevant. STP Change messages for limit orders always have a price specified. STP change messages for market orders have no price (`null`) and a decrease in order size.

Example of a change message from a Self-trade Prevention action:

> STP messages have a new `reason` field and continue to use the `price` field (not `new_price` and `old_price`).

```
{  "type": "change",  "reason":"STP",  "time": "2014-11-07T08:19:27.028459Z",  "sequence": 80,  "order_id": "ac928c66-ca53-498f-9c13-a110027a60e8",  "side": "sell",  "product_id": "BTC-USD",  "old_size": "12.234412",  "new_size": "5.23512",  "price": "400.23"}
```

Example of a change message from a Modify Order Request:

> Modify Order messages add three new fields: `new_price`, `old_price`, `reason`.

```
{  "type": "change",  "reason":"modify_order",  "time": "2022-06-06T22:55:43.433114Z",  "sequence": 24753,  "order_id": "c3f16063-77b1-408f-a743-88b7bc20cdcd",  "side": "buy",  "product_id": "ETH-USD",  "old_size": "80",  "new_size": "80",  "old_price": "7",  "new_price": "6"}
```

### Activate

_An activate message is sent when a stop order is placed._

When the stop is triggered the order is placed and goes through the [order lifecycle](/exchange/docs/matching-engine#order-lifecycle).

```
{  "type": "activate",  "product_id": "test-product",  "timestamp": "1483736448.299000",  "user_id": "12",  "profile_id": "30000727-d308-cf50-7b1c-c06deb1934fc",  "order_id": "7b52009b-64fd-0a2a-49e6-d8a939753077",  "stop_type": "entry",  "side": "buy",  "stop_price": "80",  "size": "2",  "funds": "50",  "private": true}
```

## User Channel

[![](https://img.shields.io/badge/User Channel-Authentication Required-0a639a)](/exchange/docs/websocket-auth)

The `user` channel is a version of the [full channel](#full-channel) and only contains messages that include the authenticated user. Consequently, you need to be [authenticated](/exchange/docs/websocket-auth#authentication) to receive any messages.



Caution

Modify Order Request is a new feature that affects the [Full Channel, Change](/exchange/docs/websocket-channels#change) message, and by extension, the User channel.

## Level2 Channel

[![](https://img.shields.io/badge/Level2 Channel-Authentication Required-0a639a)](/exchange/docs/websocket-auth)

The `level2` channel guarantees delivery of all updates and is the easiest way to keep a snapshot of the order book. This channel also reduces the overhead required when consuming the [full channel](#full-channel).

```
// Request{    "type": "subscribe",    "channels": ["level2"],    "product_ids": [        "ETH-USD",        "BTC-USD"    ]}
```



Tip

The [Level2 Batch Channel](/exchange/docs/websocket-channels#level2-batch-channel) does not require authentication and delivers Level 2 data in batches every 50 milliseconds.

The `level2` channel sends a message with the type `snapshot` and the corresponding `product_id`. The properties `bids` and `asks` are arrays of `[price, size]` tuples and represent the entire order book.

```
{  "type": "snapshot",  "product_id": "BTC-USD",  "bids": [["10101.10", "0.45054140"]],  "asks": [["10102.55", "0.57753524"]]}
```

Subsequent updates have the type `l2update`. The `changes` property of `l2update`s is an array with `[side, price, size]` tuples. The `time` property of `l2update` is the time of the event as recorded by our trading engine.

##### Single `changes` Array

```
{  "type": "l2update",  "product_id": "BTC-USD",  "time": "2019-08-14T20:42:27.265Z",  "changes": [    [      "buy",      "10101.80000000",      "0.162567"    ]  ]}
```

##### Multiple `changes` Arrays

```
{  "type": "l2update",  "product_id": "BTC-USD",  "changes": [    [      "buy",      "22356.270000",      "0.00000000"    ],    [      "buy",      "22356.300000",      "1.00000000"    ]  ],  "time": "2022-08-04T15:25:05.010758Z"}
```



Info

The `size` property is the updated size at the price level, not a delta. A size of `"0"` indicates the price level can be removed.

## Level2 Batch Channel

The `level2_batch` channel sends batches of `level2` messages **every 50 milliseconds** (0.05 seconds). It has the same JSON message schema as the [`level2` channel](#level2-channel). The time field correlates to the most recent message in the batch.



Tip

The `level2_batch` channel lets you receive [`level2`](#level2-channel) data _without authenticating_. You get the same benefits while minimizing traffic.

```
// Request{    "type": "subscribe",    "product_ids": [        "ETH-USD",        "BTC-USD"    ],    "channels": ["level2_batch"]}
```



Info

The `level2_50` channel was renamed `level2_batch` but you can use either when subscribing.

## Level3 Channel

[![](https://img.shields.io/badge/Level3 Channel-Authentication Required-0a639a)](/exchange/docs/websocket-auth)

The `level3` channel is a compact version of the Full channel. It conveys all of the same data in a compact message structure that requires less bandwidth with potentially more efficient client side parsing.

```
// Subscribe request{    "type": "subscribe",    "channels": ["level3"],    "product_ids": [        "ETH-USD",        "BTC-USD"    ]}
```

### L3 Schema

On subscribe, the first response returns a level3 schema with the structure for each message type. The schema is not repeated.



Level3 Message Structures

You should process level3 message structures before parsing the subsequent messages. While the schema should not change, it may.

**Expand to view the full level3 schema**

```
{  "type": "level3",  "schema": {    "change": [      "type",      "product_id",      "sequence",      "order_id",      "price",      "size",      "time"    ],    "done": [      "type",      "product_id",      "sequence",      "order_id",      "time"    ],    "match": [      "type",      "product_id",      "sequence",      "maker_order_id",      "taker_order_id",      "price",      "size",      "time"    ],    "noop": [      "type",      "product_id",      "sequence",      "time"    ],    "open": [      "type",      "product_id",      "sequence",      "order_id",      "side",      "price",      "size",      "time"    ]  }}
```

Subsequent messages for each type pack the data into an array with a structure as defined in the initial response, for example:

```
[  "open",  "BTC-USD",  "57560479456",  "12aca6e0-7400-418a-9e59-c0020a3bf8cc",  "buy",  "27268.09",  "0.02",  "2023-03-28T23:24:03.185394Z"]
```

## Balance Channel

[![](https://img.shields.io/badge/Balance Channel-Authentication Required-0a639a)](/exchange/docs/websocket-auth)

The `balance` channel tracks account balance updates, which is useful for checking the holds and available balance on your account. It does _not_ track every update. Authentication is required.

#### Fields

A response from the channel includes the following fields:

```
{  "type": "balance",  "account_id": "d50ec984-77a8-460a-b958-66f114b0de9b",  "currency": "USD",  "holds": "1000.23",                      // funds locked in account  "available": "102030.99",                // balance available for trading  "updated": "2023-10-10T20:42:27.265Z",   // when last balance change is observed  "timestamp": "2023-10-10T20:42:29.265Z"  // when message is sent from websocket}
```

#### Subscribe

Clients can subscribe to this channel using the following subscribe messages:

##### Example 1

```
{  "type": "subscribe",  "channels": [    {      "name": "balance",      "account_ids": [        "d50ec984-77a8-460a-b958-66f114b0de9b",        "d50ec984-77a8-460a-b958-66f114b0de9a"      ]    }  ]}
```

##### Example 2

```
{  "type": "subscribe",  "channels": [    "balance"  ],  "account_ids": [    "d50ec984-77a8-460a-b958-66f114b0de9b",    "d50ec984-77a8-460a-b958-66f114b0de9a"  ]}
```

Last updated on **Apr 2, 2025**

---

# Exchange WebSocket Rate Limits


Coinbase Exchange real-time WebSocket market data updates provide fast insight into order flow and trades. This means that you are responsible for reading the message stream and using the message relevant for your needs—this can include building real-time order books or tracking real-time trades.

The WebSocket API has two forms of rate limits—subscription limits and inbound message limits highlighted below. See also [Market Data Connections](https://help.coinbase.com/en/exchange/managing-my-account/market-data-connections) in the Help docs.

## Limits

### Subscription Limits

*   Exchange accounts are limited to **10** WebSocket subscriptions on a per product, per channel basis. Users can purchase higher subscription limits if desired. Navigate to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/exchange) to change your subscription.
*   If a user attempts to exceed **10** subscriptions per product, per channel, and is not a member of a paid subscription tier, the new subscription will be rejected.

### What is a subscription?

*   A subscription is defined on a per product, per channel basis.
*   Below is an example of a total of 4 subscriptions for BTC-USD full
    *   User123: BTC-USD Full Channel (unique)
    *   User123: BTC-USD Full Channel (duplicate)
    *   User123: BTC-USD Full Channel (duplicate)
    *   User123: BTC-USD Full Channel (duplicate)
    *   User123: BTC-USD Level 2 (unique)
    *   User123: BTC-USD Level 3 (unique)
*   In this case, User123 has 6 remaining subscriptions to BTC-USD full channel, and 9 remaining subscriptions to BTC-USD Level 2 and Level 3 channels.

### Inbound Message Limits

*   All WebSocket inbound messages are subject to a rate limit of **10** RPS / **1000** burst RPS.

### What is an inbound message limit?

*   When a user sends any message (subscribing to a WebSocket channel, unsubscribing to a WebSocket channel, etc.) it is counted towards their inbound message limit.
*   Users can subscribe/unsubscribe to multiple channels and products within a single inbound message.
*   Limits are enforced using a **lazy-fill token bucket** implementation. More information, including examples, can be found at [How Rate Limits Work](/exchange/docs/rate-limits#how-rate-limits-work).

Last updated on **Feb 25, 2025**

---

# Exchange WebSocket Errors


An error message displays when the client is actively disconnected for any of these reasons:

*   The client has too many backed up messages (`ErrSlowConsume`).
*   The client is sending too many messages (`ErrSlowRead`).
*   The message size is too large (`Message too big`)
*   There are intermittent network issues.

Most failure cases trigger an `error` message—specifically, a message with the `type` `"error"`. This can be helpful when implementing a client or debugging issues.

```
{  "type": "error",  "message": "error message"  /* ... */}
```

Last updated on **Feb 25, 2025**

---

