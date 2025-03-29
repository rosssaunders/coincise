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