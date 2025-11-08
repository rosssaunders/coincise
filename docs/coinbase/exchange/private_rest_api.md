# Coinbase Exchange API Documentation

## Table of Contents

- [welcome](#welcome)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)

---

# welcome

---

#

[​

](#initial-setup)

Initial Setup

1.  **Create a Coinbase Exchange Account:** Sign up at
    [Coinbase Exchange](https://exchange.coinbase.com/).
2.  **Generate an API Key:** From the web UI, navigate to
    [API](https://exchange.coinbase.com/apikeys).
3.  **Authenticate:** Ensure you authenticate all API requests. Detailed
    guidance is available at
    [API Authentication](/exchange/rest-api/authentication).

REST API URL`https://api.exchange.coinbase.com`

##

[​

](#using-the-exchange-go-sdk)

Using the Exchange Go SDK

###

[​

](#setting-up-the-sdk)

Setting up the SDK

First, initialize a new Go module, install the Exchange Go SDK, and tidy
dependencies. Run the following commands in your project directory, replacing
example.com/test with your desired project path:

Report incorrect code

Copy

Ask AI

```
go mod init example.com/test
go get github.com/coinbase-samples/exchange-sdk-go
go mod tidy
go build
```

Next, initialize the `Credentials` struct and create a new client. The
Credentials struct is JSON enabled. Ensure that Exchange API credentials are
stored in a secure manner.

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
if err != nil {
    panic(fmt.Sprintf("unable to read exchange credentials: %v", err))
}

httpClient, err := core.DefaultHttpClient()
if err != nil {
    panic(fmt.Sprintf("unable to load default http client: %v", err))
}

client := client.NewRestClient(credentials, httpClient)
```

There are convenience functions to read the credentials as an environment
variable (credentials.ReadEnvCredentials) and to deserialize the JSON structure
(credentials.UnmarshalCredentials) if pulled from a different source. To set up
your credentials, add the `EXCHANGE_CREDENTIALS` environment variable to your
`~/.zshrc` file:

Report incorrect code

Copy

Ask AI

```
export EXCHANGE_CREDENTIALS='{
    "apiKey":"YOUR_API_KEY",
    "passphrase":"YOUR_PASSPHRASE",
    "signingKey":"YOUR_SIGNING_KEY"
}'
```

After adding this line, run source ~/.zshrc to load the environment variable
into your current shell session.

##

[​

](#making-your-first-api-call)

Making your first API call

After initializing the client, you need to set up the appropriate service to
access specific API endpoints. Specific examples are provided below.

###

[​

](#listing-accounts)

Listing Accounts

Account IDs are needed in order to track asset-level events, e.g. transfers and
ledger. To list all accounts, initialize the accounts service, pass in the
request object, check for an error, and, if nil, process the response.

Report incorrect code

Copy

Ask AI

```
func main() {
    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
    if err != nil {
        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))
    }

    httpClient, err := core.DefaultHttpClient()
    if err != nil {
        panic(fmt.Sprintf("unable to load default http client: %v", err))
    }

    client := client.NewRestClient(credentials, httpClient)

    accountsSvc := accounts.NewAccountsService(client)
    request := &accounts.ListAccountsRequest{}

    response, err := accountsSvc.ListAccounts(context.Background(), request)
    if err != nil {
        panic(fmt.Sprintf("unable to list accounts: %v", err))
    }

    jsonResponse, err := json.MarshalIndent(response, "", "  ")
    if err != nil {
        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))
    }
    fmt.Println(string(jsonResponse))
}
```

See all 27 lines

###

[​

](#get-account-transfers)

Get Account Transfers

You can use account IDs to track historical transfers. To get a specific
account’s transfer history, initialize the accounts service if you haven’t
already, pass in the request object with account ID, check for an error, and, if
nil, process the response.

Report incorrect code

Copy

Ask AI

```
func main() {
    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
    if err != nil {
        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))
    }

    httpClient, err := core.DefaultHttpClient()
    if err != nil {
        panic(fmt.Sprintf("unable to load default http client: %v", err))
    }

    client := client.NewRestClient(credentials, httpClient)

    accountsSvc := accounts.NewAccountsService(client)
    request := &accounts.GetAccountTransfersRequest{
        AccountId: "account_id_here",
    }

    response, err := accountsSvc.GetAccountTransfers(context.Background(), request)
    if err != nil {
        panic(fmt.Sprintf("unable to get account transfers: %v", err))
    }

    jsonResponse, err := json.MarshalIndent(response, "", "  ")
    if err != nil {
        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))
    }
    fmt.Println(string(jsonResponse))
}
```

See all 29 lines

###

[​

](#listing-profiles)

Listing Profiles

Certain requests require that you know your Profile ID. To list all profile IDs
associated with your Exchange account, initialize the profiles service, pass in
the request object, check for an error, and, if nil, process the response.

Report incorrect code

Copy

Ask AI

```
func main() {
    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
    if err != nil {
        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))
    }

    httpClient, err := core.DefaultHttpClient()
    if err != nil {
        panic(fmt.Sprintf("unable to load default http client: %v", err))
    }

    client := client.NewRestClient(credentials, httpClient)

    profilesSvc := profiles.NewProfilesService(client)
    request := &profiles.ListProfilesRequest{}

    response, err := profilesSvc.ListProfiles(context.Background(), request)
    if err != nil {
        panic(fmt.Sprintf("unable to list profiles: %v", err))
    }

    jsonResponse, err := json.MarshalIndent(response, "", "  ")
    if err != nil {
        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))
    }
    fmt.Println(string(jsonResponse))
}
```

See all 27 lines

###

[​

](#get-product-details)

Get Product Details

To get product details, initialize the products service, pass in the request
object with the Product ID (e.g. `BTC-USD`) you want data for, check for an
error, and if nil, process the response.

Report incorrect code

Copy

Ask AI

```
func main() {
    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
    if err != nil {
        panic(fmt.Sprintf("unable to read exchange credentials: %v", err))
    }

    httpClient, err := core.DefaultHttpClient()
    if err != nil {
        panic(fmt.Sprintf("unable to load default http client: %v", err))
    }

    client := client.NewRestClient(credentials, httpClient)

    productsSvc := products.NewProductsService(client)

    request := &products.GetProductRequest{
        ProductId: "BTC-USD",
    }

    response, err := productsSvc.GetProduct(context.Background(), request)
    if err != nil {
        panic(fmt.Sprintf("unable to get product: %v", err))
    }

    jsonResponse, err := json.MarshalIndent(response, "", "  ")
    if err != nil {
        panic(fmt.Sprintf("error marshaling response to JSON: %v", err))
    }
    fmt.Println(string(jsonResponse))
}
```

See all 30 lines

---

#

[​

](#sandbox-urls)

Sandbox URLs

Use the following URLs to test your API connectivity. See the
[Runbook](/exchange/introduction/systems-operations) for Production URLs.

| API                           | URL                                                       |
| ----------------------------- | --------------------------------------------------------- |
| REST API                      | `https://api-public.sandbox.exchange.coinbase.com`        |
| Websocket Feed                | `wss://ws-feed-public.sandbox.exchange.coinbase.com`      |
| Websocket Direct Feed         | `wss://ws-direct.sandbox.exchange.coinbase.com`           |
| FIX API - Order Entry 4.2     | `tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198` |
| FIX API - Order Entry 5.0 SP2 | `tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121`    |
| FIX API - Market Data 5.0 SP2 | `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121`     |

##

[​

](#sandbox-ssl-certificate)

Sandbox SSL Certificate

Your FIX SSL client must validate the following sandbox FIX server SSL
certificate:

Report incorrect code

Copy

Ask AI

```
-----BEGIN CERTIFICATE-----
MIIEdDCCA1ygAwIBAgIQD03L1cHVypYSDFuvcnpAHzANBgkqhkiG9w0BAQsFADBG
MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRUwEwYDVQQLEwxTZXJ2ZXIg
Q0EgMUIxDzANBgNVBAMTBkFtYXpvbjAeFw0yMjAzMjcwMDAwMDBaFw0yMzA0MjUy
MzU5NTlaMCoxKDAmBgNVBAMMHyouc2FuZGJveC5leGNoYW5nZS5jb2luYmFzZS5j
b20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8LYRdqMoVNa/0M4MF
+Wkr8SiybZ95JycTE+0ZVmf92DKo4I8m/8fBtOrH0jgrhvamVSJ0lI6VFiAzlTd1
doUbliQ9Xm1aE/YHQO9J64AIP97peysgHBd+g3/Vhz33aaaU2vyHH5kPHiekU8n/
ObXPPoFd/Awul8uxxlXsVFx8oBWL2MeMjLNLLWNiGWq+lQloGKsQYVR/fQZizvpP
vyZO6pCLRId6+Wq3Tcb7NHQZc6+tePVi+5fovE+lm/yQrhjGqDzI7P4rWjJqCPrA
sYJeYFcVJhdSuFY2Ngm8eKeDP14TVEs9pkIWvyMGmB17QBPbRJipdoKu1N6fsx54
N9JDAgMBAAGjggF4MIIBdDAfBgNVHSMEGDAWgBRZpGYGUqB7lZI8o5QHJ5Z0W/k9
0DAdBgNVHQ4EFgQUa5RZ0yvv71YteSuqO1VRvmGGKv0wKgYDVR0RBCMwIYIfKi5z
YW5kYm94LmV4Y2hhbmdlLmNvaW5iYXNlLmNvbTAOBgNVHQ8BAf8EBAMCBaAwHQYD
VR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMD0GA1UdHwQ2MDQwMqAwoC6GLGh0
dHA6Ly9jcmwuc2NhMWIuYW1hem9udHJ1c3QuY29tL3NjYTFiLTEuY3JsMBMGA1Ud
IAQMMAowCAYGZ4EMAQIBMHUGCCsGAQUFBwEBBGkwZzAtBggrBgEFBQcwAYYhaHR0
cDovL29jc3Auc2NhMWIuYW1hem9udHJ1c3QuY29tMDYGCCsGAQUFBzAChipodHRw
Oi8vY3J0LnNjYTFiLmFtYXpvbnRydXN0LmNvbS9zY2ExYi5jcnQwDAYDVR0TAQH/
BAIwADANBgkqhkiG9w0BAQsFAAOCAQEATpjyCMwAOSFKFTA67UaVkDCjz/ULBY6P
L4JwTJ+7kmT+HMvGimx15CsVjne64bT5twWlzqA/l4h25HGj0hD0TU2ktqmFhfAm
DpjGVp4KgIcZpvv7oRIU4e5I422Y++2UVuATwLWdELgpnm4AVq1aqI10XrQlJeHL
gRVfV5qkr9Vsc+fk7HY7YwbNQk2jXbRaj22f6GxiJ/6VmUcCD7zZ1GZtUipv0JEy
PtWD/BbSKNx1GJnLZ6L+QytPs+MW+FEetlU/oqPuyYRhmJUBUiwKkm6yKWRj9tQf
sq0a4uLI3SUgsBv/CQ/Qa9LnRdNjvlWSKLzeIX2LU9rE/3F3oQh7HQ==
-----END CERTIFICATE-----
```

##

[​

](#unsupported-features)

Unsupported Features

The Transfer endpoints are _not_ available for testing in the Sandbox:

- [Withdraw to payment](/api-reference/exchange-api/rest-api/transfers/withdraw-to-payment-method)
- [Deposit from payment](/api-reference/exchange-api/rest-api/transfers/deposit-from-payment-method)
- [Deposit from Coinbase account](/api-reference/exchange-api/rest-api/transfers/deposit-from-coinbase-account)
- [Withdraw to crypto address](/api-reference/exchange-api/rest-api/transfers/withdraw-to-crypto-address)
- [Withdraw to Coinbase Account](/api-reference/exchange-api/rest-api/transfers/withdraw-to-coinbase-account)

##

[​

](#creating-api-keys)

Creating API Keys

To create an API key in the sandbox web interface:

1.  Go to the
    [sandbox web interface](https://public.sandbox.exchange.coinbase.com)
2.  Create an account or sign in.
3.  Go to **API** in your profile dropdown menu.
4.  Click **New API Key**.

##

[​

](#managing-funds)

Managing Funds

To add or remove funds in the sandbox web interface:

1.  Go to the **Portfolios** tab.
2.  Click the **Deposit** and **Withdraw** buttons as you would on the
    production web interface.

---

#

[​

](#deployment)

Deployment

The deployment schedules for different components vary and may change without
notice.

| API       | Schedule                              |
| --------- | ------------------------------------- |
| FIX       | Monday, Thursday at 2PM ET            |
| WebSocket | Monday, Wednesday, Thursday at 2PM ET |
| REST      | Monday, Wednesday, Thursday at 2PM ET |

##

[​

](#production-urls)

Production URLs

Use the following URLs to connect to Coinbase Exchange production APIs. See
[Sandbox URLs](/exchange/introduction/sandbox) for testing.

| API                                         | URL                                            |
| ------------------------------------------- | ---------------------------------------------- |
| REST API                                    | `https://api.exchange.coinbase.com`            |
| Websocket Feed                              | `wss://ws-feed.exchange.coinbase.com`          |
| Websocket Direct Feed                       | `wss://ws-direct.exchange.coinbase.com`        |
| FIX 5.0 API - Order Entry                   | `tcp+ssl://fix-ord.exchange.coinbase.com:6121` |
| FIX 5.0 API - Market Data Snapshot Enabled  | `tcp+ssl://fix-md.exchange.coinbase.com:6121`  |
| FIX 5.0 API - Market Data Snapshot Disabled | `tcp+ssl://fix-md.exchange.coinbase.com:6122`  |
| FIX 5.0 API - Dedicated Drop Copy           | `tcp+ssl://fix-dc.exchange.coinbase.com:6122`  |

##

[​

](#availability-zones)

Availability Zones

The infrastructure for the US Spot Exchange is hosted in **US-EAST-1 (AWS)**
within multiple availability zones.

The following information is subject to change without notification, and there
is no guarantee that it will remain static over time.

| Product                | Availability Zone ID |
| ---------------------- | -------------------- |
| FIX Order Gateways     | use1-az4             |
| Order Entry Gateway    | use1-az4             |
| Trade Engine           | use1-az4             |
| Web Socket Market Data | use1-az4             |
| FIX Market Data        | use1-az4             |

##

[​

](#system-components)

System Components

###

[​

](#rest-entry-gateways)

REST Entry Gateways

- Requests are routed through Cloudflare.
- Requests are processed on a FIFO basis with no queuing.
- REST requires additional authentication because it’s stateless (as opposed to
  FIX order gateways, which authenticate during login).

###

[​

](#fix-order-gateways)

FIX Order Gateways

- Each instance contains a per-user product based queue.
- Each per-user product-based queue can hold a maximum of 50 queued requests
  before requests are rejected.
- Each per-user product-based queue is processed on a FIFO basis.

###

[​

](#order-entry-gateway-risk-system)

Order Entry Gateway (Risk System)

- Each instance processes requests from FIX Order Gateways and REST in real time
  with no queuing.
- System performs real-time risk checks and account collateralization.

###

[​

](#trade-engine)

Trade Engine

- Clustered service that guarantees FIFO sequencing at a product level.
- Processes all requests from Order Entry Gateway.
- Publishes market data to WebSocket / FIX Market Data.

###

[​

](#market-data-websocket-%26-fix)

Market Data (Websocket & FIX)

- Each instance can process all market data requests across all products.
- Messages are distributed to customers randomly, and there is no intended
  benefit to being “first to subscribe”.

---

#

[​

](#errors)

Errors

Report incorrect code

Copy

Ask AI

```
{
  "message": "Invalid Price"
}
```

Unless otherwise stated, errors to bad requests respond with HTTP 4xx or status
codes. The body also contains a `message` parameter indicating the cause. Your
language’s http library should be configured to provide message bodies for
non-2xx requests so that you can read the message field from the body.

###

[​

](#common-error-codes)

Common Error Codes

| Status Code | Reason                                                       |
| ----------- | ------------------------------------------------------------ |
| 400         | Bad Request — Invalid request format                         |
| 401         | Unauthorized — Invalid API Key                               |
| 403         | Forbidden — You do not have access to the requested resource |
| 404         | Not Found                                                    |
| 500         | Internal Server Error — We had a problem with our server     |

##

[​

](#success)

Success

A successful response is indicated by HTTP status code 200 and may contain an
optional body. If the response has a body it is documented under each resource
below.

---

#

[​

](#private-endpoints)

Private Endpoints

Private endpoints are available for order management and account management.
Every private request must be signed using the described authentication scheme.

Private endpoints require authentication using your Coinbase Exchange API key.
You can generate API keys [here](https://exchange.coinbase.com/profile/api).

##

[​

](#api-keys)

API Keys

To sign a request, you must create an API key via the Coinbase Exchange website.
The API key is scoped to a specific profile. Each user can generate a max of 300
API keys.

###

[​

](#generating-an-api-key)

Generating an API Key

When creating a key, you must remember (and should write down) your (1) key, (2)
secret, and (3) passphrase. The key and secret are randomly generated and
provided by Coinbase Exchange — you choose a passphrase to further secure your
API access.

Coinbase Exchange stores the salted hash of your passphrase for verification and
cannot be recovered if you forget it.

###

[​

](#api-key-permissions)

API Key Permissions

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

##

[​

](#signing-requests)

Signing Requests

All REST requests must contain the following headers:

| Header                 | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `CB-ACCESS-KEY`        | API key as a string                                                    |
| `CB-ACCESS-SIGN`       | base64-encoded signature (see [Signing a Message](#signing-a-message)) |
| `CB-ACCESS-TIMESTAMP`  | Timestamp for your request                                             |
| `CB-ACCESS-PASSPHRASE` | Passphrase you specified when creating the API key                     |

All request bodies should have content type `application/json` and be valid
JSON.

###

[​

](#selecting-a-timestamp)

Selecting a Timestamp

The `CB-ACCESS-TIMESTAMP` header MUST be number of seconds since
[Unix Epoch](http://en.wikipedia.org/wiki/Unix_time) in UTC. Decimal values are
allowed. Your timestamp must be within 30 seconds of the API service time or
your request is considered expired and rejected. We recommend using the
[time](https://api.exchange.coinbase.com/time) endpoint to query for the API
server time if you believe there is a time difference between your server and
the API servers.

###

[​

](#signing-a-message)

Signing a Message

The `CB-ACCESS-SIGN` header is generated by creating a sha256 HMAC using the
base64-decoded secret key on the prehash string
`timestamp + method + requestPath + body` (where `+` represents string
concatenation) and base64-encode the output.

Remember to base64-decode the alphanumeric secret string (resulting in 64 bytes)
before using it as the key for HMAC. Also, base64-encode the digest output
before sending in the header.

- `timestamp` is the same as the `CB-ACCESS-TIMESTAMP` header.
- `method` should be UPPER CASE e.g., `GET` or `POST`.
- `requestPath` should only include the path of the API endpoint.
- `body` is the request body string or omitted if there is no request body
  (typically for `GET` requests).

###

[​

](#signature-example)

Signature Example

The following example demonstrates how to generate a signature in Javascript:

Report incorrect code

Copy

Ask AI

```
// import crypto library
var crypto = require("crypto");

// create the json request object
var cb_access_timestamp = Date.now() / 1000; // in ms
var cb_access_passphrase = "...";
var secret = "PYPd1Hv4J6/7x...";
var requestPath = "/orders";
var body = JSON.stringify({
  price: "1.0",
  size: "1.0",
  side: "buy",
  product_id: "BTC-USD",
});
var method = "POST";

// create the prehash string by concatenating required parts
var message = cb_access_timestamp + method + requestPath + body;

// decode the base64 secret
var key = Buffer.from(secret, "base64");

// create a sha256 hmac with the secret
var hmac = crypto.createHmac("sha256", key);

// sign the require message with the hmac and base64 encode the result
var cb_access_sign = hmac.update(message).digest("base64");
```

---

#

[​

](#rest-api-rate-limits)

REST API Rate Limits

####

[​

](#public-endpoints)

Public Endpoints

- Requests per second per IP: 10
- Requests per second per IP in bursts: Up to 15

####

[​

](#private-endpoints)

Private Endpoints

- Requests per second per profile: 15
- Requests per second per profile in bursts: Up to 30

####

[​

](#private-%2Ffills-endpoint)

Private `/fills` Endpoint

- Requests per second per profile: 10
- Requests per second per profile in bursts: Up to 20

####

[​

](#private-%2Floans-endpoint)

Private `/loans` Endpoint

- Requests per second per profile: 10

Rate limits do not apply to
[List loan assets](/api-reference/exchange-api/rest-api/loan/list-loan-assets)
(`/loans/assets`) which is not private.

##

[​

](#how-rate-limits-work)

How Rate Limits Work

Rate-limiting for both the Exchange REST API and the FIX API use a **lazy-fill
token bucket** implementation. A TokenBucket stores a maximum amount of tokens,
which is the **burst size**, and fills at a given rate called the **refresh
rate**. The bucket starts full, and as requests are received, a token is removed
for each request. Tokens are continuously added to the bucket at the refresh
rate until full. When a user sends a request, the TokenBucket calculates whether
to rate limit the user as follows:

1.  Fill the user’s TokenBucket to a token size based on the following formula:
    `token_amount = min(burst, previous_token_amount + (current_time - previous_request_time) * refresh_rate)`
2.  Remove 1 token if possible, otherwise rate limit the request.
3.  Repeat Steps 1 and 2 for each subsequent request.

###

[​

](#tokenbucket-example)

TokenBucket Example

Let’s say you have a TokenBucket with burst = 3 and refresh_rate = 1. The table
below represents the state of your token bucket after a series of requests:

| Action        | Time | Tokens | Notes                                                                                                                                             |
| ------------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial State | 0.0  | 3.0    | New TokenBucket is initialized to max capacity (burst)                                                                                            |
| Request 1     | 0.5  | 2.0    | Fill TokenBucket, then remove a token, because we are at max capacity, and subtract 1 token from 3                                                |
| Request 2     | 0.8  | 1.3    | Fill TokenBucket to 2.3 (`min(3, (2 + (.8 - .5) * 1.0)) = min(3, 2.3) = 2.3`), then subtract 1                                                    |
| Request 3     | 0.9  | 0.4    | Fill TokenBucket to 1.4 (`min(3, (1.3 + (.9 - .8) * 1.0)) = min(3, 1.4) = 1.4`), then subtract 1                                                  |
| Request 4     | 1.0  | 0.5    | Fill TokenBucket to 0.5 (`min(3, (.4 + (1.0 - .9) * 1.0)) = min(3, 0.5) = 0.5`). Ratelimit because we don’t have enough tokens available          |
| Request 5     | 1.4  | 0.9    | Fill TokenBucket to 0.9 (`min(3, (0.5 + (1.4 - 1.0) * 1.0)) = min(3, 0.9) = 0.9`). Ratelimit because we don’t have enough tokens available        |
| Request 6     | 1.8  | 0.3    | Fill TokenBucket to 1.3 (`min(3, (0.9 + (1.8 - 1.4) * 1.0)) = min(3, 1.3) = 1.3`), then remove 1                                                  |
| Request 7     | 5.0  | 2.0    | Fill TokenBucket to 3.0 (`min(3, (0.3 + (5.0 - 1.8) * 1.0)) = min(3, 3.5) = 3`), since we would “overflow” with our calculations, then subtract 1 |

---

#

[​

](#parameters)

Parameters

| Parameter | Default | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| `before`  |         | Request page before (newer) this pagination id             |
| `after`   |         | Request page after (older) this pagination id              |
| `limit`   | 1000    | Number of results per request. Maximum 1000 (default 1000) |

###

[​

](#example)

Example

`GET /orders?before=2&limit=30`

###

[​

](#before-and-after-cursors)

Before and After cursors

The `before` cursor references the first item in a results page and the `after`
cursor references the last item in a set of results.

####

[​

](#before-cursor)

Before Cursor

To request a page of records before the current one, use the `before` query
parameter. Your initial request can omit this parameter to get the default first
page. The response contains a `CB-BEFORE` header which returns the cursor id to
use in your next request for the page before the current one. **The page before
is a newer page and not one that happened before in chronological time.**

####

[​

](#after-cursor)

After Cursor

The response also contains a `CB-AFTER` header which returns the cursor id to
use in your next request for the page after this one. **The page after is an
older page and not one that happened after this one in chronological time.**

---

#

[​

](#timestamps)

Timestamps

Report incorrect code

Copy

Ask AI

```
2014-11-06T10:34:47.123456Z
```

Unless otherwise specified, all timestamps from API are returned in
[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) with microseconds. Make sure
you can parse the following ISO 8601 format. Most modern languages and libraries
handle this without issues.

##

[​

](#numbers)

Numbers

Decimal numbers are returned as strings to preserve full precision across
platforms. When making a request, it is recommended that you also convert your
numbers to strings to avoid truncation and precision errors. Integer numbers
(such as trade id and sequence) are unquoted.

##

[​

](#ids)

IDs

Most identifiers are UUID unless otherwise specified. When making a request
which requires a UUID, both forms (with and without dashes) are accepted.
`132fb6ae-456b-4654-b4e0-d681ac05cea1` or `132fb6ae456b4654b4e0d681ac05cea1`

---

#

[​

](#core-concepts)

Core Concepts

###

[​

](#account-structure)

Account Structure

- **[Account Structure](/exchange/concepts/structure)** - Profiles, accounts,
  and organizational structure

###

[​

](#trading)

Trading

- **[Trading](/exchange/concepts/trading)** - Order types, algorithms, and
  trading best practices

---

#

[​

](#self-trade-prevention)

Self-Trade Prevention

Self-trading is not allowed on Coinbase Exchange. When two orders from the same
user cross, they do not fill one another.

The STP instruction on the taker order (latest order) takes precedence over the
older/resting order.

You can define your self-trade prevention behavior when
[placing an order](/api-reference/exchange-api/rest-api/orders/create-new-order)
with the STP flag:

| Self-Trade Prevention Option     | STP Flag | Description                                                                                         |
| -------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| Decrement &amp; cancel (default) | `dc`     | Cancel smaller order and decrement larger order by the smaller size. If the same size, cancel both. |
| Cancel oldest                    | `co`     | Cancel older (resting) order in full. Continue to execute the newer taking order.                   |
| Cancel newest                    | `cn`     | Cancel newer (taking) order in full. Let the old resting order remain on the order book.            |
| Cancel both                      | `cb`     | Cancel both orders immediately.                                                                     |

##

[​

](#market-orders)

Market Orders

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

##

[​

](#price-improvement)

Price Improvement

Orders are matched against existing order book orders at the price of the order
_on the book_, not at the price of the taker order. **Example** User A places a
buy order for 1 BTC at 100 USD. Then User B places a sell order for 1 BTC at 80
USD. The result is that the trade occurs at 100 USD because User A’s order was
first to the trading engine and User A has price priority.

##

[​

](#order-lifecycle)

Order Lifecycle

| Order State | Description                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `received`  | Valid orders that are sent to the matching engine and confirmed immediately.                                                       |
| `open`      | Any part of the order not filled immediately. Orders stay open until canceled or filled by new orders.                             |
| `done`      | An full order executed against another order immediately. A partial order filled or canceled (and no longer eligible for matching) |

---

#

[​

](#orders-and-order-types)

Orders and Order Types

**Orders** are the fundamental building blocks of trading on Coinbase Exchange.
Understanding the different order types and their behaviors is crucial for
building effective Crypto-as-a-Service (CaaS) trading strategies.

##

[​

](#product-pairs)

Product Pairs

Before placing orders, you need to know which trading pairs are available.
Product pairs represent the available markets for trading. To list product
pairs, as well as important metadata about order size requirements, run the
following:

- Go

Report incorrect code

Copy

Ask AI

```
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"

    "github.com/coinbase-samples/core-go"
    "github.com/coinbase-samples/exchange-sdk-go/client"
    "github.com/coinbase-samples/exchange-sdk-go/credentials"
    "github.com/coinbase-samples/exchange-sdk-go/products"
)

func main() {
    credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
    if err != nil {
        log.Fatalf("unable to read credentials from environment: %v", err)
    }

    httpClient, err := core.DefaultHttpClient()
    if err != nil {
        log.Fatalf("unable to load default http client: %v", err)
    }

    client := client.NewRestClient(credentials, httpClient)

    productsSvc := products.NewProductsService(client)

    request := &products.ListProductsRequest{}

    response, err := productsSvc.ListProducts(context.Background(), request)
    if err != nil {
        log.Fatalf("unable to list products: %v", err)
    }

    output, err := json.MarshalIndent(response, "", "  ")
    if err != nil {
        log.Fatalf("error marshaling response to JSON: %v", err)
    }
    fmt.Println(string(output))
}
```

###

[​

](#limit-orders)

Limit Orders

**Limit orders** allow you to specify both the price and size of your trade,
providing precise control over execution:

- **Price control**: Order executes at your specified price or better
- **Guaranteed rate**: Never pay more (for buys) or receive less (for sells)
  than your limit price
- **Queue position**: Orders are filled based on price-time priority
- **Maximum open orders**: Each profile can place a maximum of 500 open orders
  on a product

###

[​

](#market-orders)

Market Orders

**Market orders** prioritize immediate execution over price control:

- **Immediate execution**: Order executes immediately against available
  liquidity
- **Always taker**: Market orders always consume liquidity and pay taker fees
- **No price guarantee**: Execution price depends on current market conditions
- **Slippage risk**: Large orders may execute across multiple price levels

##

[​

](#order-sizing%3A-size-vs-funds)

Order Sizing: Size vs Funds

When placing orders, you can specify the order amount using two different
parameters:

- **Size**: Amount in base currency (e.g., BTC in BTC-USD pair)
- **Funds**: Amount in quote currency (e.g., USD in BTC-USD pair)
- **Market orders**: Can use either `size` or `funds`, but not both

###

[​

](#stop-orders)

Stop Orders

**Stop orders** enable automated risk management and entry strategies:

- **Stop-loss orders**: Automatically exit positions when price moves against
  you
- **Stop-entry orders**: Enter positions when price breaks through key levels
- **Trigger mechanism**: Becomes a market order when stop price is reached

###

[​

](#advanced-order-features)

Advanced Order Features

####

[​

](#post-only-orders)

Post-Only Orders

**Post-only orders** guarantee maker status and liquidity provision:

- **Maker guarantee**: Order rejected if any part would execute immediately
- **Fee optimization**: Always qualify for maker fees or rebates

####

[​

](#self-trade-prevention)

Self-Trade Prevention

Configure how your orders behave when they would match against each other:

- **Decrease and Cancel (DC)**: Reduce newer order size, cancel if it would
  fully execute
- **Cancel Oldest (CO)**: Cancel the older resting order
- **Cancel Newest (CN)**: Cancel the newer incoming order
- **Cancel Both (CB)**: Cancel both orders

####

[​

](#time-in-force-options)

Time in Force Options

Control how long your orders remain active:

- **Good Till Cancel (GTC)**: Order remains active until filled or manually
  canceled
- **Good Till Time (GTT)**: Order expires at specified time
- **Immediate or Cancel (IOC)**: Fill immediately available quantity, cancel
  remainder
- **Fill or Kill (FOK)**: Fill entire order immediately or cancel completely

To create an order, try the following:

- Go
- TS/JS

examples/listCoinbaseAccounts/cmd.go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
httpClient, err := core.DefaultHttpClient()
client := client.NewRestClient(credentials, httpClient)

ordersSvc := accounts.NewOrdersService(client)
request := &orders.CreateOrderRequest{
    Type:        "market",
    Side:        "buy",
    ProductId:   "BTC-USD",
    ClientOid:   "UUID",
    Funds:       "10",
}
response, err := ordersSvc.CreateOrder(context.Background(), request)
```

To learn more about this SDK, please visit the
[Exchange Go SDK](https://github.com/coinbase-samples/exchange-sdk-go).

##

[​

](#listing-orders)

Listing Orders

Retrieve your current open orders. Only open or unsettled orders are returned by
default:

- **Default behavior**: Returns only open orders, settled orders are excluded
- **Order states**: Orders may change state between request and response
- **Pending orders**: Have limited fields in response (missing `stp`,
  `time_in_force`, `expire_time`, `post_only`)

- Go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
if err != nil {
    log.Fatalf("unable to read credentials from environment: %v", err)
}

httpClient, err := core.DefaultHttpClient()
if err != nil {
    log.Fatalf("unable to load default http client: %v", err)
}

client := client.NewRestClient(credentials, httpClient)

ordersSvc := orders.NewOrdersService(client)

request := &orders.ListOrdersRequest{}

response, err := ordersSvc.ListOrders(context.Background(), request)
if err != nil {
    log.Fatalf("unable to list orders: %v", err)
}

output, err := json.MarshalIndent(response, "", "  ")
if err != nil {
    log.Fatalf("error marshaling response to JSON: %v", err)
}
fmt.Println(string(output))
```

---

#

[​

](#profiles)

Profiles

**Profiles** are the top-level organizational units in Coinbase Exchange that
allow you to create multiple, isolated trading portfolios within a single
Exchange account, and can be used for different trading strategies, teams, or
purposes. Profiles are the equivalent of portfolios on the Coinbase Exchange
website. The maximum number of profiles is 100.

###

[​

](#default-profile)

Default Profile

Every Exchange account has a **default profile** that serves as:

- **Primary trading interface**: The main profile used for trading activities
- **Crypto on/off-ramp**: The entry and exit point for cryptocurrency deposits
  and withdrawals
- **Initial balance holder**: Where your initial funds are stored when you first
  fund your Exchange account

###

[​

](#managing-profiles)

Managing Profiles

You can [retrieve all profiles](/exchange/reference/exchangerestapi_getprofiles)
associated with your Exchange account:

- Go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
httpClient, err := core.DefaultHttpClient()
client := client.NewRestClient(credentials, httpClient)

profilesSvc := profiles.NewProfilesService(client)
request := &profiles.ListProfilesRequest{}
response, err := profilesSvc.ListProfiles(context.Background(), request)
```

To learn more about this SDK, please visit the
[Exchange Go SDK](https://github.com/coinbase-samples/exchange-sdk-go).

###

[​

](#creating-additional-profiles)

Creating Additional Profiles

You can
[create additional profiles via the API](/exchange/reference/exchangerestapi_postprofile)
to organize your trading activities. Common use cases include:

- **Strategy separation**: Different profiles for different trading strategies
  (e.g., long-term holdings vs. day trading)
- **Risk management**: Isolated profiles for different risk tolerances or
  investment goals

Profiles are designed for institutional trading and portfolio management. They
are not intended for:

- Tracking individual end-user balances
- Implementing retail-style send/receive flows

###

[​

](#profile-transfers)

Profile Transfers

You can transfer balances between profiles (e.g., from the default profile to a
strategy-specific one). This enables flexible portfolio management and fund
allocation. For detailed information, see the [Transfers Concepts](#) section.
Here’s how to create a new profile:

- Go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
httpClient, err := core.DefaultHttpClient()
client := client.NewRestClient(credentials, httpClient)

profilesSvc := profiles.NewProfilesService(client)
request := &profiles.CreateProfileRequest{
    Name: profileName,
}
response, err := profilesSvc.CreateProfile(context.Background(), request)
```

###

[​

](#api-keys)

API Keys

An API key is scoped to a specific profile. An API key can only view and create
data that belongs to its own profile, unless otherwise noted. This is true for
the REST API, FIX API and Websocket Feed. To access data or actions on a
different profile, create a new API key on the Coinbase Exchange website.

###

[​

](#deleted-profiles)

Deleted Profiles

Profiles can be deleted on the Coinbase Exchange website. The permissions of an
API key associated with a deleted profile are automatically set to “View.”

##

[​

](#accounts)

Accounts

**Accounts** represent individual asset balances within a specific profile. Each
account holds a single cryptocurrency or fiat currency and provides the
foundation for trading activities on the Exchange.

###

[​

](#account-characteristics)

Account Characteristics

- **Profile-specific**: Each profile has its own unique set of accounts
- **Asset-specific**: Each account holds only one type of asset (e.g., BTC, ETH,
  USD)
- **Independent balances**: The same asset in different profiles will have
  separate account IDs and balances
- **Trading access**: Accounts enable you to place orders and execute trades

For example, if you have BTC in both Profile A and Profile B, they will have
different `account_id`s, separate balances, and independent transaction
histories.

###

[​

](#listing-accounts)

Listing Accounts

To retrieve a
[list of all accounts](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts)
for a given profile:

- Go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
httpClient, err := core.DefaultHttpClient()
client := client.NewRestClient(credentials, httpClient)

accountsSvc := accounts.NewAccountsService(client)
request := &accounts.ListAccountsRequest{}
response, err := accountsSvc.ListAccounts(context.Background(), request)
```

###

[​

](#account-ledger)

Account Ledger

Each account maintains a comprehensive historical ledger that tracks all
financial events, including:

- **Transfers**: Incoming and outgoing transfers between accounts or profiles
- **Order matches**: Completed trades and their impact on balances
- **Fees and rebates**: Trading fees, maker rebates, and other charges
- **Conversions**: Asset conversions and their associated costs
- **Deposits and withdrawals**: Funding and withdrawal activities

###

[​

](#querying-account-history)

Querying Account History

To
[query the account ledger](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountledger)
for a specific time period, you can include a `start_date` parameter. This is
useful for generating reports, tracking performance, or reconciling
transactions. Example: Query ledger entries since the start of the year:

- Go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
httpClient, err := core.DefaultHttpClient()
client := client.NewRestClient(credentials, httpClient)

accountsSvc := accounts.NewAccountsService(client)
request := &accounts.GetAccountLedgerRequest{
    AccountId: accountId,
    StartDate: "2025-01-01T00:00:00Z",
}
response, err := accountsSvc.GetAccountLedger(context.Background(), request)
```

##

[​

](#coinbase-accounts)

Coinbase Accounts

**Coinbase Accounts** represent the bridge between your Exchange account and
your Coinbase retail account. These accounts are tied together via the same
email address, meaning a single user identity spans both platforms. This
connection allows you to easily transfer funds between Exchange and retail
through the API.

###

[​

](#key-features)

Key Features

- **Direct integration**: Access to wallets managed via Coinbase.com
- **Fund transfer capability**: Move funds between Exchange and Coinbase retail
  accounts
- **Unified experience**: Manage both institutional trading and retail wallet
  activities
- **Enhanced liquidity**: Leverage both platforms for optimal fund management

###

[​

](#listing-coinbase-accounts)

Listing Coinbase Accounts

To retrieve all Coinbase Account wallets associated with your Exchange account:

- Go

Report incorrect code

Copy

Ask AI

```
credentials, err := credentials.ReadEnvCredentials("EXCHANGE_CREDENTIALS")
httpClient, err := core.DefaultHttpClient()
client := client.NewRestClient(credentials, httpClient)

accountsSvc := accounts.NewAccountsService(client)
request := &accounts.ListCoinbaseAccountsRequest{}
response, err := accountsSvc.ListCoinbaseAccounts(context.Background(), request)
```

To learn more about this SDK, please visit the
[Exchange Go SDK](https://github.com/coinbase-samples/exchange-sdk-go).

##

[​

](#summary)

Summary

The Coinbase Exchange account structure provides a flexible and powerful
framework for institutional trading:

1.  **Profiles** organize your trading activities into separate portfolios
2.  **Accounts** manage individual asset balances within each profile
3.  **Coinbase Accounts** connect your Exchange activities to your retail
    Coinbase account

This hierarchical structure enables sophisticated portfolio management, risk
control, and operational efficiency for institutional traders and organizations.

---
