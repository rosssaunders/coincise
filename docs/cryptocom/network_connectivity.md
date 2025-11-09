## REST API Root Endpoint

Note: REST API requests need to be sent as "Content Type: application/json"

### UAT Sandbox

#### REST API

`https://uat-api.3ona.co/exchange/v1/{method}`

### Production

#### REST API

`https://api.crypto.com/exchange/v1/{method}`

## Websocket Root Endpoints

The Websocket is available across two servers -- the User API Websocket (for
authenticated requests and subscriptions), and Market Data Websocket:

### UAT Sandbox

#### Websocket (User API and Subscriptions)

`wss://uat-stream.3ona.co/exchange/v1/user`

#### Websocket (Market Data Subscriptions)

`wss://uat-stream.3ona.co/exchange/v1/market`

### Production

#### Websocket (User API and Subscriptions)

`wss://stream.crypto.com/exchange/v1/user`

#### Websocket (Market Data Subscriptions)

`wss://stream.crypto.com/exchange/v1/market`
